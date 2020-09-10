import SyncProvider from './SyncProvider';
import GitHubSyncProvider from './GitHubSyncProvider';

enum SyncProviders {
  GitHub = 'github',
}

class SyncProviderFactory {
  constructor(private insomniaContext: IInsomniaContext) {}

  getProvider(provider: SyncProviders): SyncProvider {
    switch (provider) {
      case SyncProviders.GitHub:
        return new GitHubSyncProvider(this.insomniaContext);
      default:
        throw new Error();
    }
  }
}

export default SyncProviderFactory;
export { SyncProviders };
