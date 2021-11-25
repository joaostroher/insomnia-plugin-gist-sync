type ExportFromInsomniaProps = {
  ignoreWorkspaces?: string[];
};

type ExportFromInsomniaReq = {
  _id: string;
  _type: 'request';
  parentId: string;
  name: string;
};

type ExportFromInsomniaWrk = {
  _id: string;
  _type: 'workspace';
  name: string;
  scope: null;
};

type ExportFromInsomniaJSON = {
  _type: 'export';
  __export_format: number;
  __export_date: string;
  __export_source: string;
  resources: (ExportFromInsomniaReq | ExportFromInsomniaWrk)[];
};

abstract class SyncProvider {
  private insomniaContext: IInsomniaContext;

  constructor(insomniaContext: IInsomniaContext) {
    this.insomniaContext = insomniaContext;
  }

  private normalize(data: object): string {
    return JSON.stringify(data, null, 2);
  }

  protected async importToInsomnia(content: string): Promise<void> {
    await this.insomniaContext.data.import.raw(content);
  }

  private async exportFromInsomniaRaw(): Promise<string> {
    return await this.insomniaContext.data.export.insomnia({
      includePrivate: false,
      format: 'json',
    });
  }

  private async exportFromInsomniaJSON(): Promise<ExportFromInsomniaJSON> {
    const data = await this.exportFromInsomniaRaw();

    return JSON.parse(data);
  }

  protected async exportFromInsomnia({
    ignoreWorkspaces,
  }: ExportFromInsomniaProps): Promise<string> {
    const jsonData = await this.exportFromInsomniaJSON();

    if (!ignoreWorkspaces?.length) return this.normalize(jsonData);

    const ignoreWrksIds = jsonData.resources
      .filter(
        item =>
          item._type === 'workspace' &&
          ignoreWorkspaces?.find(
            name => name.toUpperCase().trim() === item.name?.toUpperCase(),
          ),
      )
      .map(item => item._id);

    const filteredResources = jsonData.resources.filter(
      item =>
        !ignoreWrksIds?.find(
          id =>
            id === item._id || id === (item as ExportFromInsomniaReq)?.parentId,
        ),
    );

    return this.normalize({ ...jsonData, resources: filteredResources });
  }

  protected async getInsomniaStoreData(key: string): Promise<string | null> {
    return this.insomniaContext.store.getItem(key);
  }

  protected async setInsomniaStoreData(
    key: string,
    value: string,
  ): Promise<void> {
    return this.insomniaContext.store.setItem(key, value);
  }

  abstract receive(): Promise<void>;

  abstract send(): Promise<void>;
}

export default SyncProvider;
