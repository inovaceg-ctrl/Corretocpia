import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/nossa-historia', label: 'Nossa História' },
    { path: '/catalogo', label: 'Catálogo' },
    { path: '/qualidade', label: 'Qualidade' },
    { path: '/contato', label: 'Contato' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-amber-500 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm">
            <a href="tel:+5522999999999" className="flex items-center gap-1 hover:text-amber-100 transition-colors">
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">(22) 99999-9999</span>
            </a>
            <a href="mailto:contato@docessaofidelis.com.br" className="flex items-center gap-1 hover:text-amber-100 transition-colors">
              <Mail className="w-3 h-3" />
              <span className="hidden sm:inline">contato@docessaofidelis.com.br</span>
            </a>
          </div>
          <div className="text-sm">
            <span className="hidden md:inline">Tradição desde 2000</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-amber-600">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                <path d="M20 4C18 4 16 5 15 7C14 5 12 4 10 4C6 4 4 7 4 10C4 15 8 18 15 24C16 25 17 26 18 27C19 28 20 28 20 28C20 28 21 28 22 27C23 26 24 25 25 24C32 18 36 15 36 10C36 7 34 4 30 4C28 4 26 5 25 7C24 5 22 4 20 4Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-amber-700">Doces São Fidélis</h1>
              <p className="text-xs text-gray-600">Sabor que atravessa gerações</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? 'text-amber-600'
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/orcamento"
              className="bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 transition-colors"
            >
              Solicitar Orçamento
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2 transition-colors ${
                    isActive(link.path)
                      ? 'text-amber-600'
                      : 'text-gray-700 hover:text-amber-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/orcamento"
                onClick={() => setIsMenuOpen(false)}
                className="bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 transition-colors text-center"
              >
                Solicitar Orçamento
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
