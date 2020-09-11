import React, { useState, useEffect, useCallback } from 'react';

import GitHubService from '../../services/github';
import Input from '../Input';
import Select, { ISelectOption } from '../Select';
import Button from '../Button';

import { Container, ActionsContainer } from './styles';

interface IConfigurationProps {
  insomniaContext: IInsomniaContext;
}

const Configuration: React.FC<IConfigurationProps> = ({ insomniaContext }) => {
  const [apiKey, setApiKey] = useState<string | null>('');
  const [gistKey, setGistKey] = useState<string | null>('');
  const [gistOptions, setGistsOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    async function loadGists() {
      const CREATE_NEW_OPTION = { label: 'Create new...', value: null };
      try {
        if (!apiKey) throw new Error('API Key not provided.');
        const gitHubService = new GitHubService(apiKey);
        const gists = await gitHubService.getGists();
        const options: ISelectOption[] = gists.map(gist => ({
          label: `${gist.description} (ID: ${gist.id})`,
          value: gist.id,
        }));
        setGistsOptions([CREATE_NEW_OPTION, ...options]);
      } catch (error) {
        setGistsOptions([CREATE_NEW_OPTION]);
      }
    }
    loadGists();
  }, [apiKey]);

  useEffect(() => {
    async function load() {
      const newApiKey = await insomniaContext.store.getItem(
        'gist-sync:api-key',
      );
      const newGistKey = await insomniaContext.store.getItem(
        'gist-sync:gist-key',
      );
      setApiKey(newApiKey);
      setGistKey(newGistKey);
    }
    load();
  }, []);

  const handleConfirm = useCallback(() => {
    async function execute() {
      await insomniaContext.store.setItem('gist-sync:api-key', apiKey ?? '');
      await insomniaContext.store.setItem('gist-sync:gist-key', gistKey ?? '');
    }
    execute();
  }, [apiKey, gistKey]);
  return (
    <Container>
      <Select
        label="Provider"
        options={[{ label: 'GitHub', value: 'github' }]}
        defaultValue="github"
      />
      <Input
        label="Gist API Key"
        value={apiKey}
        onChange={event => setApiKey(event.target.value)}
      />
      <Select
        label="Gist"
        options={gistOptions}
        value={gistKey}
        onChange={event => setGistKey(event.target.value)}
      />
      <ActionsContainer>
        <Button label="Cancel" closeModal />
        <Button label="Confirm" onClick={handleConfirm} closeModal />
      </ActionsContainer>
    </Container>
  );
};

export default Configuration;
