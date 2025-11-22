import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../lib/supabase';
import './styles.css';

interface Aluno {
  id: number;
  nome: string;
  turma: string;
}

interface Presenca {
  aluno_id: number;
  status: 'presente' | 'falta' | 'falta_justificada';
  justificativa?: string;
}

interface Chamada {
  id: number;
  data: string;
  status: 'em_andamento' | 'concluida';
}

interface AlunosListProps {
  selectedDate: string | null;
  editingChamada: Chamada | null;
  onBack: () => void;
}

const AlunosList: React.FC<AlunosListProps> = ({ selectedDate, editingChamada, onBack }) => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [presencas, setPresencas] = useState<Presenca[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [idChamada, setIdChamada] = useState<number | null>(editingChamada?.id || null);
  const [focusedAlunoIndex, setFocusedAlunoIndex] = useState<number>(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetchAlunos();
  }, []);

  useEffect(() => {
    if (cardRefs.current[focusedAlunoIndex]) {
      cardRefs.current[focusedAlunoIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [focusedAlunoIndex]);

  const fetchAlunos = async () => {
    try {
      setLoading(true);
      console.log('Iniciando busca de alunos...');
      
      const { data: alunosData, error: alunosError } = await supabase
        .from('alunos')
        .select('*')
        .order('nome');

      if (alunosError) {
        console.error('Erro ao buscar alunos:', alunosError);
        throw alunosError;
      }

      console.log('Alunos encontrados:', alunosData);
      setAlunos(alunosData || []);
      cardRefs.current = alunosData?.map(() => null) || [];
      
      if (editingChamada) {
        console.log('Editando chamada existente:', editingChamada);
        const { data: presencasData, error: presencasError } = await supabase
          .from('presencas')
          .select('*')
          .eq('chamada_id', editingChamada.id);

        if (presencasError) {
          console.error('Erro ao buscar presenças:', presencasError);
          throw presencasError;
        }

        console.log('Presenças encontradas:', presencasData);
        setPresencas(presencasData || []);
      } else {
        console.log('Criando nova chamada para a data:', selectedDate);
        const presencasIniciais = alunosData?.map((aluno: Aluno) => ({
          aluno_id: aluno.id,
          status: 'presente' as const
        })) || [];
        
        setPresencas(presencasIniciais);

        if (selectedDate) {
          const { data: chamadaData, error: chamadaError } = await supabase
            .from('chamadas')
            .insert([
              {
                data: selectedDate
              }
            ])
            .select()
            .single();

          if (chamadaError) {
            console.error('Erro ao criar chamada:', chamadaError);
            throw chamadaError;
          }

          console.log('Chamada criada:', chamadaData);
          setIdChamada(chamadaData.id);
        }
      }
    } catch (err) {
      console.error('Erro detalhado:', err);
      setError('Erro ao carregar alunos');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (alunoId: number, status: Presenca['status']) => {
    setPresencas(prev => 
      prev.map(presenca => 
        presenca.aluno_id === alunoId 
          ? { ...presenca, status, justificativa: status === 'falta_justificada' ? '' : undefined }
          : presenca
      )
    );

    // Move para o próximo aluno se não for o último
    const currentIndex = alunos.findIndex(aluno => aluno.id === alunoId);
    if (currentIndex < alunos.length - 1) {
      setFocusedAlunoIndex(currentIndex + 1);
    }
  };

  const handleJustificativaChange = (alunoId: number, justificativa: string) => {
    setPresencas(prev =>
      prev.map(presenca =>
        presenca.aluno_id === alunoId
          ? { ...presenca, justificativa }
          : presenca
      )
    );
  };

  const handleSave = async () => {
    if (!idChamada) return;

    try {
      setLoading(true);

      if (editingChamada) {
        const { error: presencasError } = await supabase
          .from('presencas')
          .upsert(
            presencas.map(presenca => ({
              ...presenca,
              chamada_id: idChamada
            }))
          );

        if (presencasError) throw presencasError;
      } else {
        const { error: presencasError } = await supabase
          .from('presencas')
          .insert(
            presencas.map(presenca => ({
              ...presenca,
              chamada_id: idChamada
            }))
          );

        if (presencasError) throw presencasError;
      }

      const { error: chamadaError } = await supabase
        .from('chamadas')
        .update({ concluida: true })
        .eq('id', idChamada);

      if (chamadaError) throw chamadaError;

      setError(null);
      onBack();
    } catch (err) {
      setError('Erro ao salvar presenças');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="alunos-list">
      <div className="alunos-header">
        <h2>{editingChamada ? 'Editar Chamada' : 'Nova Chamada'}</h2>
      </div>

      <div className="alunos-grid">
        {alunos.map((aluno, index) => {
          const presenca = presencas.find(p => p.aluno_id === aluno.id);
          return (
            <div 
              key={aluno.id} 
              className={`aluno-card ${index === focusedAlunoIndex ? 'focused' : ''}`}
              ref={el => cardRefs.current[index] = el}
            >
              <h3>{aluno.nome}</h3>
              <p className="turma">{aluno.turma}</p>
              
              <div className="status-buttons">
                <button
                  className={`status-button ${presenca?.status === 'presente' ? 'active' : ''}`}
                  data-status="presente"
                  onClick={() => handleStatusChange(aluno.id, 'presente')}
                >
                  P
                </button>
                <button
                  className={`status-button ${presenca?.status === 'falta' ? 'active' : ''}`}
                  data-status="falta"
                  onClick={() => handleStatusChange(aluno.id, 'falta')}
                >
                  F
                </button>
                <button
                  className={`status-button ${presenca?.status === 'falta_justificada' ? 'active' : ''}`}
                  data-status="falta_justificada"
                  onClick={() => handleStatusChange(aluno.id, 'falta_justificada')}
                >
                  J
                </button>
              </div>

              {presenca?.status === 'falta_justificada' && (
                <input
                  type="text"
                  className="justificativa-input"
                  placeholder="Digite a justificativa (opcional)"
                  value={presenca.justificativa || ''}
                  onChange={(e) => handleJustificativaChange(aluno.id, e.target.value)}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="action-buttons">
        <button 
          className="save-button" 
          onClick={handleSave}
          disabled={loading}
        >
          Salvar Chamada
        </button>
        <button 
          className="back-button" 
          onClick={onBack}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default AlunosList; 