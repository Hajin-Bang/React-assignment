import { useMutation } from '@tanstack/react-query';
import { registerUserAPI } from '@/api/auth';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { IUser } from '@/types/authType';

interface RegisterUserPayload {
  email: string;
  password: string;
  name: string;
}

export const useRegisterUser = () => {
  const { setUser, setIsLogin } = useAuthStore();

  return useMutation<IUser, Error, RegisterUserPayload>({
    mutationFn: registerUserAPI,
    onSuccess: (user) => {
      setUser(user);
      setIsLogin(true);
    },
    onError: (error) => {
      console.error('회원가입 실패', error);
    },
  });
};
