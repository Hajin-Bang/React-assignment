import { useMutation } from '@tanstack/react-query';
import { IProduct, NewProductDTO } from '@/api/dtos/productDTO';
import { addProductAPI } from '@/api/product';
import { useProductStore } from '@/store/product/useProductStore';

export const useAddProduct = () => {
  const { setAdd, setError } = useProductStore();

  return useMutation<IProduct, Error, NewProductDTO>({
    mutationFn: addProductAPI,
    onSuccess: (newProduct) => {
      setAdd(newProduct);
    },
    onError: (error) => {
      setError();
      console.error('상품 추가 실패', error);
    },
  });
};
