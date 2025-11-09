import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Award, Package, MapPin, Leaf, CheckCircle, Users, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState } from 'react';
import { motion } from 'motion/react';

export function HomePage() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const fadeIn = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div>
      {/* Hero Banner Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1675712841671-cbcbe2c84103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBkZXNzZXJ0JTIwc3dlZXRzfGVufDF8fHx8MTc2MjY1NDY3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Doces de Banana São Fidélis"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-amber-500/90 text-white px-6 py-3 rounded-full mb-6 backdrop-blur-sm"
            >
              <Award className="w-5 h-5" />
              <span>Tradição desde 2000</span>
            </motion.div>

            <motion.h1 
              className="text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Sabor Autêntico que Atravessa Gerações
            </motion.h1>
            
            <motion.p 
              className="text-white/90 mb-10 text-lg lg:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Bananadas e gomas de amido produzidas artesanalmente com a tradição e o carinho de uma empresa familiar
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link
                to="/catalogo"
                className="bg-amber-500 text-white px-10 py-5 rounded-full hover:bg-amber-600 transition-all hover:scale-105 shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-3 text-lg w-full sm:w-auto"
              >
                <Package className="w-6 h-6" />
                Veja nosso catálogo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contato"
                className="bg-white text-amber-600 border-2 border-white px-10 py-5 rounded-full hover:bg-amber-50 transition-all hover:scale-105 shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-3 text-lg w-full sm:w-auto"
              >
                <Heart className="w-6 h-6" />
                Entre em contato
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2 animate-bounce">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
            {...fadeInUp}
          >
            <div className="text-center mb-6">
              <h3 className="text-amber-700 mb-2">Fique por dentro das novidades</h3>
              <p className="text-gray-600">
                Cadastre-se para receber ofertas especiais e lançamentos
              </p>
            </div>
            {isSubscribed ? (
              <div className="text-green-600 flex items-center justify-center gap-2 text-lg">
                <CheckCircle className="w-6 h-6" />
                Obrigado por se cadastrar!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  required
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                />
                <button
                  type="submit"
                  className="bg-amber-500 text-white px-8 py-3 rounded-full hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg"
                >
                  Cadastrar
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <motion.div className="text-center" {...fadeInUp} transition={{ duration: 0.6, delay: 0 }}>
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-amber-700 mb-2">Receita Tradicional</h3>
              <p className="text-gray-600 text-sm">
                Mantemos a autenticidade das receitas originais
              </p>
            </motion.div>

            <motion.div className="text-center" {...fadeInUp} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-amber-700 mb-2">Ingredientes Selecionados</h3>
              <p className="text-gray-600 text-sm">
                Apenas produtos de primeira qualidade
              </p>
            </motion.div>

            <motion.div className="text-center" {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-amber-700 mb-2">Empresa Familiar</h3>
              <p className="text-gray-600 text-sm">
                Paixão e dedicação em cada produto
              </p>
            </motion.div>

            <motion.div className="text-center" {...fadeInUp} transition={{ duration: 0.6, delay: 0.3 }}>
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-amber-700 mb-2">Entrega Nacional</h3>
              <p className="text-gray-600 text-sm">
                Atendemos diversos estados brasileiros
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Nossa História - Resumo */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div className="relative" {...fadeIn}>
              <div className="absolute top-0 left-0 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-50"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1749214307591-0bdd1d89de6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBidXNpbmVzcyUyMGtpdGNoZW58ZW58MXx8fHwxNzYyNTgwMjk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Produção artesanal"
                className="rounded-3xl shadow-xl relative z-10"
              />
            </motion.div>
            
            <motion.div {...fadeInUp}>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
                <MapPin className="w-4 h-4" />
                <span>São Fidélis, RJ</span>
              </div>
              <h2 className="text-amber-700 mb-4">Uma Tradição que Começou em 2000</h2>
              <p className="text-gray-700 mb-4 text-lg">
                A Doces São Fidélis nasceu do amor pela culinária tradicional e do desejo de compartilhar 
                sabores autênticos que atravessam gerações.
              </p>
              <p className="text-gray-600 mb-6">
                Somos uma empresa familiar que preserva receitas tradicionais de bananadas e gomas de amido, 
                produzindo cada doce com o mesmo carinho e dedicação desde o primeiro dia. Nossa missão é 
                levar o sabor da tradição para famílias em todo o Brasil.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-gray-600">Receitas tradicionais preservadas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-600">Ingredientes naturais selecionados</p>
                  </div>
                </div>
              </div>

              <Link
                to="/nossa-historia"
                className="text-amber-600 hover:text-amber-700 inline-flex items-center gap-2"
              >
                Conheça nossa história completa
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Produtos Artesanais</span>
            </div>
            <h2 className="text-amber-700 mb-4">Nossos Doces Tradicionais</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cada produto é feito com dedicação, seguindo receitas tradicionais que garantem 
              o sabor autêntico que você procura
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            <motion.div 
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1757332050958-b797a022c910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJhbmFuYXMlMjB5ZWxsb3d8ZW58MXx8fHwxNzYyNTc5MjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Bananadas"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm">
                  Nosso Carro-Chefe
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-amber-700 mb-2">Bananadas Artesanais</h3>
                <p className="text-gray-600 mb-4">
                  Feitas com bananas frescas e selecionadas, nossas bananadas mantêm o sabor tradicional 
                  que atravessa gerações. Macias, doces e irresistíveis.
                </p>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>100% Natural</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>Sem conservantes</span>
                  </div>
                </div>
                <Link
                  to="/catalogo"
                  className="text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
                >
                  Ver variações e tamanhos
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758779527897-bb4097eb0445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHN3ZWV0cyUyMGRlc3NlcnR8ZW58MXx8fHwxNzYyNTgwMzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Gomas de Amido"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-amber-700 mb-2">Gomas de Amido</h3>
                <p className="text-gray-600 mb-4">
                  Macias, saborosas e coloridas, nossas gomas de amido são produzidas com ingredientes 
                  de primeira qualidade. Perfeitas para todas as idades.
                </p>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Textura macia</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500" />
                    <span>Sabor autêntico</span>
                  </div>
                </div>
                <Link
                  to="/catalogo"
                  className="text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
                >
                  Ver sabores disponíveis
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div className="text-center" {...fadeInUp} transition={{ duration: 0.6, delay: 0.3 }}>
            <Link
              to="/catalogo"
              className="bg-amber-500 text-white px-8 py-3 rounded-full hover:bg-amber-600 transition-colors inline-flex items-center gap-2"
            >
              Ver catálogo completo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Processo de Produção */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="text-amber-700 mb-4">Produção Artesanal de Qualidade</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cada etapa do nosso processo é cuidadosamente executada para garantir 
              produtos de excelência
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div className="text-center" {...fadeInUp} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Leaf className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  1
                </div>
              </div>
              <h3 className="text-amber-700 mb-3">Seleção de Ingredientes</h3>
              <p className="text-gray-600">
                Escolhemos cuidadosamente as melhores bananas e ingredientes naturais, 
                garantindo frescor e qualidade desde o início
              </p>
            </motion.div>

            <motion.div className="text-center" {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  2
                </div>
              </div>
              <h3 className="text-amber-700 mb-3">Preparo Artesanal</h3>
              <p className="text-gray-600">
                Seguimos receitas tradicionais, preparando cada lote com dedicação 
                e o carinho de uma produção familiar
              </p>
            </motion.div>

            <motion.div className="text-center" {...fadeInUp} transition={{ duration: 0.6, delay: 0.3 }}>
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Package className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  3
                </div>
              </div>
              <h3 className="text-amber-700 mb-3">Embalagem e Entrega</h3>
              <p className="text-gray-600">
                Embalamos com cuidado e enviamos para todo o Brasil, 
                levando sabor e tradição até você
              </p>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/qualidade"
              className="text-amber-600 hover:text-amber-700 inline-flex items-center gap-2"
            >
              Saiba mais sobre nossa qualidade
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="text-amber-700 mb-4">O Que Nossos Clientes Dizem</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A satisfação de quem confia em nossos produtos é nosso maior orgulho
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div className="bg-white p-6 rounded-2xl shadow-lg" {...fadeInUp} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "As bananadas são exatamente como as que minha avó fazia! Sabor autêntico e qualidade 
                excepcional. Virei cliente fiel."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <p className="text-gray-700">Maria Silva</p>
                  <p className="text-gray-500 text-sm">Rio de Janeiro, RJ</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-white p-6 rounded-2xl shadow-lg" {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Compro para minha loja há mais de 2 anos. Os clientes adoram e a qualidade 
                é sempre consistente. Recomendo muito!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="text-gray-700">João Santos</p>
                  <p className="text-gray-500 text-sm">São Paulo, SP</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-white p-6 rounded-2xl shadow-lg" {...fadeInUp} transition={{ duration: 0.6, delay: 0.3 }}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Sabor incomparável! As gomas de amido são macias e deliciosas. 
                Meus filhos adoram e eu fico tranquila com ingredientes naturais."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-700" />
                </div>
                <div>
                  <p className="text-gray-700">Ana Oliveira</p>
                  <p className="text-gray-500 text-sm">Belo Horizonte, MG</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Números e Conquistas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <motion.div className="text-center" {...fadeInUp} transition={{ duration: 0.6, delay: 0 }}>
              <div className="text-4xl text-amber-600 mb-2">25+</div>
              <p className="text-gray-700">Anos de Tradição</p>
            </motion.div>
            <motion.div className="text-center" {...fadeInUp} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="text-4xl text-amber-600 mb-2">1000+</div>
              <p className="text-gray-700">Clientes Satisfeitos</p>
            </motion.div>
            <motion.div className="text-center" {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="text-4xl text-amber-600 mb-2">15+</div>
              <p className="text-gray-700">Estados Atendidos</p>
            </motion.div>
            <motion.div className="text-center" {...fadeInUp} transition={{ duration: 0.6, delay: 0.3 }}>
              <div className="text-4xl text-amber-600 mb-2">100%</div>
              <p className="text-gray-700">Artesanal</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <motion.div className="container mx-auto px-4 text-center" {...fadeInUp}>
          <h2 className="mb-4">Solicite seu Orçamento</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-95">
            Entre em contato conosco e solicite um orçamento personalizado para seu pedido
          </p>
          <Link
            to="/orcamento"
            className="bg-white text-amber-600 px-8 py-4 rounded-full hover:bg-amber-50 transition-colors inline-flex items-center gap-2"
          >
            Fazer orçamento agora
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
