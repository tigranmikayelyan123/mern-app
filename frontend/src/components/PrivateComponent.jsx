import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateComponent() {
  const auth = localStorage.getItem('userData');
  return auth ? <Outlet /> : <Navigate to="/signup" />;
}

export default PrivateComponent;
