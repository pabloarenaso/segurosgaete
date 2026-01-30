
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Building2, Shield, Users, Clock, Headphones, CheckCircle, MessageCircle, DollarSign, Target, Handshake, Trophy, Award, AlertTriangle, Lightbulb, Network, Percent, FileText } from 'lucide-react';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import CTASection from '@/components/shared/CTASection';
import ScrollReveal from '@/components/shared/ScrollReveal';
import PartnerMarquee from '@/components/shared/PartnerMarquee';
import logoVerticalBlanco from '@/assets/logo-vertical-blanco.png';
import { CONTACT, COMPANY } from '@/config/contact';

// Componente de contador animado
const AnimatedCounter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Hero benefits list (without years - already in paragraph)
const heroBenefits = [
  { icon: Headphones, text: 'Atención personalizada 24/7' },
  { icon: Percent, text: 'Descuentos preferenciales y coberturas exclusivas' },
  { icon: Target, text: 'Centraliza tus seguros en un solo lugar' },
  { icon: Shield, text: 'Asesoría profesional en caso de siniestros' },
];

const tranquilidadBenefits = [{
  icon: DollarSign,
  highlight: "Ahorra dinero",
  title: "",
  description: "Nuestra trayectoria nos permite encontrar los mejores productos en relación precio/calidad del mercado."
}, {
  icon: Target,
  highlight: "Centraliza",
  title: " tus seguros",
  description: "Administramos todos tus seguros en un solo lugar para que no tengas que preocuparte de nada más."
}, {
  icon: Handshake,
  highlight: "Confía",
  title: " en nosotros",
  description: "Establecemos relaciones cercanas y duraderas con cada cliente, brindando atención personalizada."
}, {
  icon: Trophy,
  highlight: "Elige",
  title: " lo mejor",
  description: "Te ofrecemos los mejores productos del mercado en términos de coberturas, precios y respaldo."
}, {
  icon: Award,
  highlight: "40 años",
  title: " de experiencia",
  description: "Más de tres décadas asesorando a personas y empresas en la protección de su patrimonio."
}, {
  icon: AlertTriangle,
  highlight: "No pagues en vano,",
  title: " Asegúrate bien",
  description: "El seguro más barato no necesariamente es el que te va a proteger mejor cuando lo necesites."
}, {
  icon: Network,
  highlight: "Miembros de ANS",
  title: "",
  description: "Somos parte de la Alianza de Negocios en Seguros, la red de corredores más grande de Chile."
}, {
  icon: Lightbulb,
  highlight: "Solucionamos",
  title: " tus problemas",
  description: "Nos encargamos de todos los trámites ante las aseguradoras en caso de siniestro."
}];

