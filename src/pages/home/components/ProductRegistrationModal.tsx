import { NewProductDTO } from '@/api/dtos/productDTO';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ALL_CATEGORY_ID, categories } from '@/constants';
import { createNewProduct } from '@/helpers/product';
import { useAddProduct } from '@/hooks/useAddProducts';
import { useAppDispatch } from '@/store/hooks';
import { addProduct } from '@/store/product/productsActions';
import { useToastStore } from '@/store/toast/useToastStore';
import { uploadImage } from '@/utils/imageUpload';
import { ChangeEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ProductRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

export const ProductRegistrationModal: React.FC<
  ProductRegistrationModalProps
> = ({ isOpen, onClose, onProductAdded }) => {
  const {
    mutate: addProduct,
    isSuccess,
    isPending,
    isError,
    error,
  } = useAddProduct();
  const { showToast } = useToastStore();

  const { register, handleSubmit, setValue, reset } = useForm<NewProductDTO>({
    defaultValues: {
      title: '',
      price: 0,
      description: '',
      category: { id: '' },
    },
  });

  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        setImage(files[0]);
      }
    },
    []
  );

  const onSubmit = useCallback(
    async (data: NewProductDTO): Promise<void> => {
      try {
        if (!image) {
          throw new Error('이미지를 선택해야 합니다.');
        }

        const imageUrl = await uploadImage(image);
        if (!imageUrl) {
          throw new Error('이미지 업로드에 실패했습니다.');
        }

        const newProduct = createNewProduct({ ...data }, imageUrl);
        addProduct(newProduct);
        reset();
        onClose();
        onProductAdded();
        showToast('상품이 성공적으로 등록되었습니다.', 'success');
      } catch (error) {
        console.error('물품 등록에 실패했습니다.', error);
      }
    },
    [image, addProduct, reset, onClose, onProductAdded, showToast]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>상품 등록</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <Input {...register('title')} placeholder="상품명" />
            <Input
              {...register('price', { valueAsNumber: true })}
              type="number"
              placeholder="가격"
            />
            <Textarea {...register('description')} placeholder="상품 설명" />
            <Select onValueChange={(value) => setValue('category.id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((category) => category.id !== ALL_CATEGORY_ID)
                  .map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Input
              className="cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <DialogFooter>
            <Button type="submit">등록</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
