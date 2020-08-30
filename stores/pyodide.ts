import create from 'zustand';

const usePyodideStore = create((set) => ({
  isBootstrapped: false,
  setIsBootstrapped: () => set({ isBoostrapped: true }),
  pyodideManager: null,
  setPyodideManager: (pyodideManager) => set({ pyodideManager }),
  sourceUrl: '',
  setSourceUrl: (url) => set({ sourceUrl: url }),
  dataFrame: null,
  setDataFrame: (dataFrame) => set({ dataFrame }),
}));

export default usePyodideStore;
