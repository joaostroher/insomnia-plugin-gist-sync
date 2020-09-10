import React from 'react';
import ReactDOM from 'react-dom';

import Configuration from './components/Configuration';
import SyncProviderFactory, {
  SyncProviders,
} from './providers/SyncProviderFactory';

const workspaceActions: IInsomniaWorkspaceAction[] = [
  {
    label: 'Gist Sync - Send',
    icon: 'fa-upload',
    action: async (context, _) => {
      const factory = new SyncProviderFactory(context);
      const provider = factory.getProvider(SyncProviders.GitHub);
      provider.send();
    },
  },
  {
    label: 'Gist Sync - Receive',
    icon: 'fa-download',
    action: async (context, _) => {
      const factory = new SyncProviderFactory(context);
      const provider = factory.getProvider(SyncProviders.GitHub);
      provider.receive();
    },
  },
  {
    label: 'Sync - Configuration',
    icon: 'fa-cogs',
    action: (context, _): void => {
      const root = document.createElement('div');
      ReactDOM.render(
        React.createElement(Configuration, { insomniaContext: context }),
        root,
      );
      context.app.dialog('Sync - Configuration', root);
    },
  },
];

export { workspaceActions };
