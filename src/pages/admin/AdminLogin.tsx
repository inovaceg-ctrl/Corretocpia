import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

export function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    usuario: '',
    senha: '',
  });
  const [erro, setErro] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de login (em produção, usar autenticação real)
    if (credentials.usuario === 'admin' && credentials.senha === 'admin123') {
      localStorage.setItem('adminLogado', 'true');
      navigate('/admin/dashboard');
    } else {
      setErro('Usuário ou senha incorretos');
      setTimeout(() => setErro(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-white mb-2">Área Administrativa</h1>
          <p className="text-gray-400">Doces São Fidélis</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {erro && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl">
                {erro}
              </div>
            )}

            <div>
              <label htmlFor="usuario" className="block text-gray-700 mb-2">
                Usuário
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="usuario"
                  value={credentials.usuario}
                  onChange={(e) => setCredentials({ ...credentials, usuario: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500"
                  placeholder="Digite seu usuário"
                />
              </div>
            </div>

            <div>
              <label htmlFor="senha" className="block text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  id="senha"
                  value={credentials.senha}
                  onChange={(e) => setCredentials({ ...credentials, senha: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 rounded-xl hover:bg-amber-600 transition-colors"
            >
              Entrar
            </button>

            <div className="text-center">
              <a href="/" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                Voltar ao site
              </a>
            </div>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-600 text-center">
              Credenciais de teste:<br />
              Usuário: <strong>admin</strong> | Senha: <strong>admin123</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
