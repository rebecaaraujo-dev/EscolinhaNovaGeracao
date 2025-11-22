import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Pencil, Trash2 } from 'lucide-react';
import './styles.css';

interface Chamada {
  id: number;
  data: string;
  status: 'em_andamento' | 'concluida';
}

interface ChamadasListProps {
  onEdit: (chamada: Chamada) => void;
}

const ChamadasList: React.FC<ChamadasListProps> = ({ onEdit }) => {
  const [chamadas, setChamadas] = useState<Chamada[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchChamadas();
  }, []);

  const fetchChamadas = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('chamadas')
        .select('*')
        .order('data', { ascending: false });

      if (error) {
        console.error('Erro ao buscar chamadas:', error);
        throw error;
      }
      setChamadas(data || []);
    } catch (err) {
      setError('Erro ao carregar chamadas');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir esta chamada?')) return;

    try {
      setDeletingId(id);
      setError(null);
      
      // Primeiro verifica se existem presenças relacionadas
      const { data: presencas, error: presencasCheckError } = await supabase
        .from('presencas')
        .select('id')
        .eq('chamada_id', id);

      if (presencasCheckError) {
        console.error('Erro ao verificar presenças:', presencasCheckError);
        throw presencasCheckError;
      }

      // Se existirem presenças, exclui-as primeiro
      if (presencas && presencas.length > 0) {
        console.log(`Excluindo ${presencas.length} presenças...`);
        const { error: presencasError } = await supabase
          .from('presencas')
          .delete()
          .eq('chamada_id', id);

        if (presencasError) {
          console.error('Erro ao excluir presenças:', presencasError);
          throw presencasError;
        }
      }

      // Depois exclui a chamada
      console.log('Excluindo chamada...');
      const { error: chamadaError } = await supabase
        .from('chamadas')
        .delete()
        .eq('id', id);

      if (chamadaError) {
        console.error('Erro ao excluir chamada:', chamadaError);
        throw chamadaError;
      }

      // Atualiza a lista
      setChamadas(prev => prev.filter(chamada => chamada.id !== id));
      console.log('Chamada excluída com sucesso!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao excluir chamada: ${errorMessage}`);
      console.error('Erro detalhado:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading && !deletingId) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return (
      <div className="error">
        {error}
        <button 
          className="retry-button" 
          onClick={() => {
            setError(null);
            fetchChamadas();
          }}
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (chamadas.length === 0) {
    return <div className="no-chamadas">Nenhuma chamada realizada</div>;
  }

  return (
    <div className="chamadas-list">
      <h2>Chamadas Realizadas</h2>
      <div className="chamadas-grid">
        {chamadas.map(chamada => (
          <div key={chamada.id} className="chamada-card">
            <div className="chamada-info">
              <span className="chamada-data">{formatDate(chamada.data)}</span>
              <span className={`chamada-status ${chamada.status}`}>
                {chamada.status === 'concluida' ? 'Concluída' : 'Em Andamento'}
              </span>
            </div>
            <div className="chamada-actions">
              <button
                className="edit-button"
                onClick={() => onEdit(chamada)}
                title="Editar chamada"
                disabled={deletingId === chamada.id}
              >
                <Pencil size={18} />
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(chamada.id)}
                title="Excluir chamada"
                disabled={deletingId === chamada.id}
              >
                {deletingId === chamada.id ? 'Excluindo...' : <Trash2 size={18} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChamadasList; 