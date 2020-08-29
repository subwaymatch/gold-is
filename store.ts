import create from 'zustand';

export const useStore = create((set) => ({
  sourceUrl: '',
  dataFrame: null,
  setSourceUrl: (url) => set({ sourceUrl: url }),
  setDataFrame: (dataFrame) => set({ dataFrame }),
}));
