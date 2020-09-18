import SyncProvider from './SyncProvider';
import GitHubService from '../services/github';

class GitHubSyncProvider extends SyncProvider {
  private static STORE_KEY_API_KEY = 'gist-sync:api-key';

  private static STORE_KEY_GIST_ID = 'gist-sync:gist-key';

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

    if (!file.truncated) await this.importToInsomnia(file.content);
    else {
      const rawData = await gitHubService.getByUrl(file.raw_url);
      await this.importToInsomnia(rawData);
    }
  }

  async send(): Promise<void> {
    const apiKey = await this.getInsomniaStoreData(
      GitHubSyncProvider.STORE_KEY_API_KEY,
    );
    if (!apiKey) throw new Error();
    const gistId = await this.getInsomniaStoreData(
      GitHubSyncProvider.STORE_KEY_GIST_ID,
    );

    const content = await this.exportFromInsomnia();
    const gitHubService = new GitHubService(apiKey);

    if (!gistId) {
      const gist = await gitHubService.createGist(content);
      await this.setInsomniaStoreData(
        GitHubSyncProvider.STORE_KEY_GIST_ID,
        gist.id,
      );
    } else {
      await gitHubService.updateGist(gistId, content);
    }
  }
}

export default GitHubSyncProvider;
