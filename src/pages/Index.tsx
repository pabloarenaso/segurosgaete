import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Building2, 
  Shield, 
  Users, 
  Clock, 
  Headphones,
  CheckCircle,
  MessageCircle,
  DollarSign,
  Target,
  Handshake,
  Trophy,
  Award,
  AlertTriangle,
  Lightbulb,
  Network
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import CTASection from '@/components/shared/CTASection';
import ScrollReveal from '@/components/shared/ScrollReveal';
import PartnerLogo from '@/components/shared/PartnerLogo';
import { CONTACT, COMPANY, INSURANCE_PARTNERS } from '@/config/contact';
import logoVertical from '@/assets/logo-vertical-color.png';

const tranquilidadBenefits = [
  {
    icon: DollarSign,
    highlight: "Ahorra dinero",
    title: "",
    description: "Nuestra trayectoria nos permite encontrar los mejores productos en relación precio/calidad del mercado."
  },
  {
    icon: Target,
    highlight: "Centraliza",
    title: " tus seguros",
    description: "Administramos todos tus seguros en un solo lugar para que no tengas que preocuparte de nada más."
  },
  {
    icon: Handshake,
    highlight: "Confía",
    title: " en nosotros",
    description: "Establecemos relaciones cercanas y duraderas con cada cliente, brindando atención personalizada."
  },
  {
    icon: Trophy,
    highlight: "Elige",
    title: " lo mejor",
    description: "Te ofrecemos los mejores productos del mercado en términos de coberturas, precios y respaldo."
  },
  {
    icon: Award,
    highlight: "35 años",
    title: " de experiencia",
    description: "Más de tres décadas asesorando a personas y empresas en la protección de su patrimonio."
  },
  {
    icon: AlertTriangle,
    highlight: "No pagues en vano,",
    title: " Asegúrate bien",
    description: "El seguro más barato no necesariamente es el que te va a proteger mejor cuando lo necesites."
  },
  {
    icon: Network,
    highlight: "Miembros de ANS",
    title: "",
    description: "Somos parte de la Alianza de Negocios en Seguros, la red de corredores más grande de Chile."
  },
  {
    icon: Lightbulb,
    highlight: "Solucionamos",
    title: " tus problemas",
    description: "Nos encargamos de todos los trámites ante las aseguradoras en caso de siniestro."
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] lg:min-h-[80vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1920')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left column - Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.span 
                className="inline-block px-4 py-2 bg-primary/20 text-primary-light rounded-full text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                Más de {COMPANY.yearsExperience} años protegiendo tu tranquilidad
              </motion.span>

              <h1 className="text-4xl lg:text-6xl font-bold text-background mb-6 leading-tight">
                Seguros que te acompañan en cada etapa
              </h1>

              <p className="text-xl lg:text-2xl text-background/90 mb-8">
                Más de 39 años protegiendo tu tranquilidad. Asesoría personalizada con las mejores aseguradoras del mercado
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-base">
                  <Link to="/seguros/edificio">
                    Cotiza tu seguro
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-[#25D366] text-white border-[#25D366] hover:bg-[#20BD5A] text-base"
                >
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp.replace(/\+/g, '')}?text=Hola, necesito información sobre seguros`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Hablar por WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Right column - Logo - Visible on all screen sizes */}
            <motion.div 
              className="flex justify-center items-center mt-8 lg:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img 
                src={logoVertical} 
                alt="Seguros Gaete" 
                className="h-32 sm:h-48 md:h-56 lg:h-72 xl:h-96 w-auto drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-8 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 lg:gap-8 text-center">
            <motion.div 
              className="text-primary-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-2xl lg:text-4xl font-bold">{COMPANY.clients}</p>
              <p className="text-sm lg:text-base text-primary-foreground/80">Clientes satisfechos</p>
            </motion.div>
            <motion.div 
              className="text-primary-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-2xl lg:text-4xl font-bold">{COMPANY.yearsExperience} años</p>
              <p className="text-sm lg:text-base text-primary-foreground/80">De experiencia</p>
            </motion.div>
            <motion.div 
              className="text-primary-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-2xl lg:text-4xl font-bold">{COMPANY.insurers}</p>
              <p className="text-sm lg:text-base text-primary-foreground/80">Aseguradoras aliadas</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tu tranquilidad está aquí - NEW SECTION */}
      <section id="nosotros" className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Tu tranquilidad está aquí, en <span className="text-primary">Seguros Gaete</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conoce las razones por las que miles de clientes confían en nosotros
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tranquilidadBenefits.map((item, index) => (
              <ScrollReveal key={item.highlight} delay={index * 0.05}>
                <div className="bg-card rounded-xl p-6 h-full border border-border hover-lift">
                  <div className="w-16 h-16 bg-primary-light/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-center mb-2">
                    <span className="text-primary">{item.highlight}</span>
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestros Seguros */}
      <section id="servicios" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Seguros Especializados
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Soluciones diseñadas para cada necesidad
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Card 1: Seguro Edificio */}
            <ScrollReveal delay={0.1}>
              <motion.div
                className="bg-card rounded-2xl overflow-hidden shadow-lg hover-lift"
                whileHover={{ y: -5 }}
              >
                <div 
                  className="h-48 lg:h-56 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800')` 
                  }}
                />
                <div className="p-6 lg:p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-card-foreground mb-3">
                    Seguro para Edificios y Condominios
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Protege espacios comunes, unidades y responsabilidad civil 
                    de administradores con cobertura integral.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/seguros/edificio">
                      Más información
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Card 2: Vida Guardias */}
            <ScrollReveal delay={0.2}>
              <motion.div
                className="bg-card rounded-2xl overflow-hidden shadow-lg hover-lift"
                whileHover={{ y: -5 }}
              >
                <div 
                  className="h-48 lg:h-56 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80&w=800')` 
                  }}
                />
                <div className="p-6 lg:p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-card-foreground mb-3">
                    Seguro de Vida Guardias (DS-93)
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Cumple con la normativa legal obligatoria para guardias 
                    y conserjes según Decreto Supremo 93.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/seguros/guardias">
                      Más información
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ¿Por qué Seguros Gaete? */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {COMPANY.yearsExperience} años de experiencia nos respaldan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Características que nos distinguen en el mercado asegurador
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: <Award className="w-7 h-7" />,
                title: "Trayectoria Comprobada",
                description: "Desde 1987 asesorando a familias y empresas con soluciones de protección a medida"
              },
              {
                icon: <Headphones className="w-7 h-7" />,
                title: "Asesoría Integral",
                description: "Te guiamos desde la cotización hasta la resolución de siniestros, siempre disponibles"
              },
              {
                icon: <Network className="w-7 h-7" />,
                title: "Red de Aseguradoras",
                description: "Convenios con más de 10 compañías de primer nivel para ofrecerte las mejores opciones"
              },
              {
                icon: <Clock className="w-7 h-7" />,
                title: "Atención Inmediata",
                description: "Respuesta en menos de 24 horas y acompañamiento cercano cuando más lo necesitas"
              }
            ].map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <div className="bg-card rounded-xl p-6 text-center hover-lift border border-border">
                  <div className="w-16 h-16 bg-primary-light/30 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Alianzas y Respaldo */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Nuestras aseguradoras aliadas
            </h2>
            <p className="text-lg text-muted-foreground">
              Trabajamos con las compañías más confiables del mercado
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 lg:gap-6">
            {INSURANCE_PARTNERS.map((partner, index) => (
              <ScrollReveal key={partner.name} delay={index * 0.03}>
                <div className="bg-card rounded-lg p-4 flex items-center justify-center h-20 lg:h-24 hover:shadow-md transition-shadow">
                  <PartnerLogo name={partner.name} logo={partner.logo} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro Compromiso */}
      <section id="compromiso" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <ScrollReveal>
              <div 
                className="h-64 lg:h-96 rounded-2xl bg-cover bg-center shadow-elevated"
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&q=80&w=800')` 
                }}
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Nuestra promesa
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-4">
                  Honestidad, transparencia y cercanía
                </h2>

                <div className="space-y-4 text-muted-foreground mb-8">
                  <p>
                    Desde 1987 hemos construido relaciones duraderas con nuestros 
                    clientes, basadas en la confianza y el compromiso genuino con 
                    su tranquilidad.
                  </p>
                  <p>
                    Estamos inscritos bajo el Registro Nº 3575 de la Superintendencia 
                    de Valores y Seguros y somos miembros activos de ANS (Alianza de 
                    Negocios en Seguros).
                  </p>
                  <p>
                    Te acompañamos en cada etapa: desde la cotización inicial, pasando 
                    por la contratación, hasta el apoyo completo en caso de siniestro.
                  </p>
                </div>

                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-medium text-foreground">
                    Miembro de ANS (Alianza de Negocios en Seguros)
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <div id="contacto">
        <CTASection />
      </div>
    </Layout>
  );
};

export default Index;