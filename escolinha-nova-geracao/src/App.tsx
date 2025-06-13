import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Inscricao from './pages/Inscricao';
import Sobre from './pages/Sobre';
import Success from './pages/Success';
import Admin from './pages/Admin';
import Galeria from './pages/Galeria';
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
        <Route path="/admin" element={<Admin />} />
        <Route path="/galeria" element={<Galeria />} />
      </Routes>
    </Router>
  );
}

export default App;
