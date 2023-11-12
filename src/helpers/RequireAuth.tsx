import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userAction } from '../store/user.slice';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  const jwt = localStorage.getItem('jwt');
  dispatch(userAction.delJwt);

  if (!jwt) {
    return <Navigate to='/auth/login' replace />;
  }
  return <>{children}</>;
}
