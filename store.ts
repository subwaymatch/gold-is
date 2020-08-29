import create from 'zustand';

export const useStore = create((set) => ({
  sourceUrl: '',
  dataFrame: null,
  setSourceUrl: (url) => set({ sourceUrl: url }),
  setDataFrame: (df) =>
    set((state) => {
      console.log(`setDataFrame`);
      console.log(df);

      return { dataFrame: df };
    }),
}));
