import create from 'zustand';

export const useStore = create((set) => ({
  sourceUrl: '',
  setSourceUrl: (url) => set((state) => ({ sourceUrl: url })),
}));
