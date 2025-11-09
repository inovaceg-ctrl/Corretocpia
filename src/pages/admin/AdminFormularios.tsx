import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Download, Eye, Trash2, Filter } from 'lucide-react';

interface Formulario {
  id: number;
  tipo: 'contato' | 'orcamento';
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
  data: string;
  lido: boolean;
}

export function AdminFormularios() {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState<'todos' | 'contato' | 'orcamento'>('todos');
  const [formularios, setFormularios] = useState<Formulario[]>([
    {
      id: 1,
      tipo: 'orcamento',
      nome: 'João Silva',
      email: 'joao@email.com',
      assunto: 'Orçamento - Bananadas',
      mensagem: 'Gostaria de solicitar orçamento para 10 caixas de bananada tradicional...',
      data: '2024-11-08 14:30',
      lido: false,
    },
    {
      id: 2,
      tipo: 'contato',
      nome: 'Maria Santos',
      email: 'maria@email.com',
      assunto: 'Dúvida sobre Produtos',
      mensagem: 'Gostaria de saber se vocês têm bananada sem açúcar...',
      data: '2024-11-08 10:15',
      lido: false,
    },
    {
      id: 3,
      tipo: 'contato',
      nome: 'Carlos Oliveira',
      email: 'carlos@empresa.com',
      assunto: 'Parceria Comercial',
      mensagem: 'Somos uma rede de supermercados e gostaríamos de conversar sobre distribuição...',
      data: '2024-11-07 16:45',
      lido: true,
    },
    {
      id: 4,
      tipo: 'orcamento',
      nome: 'Ana Costa',
      email: 'ana@email.com',
      assunto: 'Orçamento - Mix de Produtos',
      mensagem: 'Preciso de orçamento para festa, com bananadas e gomas...',
      data: '2024-11-07 09:20',
      lido: true,
    },
  ]);
  const [formularioSelecionado, setFormularioSelecionado] = useState<Formulario | null>(null);

  useEffect(() => {
    const adminLogado = localStorage.getItem('adminLogado');
    if (!adminLogado) {
      navigate('/admin');
    }
  }, [navigate]);

  const formulariosFiltrados = filtro === 'todos'
    ? formularios
    : formularios.filter(f => f.tipo === filtro);

  const marcarComoLido = (id: number) => {
    setFormularios(formularios.map(f =>
      f.id === id ? { ...f, lido: true } : f
    ));
  };

  const abrirDetalhes = (formulario: Formulario) => {
    setFormularioSelecionado(formulario);
    marcarComoLido(formulario.id);
  };

  const deletarFormulario = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta mensagem?')) {
      setFormularios(formularios.filter(f => f.id !== id));
      if (formularioSelecionado?.id === id) {
        setFormularioSelecionado(null);
      }
    }
  };

  const exportarCSV = () => {
    const csv = [
      ['Tipo', 'Nome', 'Email', 'Assunto', 'Data', 'Lido'].join(','),
      ...formulariosFiltrados.map(f => 
        [f.tipo, f.nome, f.email, f.assunto, f.data, f.lido ? 'Sim' : 'Não'].join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `formularios-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const naoLidos = formularios.filter(f => !f.lido).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard" className="text-gray-600 hover:text-amber-600">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-amber-700">Formulários de Contato</h1>
                  {naoLidos > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      {naoLidos} nova{naoLidos > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">Gerencie mensagens recebidas</p>
              </div>
            </div>
            <button
              onClick={exportarCSV}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              Exportar CSV
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Lista de Formulários */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Filtros */}
              <div className="p-4 border-b bg-amber-50">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-5 h-5 text-amber-600" />
                  <span className="text-amber-700">Filtrar por:</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFiltro('todos')}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      filtro === 'todos'
                        ? 'bg-amber-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-amber-100'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setFiltro('contato')}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      filtro === 'contato'
                        ? 'bg-amber-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-amber-100'
                    }`}
                  >
                    Contato
                  </button>
                  <button
                    onClick={() => setFiltro('orcamento')}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      filtro === 'orcamento'
                        ? 'bg-amber-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-amber-100'
                    }`}
                  >
                    Orçamento
                  </button>
                </div>
              </div>

              {/* Lista */}
              <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
                {formulariosFiltrados.map((form) => (
                  <div
                    key={form.id}
                    onClick={() => abrirDetalhes(form)}
                    className={`p-4 border-b cursor-pointer transition-colors ${
                      !form.lido ? 'bg-amber-50 hover:bg-amber-100' : 'hover:bg-gray-50'
                    } ${
                      formularioSelecionado?.id === form.id ? 'bg-amber-100' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Mail className={`w-4 h-4 ${!form.lido ? 'text-amber-600' : 'text-gray-400'}`} />
                        <span className={`text-sm px-2 py-1 rounded ${
                          form.tipo === 'orcamento'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {form.tipo === 'orcamento' ? 'Orçamento' : 'Contato'}
                        </span>
                      </div>
                      {!form.lido && (
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      )}
                    </div>
                    <p className={`text-sm mb-1 ${!form.lido ? 'text-gray-900' : 'text-gray-700'}`}>
                      {form.nome}
                    </p>
                    <p className="text-xs text-gray-600 mb-2">{form.assunto}</p>
                    <p className="text-xs text-gray-500">{form.data}</p>
                  </div>
                ))}

                {formulariosFiltrados.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    Nenhuma mensagem encontrada
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detalhes */}
          <div className="lg:col-span-2">
            {formularioSelecionado ? (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-amber-700">{formularioSelecionado.nome}</h2>
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        formularioSelecionado.tipo === 'orcamento'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {formularioSelecionado.tipo === 'orcamento' ? 'Orçamento' : 'Contato'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{formularioSelecionado.email}</p>
                    <p className="text-sm text-gray-500">{formularioSelecionado.data}</p>
                  </div>
                  <button
                    onClick={() => deletarFormulario(formularioSelecionado.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-gray-700 mb-2">Assunto</h3>
                    <p className="text-gray-900 bg-gray-50 p-4 rounded-xl">
                      {formularioSelecionado.assunto}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-gray-700 mb-2">Mensagem</h3>
                    <p className="text-gray-900 bg-gray-50 p-4 rounded-xl leading-relaxed">
                      {formularioSelecionado.mensagem}
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <a
                      href={`mailto:${formularioSelecionado.email}`}
                      className="flex-1 bg-amber-500 text-white px-6 py-3 rounded-xl hover:bg-amber-600 transition-colors text-center"
                    >
                      Responder por E-mail
                    </a>
                    <button
                      onClick={() => setFormularioSelecionado(null)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Selecione uma mensagem para ver os detalhes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
