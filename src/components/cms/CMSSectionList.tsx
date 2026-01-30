import { LandingContent } from "@/types/landing.types";
import * as LucideIcons from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

import { useRef } from "react";
import { useAutoScroll } from "@/hooks/useAutoScroll";

interface CMSSectionListProps {
    data: LandingContent;
    type: 'coverages' | 'benefits';
}

const CMSSectionList = ({ data, type }: CMSSectionListProps) => {
    const section = type === 'coverages' ? data.coverages : data.benefits;
    const isBenefits = type === 'benefits';
    const containerRef = useRef<HTMLDivElement>(null);
    useAutoScroll(containerRef, 10000);

    // Coverages usually 3-column cards, Benefits maybe list or items
    // Let's use a similar responsive grid for both, styled accordingly.

    if (!section || section.items.length === 0) return null;

    return (
        <section className={`py-16 lg:py-24 ${isBenefits ? 'bg-slate-50' : 'bg-white'}`}>
            <div className="container mx-auto px-4">
                <ScrollReveal className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">{section.title}</h2>
                    <p className="text-muted-foreground">{section.subtitle}</p>
                </ScrollReveal>

                <div ref={containerRef} className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto lg:overflow-x-visible pb-6 lg:pb-0 snap-x snap-mandatory hide-scrollbar">
                    {section.items.map((item, index) => {
                        const IconComponent = (LucideIcons as any)[item.icon] || CheckCircle2;

                        return (
                            <ScrollReveal key={item.id || index} delay={index * 0.1} className="flex-shrink-0 w-[85%] md:w-[48%] lg:w-full snap-start h-auto lg:h-full">
                                <div className={`h-full bg-white p-6 md:p-8 rounded-xl border ${(item as any).recommended ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20' : 'border-border'} hover-lift transition-all shadow-sm hover:shadow-md relative flex flex-col`}>
                                    {(item as any).recommended && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gaete-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                            Recomendado
                                        </div>
                                    )}
                                    <div className="flex flex-row lg:flex-col items-center lg:items-start lg:text-left gap-4 mb-4 lg:mb-6">
                                        <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center flex-shrink-0 ${isBenefits ? 'bg-primary-light/30 text-gaete-primary' : 'bg-blue-100 text-blue-600'}`}>
                                            <IconComponent className="w-6 h-6 lg:w-7 lg:h-7" />
                                        </div>
                                        <h3 className="text-xl font-heading font-bold text-foreground leading-tight lg:mt-2">{item.title}</h3>
                                    </div>
                                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed flex-1">{(item as any).description}</p>

                                    {!isBenefits && (item as any).price && (
                                        <div className="mt-auto pt-4 border-t border-gray-100">
                                            <span className="text-2xl font-bold text-gaete-primary block mb-4">{(item as any).price}</span>
                                            {(item as any).features && (
                                                <ul className="space-y-3">
                                                    {(item as any).features.map((feature: string, idx: number) => (
                                                        <li key={idx} className="flex items-start text-sm text-gray-600">
                                                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
                <div className="flex justify-center gap-1.5 mt-4 lg:hidden">
                    {section.items.map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CMSSectionList;
