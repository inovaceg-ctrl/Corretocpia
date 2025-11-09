import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Package } from 'lucide-react';

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  peso: string;
  unidades: string;
  ativo: boolean;
}

export function AdminProdutos() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([
    {
      id: 1,
      nome: 'Bananada Tradicional',
      categoria: 'bananadas',
      descricao: 'Nossa bananada clássica, feita com bananas selecionadas',
      peso: '250g',
      unidades: '20 unidades por caixa',
      ativo: true,
    },
    {
      id: 2,
      nome: 'Bananada com Coco',
      categoria: 'bananadas',
      descricao: 'Deliciosa combinação de banana com coco ralado',
      peso: '250g',
      unidades: '20 unidades por caixa',
      ativo: true,
    },
    {
      id: 3,
      nome: 'Goma de Amido Natural',
      categoria: 'gomas',
      descricao: 'Gomas macias feitas com amido de milho',
      peso: '200g',
      unidades: '30 unidades por caixa',
      ativo: true,
    },
  ]);
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    categoria: 'bananadas',
    descricao: '',
    peso: '',
    unidades: '',
  });

  useEffect(() => {
    const adminLogado = localStorage.getItem('adminLogado');
    if (!adminLogado) {
      navigate('/admin');
    }
  }, [navigate]);

  const abrirModal = (produto?: Produto) => {
    if (produto) {
      setProdutoEditando(produto);
      setFormData({
        nome: produto.nome,
        categoria: produto.categoria,
        descricao: produto.descricao,
        peso: produto.peso,
        unidades: produto.unidades,
      });
    } else {
      setProdutoEditando(null);
      setFormData({
        nome: '',
        categoria: 'bananadas',
        descricao: '',
        peso: '',
        unidades: '',
      });
    }
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setProdutoEditando(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (produtoEditando) {
      // Editar produto existente
      setProdutos(produtos.map(p => 
        p.id === produtoEditando.id 
          ? { ...p, ...formData }
          : p
      ));
    } else {
      // Adicionar novo produto
      const novoProduto: Produto = {
        id: Math.max(...produtos.map(p => p.id), 0) + 1,
        ...formData,
        ativo: true,
      };
      setProdutos([...produtos, novoProduto]);
    }
    
    fecharModal();
  };

  const deletarProduto = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos(produtos.filter(p => p.id !== id));
    }
  };

  const toggleAtivo = (id: number) => {
    setProdutos(produtos.map(p => 
      p.id === id ? { ...p, ativo: !p.ativo } : p
    ));
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
                <h1 className="text-amber-700">Gerenciar Produtos</h1>
                <p className="text-sm text-gray-600">Adicione, edite ou remova produtos</p>
              </div>
            </div>
            <button
              onClick={() => abrirModal()}
              className="flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-xl hover:bg-amber-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Novo Produto
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Lista de Produtos */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-6 py-4 text-left text-amber-700">Produto</th>
                  <th className="px-6 py-4 text-left text-amber-700">Categoria</th>
                  <th className="px-6 py-4 text-left text-amber-700">Peso</th>
                  <th className="px-6 py-4 text-left text-amber-700">Unidades/Caixa</th>
                  <th className="px-6 py-4 text-left text-amber-700">Status</th>
                  <th className="px-6 py-4 text-left text-amber-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.id} className="border-t hover:bg-amber-50/50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900">{produto.nome}</p>
                        <p className="text-sm text-gray-500">{produto.descricao}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        produto.categoria === 'bananadas'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {produto.categoria === 'bananadas' ? 'Bananada' : 'Goma'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{produto.peso}</td>
                    <td className="px-6 py-4 text-gray-700">{produto.unidades}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleAtivo(produto.id)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          produto.ativo
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {produto.ativo ? 'Ativo' : 'Inativo'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => abrirModal(produto)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deletarProduto(produto.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-amber-700">
                  {produtoEditando ? 'Editar Produto' : 'Novo Produto'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Nome do Produto *</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500"
                    placeholder="Ex: Bananada Tradicional"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Categoria *</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500"
                  >
                    <option value="bananadas">Bananadas</option>
                    <option value="gomas">Gomas de Amido</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Descrição *</label>
                  <textarea
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 resize-none"
                    placeholder="Descrição do produto"
                  ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Peso *</label>
                    <input
                      type="text"
                      value={formData.peso}
                      onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500"
                      placeholder="Ex: 250g"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Unidades por Caixa *</label>
                    <input
                      type="text"
                      value={formData.unidades}
                      onChange={(e) => setFormData({ ...formData, unidades: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500"
                      placeholder="Ex: 20 unidades por caixa"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={fecharModal}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
                  >
                    {produtoEditando ? 'Salvar Alterações' : 'Adicionar Produto'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
