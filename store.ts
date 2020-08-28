import create from 'zustand';

export const useStore = create((set) => ({
  sourceUrl: '',
  dataframe: null,
  setSourceUrl: (url) => set((state) => ({ sourceUrl: url })),
  setDataFrame: (df) => set((state) => ({ dataframe: df })),
}));
