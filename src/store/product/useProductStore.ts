import { create } from 'zustand';
import { IProduct } from '@/api/dtos/productDTO';

interface ProductState {
  isLoading: boolean;
  error: string | null;
  products: IProduct[];
  hasNextPage: boolean;
  totalCount: number;
  currentPage: number;
  setLoading: (loading: boolean) => void;
  setProducts: (products: IProduct[]) => void;
  setHasNextPage: (hasNextPage: boolean) => void;
  setTotalCount: (totalCount: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setAdd: (newProduct: IProduct) => void;
  setError: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  isLoading: false,
  error: null,
  products: [],
  hasNextPage: false,
  totalCount: 0,
  currentPage: 1,
  setLoading: (loading) => set({ isLoading: loading }),
  setProducts: (products) => set({ products }),
  setHasNextPage: (hasNextPage) => set({ hasNextPage }),
  setTotalCount: (totalCount: number) => set({ totalCount }),
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  setAdd: (newProduct: IProduct) =>
    set((state) => ({
      items: [newProduct, ...state.products],
      totalCount: state.totalCount + 1,
      error: null,
    })),
  setError: () =>
    set({
      error: '상품 등록에 실패하였습니다.',
    }),
}));
