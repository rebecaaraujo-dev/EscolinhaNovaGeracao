// src/admin/pages/Login/index.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Verifica se é o usuário icnv com senha 1234
      if (usuario !== 'icnv' || password !== '1234') {
        throw new Error('Usuário ou senha inválidos');
      }

      // Simula um delay de carregamento
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Salva o usuário no localStorage para simular autenticação
      localStorage.setItem('username', usuario);
      
      navigate('/admin');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2 className="login-title">
          Login Administrativo
        </h2>
      </div>

      <div className="login-form-container">
        <div className="login-form-wrapper">
          <form className="login-form" onSubmit={handleLogin}>
            {error && (
              <div className="error-container">
                <div className="error-content">
                  <div className="error-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="error-message">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="usuario" className="form-label">
                Usuário
              </label>
              <div className="form-input-container">
                <input
                  id="usuario"
                  name="usuario"
                  type="text"
                  autoComplete="username"
                  required
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <div className="form-input-container">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="submit-button"
              >
                {loading && (
                  <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;