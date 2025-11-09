import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { HistoriaPage } from './pages/HistoriaPage';
import { CatalogoPage } from './pages/CatalogoPage';
import { QualidadePage } from './pages/QualidadePage';
import { ContatoPage } from './pages/ContatoPage';
import { OrcamentoPage } from './pages/OrcamentoPage';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProdutos } from './pages/admin/AdminProdutos';
import { AdminFormularios } from './pages/admin/AdminFormularios';
import { AdminNewsletter } from './pages/admin/AdminNewsletter';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/nossa-historia" element={<HistoriaPage />} />
            <Route path="/catalogo" element={<CatalogoPage />} />
            <Route path="/qualidade" element={<QualidadePage />} />
            <Route path="/contato" element={<ContatoPage />} />
            <Route path="/orcamento" element={<OrcamentoPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/produtos" element={<AdminProdutos />} />
            <Route path="/admin/formularios" element={<AdminFormularios />} />
            <Route path="/admin/newsletter" element={<AdminNewsletter />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
