abstract class SyncProvider {
  private insomniaContext: IInsomniaContext;

  constructor(insomniaContext: IInsomniaContext) {
    this.insomniaContext = insomniaContext;
  }

  protected async importToInsomnia(content: string): Promise<void> {
    await this.insomniaContext.data.import.raw(content);
  }

  protected async exportFromInsomnia(): Promise<string> {
    const data = await this.insomniaContext.data.export.insomnia({
      includePrivate: false,
      format: 'json',
    });
    return JSON.stringify(JSON.parse(data), null, 2);
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

  abstract async receive(): Promise<void>;

  abstract async send(): Promise<void>;
}

export default SyncProvider;
