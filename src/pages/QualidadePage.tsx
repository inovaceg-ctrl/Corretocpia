import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { CheckCircle2, Leaf, Users, Shield } from 'lucide-react';

export function QualidadePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-100 to-emerald-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-green-700 mb-4">Nosso Compromisso com a Qualidade</h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            A qualidade é um compromisso que assumimos com cada cliente
          </p>
        </div>
      </section>

      {/* Processo Artesanal */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-amber-700 mb-6">Processo de Fabricação Artesanal</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Mantemos os mais altos padrões de produção, combinando métodos tradicionais com as 
                melhores práticas de segurança alimentar. Cada etapa do processo é cuidadosamente 
                monitorada para garantir a qualidade excepcional dos nossos produtos.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-amber-700 mb-1">Seleção de Matéria-Prima</h3>
                    <p className="text-gray-600 text-sm">
                      Escolhemos cuidadosamente cada ingrediente, priorizando qualidade e frescor
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-amber-700 mb-1">Preparo Artesanal</h3>
                    <p className="text-gray-600 text-sm">
                      Seguimos receitas tradicionais com acompanhamento manual em todas as etapas
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-amber-700 mb-1">Controle de Qualidade</h3>
                    <p className="text-gray-600 text-sm">
                      Inspeção rigorosa em cada lote produzido antes da embalagem
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-amber-700 mb-1">Embalagem e Distribuição</h3>
                    <p className="text-gray-600 text-sm">
                      Embalagens que preservam o frescor e sabor até chegar à sua mesa
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1694796446470-71f9874f73ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuYWwlMjBjb25mZWN0aW9uZXJ5JTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NjI1NzczNTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Processo de produção artesanal"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredientes */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1639330842151-8a92eb332b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBkZXNzZXJ0fGVufDF8fHx8MTc2MjU3NzM1OXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Ingredientes selecionados"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-amber-700 mb-6">Ingredientes Selecionados</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Usamos apenas bananas de primeira qualidade, açúcar refinado e ingredientes naturais. 
                Não utilizamos conservantes artificiais ou corantes sintéticos.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <Leaf className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-green-700 mb-2">100% Natural</h3>
                    <p className="text-gray-700 text-sm">
                      Todos os nossos produtos são feitos com ingredientes naturais, sem adição de 
                      substâncias químicas prejudiciais à saúde.
                    </p>
                  </div>
                </div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Bananas maduras selecionadas no ponto ideal</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Açúcar refinado de alta pureza</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Amido de milho premium</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Aromatizantes naturais</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pilares da Qualidade */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-amber-700 mb-4">Os Pilares da Nossa Qualidade</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nosso compromisso está fundamentado em quatro pilares essenciais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gradient-to-b from-amber-50 to-white rounded-2xl">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-amber-700 mb-3">Equipe Dedicada</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nossa equipe familiar trabalha com paixão e dedicação, garantindo que cada produto 
                saia perfeito da nossa fábrica.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-b from-green-50 to-white rounded-2xl">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-amber-700 mb-3">Segurança Alimentar</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Seguimos rigorosamente todas as normas de segurança alimentar e higiene estabelecidas 
                pelos órgãos competentes.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-b from-orange-50 to-white rounded-2xl">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-amber-700 mb-3">Controle Rigoroso</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Rigoroso controle de qualidade em todas as etapas, do recebimento da matéria-prima 
                ao produto final.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-b from-amber-50 to-white rounded-2xl">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-amber-700 mb-3">Sustentabilidade</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Comprometidos com práticas sustentáveis, desde a escolha dos fornecedores até 
                o descarte responsável.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">Experimente a Diferença da Qualidade</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-95">
            Prove nossos produtos e sinta a diferença que o cuidado artesanal faz
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/catalogo"
              className="bg-white text-green-600 px-8 py-3 rounded-full hover:bg-green-50 transition-colors inline-block"
            >
              Ver Catálogo
            </a>
            <a
              href="/orcamento"
              className="bg-amber-500 text-white px-8 py-3 rounded-full hover:bg-amber-600 transition-colors inline-block"
            >
              Solicitar Orçamento
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
