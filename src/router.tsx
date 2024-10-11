import { createBrowserRouter, Outlet } from 'react-router-dom';
import { pageRoutes } from '@/apiRoutes';
import React, { Suspense } from 'react';

const Cart = React.lazy(() =>
  import('@/pages/cart').then((module) => ({ default: module.Cart }))
);
const LoginPage = React.lazy(() =>
  import('@/pages/login').then((module) => ({ default: module.LoginPage }))
);
const Purchase = React.lazy(() =>
  import('@/pages/purchase').then((module) => ({ default: module.Purchase }))
);
const RegisterPage = React.lazy(() =>
  import('@/pages/register').then((module) => ({
    default: module.RegisterPage,
  }))
);

import { Home } from '@/pages/home';
import { RootErrorBoundary } from '@/pages/common/components/RootErrorHandler';
import { RootSuspense } from '@/pages/common/components/RootSuspense';
import { ErrorPage } from '@/pages/error/components/ErrorPage';
import { NotFoundPage } from '@/pages/error/components/NotFoundPage';

const CommonLayout = () => (
  <RootErrorBoundary>
    <RootSuspense>
      <Outlet />
    </RootSuspense>
  </RootErrorBoundary>
);

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      {
        path: pageRoutes.main,
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.register,
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <RegisterPage />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.login,
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <LoginPage />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.cart,
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <Cart />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.purchase,
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <Purchase />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
