import { useState } from 'react';
import { ShoppingCart, CheckCircle2 } from 'lucide-react';

export function OrcamentoPage() {
  const [tipoCliente, setTipoCliente] = useState<'fisica' | 'juridica'>('fisica');
  const [enviado, setEnviado] = useState(false);
  const [formData, setFormData] = useState({
    // Tipo de pessoa
    tipoPessoa: 'fisica',
    
    // Dados pessoais
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    cnpj: '',
    razaoSocial: '',
    
    // Endereço
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    
    // Produtos
    produtos: [] as { produto: string; quantidade: string }[],
    
    // Informações adicionais
    comoConheceu: '',
    preferenciaContato: 'email',
    mensagem: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Orçamento enviado:', formData);
    setEnviado(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const adicionarProduto = () => {
    setFormData({
      ...formData,
      produtos: [...formData.produtos, { produto: '', quantidade: '' }],
    });
  };

  const removerProduto = (index: number) => {
    const novosProdutos = formData.produtos.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      produtos: novosProdutos,
    });
  };

  const atualizarProduto = (index: number, campo: 'produto' | 'quantidade', valor: string) => {
    const novosProdutos = [...formData.produtos];
    novosProdutos[index][campo] = valor;
    setFormData({
      ...formData,
      produtos: novosProdutos,
    });
  };

  if (enviado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-green-700 mb-4">Orçamento Enviado com Sucesso!</h1>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Obrigado por solicitar um orçamento. Recebemos sua solicitação e nossa equipe entrará 
              em contato em breve através do método de preferência indicado.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
              <p className="text-gray-700">
                Um e-mail de confirmação foi enviado para: <strong>{formData.email}</strong>
              </p>
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => {
                  setEnviado(false);
                  setFormData({
                    tipoPessoa: 'fisica',
                    nome: '',
                    email: '',
                    telefone: '',
                    cpf: '',
                    cnpj: '',
                    razaoSocial: '',
                    cep: '',
                    endereco: '',
                    numero: '',
                    complemento: '',
                    bairro: '',
                    cidade: '',
                    estado: '',
                    produtos: [],
                    comoConheceu: '',
                    preferenciaContato: 'email',
                    mensagem: '',
                  });
                }}
                className="bg-amber-500 text-white px-8 py-3 rounded-full hover:bg-amber-600 transition-colors"
              >
                Fazer Novo Orçamento
              </button>
              <a
                href="/"
                className="bg-white text-amber-600 border-2 border-amber-500 px-8 py-3 rounded-full hover:bg-amber-50 transition-colors inline-block"
              >
                Voltar ao Início
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-100 to-orange-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <ShoppingCart className="w-16 h-16 text-amber-600 mx-auto mb-4" />
          <h1 className="text-amber-700 mb-4">Solicitar Orçamento</h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Preencha o formulário abaixo com suas informações e produtos desejados
          </p>
        </div>
      </section>

      {/* Formulário */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Tipo de Cliente */}
              <div className="bg-amber-50 rounded-2xl p-8">
                <h2 className="text-amber-700 mb-6">Tipo de Cliente</h2>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setTipoCliente('fisica');
                      setFormData({ ...formData, tipoPessoa: 'fisica' });
                    }}
                    className={`flex-1 py-4 px-6 rounded-xl transition-all ${
                      tipoCliente === 'fisica'
                        ? 'bg-amber-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-amber-100'
                    }`}
                  >
                    Pessoa Física
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTipoCliente('juridica');
                      setFormData({ ...formData, tipoPessoa: 'juridica' });
                    }}
                    className={`flex-1 py-4 px-6 rounded-xl transition-all ${
                      tipoCliente === 'juridica'
                        ? 'bg-amber-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-amber-100'
                    }`}
                  >
                    Pessoa Jurídica
                  </button>
                </div>
              </div>

              {/* Informações Pessoais */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
                <h2 className="text-amber-700 mb-6">Informações Pessoais</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">
                      {tipoCliente === 'fisica' ? 'Nome Completo *' : 'Razão Social *'}
                    </label>
                    <input
                      type="text"
                      name={tipoCliente === 'fisica' ? 'nome' : 'razaoSocial'}
                      value={tipoCliente === 'fisica' ? formData.nome : formData.razaoSocial}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 bg-white"
                    />
                  </div>

                  {tipoCliente === 'juridica' && (
                    <div>
                      <label className="block text-gray-700 mb-2">CNPJ *</label>
                      <input
                        type="text"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 bg-white"
                        placeholder="00.000.000/0000-00"
                      />
                    </div>
                  )}

                  {tipoCliente === 'fisica' && (
                    <div>
                      <label className="block text-gray-700 mb-2">CPF *</label>
                      <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 bg-white"
                        placeholder="000.000.000-00"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-gray-700 mb-2">E-mail *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Telefone *</label>
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 bg-white"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Endereço de Entrega */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <h2 className="text-amber-700 mb-6">Endereço de Entrega</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">CEP *</label>
                    <input
                      type="text"
                      name="cep"
                      value={formData.cep}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 bg-white"
                      placeholder="00000-000"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Estado *</label>
                    <select
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 bg-white"
                    >
                      <option value="">Selecione</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="SP">São Paulo</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="ES">Espírito Santo</option>
                      {/* Adicionar outros estados conforme necessário */}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">Endereço *</label>
                    <input
                      type="text"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Número *</label>
                    <input
                      type="text"
                      name="numero"
                      value={formData.numero}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Complemento</label>
                    <input
                      type="text"
                      name="complemento"
                      value={formData.complemento}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Bairro *</label>
                    <input
                      type="text"
                      name="bairro"
                      value={formData.bairro}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Cidade *</label>
                    <input
                      type="text"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Seleção de Produtos */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8">
                <h2 className="text-amber-700 mb-6">Seleção de Produtos</h2>
                
                {formData.produtos.map((item, index) => (
                  <div key={index} className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="md:col-span-2">
                      <select
                        value={item.produto}
                        onChange={(e) => atualizarProduto(index, 'produto', e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                      >
                        <option value="">Selecione um produto</option>
                        <option value="Bananada Tradicional">Bananada Tradicional</option>
                        <option value="Bananada com Coco">Bananada com Coco</option>
                        <option value="Bananada Premium">Bananada Premium</option>
                        <option value="Goma de Amido Natural">Goma de Amido Natural</option>
                        <option value="Goma de Amido Sortida">Goma de Amido Sortida</option>
                        <option value="Goma de Amido Premium">Goma de Amido Premium</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={item.quantidade}
                        onChange={(e) => atualizarProduto(index, 'quantidade', e.target.value)}
                        required
                        min="1"
                        placeholder="Qtd. caixas"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => removerProduto(index)}
                        className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={adicionarProduto}
                  className="w-full py-3 bg-white border-2 border-orange-400 text-orange-600 rounded-xl hover:bg-orange-50 transition-colors"
                >
                  + Adicionar Produto
                </button>
              </div>

              {/* Informações Adicionais */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
                <h2 className="text-amber-700 mb-6">Informações Adicionais</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Como conheceu a Doces São Fidélis?</label>
                    <select
                      name="comoConheceu"
                      value={formData.comoConheceu}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 bg-white"
                    >
                      <option value="">Selecione</option>
                      <option value="Indicação">Indicação de amigos/familiares</option>
                      <option value="Redes Sociais">Redes Sociais</option>
                      <option value="Google">Google</option>
                      <option value="Cliente Antigo">Já sou cliente</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Preferência de Retorno *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['email', 'telefone', 'whatsapp', 'skype'].map((opcao) => (
                        <button
                          key={opcao}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferenciaContato: opcao })}
                          className={`py-3 px-4 rounded-xl transition-all capitalize ${
                            formData.preferenciaContato === opcao
                              ? 'bg-amber-500 text-white'
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-amber-50'
                          }`}
                        >
                          {opcao}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Mensagem / Observações</label>
                    <textarea
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 bg-white resize-none"
                      placeholder="Digite aqui qualquer informação adicional sobre seu pedido..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Botão Enviar */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-12 py-4 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Enviar Solicitação de Orçamento
                </button>
                <p className="text-sm text-gray-600 mt-4">
                  * Campos obrigatórios
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
