import { create } from 'zustand';
import { IUser } from '@/types/authType';
import { useMutation } from '@tanstack/react-query';
import { registerUserAPI } from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '@/apiRoutes';

interface AuthState {
  isLogin: boolean;
  user: IUser | null;
  registerStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  registerError: string | null;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: IUser) => void;
  setRegisterStatus: (
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
  ) => void;
  setRegisterError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  user: null,
  registerStatus: 'idle',
  registerError: null,
  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (user) => set({ user, isLogin: true }),
  setRegisterStatus: (status) => set({ registerStatus: status }),
  setRegisterError: (error) => set({ registerError: error }),
  logout: () => set({ isLogin: false, user: null }),
}));

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
