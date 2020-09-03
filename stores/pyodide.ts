import create from 'zustand';

const usePyodideStore = create((set) => ({
  pyodideManager: null,
  setPyodideManager: (pyodideManager) => set({ pyodideManager }),
  sourceUrl: '',
  setSourceUrl: (url) => set({ sourceUrl: url }),
  dataFrame: null,
  setDataFrame: (dataFrame) =>
    set((state) => {
      (window as any).df = dataFrame;
      return { dataFrame };
    }),
  dropColumns: [],
  addDropColumn: (columnName) =>
    set((state) => ({
      dropColumns: [columnName, ...state.dropColumns],
    })),
  removeDropColumn: (columnName) =>
    set((state) => ({
      dropColumns: state.dropColumns.filter((c) => c !== columnName),
    })),
  resetDropColumns: () => set({ dropColumns: [] }),
  dataOverview: null,
  setDataOverview: (dataOverview) => set({ dataOverview }),
  columnSummaries: null,
  setColumnSummaries: (columnSummaries) => set({ columnSummaries }),
}));

export default usePyodideStore;
