import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Users, Download, Trash2, Send, Mail } from 'lucide-react';

interface Inscrito {
  id: number;
  email: string;
  data: string;
  ativo: boolean;
}

export function AdminNewsletter() {
  const navigate = useNavigate();
  const [inscritos, setInscritos] = useState<Inscrito[]>([
    { id: 1, email: 'joao@email.com', data: '2024-11-08', ativo: true },
    { id: 2, email: 'maria@email.com', data: '2024-11-07', ativo: true },
    { id: 3, email: 'carlos@empresa.com', data: '2024-11-06', ativo: true },
    { id: 4, email: 'ana@email.com', data: '2024-11-05', ativo: true },
    { id: 5, email: 'pedro@email.com', data: '2024-11-04', ativo: false },
  ]);
  const [modalEnvio, setModalEnvio] = useState(false);
  const [emailData, setEmailData] = useState({
    assunto: '',
    mensagem: '',
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const adminLogado = localStorage.getItem('adminLogado');
    if (!adminLogado) {
      navigate('/admin');
    }
  }, [navigate]);

  const inscritosAtivos = inscritos.filter(i => i.ativo);

  const exportarCSV = () => {
    const csv = [
      ['Email', 'Data de Inscrição', 'Status'].join(','),
      ...inscritos.map(i => 
        [i.email, i.data, i.ativo ? 'Ativo' : 'Inativo'].join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-inscritos-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const deletarInscrito = (id: number) => {
    if (window.confirm('Tem certeza que deseja remover este inscrito?')) {
      setInscritos(inscritos.filter(i => i.id !== id));
    }
  };

  const toggleAtivo = (id: number) => {
    setInscritos(inscritos.map(i =>
      i.id === id ? { ...i, ativo: !i.ativo } : i
    ));
  };

  const enviarCampanha = () => {
    setEnviando(true);
    // Simulando envio
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
      setTimeout(() => {
        setEnviado(false);
        setModalEnvio(false);
        setEmailData({ assunto: '', mensagem: '' });
      }, 2000);
    }, 2000);
  };

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
                <h1 className="text-amber-700">Newsletter</h1>
                <p className="text-sm text-gray-600">Gerencie inscritos e envie campanhas</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportarCSV}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                Exportar CSV
              </button>
              <button
                onClick={() => setModalEnvio(true)}
                className="flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-xl hover:bg-amber-600 transition-colors"
              >
                <Send className="w-5 h-5" />
                Enviar Campanha
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total de Inscritos</p>
                <p className="text-3xl text-amber-600">{inscritos.length}</p>
              </div>
              <Users className="w-12 h-12 text-amber-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Inscritos Ativos</p>
                <p className="text-3xl text-green-600">{inscritosAtivos.length}</p>
              </div>
              <Users className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Inativos</p>
                <p className="text-3xl text-gray-600">{inscritos.length - inscritosAtivos.length}</p>
              </div>
              <Users className="w-12 h-12 text-gray-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Lista de Inscritos */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b bg-amber-50">
            <h2 className="text-amber-700">Inscritos na Newsletter</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-700">E-mail</th>
                  <th className="px-6 py-4 text-left text-gray-700">Data de Inscrição</th>
                  <th className="px-6 py-4 text-left text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {inscritos.map((inscrito) => (
                  <tr key={inscrito.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{inscrito.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(inscrito.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleAtivo(inscrito.id)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          inscrito.ativo
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {inscrito.ativo ? 'Ativo' : 'Inativo'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deletarInscrito(inscrito.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remover"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Envio */}
      {modalEnvio && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="p-8">
              {enviado ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-green-700 mb-2">Campanha Enviada!</h2>
                  <p className="text-gray-600">
                    A campanha foi enviada para {inscritosAtivos.length} inscritos ativos.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Send className="w-6 h-6 text-amber-600" />
                    </div>
                    <h2 className="text-amber-700">Enviar Campanha de E-mail</h2>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <p className="text-sm text-blue-700">
                      Esta campanha será enviada para <strong>{inscritosAtivos.length} inscritos ativos</strong>.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Assunto do E-mail *</label>
                      <input
                        type="text"
                        value={emailData.assunto}
                        onChange={(e) => setEmailData({ ...emailData, assunto: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500"
                        placeholder="Ex: Novidades Doces São Fidélis - Novembro 2024"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Mensagem *</label>
                      <textarea
                        value={emailData.mensagem}
                        onChange={(e) => setEmailData({ ...emailData, mensagem: e.target.value })}
                        rows={10}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 resize-none"
                        placeholder="Digite sua mensagem aqui..."
                      ></textarea>
                      <p className="text-sm text-gray-500 mt-2">
                        Dica: Use HTML para formatação avançada
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setModalEnvio(false)}
                        disabled={enviando}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={enviarCampanha}
                        disabled={!emailData.assunto || !emailData.mensagem || enviando}
                        className="flex-1 px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {enviando ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Enviar Campanha
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
