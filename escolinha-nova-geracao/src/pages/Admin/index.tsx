import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../../index.css';
import './styles.css';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  birthDate: string;
  responsible1Name: string;
  responsible1Phone: string;
  responsible1Email: string;
  status: 'pending' | 'approved' | 'rejected';
}

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [students, setStudents] = useState<Student[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de autenticação real
    if (password === 'admin123') {
      setIsAuthenticated(true);
      // Carregar dados dos estudantes
      fetchStudents();
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/students');
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      }
    } catch (error) {
      console.error('Erro ao carregar estudantes:', error);
    }
  };

  const handleStatusChange = async (studentId: string, newStatus: 'approved' | 'rejected') => {
    try {
      const response = await fetch(`http://localhost:3000/api/students/${studentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setStudents(prevStudents =>
          prevStudents.map(student =>
            student.id === studentId ? { ...student, status: newStatus } : student
          )
        );
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <div className="admin-login">
          <h1 className="admin-title">Área Administrativa</h1>
          <form onSubmit={handleLogin} className="admin-form">
            <div className="form-group">
              <label htmlFor="password" className="form-label">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                required
              />
            </div>
            <button type="submit" className="admin-button">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1 className="admin-title">Inscrições Recebidas</h1>
      <div className="admin-content">
        {students.length === 0 ? (
          <p className="admin-message">Nenhuma inscrição recebida ainda.</p>
        ) : (
          <div className="students-grid">
            {students.map((student) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="student-card"
              >
                <div className="student-info">
                  <h3>{student.firstName} {student.lastName}</h3>
                  <p>Idade: {student.age} anos</p>
                  <p>Data de Nascimento: {new Date(student.birthDate).toLocaleDateString()}</p>
                  <p>Responsável: {student.responsible1Name}</p>
                  <p>Telefone: {student.responsible1Phone}</p>
                  <p>E-mail: {student.responsible1Email}</p>
                  <p>Status: <span className={`status-${student.status}`}>{student.status}</span></p>
                </div>
                
                {student.status === 'pending' && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleStatusChange(student.id, 'approved')}
                      className="approve-button">
                      Aprovar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleStatusChange(student.id, 'rejected')}
                      className="reject-button">
                      Rejeitar
                    </motion.button>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin; 