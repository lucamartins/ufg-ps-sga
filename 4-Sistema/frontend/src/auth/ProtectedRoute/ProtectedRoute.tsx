import React, { useEffect } from 'react';
import './ProtectedRoute.scss';
import { useAppContext } from '../../context';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { userAuth } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userAuth) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [userAuth]);

  return <Outlet />;
};
