interface IInsomniaApp {
  dialog(title: string, html: HTMLElement): void;
}

interface IInsomniaStore {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
}

interface IInsomniaDataImport {
  raw(content: string): Promise<void>;
}

interface IInsomniaDataExportOptions {
  includePrivate?: boolean;
  format?: 'json' | 'yaml';
}

interface IInsomniaDataExport {
  insomnia(options: IInsomniaDataExportOptions): Promise<string>;
}

interface IInsomniaData {
  import: IInsomniaDataImport;
  export: IInsomniaDataExport;
}

interface IInsomniaContext {
  app: IInsomniaApp;
  store: IInsomniaStore;
  data: IInsomniaData;
}

interface IInsomniaWorkspaceActionFunction {
  (context: IInsomniaContext, models: any): void;
}

interface IInsomniaWorkspaceAction {
  label: string;
  icon: string;
  action: IInsomniaWorkspaceActionFunction;
}
