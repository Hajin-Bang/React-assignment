import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/api/product';
import { ProductFilter } from '@/types/productType';

export const useLoadProducts = (
  filter: ProductFilter,
  pageSize: number,
  page: number
) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['products', filter, pageSize, page],
    queryFn: () => fetchProducts(filter, pageSize, page),
  });

  return { data, error, isLoading };
};
