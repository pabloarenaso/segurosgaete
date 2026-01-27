import { LandingContent } from "@/types/landing.types";
import * as LucideIcons from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

interface CMSSectionListProps {
    data: LandingContent;
    type: 'coverages' | 'benefits';
}

const CMSSectionList = ({ data, type }: CMSSectionListProps) => {
    const section = type === 'coverages' ? data.coverages : data.benefits;
    const isBenefits = type === 'benefits';
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {section.items.map((item, index) => {
                        const IconComponent = (LucideIcons as any)[item.icon] || CheckCircle2;

                        return (
                            <ScrollReveal key={item.id || index} delay={index * 0.1} className="h-full">
                                <div className={`h-full bg-white p-8 rounded-xl border ${item.recommended ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20' : 'border-border'} hover-lift transition-all shadow-sm hover:shadow-md relative`}>
                                    {item.recommended && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gaete-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                            Recomendado
                                        </div>
                                    )}
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${isBenefits ? 'bg-primary-light/30 text-gaete-primary' : 'bg-blue-100 text-blue-600'}`}>
                                        <IconComponent size={28} />
                                    </div>
                                    <h3 className="text-xl font-heading font-bold mb-2 text-foreground">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{item.description}</p>

                                    {!isBenefits && item.price && (
                                        <div className="mt-auto pt-4 border-t border-gray-100">
                                            <span className="text-2xl font-bold text-gaete-primary block mb-4">{item.price}</span>
                                            {item.features && (
                                                <ul className="space-y-3">
                                                    {item.features.map((feature: string, idx: number) => (
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
            </div>
        </section>
    );
};

export default CMSSectionList;
