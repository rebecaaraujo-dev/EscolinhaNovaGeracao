import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlunosList from '../../components/AlunosList';
import DateSelectModal from '../../components/DateSelectModal';
import ChamadasList from '../../components/ChamadasList';
import './styles.css';

interface Chamada {
  id: number;
  data: string;
  status: 'em_andamento' | 'concluida';
}

const Chamada: React.FC = () => {
  const navigate = useNavigate();
  const [showChamada, setShowChamada] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingChamada, setEditingChamada] = useState<Chamada | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/admin/login');
  };

  const handleStartChamada = () => {
    setEditingChamada(null);
    setShowDateModal(true);
  };

  const handleDateConfirm = (date: string) => {
    setSelectedDate(date);
    setShowDateModal(false);
    setShowChamada(true);
  };

  const handleEditChamada = (chamada: Chamada) => {
    setEditingChamada(chamada);
    setSelectedDate(chamada.data);
    setShowChamada(true);
  };

  return (
    <div className="chamada-container">
      <div className="chamada-header">
        <h1 className="chamada-title">Chamada</h1>
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </div>

      <div className="chamada-content">
        {!showChamada ? (
          <>
            <button className="start-button-chamada" onClick={handleStartChamada}>
              Iniciar Chamada
            </button>
            <ChamadasList onEdit={handleEditChamada} />
          </>
        ) : (
          <AlunosList 
            selectedDate={selectedDate} 
            editingChamada={editingChamada}
            onBack={() => setShowChamada(false)}
          />
        )}
      </div>

      <DateSelectModal
        isOpen={showDateModal}
        onClose={() => setShowDateModal(false)}
        onConfirm={handleDateConfirm}
      />
    </div>
  );
};

export default Chamada;
