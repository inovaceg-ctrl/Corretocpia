import { useState, useRef } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Filter, Package, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const produtos = [
  {
    id: 1,
    nome: 'Bananada Tradicional',
    categoria: 'bananadas',
    descricao: 'Nossa bananada clássica, feita com bananas selecionadas e açúcar refinado',
    peso: '250g',
    unidades: '20 unidades por caixa',
    imagem: 'https://images.unsplash.com/photo-1639330842151-8a92eb332b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBkZXNzZXJ0fGVufDF8fHx8MTc2MjU3NzM1OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    nome: 'Bananada com Coco',
    categoria: 'bananadas',
    descricao: 'Deliciosa combinação de banana com coco ralado natural',
    peso: '250g',
    unidades: '20 unidades por caixa',
    imagem: 'https://images.unsplash.com/photo-1558529440-bd6d9661a0ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBjYW5keSUyMHN3ZWV0c3xlbnwxfHx8fDE3NjI1NzczNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    nome: 'Bananada Premium',
    categoria: 'bananadas',
    descricao: 'Versão especial com bananas nobres e toque de canela',
    peso: '300g',
    unidades: '15 unidades por caixa',
    imagem: 'https://images.unsplash.com/photo-1639330842151-8a92eb332b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBkZXNzZXJ0fGVufDF8fHx8MTc2MjU3NzM1OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    nome: 'Goma de Amido Natural',
    categoria: 'gomas',
    descricao: 'Gomas macias feitas com amido de milho e ingredientes naturais',
    peso: '200g',
    unidades: '30 unidades por caixa',
    imagem: 'https://images.unsplash.com/photo-1558529440-bd6d9661a0ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBjYW5keSUyMHN3ZWV0c3xlbnwxfHx8fDE3NjI1NzczNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    nome: 'Goma de Amido Sortida',
    categoria: 'gomas',
    descricao: 'Mix de sabores variados em um único pacote',
    peso: '250g',
    unidades: '25 unidades por caixa',
    imagem: 'https://images.unsplash.com/photo-1558529440-bd6d9661a0ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBjYW5keSUyMHN3ZWV0c3xlbnwxfHx8fDE3NjI1NzczNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    nome: 'Goma de Amido Premium',
    categoria: 'gomas',
    descricao: 'Linha premium com sabores exclusivos',
    peso: '300g',
    unidades: '20 unidades por caixa',
    imagem: 'https://images.unsplash.com/photo-1558529440-bd6d9661a0ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBjYW5keSUyMHN3ZWV0c3xlbnwxfHx8fDE3NjI1NzczNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

// Produtos em destaque para o carrossel
const produtosDestaque = [
  {
    id: 1,
    nome: 'Bananada Tradicional',
    descricao: 'Nosso carro-chefe! Sabor autêntico que atravessa gerações',
    imagem: 'https://images.unsplash.com/photo-1757332050958-b797a022c910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJhbmFuYXMlMjB5ZWxsb3d8ZW58MXx8fHwxNzYyNTc5MjM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Mais Vendido'
  },
  {
    id: 2,
    nome: 'Bananada com Coco',
    descricao: 'Combinação perfeita de banana e coco natural',
    imagem: 'https://images.unsplash.com/photo-1558529440-bd6d9661a0ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBjYW5keSUyMHN3ZWV0c3xlbnwxfHx8fDE3NjI1NzczNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Favorito'
  },
  {
    id: 3,
    nome: 'Goma de Amido Sortida',
    descricao: 'Variedade de sabores em um único pacote',
    imagem: 'https://images.unsplash.com/photo-1758779527897-bb4097eb0445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHN3ZWV0cyUyMGRlc3NlcnR8ZW58MXx8fHwxNzYyNTgwMzAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Novidade'
  },
  {
    id: 4,
    nome: 'Bananada Premium',
    descricao: 'Versão especial com toque de canela',
    imagem: 'https://images.unsplash.com/photo-1639330842151-8a92eb332b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBkZXNzZXJ0fGVufDF8fHx8MTc2MjU3NzM1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Premium'
  }
];

export function CatalogoPage() {
  const [filtroAtivo, setFiltroAtivo] = useState<'todos' | 'bananadas' | 'gomas'>('todos');
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const produtosFiltrados = filtroAtivo === 'todos' 
    ? produtos 
    : produtos.filter(p => p.categoria === filtroAtivo);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % produtosDestaque.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + produtosDestaque.length) % produtosDestaque.length);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-100 to-orange-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-amber-700 mb-4">Catálogo de Produtos</h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Conheça nossa linha completa de bananadas e gomas de amido artesanais
          </p>
        </div>
      </section>

      {/* Carrossel de Produtos em Destaque */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-amber-700 mb-2">Produtos em Destaque</h2>
            <p className="text-gray-600">Conheça nossos produtos mais populares</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-3xl shadow-2xl" ref={carouselRef}>
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {produtosDestaque.map((produto) => (
                  <div key={produto.id} className="min-w-full">
                    <div className="grid md:grid-cols-2 bg-gradient-to-br from-amber-50 to-orange-50">
                      <div className="relative h-96 md:h-auto">
                        <ImageWithFallback
                          src={produto.imagem}
                          alt={produto.nome}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-6 left-6 bg-amber-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
                          <Star className="w-4 h-4 fill-white" />
                          <span>{produto.badge}</span>
                        </div>
                      </div>
                      <div className="p-12 flex flex-col justify-center">
                        <h3 className="text-amber-700 mb-4">{produto.nome}</h3>
                        <p className="text-gray-700 mb-6 text-lg">
                          {produto.descricao}
                        </p>
                        <div className="flex gap-4">
                          <Link
                            to="/orcamento"
                            className="bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600 transition-colors"
                          >
                            Solicitar Orçamento
                          </Link>
                          <Link
                            to="/contato"
                            className="bg-white text-amber-600 border-2 border-amber-500 px-6 py-3 rounded-full hover:bg-amber-50 transition-colors"
                          >
                            Saiba Mais
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controles do Carrossel */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-amber-600 p-3 rounded-full shadow-lg hover:bg-amber-50 transition-colors z-10"
              aria-label="Produto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-amber-600 p-3 rounded-full shadow-lg hover:bg-amber-50 transition-colors z-10"
              aria-label="Próximo produto"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicadores */}
            <div className="flex justify-center gap-2 mt-6">
              {produtosDestaque.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index
                      ? 'bg-amber-500 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir para produto ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 justify-center flex-wrap">
            <div className="flex items-center gap-2 text-gray-700">
              <Filter className="w-5 h-5" />
              <span>Filtrar por:</span>
            </div>
            
            <button
              onClick={() => setFiltroAtivo('todos')}
              className={`px-6 py-2 rounded-full transition-colors ${
                filtroAtivo === 'todos'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos os Produtos
            </button>

            <button
              onClick={() => setFiltroAtivo('bananadas')}
              className={`px-6 py-2 rounded-full transition-colors ${
                filtroAtivo === 'bananadas'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bananadas
            </button>

            <button
              onClick={() => setFiltroAtivo('gomas')}
              className={`px-6 py-2 rounded-full transition-colors ${
                filtroAtivo === 'gomas'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Gomas de Amido
            </button>
          </div>
        </div>
      </section>

      {/* Produtos */}
      <section className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtosFiltrados.map((produto) => (
              <div
                key={produto.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="relative h-64 overflow-hidden group">
                  <ImageWithFallback
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm">
                    {produto.categoria === 'bananadas' ? 'Bananada' : 'Goma'}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-amber-700 mb-2">{produto.nome}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {produto.descricao}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Package className="w-4 h-4 text-amber-600" />
                      <span>{produto.peso}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Package className="w-4 h-4 text-amber-600" />
                      <span>{produto.unidades}</span>
                    </div>
                  </div>

                  <Link
                    to="/orcamento"
                    className="block w-full bg-amber-500 text-white text-center px-6 py-3 rounded-full hover:bg-amber-600 transition-colors"
                  >
                    Solicitar Orçamento
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {produtosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-amber-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">Não encontrou o que procura?</h2>
          <p className="mb-6 text-lg opacity-95">
            Entre em contato conosco para produtos personalizados ou pedidos especiais
          </p>
          <Link
            to="/contato"
            className="bg-white text-amber-600 px-8 py-3 rounded-full hover:bg-amber-50 transition-colors inline-block"
          >
            Falar com nossa equipe
          </Link>
        </div>
      </section>
    </div>
  );
}
