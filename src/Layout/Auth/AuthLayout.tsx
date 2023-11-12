import React from 'react';
import { Outlet } from 'react-router-dom';

import './AuthLayout.scss';

export default function AuthLayout() {
  return (
    <div className='Authlayout'>
      <div className='logo'>
        <img src='/logo.svg' alt='logo' />
      </div>
      <div className='content'>
        <Outlet />
      </div>
    </div>
  );
}
