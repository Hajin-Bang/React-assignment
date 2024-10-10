import { create } from 'zustand';
import { ALL_CATEGORY_ID } from '@/constants';

interface FilterState {
  minPrice: number;
  maxPrice: number;
  title: string;
  categoryId: string;
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
  setTitle: (title: string) => void;
  setCategoryId: (categoryId: string) => void;
  resetFilter: () => void;
}

const useFilterStore = create<FilterState>((set) => ({
  minPrice: 0,
  maxPrice: 0,
  title: '',
  categoryId: ALL_CATEGORY_ID,

  setMinPrice: (minPrice) => set((state) => ({ ...state, minPrice })),
  setMaxPrice: (maxPrice) => set((state) => ({ ...state, maxPrice })),
  setTitle: (title) => set((state) => ({ ...state, title })),
  setCategoryId: (categoryId) => set((state) => ({ ...state, categoryId })),

  resetFilter: () =>
    set((state) => ({
      ...state,
      minPrice: 0,
      maxPrice: 0,
      title: '',
      categoryId: ALL_CATEGORY_ID,
    })),
}));

export default useFilterStore;
