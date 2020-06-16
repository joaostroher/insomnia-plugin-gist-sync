const fs = require('fs');
const axios = require('axios');

function createGitHubApi(token) {
  return axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 5000,
    headers: { Authorization: `Bearer ${token}` },
  });
}

async function promptApiKey(context, forceReprompt) {
  const oldApiKey = await context.store.getItem('gist-sync:api-key');
  if (!oldApiKey || forceReprompt) {
    try {
      const apiKey = await context.app.prompt(
        'Gist Sync - Configuration - API Key',
        {
          label: 'Put your GitHub API Key here:',
          defaultValue: oldApiKey,
          submitName: 'Save',
          cancelable: true,
        },
      );
      const sanitizedApiKey = apiKey.trim();
      if (sanitizedApiKey === '') {
        context.store.removeItem('gist-sync:api-key');
        return null;
      }
      await context.store.setItem('gist-sync:api-key', sanitizedApiKey);
      return sanitizedApiKey;
    } catch {}
  }
  return oldApiKey;
}

async function promptGistKey(context, forceReprompt) {
  const oldGistKey = await context.store.getItem('gist-sync:gist-key');
  if (!oldGistKey || forceReprompt) {
    try {
      const gistKey = await context.app.prompt(
        'Gist Sync - Configuration - Gist ID',
        {
          label:
            'Put your Gist ID here (if not present, a new gist will be created):',
          defaultValue: oldGistKey,
          submitName: 'Save',
          cancelable: true,
        },
      );
      const sanitizedGistKey = gistKey.trim();
      if (sanitizedGistKey === '') {
        context.store.removeItem('gist-sync:gist-key');
        return null;
      }
      await context.store.setItem('gist-sync:gist-key', sanitizedGistKey);
      return sanitizedGistKey;
    } catch {}
  }
  return oldGistKey;
}

module.exports.workspaceActions = [
  {
    label: 'Gist Sync - Send',
    icon: 'fa-upload',
    action: async (context, models) => {
      const apiKey = await promptApiKey(context, false);
      if (!apiKey) {
        await context.app.alert(
          'Configuration error',
          'The GitHub API Key must be configured',
        );
        return;
      }
      const gistKey = await promptGistKey(context, false);
      if (!gistKey) {
        if (!confirm('The Gist ID not informated, will be create a new Gist?'))
          return;
      }
      const data = await context.data.export.insomnia({
        includePrivate: false,
        format: 'json',
      });
      const content = JSON.stringify(JSON.parse(data), null, 2);
      if (!gistKey) {
        const response = await createGitHubApi(apiKey).post(
          'https://api.github.com/gists',
          {
            files: {
              'insomnia_data.json': {
                content,
              },
            },
            description: 'Insomnia Sync Data',
            public: false,
          },
        );
        await context.store.setItem('gist-sync:gist-key', response.data.id);
      } else {
        await createGitHubApi(apiKey).patch(
          `https://api.github.com/gists/${gistKey}`,
          {
            files: {
              'insomnia_data.json': {
                content,
              },
            },
          },
        );
      }
    },
  },
  {
    label: 'Gist Sync - Receive',
    icon: 'fa-download',
    action: async (context, models) => {
      const apiKey = await promptApiKey(context, false);
      console.log('apiKey', apiKey);
      if (!apiKey) {
        console.log('apiKey', apiKey);
        await context.app.alert(
          'Configuration error',
          'The GitHub API Key must be configured',
        );
        return;
      }
      const gistKey = await promptGistKey(context, false);
      if (!gistKey) {
        await context.app.alert(
          'Configuration error',
          'The Gist ID must be configured',
        );
        return;
      }
      const response = await createGitHubApi(apiKey).get(
        `https://api.github.com/gists/${gistKey}`,
      );
      const file = response.data.files['insomnia_data.json'];
      if (!file.truncated) await context.data.import.raw(file.content);
      else {
        const rawResponse = await axios.get(file.raw_url);
        const content = JSON.stringify(rawResponse.data);
        await context.data.import.raw(content);
      }
    },
  },
  {
    label: 'Gist Sync - Configure',
    icon: 'fa-cogs',
    action: async (context, models) => {
      await promptApiKey(context, true);
      await promptGistKey(context, true);
    },
  },
];
