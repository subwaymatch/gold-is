import create from 'zustand';

const usePyodideStore = create((set) => ({
  pyodideManager: null,
  setPyodideManager: (pyodideManager) => set({ pyodideManager }),
  sourceUrl: '',
  setSourceUrl: (url) => set({ sourceUrl: url }),
  dataFrame: null,
  setDataFrame: (dataFrame) => set({ dataFrame }),
  dropColumns: [],
  addDropColumn: (columnName) =>
    set((state) => ({
      dropColumns: [columnName, ...state.dropColumns],
    })),
  dataOverview: null,
  setDataOverview: (dataOverview) => set({ dataOverview }),
  columnSummaries: null,
  setColumnSummaries: (columnSummaries) => set({ columnSummaries }),
}));

export default usePyodideStore;
