import { useMutation } from '@tanstack/react-query';
import { IProduct, NewProductDTO } from '@/api/dtos/productDTO';
import { addProductAPI } from '@/api/product';
import { useProductStore } from '@/store/product/useProductStore';

export const useAddProduct = () => {
  const { setAdd, setError } = useProductStore();

  return useMutation<IProduct, Error, NewProductDTO>({
    mutationFn: async (userData: NewProductDTO) => {
      return await addProductAPI(userData);
    },
    onSuccess: (newProduct) => {
      setAdd(newProduct);
    },
    onError: () => {
      setError();
    },
  });
};
