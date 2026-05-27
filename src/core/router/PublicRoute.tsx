import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@core/store/hooks';
import { ROUTE_PATHS } from './routePaths';

interface PublicRouteProps {
  children: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.DASHBOARD} replace />;
  }

  return children;
};

export default PublicRoute;
