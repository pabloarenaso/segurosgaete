import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { 
  ArrowRight, ArrowLeft, Building2, Flame, Droplets, Users, Lock, 
  Settings, Square, Check, User, Mail, Phone, MapPin, Home,
  FileText, Clock, Shield, ChevronDown, CheckCircle
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import CTASection from '@/components/shared/CTASection';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { seguroEdificioSchema, type SeguroEdificioForm } from '@/lib/validations';

const coverageOptions = [
  { value: 'basica', label: 'BÁSICA', description: 'Cobertura esencial para espacios comunes', price: 'Desde UF 2/mes', icon: Shield },
  { value: 'intermedia', label: 'INTERMEDIA', description: 'La más completa para edificios residenciales', price: 'Desde UF 4/mes', icon: Shield, recommended: true },
  { value: 'premium', label: 'PREMIUM', description: 'Todo riesgo para máxima tranquilidad', price: 'Desde UF 7/mes', icon: Shield },
] as const;

const benefits = [
  { icon: Flame, title: "Incendio y Terremoto", description: "Protección contra desastres naturales y siniestros" },
  { icon: Droplets, title: "Daños por Agua", description: "Filtraciones, roturas de cañerías y daños por humedad" },
  { icon: Users, title: "Responsabilidad Civil", description: "Cubre accidentes a terceros en áreas comunes" },
  { icon: Lock, title: "Robo Especies Comunes", description: "Protege bienes en áreas comunes del edificio" },
  { icon: Settings, title: "Equipos y Maquinarias", description: "Ascensores, bombas de agua, generadores" },
  { icon: Square, title: "Vidrios y Cristales", description: "Reposición de ventanas, puertas y mamparas" },
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
      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-background/20 rounded-full text-primary-foreground text-sm mb-6">
            <Building2 className="w-4 h-4" /> Cobertura personalizada
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Seguro para Edificios y Condominios
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Protección integral para espacios comunes y unidades
          </p>
          <Button size="lg" className="bg-background text-primary hover:bg-background/90" onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}>
            Cotizar ahora <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
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
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                            <p className="text-sm font-medium text-primary mt-1">{option.price}</p>
                          </div>
                          {coverage === option.value && <Check className="w-5 h-5 text-primary" />}
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
                    <div className="flex items-start gap-3 mb-6">
                      <Checkbox id="terms" checked={watch('termsAccepted')} onCheckedChange={(checked) => setValue('termsAccepted', checked as boolean)} />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">Acepto los términos y condiciones y la política de privacidad</Label>
                    </div>
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
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
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