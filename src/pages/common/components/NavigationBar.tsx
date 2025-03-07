import Cookies from 'js-cookie';
import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import { ApiErrorBoundary } from '@/pages/common/components/ApiErrorBoundary';

import { Skeleton } from '@/components/ui/skeleton';
import { useModal } from '@/hooks/useModal';
import { CartButton } from './CartButton';
import { ConfirmModal } from './ConfirmModal';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import { useAuthStore } from '@/store/auth/useAuthStore';
import useCartStore from '@/store/cart/useCartStore';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const { cart, initCart } = useCartStore();
  const { isLogin, user, logout } = useAuthStore();

  useEffect(() => {
    if (isLogin && user && cart.length === 0) {
      initCart(user.uid);
    }
  }, [isLogin, user, initCart, cart.length]);

  const handleLogout = () => {
    openModal();
  };

  const handleConfirmLogout = () => {
    logout();
    Cookies.remove('accessToken');
    closeModal();
  };

  const handleClickLogo = () => {
    navigate(pageRoutes.main);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1
              className="text-xl font-bold cursor-pointer"
              onClick={handleClickLogo}
            >
              스파르타 마트
            </h1>
            <div className="flex items-center space-x-4">
              {isLogin ? (
                <ApiErrorBoundary>
                  <Suspense fallback={<Skeleton className="w-24 h-8" />}>
                    <CartButton cart={cart} />
                    <LogoutButton onClick={handleLogout} />
                  </Suspense>
                </ApiErrorBoundary>
              ) : (
                <LoginButton />
              )}
            </div>
          </div>
        </div>
      </nav>
      <ConfirmModal
        title="로그아웃 확인"
        description="로그아웃 하시겠습니까?"
        handleClickDisagree={closeModal}
        handleClickAgree={handleConfirmLogout}
        isModalOpened={isOpen}
      />
    </>
  );
};
