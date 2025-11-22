import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Chamada',
      description: 'Registrar presença dos alunos',
      icon: '📝',
      path: '/admin/chamada'
    },
    {
      title: 'Alunos',
      description: 'Gerenciar cadastro de alunos',
      icon: '👥',
      path: '/admin/alunos'
    },
    {
      title: 'Dados',
      description: 'Visualizar relatórios e estatísticas',
      icon: '📊',
      path: '/admin/dados'
    },
    {
      title: 'Estoque',
      description: 'Controlar materiais e equipamentos',
      icon: '📦',
      path: '/admin/estoque'
    }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Painel de Controle</h1>
        <button 
          className="logout-button"
          onClick={() => {
            localStorage.removeItem('username');
            navigate('/admin/login');
          }}
        >
          Sair
        </button>
      </header>

      <div className="dashboard-grid">
        {cards.map((card) => (
          <div
            key={card.title}
            className="dashboard-card"
            onClick={() => navigate(card.path)}
          >
            <div className="card-icon">{card.icon}</div>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
