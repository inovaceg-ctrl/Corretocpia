import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-amber-400 mb-4">Doces São Fidélis</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Desde 2000 produzindo bananadas e gomas de amido com tradição e qualidade que atravessa gerações.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-amber-400 mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/nossa-historia" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Nossa História
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/qualidade" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Qualidade
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-amber-400 mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-amber-400" />
                <span className="text-gray-300">São Fidélis, RJ - Brasil</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <a href="tel:+5522999999999" className="text-gray-300 hover:text-amber-400 transition-colors">
                  (22) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <a href="mailto:contato@docessaofidelis.com.br" className="text-gray-300 hover:text-amber-400 transition-colors">
                  contato@docessaofidelis.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-amber-400 mb-4">Redes Sociais</h3>
            <p className="text-gray-300 text-sm mb-4">
              Siga-nos nas redes sociais e fique por dentro das novidades!
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 p-2 rounded-full hover:bg-amber-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 p-2 rounded-full hover:bg-amber-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Doces São Fidélis. Todos os direitos reservados.</p>
          <p className="mt-2">
            <Link to="/admin" className="hover:text-amber-400 transition-colors">
              Área Administrativa
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
