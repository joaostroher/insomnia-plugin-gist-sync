import SyncProvider from './SyncProvider';
import GitHubService, { IGistFile } from '../services/github';
import Aes256Cipher from '../services/cipher';

class GitHubSyncProvider extends SyncProvider {
  private static STORE_KEY_API_KEY = 'gist-sync:api-key';

  private static STORE_KEY_GIST_ID = 'gist-sync:gist-key';

  private static STORE_KEY_ENCRYPT_ENABLED = 'gist-sync:encrypt-enabled';

  private static STORE_KEY_ENCRYPT_KEY = 'gist-sync:encrypt-key';

  private static STORE_KEY_IGNORED_WORKSPACES = 'gist-sync:ignored-workspaces';

  async receive(): Promise<void> {
    const apiKey = await this.getInsomniaStoreData(
      GitHubSyncProvider.STORE_KEY_API_KEY,
    );
    if (!apiKey) throw new Error();

    const gistId = await this.getInsomniaStoreData(
      GitHubSyncProvider.STORE_KEY_GIST_ID,
    );
    if (!gistId) throw new Error();

    const gitHubService = new GitHubService(apiKey);
    const gist = await gitHubService.getGist(gistId);
    const file = gist.files['insomnia_data.json'];

    const content = await this.resolveFileContent(gitHubService, file);
    const decryptedContent = await this.decryptIfRequired(content);

    await this.importToInsomnia(decryptedContent);
  }

  private async resolveFileContent(gitHubService: GitHubService, file: IGistFile): Promise<string> {
    if (!file.truncated) return file.content;

	return await gitHubService.getByUrl(file.raw_url);
  }

  async send(): Promise<void> {
    const apiKey = await this.getInsomniaStoreData(
      GitHubSyncProvider.STORE_KEY_API_KEY,
    );
    if (!apiKey) throw new Error();
    const gistId = await this.getInsomniaStoreData(
      GitHubSyncProvider.STORE_KEY_GIST_ID,
    );

    const ignoreWorkspaces = await this.getInsomniaStoreData(
      GitHubSyncProvider.STORE_KEY_IGNORED_WORKSPACES,
    );

    const content = await this.exportFromInsomnia({
      ignoreWorkspaces: ignoreWorkspaces?.split(','),
    });

    const encryptedContent = await this.encryptIfRequired(content);

    const gitHubService = new GitHubService(apiKey);

    if (!gistId) {
      const gist = await gitHubService.createGist(encryptedContent);
      await this.setInsomniaStoreData(
        GitHubSyncProvider.STORE_KEY_GIST_ID,
        gist.id,
      );
    } else {
      await gitHubService.updateGist(gistId, encryptedContent);
    }
  }

  private async encryptionEnabled(): Promise<boolean> {
    const encryptEnabled = await this.getInsomniaStoreData(
    	GitHubSyncProvider.STORE_KEY_ENCRYPT_ENABLED,
    );
    
    return encryptEnabled === 'true';
  }

  private async decryptIfRequired(content: string): Promise<string> {
    if (!await this.encryptionEnabled()) return content;
    
    const cipher = await this.createCipher();
    
    return cipher.decrypt(content);
  }

  private async encryptIfRequired(content: string): Promise<string> {
    if (!await this.encryptionEnabled()) return content;
    
    const cipher = await this.createCipher();
    
    return cipher.encrypt(content);
  }

  private async createCipher(): Promise<Aes256Cipher> {
    const encryptKey = await this.getInsomniaStoreData(
    	GitHubSyncProvider.STORE_KEY_ENCRYPT_KEY,
    );
    if (!encryptKey) throw new Error("Encryption key must be non-empty string");
    
    return new Aes256Cipher(encryptKey);
  }
}

export default GitHubSyncProvider;
