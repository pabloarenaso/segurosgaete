import {
    Clock,
    Zap,
    FileText,
    Users,
    BadgePercent,
    MonitorSmartphone,
    Award,
    Building2
} from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

const differentiators = [
    {
        icon: Clock,
        title: "Atención 24/7",
        description: "Para usted y su comunidad, siempre disponibles cuando nos necesiten."
    },
    {
        icon: Zap,
        title: "Soporte Rápido",
        description: "Equipo dedicado con tiempos de respuesta menores a 2 horas."
    },
    {
        icon: FileText,
        title: "Estudio Técnico",
        description: "Informe profesional de 15 páginas para respaldar el monto asegurado (evita infraseguros)."
    },
    {
        icon: Users,
        title: "Comparativo Completo",
        description: "Cotización clara y ordenada en más de 10 compañías de seguros."
    },
    {
        icon: BadgePercent,
        title: "Precios Preferenciales",
        description: "Coberturas exclusivas y beneficios negociados para la comunidad."
    },
    {
        icon: MonitorSmartphone,
        title: "Catastro Digital (Ley 21.442)",
        description: "Cumplimiento legal con planilla y carpeta digital consolidadas."
    },
    {
        icon: Award,
        title: "Asesoría Experta",
        description: "Acompañamiento personalizado durante toda la vigencia, especialmente en siniestros."
    },
    {
        icon: Building2,
        title: "Centralización Total",
        description: "Todos sus seguros en un solo lugar: Espacios Comunes, Unidades, RC Comité, Vida, etc."
    }
];

import { useRef } from 'react';
import { useAutoScroll } from '@/hooks/useAutoScroll';

const WhyChooseUs = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    useAutoScroll(scrollRef, 10000);

    return (
        <section className="py-16 lg:py-24 bg-slate-50">
            <div className="container mx-auto px-4">
                <ScrollReveal className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
                        ¿Por qué elegirnos?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Nuestros diferenciales diseñados para optimizar su gestión y brindar tranquilidad.
                    </p>
                </ScrollReveal>

                <div ref={scrollRef} className="flex lg:grid lg:grid-cols-4 gap-8 overflow-x-auto lg:overflow-x-visible pb-6 lg:pb-0 snap-x snap-mandatory hide-scrollbar">
                    {differentiators.map((item, index) => (
                        <ScrollReveal key={index} delay={index * 0.1} className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-full snap-start h-full">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-md transition-shadow flex flex-col">
                                <div className="w-12 h-12 bg-gaete-primary/10 rounded-xl flex items-center justify-center mb-4 text-gaete-primary flex-shrink-0">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-heading font-bold text-xl text-gray-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
                <div className="flex justify-center gap-1.5 mt-4 lg:hidden">
                    {differentiators.map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
