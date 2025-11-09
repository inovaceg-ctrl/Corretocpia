import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
  {
    pergunta: 'Qual o pedido mínimo?',
    resposta: 'Trabalhamos com pedidos a partir de 10 caixas. Para quantidades menores, consulte nossa equipe de vendas para verificar disponibilidade.'
  },
  {
    pergunta: 'Fazem entrega para todo o Brasil?',
    resposta: 'Sim! Atendemos todos os estados brasileiros. O prazo de entrega varia de acordo com a região, geralmente entre 5 a 15 dias úteis após a confirmação do pedido.'
  },
  {
    pergunta: 'Qual o prazo de validade dos produtos?',
    resposta: 'Nossas bananadas têm validade de 6 meses e as gomas de amido de 4 meses, quando armazenadas adequadamente em local fresco e seco.'
  },
  {
    pergunta: 'Aceitam pedidos personalizados?',
    resposta: 'Sim! Para grandes quantidades, podemos personalizar embalagens e até desenvolver sabores exclusivos. Entre em contato com nossa equipe comercial para mais informações.'
  },
  {
    pergunta: 'Como funciona o pagamento?',
    resposta: 'Aceitamos diversas formas de pagamento: transferência bancária, boleto, PIX e cartão de crédito (parcelas disponíveis para pedidos acima de determinado valor). As condições específicas são definidas na negociação.'
  },
  {
    pergunta: 'Posso visitar a fábrica?',
    resposta: 'Sim! Visitantes são bem-vindos em nossa fábrica em São Fidélis/RJ. Recomendamos agendar previamente através dos nossos canais de contato para garantir o melhor atendimento.'
  },
  {
    pergunta: 'Os produtos contêm conservantes?',
    resposta: 'Não! Utilizamos apenas ingredientes naturais em nossos produtos. A conservação é garantida pela técnica tradicional de preparo e pelas embalagens adequadas.'
  },
  {
    pergunta: 'Tem certificações de qualidade?',
    resposta: 'Sim, nossa produção segue rigorosos padrões de higiene e qualidade. Possuímos todas as certificações sanitárias exigidas pela ANVISA e vigilância sanitária local.'
  }
];

export function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  });
  const [enviado, setEnviado] = useState(false);
  const [faqAberto, setFaqAberto] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulando envio
    console.log('Formulário enviado:', formData);
    setEnviado(true);
    setFormData({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' });
    setTimeout(() => setEnviado(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-100 to-orange-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-amber-700 mb-4">Entre em Contato</h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Estamos prontos para atender você. Envie sua mensagem ou utilize nossos canais de contato
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Informações de Contato */}
            <div>
              <h2 className="text-amber-700 mb-6">Nossos Canais de Atendimento</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Nossa equipe está pronta para atender você. Entre em contato através de qualquer um 
                dos nossos canais ou visite nossa fábrica.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex gap-4 items-start p-6 bg-amber-50 rounded-2xl">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-amber-700 mb-2">Endereço</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Rua Exemplo, 123<br />
                      Centro, São Fidélis - RJ<br />
                      CEP: 28490-000
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-6 bg-green-50 rounded-2xl">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-amber-700 mb-2">Telefone</h3>
                    <p className="text-gray-700 text-sm">
                      <a href="tel:+5522999999999" className="hover:text-amber-600 transition-colors">
                        (22) 99999-9999
                      </a>
                    </p>
                    <p className="text-gray-700 text-sm">
                      <a href="tel:+552233333333" className="hover:text-amber-600 transition-colors">
                        (22) 3333-3333
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-6 bg-orange-50 rounded-2xl">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-amber-700 mb-2">E-mail</h3>
                    <p className="text-gray-700 text-sm">
                      <a href="mailto:contato@docessaofidelis.com.br" className="hover:text-amber-600 transition-colors">
                        contato@docessaofidelis.com.br
                      </a>
                    </p>
                    <p className="text-gray-700 text-sm">
                      <a href="mailto:vendas@docessaofidelis.com.br" className="hover:text-amber-600 transition-colors">
                        vendas@docessaofidelis.com.br
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-6 bg-amber-50 rounded-2xl">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-amber-700 mb-2">Horário de Atendimento</h3>
                    <p className="text-gray-700 text-sm">
                      Segunda a Sexta: 8h às 18h<br />
                      Sábado: 8h às 12h<br />
                      Domingo: Fechado
                    </p>
                  </div>
                </div>
              </div>

              {/* Mapa */}
              <div className="bg-gray-200 rounded-2xl overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.8229687307744!2d-41.74728908561551!3d-21.64471568567825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDM4JzQxLjAiUyA0McKwNDQnNDIuMiJX!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Doces São Fidélis"
                ></iframe>
              </div>
            </div>

            {/* Formulário */}
            <div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8">
                <h2 className="text-amber-700 mb-6">Envie sua Mensagem</h2>

                {enviado && (
                  <div className="bg-green-100 border border-green-300 text-green-700 px-6 py-4 rounded-xl mb-6">
                    <p className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Mensagem enviada com sucesso! Retornaremos em breve.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="nome" className="block text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 bg-white"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 bg-white"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="telefone" className="block text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 bg-white"
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  <div>
                    <label htmlFor="assunto" className="block text-gray-700 mb-2">
                      Assunto *
                    </label>
                    <select
                      id="assunto"
                      name="assunto"
                      value={formData.assunto}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 bg-white"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="orcamento">Solicitar Orçamento</option>
                      <option value="duvida">Dúvida sobre Produtos</option>
                      <option value="parceria">Parceria Comercial</option>
                      <option value="reclamacao">Reclamação</option>
                      <option value="elogio">Elogio</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mensagem" className="block text-gray-700 mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 bg-white resize-none"
                      placeholder="Digite sua mensagem aqui..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 text-white px-8 py-4 rounded-full hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Enviar Mensagem
                  </button>

                  <p className="text-sm text-gray-600 text-center">
                    * Campos obrigatórios
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Perguntas Frequentes */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-4">
              <HelpCircle className="w-5 h-5" />
              <span>Perguntas Frequentes</span>
            </div>
            <h2 className="text-amber-700 mb-4">Tire suas Dúvidas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Confira as respostas para as perguntas mais comuns. Não encontrou o que procura? 
              Entre em contato conosco!
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => setFaqAberto(faqAberto === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-amber-50 transition-colors"
                >
                  <span className="text-gray-800 pr-4">{faq.pergunta}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-600 flex-shrink-0 transition-transform duration-300 ${
                      faqAberto === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    faqAberto === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-gray-600 leading-relaxed border-t border-amber-100 pt-4">
                      {faq.resposta}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-700 mb-4">Ainda tem dúvidas?</p>
            <a
              href="#formulario"
              className="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600 transition-colors"
            >
              <Send className="w-5 h-5" />
              Entre em Contato
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
