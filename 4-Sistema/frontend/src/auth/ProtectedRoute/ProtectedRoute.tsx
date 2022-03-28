import React, { useEffect } from 'react';
import './ProtectedRoute.scss';
import { useAppContext } from '../../context';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { user } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [user]);

  return <Outlet />;
};
