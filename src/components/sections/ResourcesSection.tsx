import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/shared/ScrollReveal';

const resources = [
    {
        title: "Guía para Administradores y Comités",
        description: "Todo lo que necesitas saber sobre la gestión de seguros en comunidades.",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400", // Placeholder
    },
    {
        title: "Siniestros y Seguros: Responsables",
        description: "Aprende cómo actuar y quién es responsable en caso de siniestros.",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400", // Placeholder
    }
];

const ResourcesSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <ScrollReveal className="bg-gaete-secondary/10 rounded-3xl p-8 lg:p-12 border border-gaete-secondary/20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                            Recursos Gratuitos para su Gestión
                        </h2>
                        <p className="text-lg text-gray-600">
                            Descargue nuestras guías exclusivas y optimice la administración de su comunidad.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
                        {resources.map((resource, index) => (
                            <div key={index} className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="sm:w-1/3 bg-gray-200">
                                    <img
                                        src={resource.image}
                                        alt={resource.title}
                                        className="w-full h-full object-cover min-h-[160px]"
                                    />
                                </div>
                                <div className="p-6 flex flex-col justify-center sm:w-2/3">
                                    <h3 className="font-heading font-bold text-lg mb-2 text-gray-800">
                                        {resource.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        {resource.description}
                                    </p>
                                    <Button variant="outline" className="w-full sm:w-auto self-start gap-2 border-gaete-primary text-gaete-primary hover:bg-gaete-primary hover:text-white">
                                        <Download className="w-4 h-4" />
                                        Descargar Gratis
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default ResourcesSection;
