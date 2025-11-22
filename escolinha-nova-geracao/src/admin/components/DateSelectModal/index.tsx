import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import './styles.css';

interface DateSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (date: string) => void;
}

const DateSelectModal: React.FC<DateSelectModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [disabledDays, setDisabledDays] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchLastChamada();
    }
  }, [isOpen]);

  const fetchLastChamada = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: lastChamada, error: chamadaError } = await supabase
        .from('chamadas')
        .select('data')
        .order('data', { ascending: false })
        .limit(1)
        .single();

      if (chamadaError && chamadaError.code !== 'PGRST116') {
        throw chamadaError;
      }

      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      
      if (lastChamada) {
        const lastDate = new Date(lastChamada.data);
        const monthYear = `${lastDate.getFullYear()}-${String(lastDate.getMonth() + 1).padStart(2, '0')}`;
        setSelectedMonth(monthYear);
        await fetchDisabledDays(monthYear);
      } else {
        setSelectedMonth(currentMonth);
        await fetchDisabledDays(currentMonth);
      }
    } catch (err) {
      console.error('Erro ao carregar última chamada:', err);
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const fetchDisabledDays = async (monthYear: string) => {
    try {
      const [year, month] = monthYear.split('-').map(Number);
      const lastDayOfMonth = new Date(year, month, 0).getDate();
      const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
      const endDate = `${year}-${String(month).padStart(2, '0')}-${lastDayOfMonth}`;

      const { data, error } = await supabase
        .from('chamadas')
        .select('data')
        .gte('data', startDate)
        .lte('data', endDate);

      if (error) throw error;

      const disabled = data?.map(chamada => chamada.data) || [];
      setDisabledDays(disabled);
    } catch (err) {
      console.error('Erro ao carregar dias desabilitados:', err);
      setError('Erro ao carregar dias disponíveis');
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);
    setSelectedDay('');
    fetchDisabledDays(newMonth);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(e.target.value);
  };

  const handleConfirm = () => {
    if (selectedMonth && selectedDay) {
      const [year, month] = selectedMonth.split('-');
      const date = `${year}-${month}-${selectedDay}`;
      onConfirm(date);
    }
  };

  const getMondaysInMonth = (monthYear: string) => {
    const [year, month] = monthYear.split('-').map(Number);
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    const mondays: string[] = [];

    for (let day = 1; day <= lastDayOfMonth; day++) {
      const date = new Date(year, month - 1, day);
      if (date.getDay() === 1) { // 1 representa segunda-feira
        const dayStr = String(day).padStart(2, '0');
        mondays.push(dayStr);
      }
    }

    return mondays;
  };

  const formatMonthYear = (monthYear: string) => {
    const [year, month] = monthYear.split('-');
    const date = new Date(Number(year), Number(month) - 1);
    const monthName = date.toLocaleDateString('pt-BR', { month: 'long' });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="loading">Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Selecione a Data</h2>
        
        {error && <div className="error">{error}</div>}

        <div className="select-container">
          <label htmlFor="month">Mês:</label>
          <select
            id="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="select-input"
          >
            {Array.from({ length: 12 }, (_, i) => {
              const monthYear = `${new Date().getFullYear()}-${String(i + 1).padStart(2, '0')}`;
              return (
                <option key={monthYear} value={monthYear}>
                  {formatMonthYear(monthYear)}
                </option>
              );
            })}
          </select>
        </div>

        <div className="select-container">
          <label htmlFor="day">Dia:</label>
          <select
            id="day"
            value={selectedDay}
            onChange={handleDayChange}
            className="select-input"
            disabled={!selectedMonth}
          >
            <option value="">Selecione um dia</option>
            {selectedMonth && getMondaysInMonth(selectedMonth).map(day => (
              <option
                key={day}
                value={day}
                disabled={disabledDays.includes(`${selectedMonth}-${day}`)}
              >
                {day}
                {disabledDays.includes(`${selectedMonth}-${day}`) ? ' (Já existe chamada)' : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="confirm-button"
            onClick={handleConfirm}
            disabled={!selectedMonth || !selectedDay}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelectModal; 