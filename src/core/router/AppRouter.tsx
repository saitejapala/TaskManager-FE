import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Loader from '@shared/components/ui/Loader';

// Lazy load pages
const SignInPage = lazy(() => import('@features/auth/pages/SignInPage'));
const SignUpPage = lazy(() => import('@features/auth/pages/SignUpPage'));
const OtpPage = lazy(() => import('@features/auth/pages/OtpPage'));
const ForgotPasswordPage = lazy(() => import('@features/auth/pages/ForgotPasswordPage'));
const DashboardPage = lazy(() => import('@features/workItems/pages/DashboardPage'));

const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-bg">
    <Loader size="lg" />
  </div>
);

const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* / -> Redirect to /signin */}
        <Route path="/" element={<Navigate to={ROUTE_PATHS.SIGN_IN} replace />} />

        {/* Public Routes */}
        <Route
          path={ROUTE_PATHS.SIGN_IN}
          element={
            <PublicRoute>
              <SignInPage />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTE_PATHS.SIGN_UP}
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTE_PATHS.OTP}
          element={
            <PublicRoute>
              <OtpPage />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTE_PATHS.FORGOT_PASSWORD}
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path={ROUTE_PATHS.DASHBOARD}
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all fallback -> Redirect to dashboard */}
        <Route path="*" element={<Navigate to={ROUTE_PATHS.DASHBOARD} replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
