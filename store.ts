import create from 'zustand';

export const useStore = create((set) => ({
  pyodideManager: null,
  sourceUrl: '',
  dataFrame: null,
  setPyodideManager: (pyodideManager) => set({ pyodideManager }),
  setSourceUrl: (url) => set({ sourceUrl: url }),
  setDataFrame: (dataFrame) => set({ dataFrame }),
}));
