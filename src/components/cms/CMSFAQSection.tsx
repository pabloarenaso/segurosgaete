import { LandingContent } from "@/types/landing.types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Play } from "lucide-react";

interface CMSFAQSectionProps {
    data: LandingContent;
}

const CMSFAQSection = ({ data }: CMSFAQSectionProps) => {
    const { faq } = data;

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Left Column: Accordion */}
                    <div className="lg:w-3/5 w-full">
                        <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gaete-primary mb-8 text-center lg:text-left">
                            {faq.title}
                        </h2>

                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {faq.questions?.map((item, index) => (
                                <AccordionItem
                                    key={item.id || index}
                                    value={`item-${index}`}
                                    className="border border-gray-100 rounded-xl px-6 bg-slate-50 transition-all hover:shadow-md"
                                >
                                    <AccordionTrigger className="text-left font-heading font-semibold text-gray-800 hover:no-underline">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="font-body text-gray-600 leading-relaxed">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* Right Column: Video Placeholder */}
                    <div className="lg:w-2/5 w-full">
                        {faq.video?.iframeUrl || faq.video?.thumbnail ? (
                            <div
                                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl aspect-video"
                                onClick={() => faq.video?.iframeUrl && window.open(faq.video.iframeUrl, '_blank')}
                            >
                                <img
                                    src={faq.video?.thumbnail || "https://images.unsplash.com/photo-1454165833767-027508492021?auto=format&fit=crop&q=80&w=800"}
                                    alt={faq.video?.title || "Video"}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-gaete-primary/20 group-hover:bg-gaete-primary/10 transition-colors" />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                                        <Play className="text-gaete-primary fill-gaete-primary w-8 h-8 ml-1" />
                                    </div>
                                </div>

                                {faq.video?.title && (
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <p className="text-white font-heading font-bold text-lg bg-gaete-primary/80 backdrop-blur-sm p-3 rounded-lg text-center">
                                            {faq.video.title}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="aspect-video bg-slate-100 rounded-2xl flex items-center justify-center text-muted-foreground border-2 border-dashed border-gray-200">
                                Sin video configurado
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CMSFAQSection;
