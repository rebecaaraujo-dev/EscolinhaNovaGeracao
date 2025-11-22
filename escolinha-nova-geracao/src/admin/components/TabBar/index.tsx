import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ClipboardList, 
  Users, 
  Database, 
  Package 
} from 'lucide-react';
import './styles.css';

const TabBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/admin/chamada', icon: ClipboardList, label: 'Chamada' },
    { path: '/admin/alunos', icon: Users, label: 'Alunos' },
    { path: '/admin/dados', icon: Database, label: 'Dados' },
    { path: '/admin/estoque', icon: Package, label: 'Estoque' }
  ];

  return (
    <nav className="tab-bar">
      {tabs.map(({ path, icon: Icon, label }) => {
        const isActive = location.pathname === path;
        return (
          <button
            key={path}
            className={`tab-button ${isActive ? 'active' : ''}`}
            onClick={() => navigate(path)}
          >
            <Icon size={24} />
            <span className="tab-label">{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default TabBar; 