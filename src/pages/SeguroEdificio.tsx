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
import HeroWithForm from '@/components/sections/HeroWithForm';
import FAQWithVideo from '@/components/sections/FAQWithVideo';

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
      <HeroWithForm
        title="La protección <span class='text-gaete-accent'>más completa</span> para tu Edificio"
        subtitle="Protección integral para espacios comunes, departamentos y responsabilidad civil de administradores. Cumple con la normativa vigente y asegura la tranquilidad de tu comunidad."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
        defaultService="Seguro Edificio"
        insuranceType="edificio"
      />


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

      <FAQWithVideo
        faqs={faqs}
        videoThumbnail="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
        videoCaption="Todo sobre el seguro de edificios"
      />

      <CTASection primaryButtonLink="/seguros/guardias" primaryButtonText="Ver otros seguros" />
    </Layout>
  );
};

export default SeguroEdificio;