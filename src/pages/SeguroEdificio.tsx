import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { 
  ArrowRight, ArrowLeft, Building2, Flame, Droplets, Scale, ShieldCheck, 
  Cog, PanelTop, Check, Mail, Phone, Shield, ChevronDown, HelpCircle
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import CTASection from '@/components/shared/CTASection';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { seguroEdificioSchema, type SeguroEdificioForm } from '@/lib/validations';
import logoBlanco from '@/assets/logo-vertical-blanco.png';

const coverageOptions = [
  { 
    value: 'basica', 
    label: 'BÁSICA', 
    description: 'Cobertura esencial para espacios comunes', 
    price: 'Desde UF 2/mes', 
    icon: Shield,
    details: {
      coberturas: [
        'Incendio y rayo',
        'Terremoto (cobertura básica)',
        'Responsabilidad civil limitada (hasta 500 UF)'
      ],
      ideal: 'Edificios pequeños con bajo riesgo y presupuesto ajustado'
    }
  },
  { 
    value: 'intermedia', 
    label: 'INTERMEDIA', 
    description: 'La más completa para edificios residenciales', 
    price: 'Desde UF 4/mes', 
    icon: Shield, 
    recommended: true,
    details: {
      coberturas: [
        'Todo lo del plan Básica',
        'Daños por agua y filtraciones',
        'Robo de especies comunes',
        'Equipos y maquinarias (ascensores, calderas)',
        'Vidrios y cristales',
        'Responsabilidad civil ampliada (hasta 2.000 UF)'
      ],
      ideal: 'Edificios residenciales que buscan protección integral'
    }
  },
  { 
    value: 'premium', 
    label: 'PREMIUM', 
    description: 'Todo riesgo para máxima tranquilidad', 
    price: 'Desde UF 7/mes', 
    icon: Shield,
    details: {
      coberturas: [
        'Todo lo del plan Intermedia',
        'Cobertura todo riesgo',
        'Lucro cesante por siniestro',
        'Gastos de remoción de escombros',
        'Pérdida de arriendos',
        'Responsabilidad civil ilimitada'
      ],
      ideal: 'Edificios de alto valor o comunidades exigentes'
    }
  },
] as const;

const benefits = [
  { icon: Flame, title: "Incendio y Terremoto", description: "Cobertura ante siniestros mayores incluyendo daños estructurales y contenido común del edificio" },
  { icon: Droplets, title: "Daños por Agua", description: "Incluye filtraciones en techos, roturas de matrices y daños a terceros por humedad" },
  { icon: Scale, title: "Responsabilidad Civil", description: "Protección legal si un tercero sufre un accidente en las áreas comunes del edificio" },
  { icon: ShieldCheck, title: "Robo Especies Comunes", description: "Cubre hurto de equipamiento, mobiliario y bienes ubicados en espacios compartidos" },
  { icon: Cog, title: "Equipos y Maquinarias", description: "Ascensores, calderas, bombas de agua y generadores eléctricos asegurados" },
  { icon: PanelTop, title: "Vidrios y Cristales", description: "Reposición de ventanales, mamparas, espejos y puertas de cristal dañadas" },
];

const faqs = [
  { question: "¿Qué documentos necesito para cotizar?", answer: "Solo necesitas información básica del edificio: dirección, cantidad de departamentos y tipo de construcción." },
  { question: "¿Cuánto demora el proceso de contratación?", answer: "Una vez aprobada la propuesta, el proceso toma entre 24 a 48 horas hábiles." },
  { question: "¿Puedo modificar mi cobertura después?", answer: "Sí, puedes ajustar tu cobertura en cualquier momento." },
  { question: "¿Cómo reporto un siniestro?", answer: "Contáctanos inmediatamente por WhatsApp, teléfono o email." },
];

const SeguroEdificio = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm<SeguroEdificioForm>({
    resolver: zodResolver(seguroEdificioSchema),
    defaultValues: { coverage: 'intermedia', termsAccepted: false }
  });

  const coverage = watch('coverage');

  const onSubmit = (data: SeguroEdificioForm) => {
    console.log('Form submitted:', data);
    toast.success('¡Solicitud enviada!', { description: 'Te contactaremos en menos de 24 horas' });
  };

  const nextStep = () => currentStep < totalSteps && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  return (
    <Layout>
      {/* Hero with Background Image */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1920')`,
              filter: 'blur(2px)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/75" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left - Content */}
            <div className="text-center md:text-left">
              <motion.h1
                className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                Seguro para Edificios y Condominios
              </motion.h1>
              <motion.p 
                className="text-xl text-primary-foreground/90 mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Protección integral para espacios comunes y unidades
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button size="lg" className="bg-background text-primary hover:bg-background/90" onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}>
                  Cotizar ahora <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </div>

            {/* Right - Large Logo (visible from md/tablet) */}
            <motion.div 
              className="hidden md:flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img 
                src={logoBlanco} 
                alt="Seguros Gaete" 
                className="h-48 lg:h-64 xl:h-80 w-auto drop-shadow-2xl opacity-90"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wizard Form */}
      <section id="formulario" className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-card rounded-2xl shadow-elevated p-6 lg:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-card-foreground">Cotiza en 3 simples pasos</h2>
              <p className="text-muted-foreground">Solo 2 minutos • Sin compromiso</p>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Paso {currentStep} de {totalSteps}</span>
                <span className="text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div className="h-full bg-primary rounded-full" initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-semibold mb-4">¿Qué tipo de cobertura necesitas?</h3>
                    <div className="space-y-3">
                      {coverageOptions.map((option) => (
                        <label key={option.value} className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${coverage === option.value ? 'border-primary bg-primary/5 shadow-lg' : 'border-border hover:border-primary/50'}`}>
                          <input type="radio" value={option.value} {...register('coverage')} className="sr-only" />
                          <div className="flex-1">
                            {'recommended' in option && option.recommended && <span className="text-xs font-semibold text-primary mb-1 block">✓ Recomendada</span>}
                            <p className="font-bold">{option.label}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-sm text-muted-foreground">{option.description}</p>
                              {coverage === option.value && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <button 
                                      type="button"
                                      onClick={(e) => e.stopPropagation()}
                                      className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors underline underline-offset-2 whitespace-nowrap"
                                      aria-label={`Ver detalles del plan ${option.label}`}
                                    >
                                      <HelpCircle className="w-3.5 h-3.5" />
                                      Ver detalles
                                    </button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-md">
                                    <DialogHeader>
                                      <DialogTitle className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-primary" />
                                        {option.label}
                                      </DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="font-semibold mb-2 text-sm">Coberturas incluidas:</h4>
                                        <ul className="space-y-1.5">
                                          {option.details.coberturas.map((cobertura, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm">
                                              <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                              <span>{cobertura}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold mb-1 text-sm">Ideal para:</h4>
                                        <p className="text-sm text-muted-foreground">{option.details.ideal}</p>
                                      </div>
                                      <div className="pt-2 border-t">
                                        <p className="text-base font-semibold text-primary">{option.price}</p>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </div>
                            <p className="text-sm font-medium text-primary mt-1">{option.price}</p>
                          </div>
                          {coverage === option.value && (
                            <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center ml-3 shrink-0">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                    <Button type="button" onClick={nextStep} className="w-full mt-6">Siguiente: Tus datos <ArrowRight className="w-4 h-4 ml-2" /></Button>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-semibold mb-4">¿Cómo te contactamos?</h3>
                    <div className="space-y-4">
                      <div><Label htmlFor="name">Nombre completo</Label><Input id="name" placeholder="Juan Pérez" {...register('name')} />{errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}</div>
                      <div><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="tu@email.com" {...register('email')} />{errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}</div>
                      <div><Label htmlFor="phone">Teléfono</Label><Input id="phone" type="tel" placeholder="+56 9 XXXX XXXX" {...register('phone')} />{errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}</div>
                      <div><Label htmlFor="address">Dirección del edificio</Label><Input id="address" placeholder="Av. Libertad 123, Viña del Mar" {...register('address')} />{errors.address && <p className="text-destructive text-sm mt-1">{errors.address.message}</p>}</div>
                      <div><Label htmlFor="units">Cantidad de departamentos</Label><Input id="units" type="number" placeholder="24" {...register('units')} />{errors.units && <p className="text-destructive text-sm mt-1">{errors.units.message}</p>}</div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button type="button" variant="outline" onClick={prevStep} className="flex-1"><ArrowLeft className="w-4 h-4 mr-2" /> Volver</Button>
                      <Button type="button" onClick={nextStep} className="flex-1">Siguiente <ArrowRight className="w-4 h-4 ml-2" /></Button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-semibold mb-4">Confirma tu solicitud</h3>
                    <div className="bg-muted rounded-xl p-4 space-y-3 mb-6">
                      <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /><span>Cobertura: <strong className="capitalize">{coverage}</strong></span></div>
                      <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /><span>{watch('email') || 'Email no ingresado'}</span></div>
                      <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /><span>{watch('phone') || 'Teléfono no ingresado'}</span></div>
                    </div>
                    <label 
                      htmlFor="terms" 
                      className="flex items-center gap-3 mb-6 cursor-pointer group"
                      onClick={() => setValue('termsAccepted', !watch('termsAccepted'))}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${watch('termsAccepted') ? 'bg-whatsapp border-whatsapp' : 'border-muted-foreground/50 group-hover:border-primary'}`}>
                        {watch('termsAccepted') && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <span className="text-sm leading-relaxed">Acepto los términos y condiciones y la política de privacidad</span>
                    </label>
                    {errors.termsAccepted && <p className="text-destructive text-sm mb-4">{errors.termsAccepted.message}</p>}
                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={prevStep} className="flex-1"><ArrowLeft className="w-4 h-4 mr-2" /> Volver</Button>
                      <Button type="submit" disabled={isSubmitting} className="flex-1">{isSubmitting ? 'Enviando...' : 'Enviar solicitud'}</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">¿Qué protege este seguro?</h2>
            <p className="text-muted-foreground">Cobertura integral para tu edificio o condominio</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="bg-card rounded-xl p-6 border border-border hover-lift">
                  <div className="w-14 h-14 bg-primary-light/30 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Preguntas frecuentes</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left font-medium">
                  {faq.question}
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <p className="px-4 pb-4 text-muted-foreground">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection primaryButtonLink="/seguros/guardias" primaryButtonText="Ver otros seguros" />
    </Layout>
  );
};

export default SeguroEdificio;