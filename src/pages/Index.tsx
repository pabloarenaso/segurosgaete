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
  MessageCircle
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import CTASection from '@/components/shared/CTASection';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { CONTACT, COMPANY, INSURANCE_PARTNERS } from '@/config/contact';

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
          <motion.div
            className="max-w-2xl"
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
              Asesoría personalizada con las mejores aseguradoras del mercado
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
                variant="outline" 
                size="lg" 
                className="border-background text-background hover:bg-background hover:text-foreground text-base"
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

      {/* Nuestros Seguros */}
      <section className="py-16 lg:py-24 bg-secondary">
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
      <section className="py-16 lg:py-24">
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
                icon: <Shield className="w-6 h-6" />,
                title: "Confianza y Experiencia",
                description: "Más de 35 años asesorando a empresas y personas"
              },
              {
                icon: <Headphones className="w-6 h-6" />,
                title: "Asesoría Personalizada",
                description: "Te acompañamos en todo el proceso, desde cotización hasta siniestro"
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Amplia Red",
                description: "Trabajamos con +10 compañías aseguradoras de primer nivel"
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Respuesta Rápida",
                description: "Atención ágil y cercana cuando más nos necesitas"
              }
            ].map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <div className="bg-card rounded-xl p-6 text-center hover-lift border border-border">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
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
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="max-h-12 lg:max-h-14 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro Compromiso */}
      <section className="py-16 lg:py-24">
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
      <CTASection />
    </Layout>
  );
};

export default Index;