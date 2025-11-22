import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import './styles.css';

const PrivateRoute: React.FC = () => {
  const username = localStorage.getItem('username');

  if (!username) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute; 