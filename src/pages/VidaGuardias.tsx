import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { 
  ArrowRight, ArrowLeft, Shield, HeartPulse, Briefcase, Clock, FileCheck,
  Check, Mail, Phone, Building, Users, ChevronDown, Scale, Umbrella, HelpCircle
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CTASection from '@/components/shared/CTASection';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { vidaGuardiasSchema, type VidaGuardiasForm } from '@/lib/validations';
import logoBlanco from '@/assets/logo-vertical-blanco.png';

const coverageOptions = [
  { 
    value: 'basico', 
    label: 'BÁSICO DS-93', 
    description: 'Cobertura mínima legal', 
    price: 'Desde UF 0.5/mes', 
    icon: Shield,
    details: {
      coberturas: [
        'Muerte natural o accidental',
        'Indemnización según montos DS-93'
      ],
      montos: 'Según tabla legal vigente (15-90 UF)',
      ideal: 'Empresas que buscan cumplir el mínimo legal obligatorio'
    }
  },
  { 
    value: 'completo', 
    label: 'COMPLETO DS-93', 
    description: 'Cobertura legal + adicionales', 
    price: 'Desde UF 1/mes', 
    icon: Shield, 
    recommended: true,
    details: {
      coberturas: [
        'Todo lo del plan Básico',
        'Invalidez total permanente',
        'Invalidez parcial permanente',
        'Gastos funerarios',
        'Cobertura 24/7 (laboral y extralaboral)'
      ],
      montos: 'Montos incrementados hasta 150 UF',
      ideal: 'Empresas que valoran a su personal y buscan protección completa'
    }
  },
  { 
    value: 'premium', 
    label: 'PREMIUM DS-93', 
    description: 'Máxima protección para tu personal', 
    price: 'Desde UF 1.5/mes', 
    icon: Shield,
    details: {
      coberturas: [
        'Todo lo del plan Completo',
        'Asistencia familiar extendida',
        'Repatriación de restos',
        'Doble indemnización por accidente',
        'Anticipo por enfermedad terminal'
      ],
      montos: 'Montos máximos hasta 250 UF',
      ideal: 'Empresas premium que ofrecen los mejores beneficios a su equipo'
    }
  },
] as const;

const benefits = [
  { icon: HeartPulse, title: "Muerte Natural o Accidental", description: "Indemnización para los beneficiarios según los montos establecidos en la normativa DS-93" },
  { icon: Scale, title: "Invalidez Total o Parcial", description: "Compensación económica por incapacidad laboral permanente causada por accidente o enfermedad" },
  { icon: Briefcase, title: "Gastos Funerarios", description: "Apoyo económico inmediato para la familia en momentos difíciles, sin trámites complicados" },
  { icon: Shield, title: "Cumplimiento Legal", description: "Tu empresa cumple con la obligación legal del Decreto Supremo 93, evitando multas y sanciones" },
  { icon: Umbrella, title: "Cobertura 24/7", description: "Protección continua dentro y fuera del horario laboral, los 365 días del año" },
  { icon: FileCheck, title: "Gestión Simplificada", description: "Nos encargamos de todos los trámites ante la aseguradora, tú solo nos avisas" },
];

const faqs = [
  { question: "¿Qué es el DS-93?", answer: "El Decreto Supremo 93 establece la obligatoriedad de un seguro de vida para guardias de seguridad." },
  { question: "¿Es obligatorio para todas las empresas?", answer: "Sí, toda empresa con personal de seguridad debe cumplir con esta normativa." },
  { question: "¿Cuánto cuesta el seguro por guardia?", answer: "El costo varía según la cobertura, desde UF 0.5 por guardia al mes." },
  { question: "¿Qué pasa si no tengo el seguro?", answer: "El incumplimiento puede resultar en multas y responsabilidades legales para la empresa." },
];

const VidaGuardias = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm<VidaGuardiasForm>({
    resolver: zodResolver(vidaGuardiasSchema),
    defaultValues: { coverage: 'completo', termsAccepted: false, position: 'guardia' }
  });

  const coverage = watch('coverage');

  const onSubmit = (data: VidaGuardiasForm) => {
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
              backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1920')`,
              filter: 'blur(2px)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/75" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left - Content */}
            <div className="text-center md:text-left">
              {/* Brand Badge - Larger and responsive */}
              <motion.div 
                className="flex items-center justify-center md:justify-start gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img src={logoBlanco} alt="Seguros Gaete" className="h-20 sm:h-24 lg:h-32 w-auto" />
              </motion.div>
              
              <motion.h1
                className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                Seguro de Vida para Guardias (DS-93)
              </motion.h1>
              <motion.p 
                className="text-xl text-primary-foreground/90 mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Cumple la normativa legal obligatoria del Decreto Supremo 93
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
                                      {'montos' in option.details && option.details.montos && (
                                        <div>
                                          <h4 className="font-semibold mb-1 text-sm">Montos:</h4>
                                          <p className="text-sm text-muted-foreground">{option.details.montos}</p>
                                        </div>
                                      )}
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
                    <Button type="button" onClick={nextStep} className="w-full mt-6">Siguiente: Datos empresa <ArrowRight className="w-4 h-4 ml-2" /></Button>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-semibold mb-4">Datos de la empresa</h3>
                    <div className="space-y-4">
                      <div><Label htmlFor="name">Nombre de contacto</Label><Input id="name" placeholder="Juan Pérez" {...register('name')} />{errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}</div>
                      <div><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="empresa@email.com" {...register('email')} />{errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}</div>
                      <div><Label htmlFor="phone">Teléfono</Label><Input id="phone" type="tel" placeholder="+56 9 XXXX XXXX" {...register('phone')} />{errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}</div>
                      <div><Label htmlFor="companyName">Nombre de la empresa</Label><Input id="companyName" placeholder="Seguridad ABC Ltda." {...register('companyName')} />{errors.companyName && <p className="text-destructive text-sm mt-1">{errors.companyName.message}</p>}</div>
                      <div><Label htmlFor="companyRut">RUT de la empresa</Label><Input id="companyRut" placeholder="12345678-9" {...register('companyRut')} />{errors.companyRut && <p className="text-destructive text-sm mt-1">{errors.companyRut.message}</p>}</div>
                      <div><Label htmlFor="guardiasCount">Cantidad de guardias</Label><Input id="guardiasCount" type="number" placeholder="10" {...register('guardiasCount')} />{errors.guardiasCount && <p className="text-destructive text-sm mt-1">{errors.guardiasCount.message}</p>}</div>
                      <div>
                        <Label>Cargo principal</Label>
                        <Select value={watch('position')} onValueChange={(val) => setValue('position', val as any)}>
                          <SelectTrigger><SelectValue placeholder="Selecciona cargo" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="guardia">Guardia</SelectItem>
                            <SelectItem value="conserje">Conserje</SelectItem>
                            <SelectItem value="portero">Portero</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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
                      <div className="flex items-center gap-2"><Building className="w-4 h-4 text-primary" /><span>{watch('companyName') || 'Empresa no ingresada'}</span></div>
                      <div className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /><span>{watch('guardiasCount') || '0'} guardias</span></div>
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
            <p className="text-muted-foreground">Cumplimiento legal y protección para tu equipo</p>
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

      <CTASection primaryButtonLink="/seguros/edificio" primaryButtonText="Ver otros seguros" />
    </Layout>
  );
};

export default VidaGuardias;