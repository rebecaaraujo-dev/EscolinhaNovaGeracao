import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Inscricao from './pages/Inscricao';
import Sobre from './pages/Sobre';
import Success from './pages/Success';
import Galeria from './pages/Galeria';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import Chamada from './admin/pages/Chamada/index';
import PrivateRoute from './admin/components/PrivateRoute';
import { ScrollToTop } from './components/ScrollToTop';
import './index.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscricao" element={<Inscricao />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/success" element={<Success />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="chamada" element={<Chamada />} />
          <Route path="alunos" element={<div>Página de Alunos (Em desenvolvimento)</div>} />
          <Route path="dados" element={<div>Página de Dados (Em desenvolvimento)</div>} />
          <Route path="estoque" element={<div>Página de Estoque (Em desenvolvimento)</div>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
