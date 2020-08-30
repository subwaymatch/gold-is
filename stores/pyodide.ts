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
}));

export default usePyodideStore;
