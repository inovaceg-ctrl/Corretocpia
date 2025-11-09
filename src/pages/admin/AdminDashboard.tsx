import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package, Mail, Users, LogOut, FileText, ShoppingCart } from 'lucide-react';

export function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const adminLogado = localStorage.getItem('adminLogado');
    if (!adminLogado) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLogado');
    navigate('/admin');
  };

  const menuItems = [
    {
      title: 'Gerenciar Produtos',
      description: 'Adicionar, editar e remover produtos do catálogo',
      icon: Package,
      link: '/admin/produtos',
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Formulários de Contato',
      description: 'Visualizar e gerenciar mensagens recebidas',
      icon: Mail,
      link: '/admin/formularios',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Newsletter',
      description: 'Gerenciar inscritos e enviar campanhas',
      icon: Users,
      link: '/admin/newsletter',
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  const stats = [
    { label: 'Produtos Cadastrados', value: '6', icon: Package },
    { label: 'Mensagens Não Lidas', value: '12', icon: Mail },
    { label: 'Inscritos Newsletter', value: '234', icon: Users },
    { label: 'Orçamentos Solicitados', value: '8', icon: ShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-amber-700">Painel Administrativo</h1>
              <p className="text-sm text-gray-600">Doces São Fidélis</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-amber-600 transition-colors text-sm"
              >
                Ver site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-3xl text-amber-600">{stat.value}</div>
              </div>
              <p className="text-gray-700 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Menu Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-amber-700 mb-2 group-hover:text-amber-800">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </Link>
          ))}
        </div>

        {/* Atividades Recentes */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-amber-600" />
            <h2 className="text-amber-700">Atividades Recentes</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-gray-700">Novo orçamento recebido de <strong>João Silva</strong></p>
                <p className="text-sm text-gray-500">Há 2 horas</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-gray-700">Nova mensagem de contato de <strong>Maria Santos</strong></p>
                <p className="text-sm text-gray-500">Há 5 horas</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-gray-700">Nova inscrição na newsletter de <strong>carlos@email.com</strong></p>
                <p className="text-sm text-gray-500">Há 1 dia</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-gray-700">Produto <strong>Bananada Premium</strong> foi atualizado</p>
                <p className="text-sm text-gray-500">Há 2 dias</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
