# Insomnia Gist Sync

This is a plugin for [Insomnia](https://insomnia.rest) that allows users sync workspaces with gist of GitHub.

## Installation

Install the `insomnia-plugin-gist-sync` plugin from Preferences > Plugins.

## Configure

1. Create a [personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) to your GitHub account, with `gist` scope/permission.

2. Go to Insomnia, click on Insomnia Main Menu, and click on "Gist Sync - Configure":

![Plugin Screenshot](/docs/screenshot.jpg)

3. Filling with GitHub API Key (generated on step 1), select a existent Gist or select "Create new..." to create a new Gist.

![Configuration Plugin Screenshot](/docs/screenshot-configuration.png)

## Usage

- Click on "Gist Sync - Send" to send your workspaces to Gist.
- Click on "Gist Sync - Receive" to get your workspaces from Gist.

> Note that currently using the same Gist on more than one computer can result in problems. When the "Receive" button is pressed, all remote content is combined with local content by Insomnia. If you are really interested on preserving integrity working with a team, please [support insomnia](https://insomnia.rest/pricing/) with a team membership.
