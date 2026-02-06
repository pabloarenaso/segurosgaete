import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, MessageCircle } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { CONTACT, COMPANY } from '@/config/contact';
import { Landing } from '@/types/landing.types';

interface HeroCarouselProps {
    landings: Landing[];
}

const HeroCarousel = ({ landings }: HeroCarouselProps) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    // 1. Institutional Slide (Default)
    const institutionalSlide = {
        id: 'institutional',
        type: 'institutional',
        bgImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1920',
        title: 'Seguros que te acompañan en cada etapa',
        subtitle: `Más de ${COMPANY.yearsExperience} años protegiendo tu tranquilidad. Asesoría personalizada con las mejores aseguradoras del mercado.`,
        primaryAction: {
            label: 'Solicitar Cotización',
            link: '/contacto',
            icon: FileText
        },
        secondaryAction: {
            label: 'Hablar por WhatsApp',
            link: `https://wa.me/${CONTACT.whatsapp.replace(/\+/g, '')}?text=Hola, necesito información sobre seguros`,
            external: true,
            icon: MessageCircle,
            style: 'whatsapp'
        }
    };

    // 2. Featured Landings Slides
    const featuredLandings = landings.filter(l => l.isFeatured);

    // Combine slides
    const slides = [
        institutionalSlide,
        ...featuredLandings.map(l => ({
            id: l.id,
            type: 'landing',
            bgImage: l.content.hero.backgroundImage,
            title: l.content.hero.title,
            subtitle: l.content.hero.subtitle,
            primaryAction: {
                label: 'Más información',
                link: l.slug.startsWith('/') ? l.slug : `/${l.slug}`,
                icon: ArrowRight
            },
            secondaryAction: null
        }))
    ];

    const plugin = useRef(
        Autoplay({ delay: 6000, stopOnInteraction: true })
    );

    useEffect(() => {
        if (!api) {
            return;
        }

        // Force re-init to ensure correct slide count calculation after render or data update
        api.reInit();

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };

        const onInit = () => {
            setCount(api.scrollSnapList().length);
            setCurrent(api.selectedScrollSnap());
        };

        // Initialize immediately
        onInit();

        api.on("select", onSelect);
        api.on("reInit", onInit);

        return () => {
            api.off("select", onSelect);
            api.off("reInit", onInit);
        };
    }, [api, slides.length]); // Dependency on slides.length ensures update when data arrives

    return (
        <section className="relative min-h-[90vh] lg:min-h-[80vh] flex overflow-hidden bg-slate-900 group">
            <Carousel
                setApi={setApi}
                plugins={[plugin.current]}
                className="w-full h-full"
                opts={{
                    loop: true,
                    align: 'start',
                }}
            >
                <CarouselContent className="ml-0 h-full select-none">
                    {slides.map((slide, index) => (
                        <CarouselItem key={slide.id} className="pl-0 h-full min-h-[90vh] lg:min-h-[80vh] relative basis-full min-w-full overflow-hidden">
                            {/* Background */}
                            <div className="absolute inset-0 z-0 text-left">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear scale-105 hover:scale-110"
                                    style={{ backgroundImage: `url('${slide.bgImage}')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/30" />
                            </div>

                            {/* Content */}
                            <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
                                <div className="max-w-2xl text-center lg:text-left pt-48">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ duration: 0.6 }}
                                        key={`title-${slide.id}`}
                                    >
                                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                                            {slide.title}
                                        </h1>
                                        <p className="text-lg lg:text-2xl text-slate-200 mb-8 font-body leading-relaxed text-balance">
                                            {slide.subtitle}
                                        </p>

                                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                            {slide.primaryAction && (
                                                <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 text-base font-bold h-12 px-8 shadow-lg hover:shadow-xl transition-all">
                                                    <Link to={slide.primaryAction.link}>
                                                        {slide.primaryAction.icon && <slide.primaryAction.icon className="w-5 h-5 mr-2" />}
                                                        {slide.primaryAction.label}
                                                    </Link>
                                                </Button>
                                            )}

                                            {slide.secondaryAction && (
                                                <Button asChild size="lg" className={
                                                    slide.secondaryAction.style === 'whatsapp'
                                                        ? "bg-[#25D366] text-white border-transparent hover:bg-[#20BD5A] h-12 px-8 font-bold"
                                                        : "bg-transparent border-white text-white hover:bg-white/10"
                                                } variant="outline">
                                                    <a
                                                        href={slide.secondaryAction.link}
                                                        target={slide.secondaryAction.external ? "_blank" : "_self"}
                                                        rel="noopener noreferrer"
                                                    >
                                                        {slide.secondaryAction.icon && <slide.secondaryAction.icon className="w-5 h-5 mr-2" />}
                                                        {slide.secondaryAction.label}
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Pagination Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30 pointer-events-auto">
                    {Array.from({ length: count }).map((_, index) => (
                        <div
                            key={index}
                            role="button"
                            onClick={() => api?.scrollTo(index)}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 border-2 border-white ${index === current
                                ? "bg-white scale-110"
                                : "bg-transparent opacity-60 hover:opacity-100"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </Carousel>
        </section>
    );
};

export default HeroCarousel;
