import { LandingContent } from "@/types/landing.types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Play, ExternalLink } from "lucide-react";

interface CMSFAQSectionProps {
    data: LandingContent;
}

const CMSFAQSection = ({ data }: CMSFAQSectionProps) => {
    const { faq } = data;

    // Check if there is a valid video configured
    const videoUrl = faq.video?.iframeUrl?.trim();
    const hasVideo = !!videoUrl;

    const getEmbedUrl = (url: string) => {
        if (!url) return null;
        // Handle standard YouTube
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}?rel=0`;
        }

        // Return if already embed url
        if (url.includes('youtube.com/embed/')) return url;

        return null; // For now only support YouTube auto-embed or direct iframe url
    };

    const embedUrl = getEmbedUrl(videoUrl || '');

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Left Column: Accordion */}
                    <div className={`${hasVideo ? 'lg:w-3/5' : 'lg:w-3/4 mx-auto'} w-full`}>
                        <h2 className={`text-3xl lg:text-4xl font-heading font-bold text-gaete-primary mb-8 ${hasVideo ? 'text-center lg:text-left' : 'text-center'}`}>
                            {faq.title}
                        </h2>

                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {faq.questions?.map((item: any, index: number) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border border-gray-100 rounded-xl px-6 bg-slate-50 transition-all hover:shadow-md"
                                >
                                    <AccordionTrigger className="text-left font-heading font-semibold text-gray-800 hover:no-underline text-lg py-4">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="font-body text-gray-600 leading-relaxed text-base pb-4">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* Right Column: Video Placeholder */}
                    {hasVideo && (
                        <div className="lg:w-2/5 w-full">
                            {embedUrl ? (
                                <div className="rounded-2xl shadow-2xl overflow-hidden aspect-video bg-black relative group">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={embedUrl}
                                        title={faq.video?.title || "Video"}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                    <div className="absolute top-2 right-2 group-hover:opacity-100 opacity-0 transition-opacity">
                                        <a
                                            href={`https://www.youtube.com/watch?v=${embedUrl?.split('/').pop()?.split('?')[0]}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-black/70 hover:bg-black/90 text-white text-xs px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm"
                                            title="Ver en YouTube"
                                        >
                                            Ver en YouTube <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            ) : (
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
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section >
    );
};

export default CMSFAQSection;
