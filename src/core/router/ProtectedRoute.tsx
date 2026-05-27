import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@core/store/hooks';
import { ROUTE_PATHS } from './routePaths';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.SIGN_IN} replace />;
  }

  return children;
};

export default ProtectedRoute;