const Index = () => {
  return <Layout>
    {/* Hero Section */}
    <section className="relative min-h-[90vh] lg:min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1920')`
        }} />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-16">

          {/* Logo removed for mobile/tablet - only header logo is shown */}

          {/* Columna izquierda - Contenido de texto */}
          <motion.div
            className="flex-1 text-center lg:text-left max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-background mb-6 leading-tight">
              Seguros que te acompañan en cada etapa
            </h1>

            <p className="text-xl lg:text-2xl text-background/90 mb-8">
              Más de {COMPANY.yearsExperience} años protegiendo tu tranquilidad. Asesoría personalizada con las mejores aseguradoras del mercado.
            </p>

            {/* Double CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 text-base">
                <Link to="/contacto">
                  <FileText className="w-5 h-5 mr-2" />
                  Solicitar Cotización
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-[#25D366] text-white border-[#25D366] hover:bg-[#20BD5A] text-base">
                <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\+/g, '')}?text=Hola, necesito información sobre seguros`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Hablar por WhatsApp
                </a >
              </Button >
            </div >
          </motion.div >

          {/* Columna derecha - Lista de beneficios (solo desktop) */}
          < motion.div
            className="hidden lg:flex flex-col gap-4 flex-shrink-0 max-w-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {
              heroBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <div className="w-10 h-10 bg-primary/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-primary-light" />
                  </div>
                  <span className="text-background/90 text-base lg:text-lg">{benefit.text}</span>
                </motion.div>
              ))
            }
          </motion.div >
        </div >
      </div >
    </section >

    {/* Social Proof Bar */}
    < section className="py-8 bg-primary" >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-4 lg:gap-8 text-center">
          <motion.div className="text-primary-foreground" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.1
          }}>
            <p className="text-2xl lg:text-4xl font-bold">{COMPANY.clients}</p>
            <p className="text-sm lg:text-base text-primary-foreground/80">Clientes satisfechos</p>
          </motion.div>
          <motion.div className="text-primary-foreground" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.2
          }}>
            <p className="text-2xl lg:text-4xl font-bold">{COMPANY.yearsExperience} años</p>
            <p className="text-sm lg:text-base text-primary-foreground/80">De experiencia</p>
          </motion.div>
          <motion.div className="text-primary-foreground" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.3
          }}>
            <p className="text-2xl lg:text-4xl font-bold">{COMPANY.insurers}</p>
            <p className="text-sm lg:text-base text-primary-foreground/80">Aseguradoras aliadas</p>
          </motion.div>
        </div>
      </div>
    </section >

    {/* Tu tranquilidad está aquí - NEW SECTION */}
    < section id="nosotros" className="py-16 lg:py-24 bg-secondary" >
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Tu tranquilidad está aquí, en <span className="text-primary">Seguros Gaete</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conoce las razones por las que miles de clientes confían en nosotros
          </p>
        </ScrollReveal>

        <div className="flex lg:grid lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 snap-x snap-mandatory hide-scrollbar">
          {tranquilidadBenefits.map((item, index) => (
            <ScrollReveal key={item.highlight} delay={index * 0.05} className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-full snap-start h-full">
              <div className="bg-card rounded-xl p-6 h-full border border-border hover-lift flex flex-row lg:flex-col items-center lg:text-center gap-4">
                <div className="w-16 h-16 bg-primary-light/30 rounded-full flex items-center justify-center flex-shrink-0 lg:mb-4">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    <span className="text-primary">{item.highlight}</span>
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="flex justify-center gap-1.5 mt-4 lg:hidden">
          {tranquilidadBenefits.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/20" />
          ))}
        </div>
      </div>
    </section >

    {/* Nuestros Seguros */}
    < section id="servicios" className="py-16 lg:py-24" >
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
            <motion.div className="bg-card rounded-2xl overflow-hidden shadow-lg hover-lift" whileHover={{
              y: -5
            }}>
              <div className="h-48 lg:h-56 bg-cover bg-center" style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800')`
              }} />
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
            <motion.div className="bg-card rounded-2xl overflow-hidden shadow-lg hover-lift" whileHover={{
              y: -5
            }}>
              <div className="h-48 lg:h-56 bg-cover bg-center" style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80&w=800')`
              }} />
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
    </section >

    {/* ¿Por qué Seguros Gaete? */}
    < section className="py-16 lg:py-24 bg-muted/30" >
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Más de 40 años de experiencia nos respaldan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Características que nos distinguen en el mercado asegurador
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[{
            icon: <Award className="w-7 h-7" />,
            title: "Trayectoria Comprobada",
            description: "Desde 1987 asesorando a familias y empresas con soluciones de protección a medida",
            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600"
          }, {
            icon: <Headphones className="w-7 h-7" />,
            title: "Asesoría Integral",
            description: "Te guiamos desde la cotización hasta la resolución de siniestros, siempre disponibles",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600"
          }, {
            icon: <Network className="w-7 h-7" />,
            title: "Red de Aseguradoras",
            description: "Convenios con más de 10 compañías de primer nivel para ofrecerte las mejores opciones",
            image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=600"
          }, {
            icon: <Clock className="w-7 h-7" />,
            title: "Atención Inmediata",
            description: "Respuesta en menos de 24 horas y acompañamiento cercano cuando más lo necesitas",
            image: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&q=80&w=600"
          }].map((item, index) => <ScrollReveal key={item.title} delay={index * 0.1}>
            <div className="bg-card rounded-xl overflow-hidden hover-lift border border-border">
              <div
                className="h-32 bg-cover bg-center"
                style={{ backgroundImage: `url('${item.image}')` }}
              />
              <div className="p-6 text-center relative">
                <div className="w-14 h-14 bg-primary-light/30 rounded-full flex items-center justify-center mx-auto -mt-12 mb-3 text-primary border-4 border-card">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-card-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          </ScrollReveal>)}
        </div>
      </div>
    </section >

    {/* Alianzas y Respaldo - Infinite Marquee */}
    < section className="py-16 lg:py-24 bg-secondary overflow-hidden" >
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Nuestras aseguradoras aliadas
          </h2>
          <p className="text-lg text-muted-foreground">
            Trabajamos con las compañías más confiables del mercado
          </p>
        </ScrollReveal>
      </div>

      <PartnerMarquee />
    </section >

    {/* Nuestro Compromiso */}
    < section id="compromiso" className="py-16 lg:py-24" >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="h-64 lg:h-96 rounded-2xl bg-cover bg-center shadow-elevated" style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&q=80&w=800')`
            }} />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Nuestro compromiso contigo
              </h2>

              <div className="space-y-4">
                {[
                  "Asesoría objetiva e imparcial en la selección de seguros",
                  "Acompañamiento completo en el proceso de siniestros",
                  "Actualización constante de tus pólizas según tus necesidades",
                  "Comunicación clara y transparente en todo momento",
                  "Gestión ágil de trámites con las aseguradoras"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-muted-foreground">{item}</p>
                  </motion.div>
                ))}
              </div>

              <Button asChild size="lg" className="mt-8">
                <Link to="/nosotros">
                  Conoce nuestra historia
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section >

    {/* CTA Final */}
    < CTASection
      title="¿Necesitas asesoría personalizada?"
      description="Contáctanos hoy y te ayudamos a encontrar el seguro perfecto para ti"
      primaryButtonText="Solicitar cotización"
      primaryButtonLink="/contacto"
    />
  </Layout >;
};

export default Index;
