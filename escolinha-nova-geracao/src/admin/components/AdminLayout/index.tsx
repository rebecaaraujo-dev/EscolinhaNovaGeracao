import React from 'react';
import { Outlet } from 'react-router-dom';
import TabBar from '../TabBar';
import './styles.css';

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      <main className="admin-content">
        <Outlet />
      </main>
      <TabBar />
    </div>
  );
};

export default AdminLayout; 