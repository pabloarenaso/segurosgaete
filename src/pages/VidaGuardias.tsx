import { useState, useRef } from 'react';
import { useAutoScroll } from '@/hooks/useAutoScroll';
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
import HeroWithForm from '@/components/sections/HeroWithForm';
import FAQWithVideo from '@/components/sections/FAQWithVideo';

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

  const benefitsRef = useRef<HTMLDivElement>(null);
  useAutoScroll(benefitsRef, 10000);

  return (
    <Layout>
      <HeroWithForm
        title="Seguro de Vida para <span class='text-gaete-accent'>Guardias (DS-93)</span>"
        subtitle="Cumple con la normativa legal vigente del Decreto Supremo 93 de manera rápida y sencilla. Protege a tu personal de seguridad con la mejor asesoría del mercado."
        image="/guardia-hero-v2.png"
        defaultService="Seguro Vida Guardias"
        insuranceType="vida"
      />



      {/* Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">¿Qué protege este seguro?</h2>
            <p className="text-muted-foreground">Cumplimiento legal y protección para tu equipo</p>
          </ScrollReveal>
          <div ref={benefitsRef} className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 snap-x snap-mandatory hide-scrollbar">
            {benefits.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1} className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-full snap-start h-full">
                <div className="bg-card rounded-xl p-6 border border-border hover-lift h-full flex flex-col">
                  <div className="w-14 h-14 bg-primary-light/30 rounded-full flex items-center justify-center mb-4 flex-shrink-0">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 mt-4 lg:hidden">
            {benefits.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/20" />
            ))}
          </div>
        </div>
      </section >

      <FAQWithVideo
        faqs={faqs}
        videoThumbnail="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
        videoCaption="Seguro de vida obligatorio DS-93"
      />

      <CTASection primaryButtonLink="/seguros/edificio" primaryButtonText="Ver otros seguros" />
    </Layout >
  );
};

export default VidaGuardias;