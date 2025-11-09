import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Target, Heart, TrendingUp, Award } from 'lucide-react';

export function HistoriaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-100 to-orange-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-amber-700 mb-4">Nossa História</h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Uma trajetória de tradição, qualidade e amor pelos doces brasileiros
          </p>
        </div>
      </section>

      {/* O Começo */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm mb-4">
                2000 - O Início
              </div>
              <h2 className="text-amber-700 mb-6">O Sonho de Roberto Porto</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                A Doces São Fidélis nasceu em 2000, do sonho de Roberto Porto em criar algo especial. 
                Começamos em uma pequena cozinha em São Fidélis/RJ, produzindo bananadas e gomas de amido 
                com receitas cuidadosamente desenvolvidas.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Cada doce era feito à mão, com ingredientes selecionados e todo o carinho de quem ama 
                o que faz. O objetivo era resgatar o sabor tradicional dos doces brasileiros e levar 
                qualidade para as famílias.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1517097473408-c0d7983cb95c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHN3ZWV0cyUyMGZhbWlseXxlbnwxfHx8fDE3NjI1NzczNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Tradição familiar"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crescimento */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1694796446470-71f9874f73ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuYWwlMjBjb25mZWN0aW9uZXJ5JTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NjI1NzczNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Produção artesanal"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
            <div>
              <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm mb-4">
                Crescimento e Tradição
              </div>
              <h2 className="text-amber-700 mb-6">Mantendo a Essência</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Ao longo dos anos, crescemos mantendo nossa essência familiar e nosso compromisso com a qualidade. 
                O que começou em uma pequena cozinha se transformou em uma fábrica moderna, mas o cuidado 
                artesanal permanece o mesmo.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Cada etapa do processo é acompanhada de perto pela família, garantindo que cada bananada 
                e cada goma de amido mantenha o sabor autêntico que conquistou nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hoje */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm mb-4">
              Presente
            </div>
            <h2 className="text-amber-700 mb-4">Doces São Fidélis Hoje</h2>
            <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Hoje, nossa fábrica atende diversos estados brasileiros, mantendo a tradição artesanal 
              e compromisso com a excelência. Continuamos sendo uma empresa familiar, onde cada membro 
              da equipe trabalha com a mesma dedicação e amor de sempre.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="text-center p-6 bg-amber-50 rounded-2xl">
              <div className="text-4xl text-amber-600 mb-2">25+</div>
              <p className="text-gray-700">Anos de Tradição</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-2xl">
              <div className="text-4xl text-green-600 mb-2">1000+</div>
              <p className="text-gray-700">Clientes Satisfeitos</p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-2xl">
              <div className="text-4xl text-orange-600 mb-2">10+</div>
              <p className="text-gray-700">Estados Atendidos</p>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-2xl">
              <div className="text-4xl text-amber-600 mb-2">100%</div>
              <p className="text-gray-700">Produto Artesanal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Missão */}
      <section className="py-16 bg-gradient-to-br from-amber-500 to-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Target className="w-16 h-16 mx-auto mb-4" />
              <h2 className="mb-4">Nossa Missão</h2>
              <p className="text-lg opacity-95 leading-relaxed">
                Produzir doces de alta qualidade, preservando o sabor tradicional brasileiro e levando 
                alegria para as famílias através de produtos feitos com amor e dedicação.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="mb-2">Paixão</h3>
                <p className="text-sm opacity-90">
                  Amor pelo que fazemos em cada produto
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="mb-2">Qualidade</h3>
                <p className="text-sm opacity-90">
                  Compromisso com a excelência sempre
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="mb-2">Tradição</h3>
                <p className="text-sm opacity-90">
                  Mantendo receitas autênticas vivas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
