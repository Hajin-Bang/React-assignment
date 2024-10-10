import { create } from 'zustand';
import { IUser } from '@/types/authType';
import { useMutation } from '@tanstack/react-query';
import { registerUserAPI } from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '@/apiRoutes';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  isLogin: boolean;
  user: IUser | null;
  registerStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  registerError: string | null;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>( // 로그인 유지를 위해 persist 사용
    (set) => ({
      isLogin: false,
      user: null,
      registerStatus: 'idle',
      registerError: null,
      setIsLogin: (isLogin) => set({ isLogin }),
      setUser: (user) => set({ user, isLogin: true }),
      logout: () => set({ isLogin: false, user: null }),
    }),
    {
      name: 'auth-storage', // 로컬 스토리지에 저장될 이름
      storage: createJSONStorage(() => localStorage), // 기본값은 로컬 스토리지
    }
  )
);

interface RegisterUserPayload {
  email: string;
  password: string;
  name: string;
}

export const useRegisterUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password, name }: RegisterUserPayload) =>
      registerUserAPI({ email, password, name }),
    onSuccess: (data) => {
      console.log('Registration successful', data);
      navigate(pageRoutes.login);
    },
    onError: (error) => {
      console.error('Registration failed', error);
    },
  });
};
