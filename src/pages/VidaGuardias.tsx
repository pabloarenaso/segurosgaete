import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { 
  ArrowRight, ArrowLeft, Shield, Heart, Briefcase, Clock, FileText,
  Check, Mail, Phone, Building, Users, ChevronDown
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CTASection from '@/components/shared/CTASection';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { vidaGuardiasSchema, type VidaGuardiasForm } from '@/lib/validations';

const coverageOptions = [
  { value: 'basico', label: 'BÁSICO DS-93', description: 'Cobertura mínima legal', price: 'Desde UF 0.5/mes', icon: Shield },
  { value: 'completo', label: 'COMPLETO DS-93', description: 'Cobertura legal + adicionales', price: 'Desde UF 1/mes', icon: Shield, recommended: true },
  { value: 'premium', label: 'PREMIUM DS-93', description: 'Máxima protección para tu personal', price: 'Desde UF 1.5/mes', icon: Shield },
] as const;

const benefits = [
  { icon: Heart, title: "Muerte Natural o Accidental", description: "Indemnización según normativa DS-93" },
  { icon: Users, title: "Invalidez Total o Parcial", description: "Cobertura por incapacidad laboral" },
  { icon: Briefcase, title: "Gastos Funerarios", description: "Apoyo económico para la familia" },
  { icon: Shield, title: "Responsabilidad Patronal", description: "Cumplimiento legal obligatorio" },
  { icon: Clock, title: "Cobertura 24/7", description: "Dentro y fuera del horario laboral" },
  { icon: FileText, title: "Trámites Simplificados", description: "Asesoría en todo el proceso" },
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
      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-background/20 rounded-full text-primary-foreground text-sm mb-6">
            <Shield className="w-4 h-4" /> Cobertura legal requerida
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Seguro de Vida para Guardias (DS-93)
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Cumple la normativa legal obligatoria del Decreto Supremo 93
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
            <p className="text-muted-foreground">Cumplimiento legal y protección para tu equipo</p>
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

      <CTASection primaryButtonLink="/seguros/edificio" primaryButtonText="Ver otros seguros" />
    </Layout>
  );
};

export default VidaGuardias;