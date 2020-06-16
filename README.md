# Insomnia Gist Sync

This is a plugin for [Insomnia](https://insomnia.rest) that allows users sync workspaces with gist of GitHub.

## Installation

Install the `insomnia-plugin-gist-sync` plugin from Preferences > Plugins.

## Configure

1. Create a [personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) to your GitHub account, with `gist` scope/permission.

2. Go to Insomnia, click on Insomnia Main Menu, and click on "Gist Sync - Configure":

![Plugin Screenshot](/screenshot.jpg)

3. Follow the steps, filling with GitHub API Key (generated on step 1), and after with your Gist ID (if you have used this plugin).

- If you kept Gist ID empty, will be generate a new private Gist on your account.

## Usage

- Click on "Gist Sync - Send" to send your workspaces to Gist.
- Click on "Gist Sync - Receive" to get your workspaces from Gist.
