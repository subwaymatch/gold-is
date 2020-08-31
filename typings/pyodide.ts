export interface PyodideEnabledWindow extends Window {
  languagePluginUrl: string;
  languagePluginLoader: any;
  pyodide: any;
}

export type TColumnSummary = {
  data_type: string;
  distinct_count: number;
  unique_percentage: number;
  missing_count: number;
  missing_percentage: number;
  infinite_count: number;
  infinite_percentage: number;
  mean: number;
  min: number;
  max: number;
  zero_count: number;
  zero_percentage: number;
  memory_usage: number;
};
