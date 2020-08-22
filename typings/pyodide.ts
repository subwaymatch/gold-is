export interface PyodideEnabledWindow extends Window {
  languagePluginUrl: string;
  languagePluginLoader: any;
  pyodide: any;
}
