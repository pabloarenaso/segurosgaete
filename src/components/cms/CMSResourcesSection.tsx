import { LandingContent } from "@/types/landing.types";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { landingService } from "@/services/api";

interface CMSResourcesSectionProps {
    data: LandingContent;
}

const CMSResourcesSection = ({ data }: CMSResourcesSectionProps) => {
    const { resources } = data;
    const { enabledResourceIds } = resources;

    // Fetch details of enabled resources
    // In a real app, we might just pass the full objects if available, 
    // or fetch from cache.
    const { data: allResources = [] } = useQuery({
        queryKey: ['resources'],
        queryFn: landingService.getAllResources
    });

    const activeResources = allResources.filter((r: any) => enabledResourceIds.includes(r.id));

    if (!resources.visible || activeResources.length === 0) return null;

    return (
        <section className="py-16 bg-blue-600 text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold mb-4">{resources.title}</h2>
                        <p className="text-blue-100 text-lg opacity-90">{resources.subtitle}</p>
                    </div>
                    <div className="lg:w-1/2 w-full grid gap-4 grid-cols-1 md:grid-cols-2">
                        {activeResources.map((res: any) => (
                            <div key={res.id} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-colors flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="w-10 h-10 rounded bg-white text-blue-600 flex items-center justify-center shrink-0">
                                        <FileText size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-semibold truncate text-white">{res.title}</h4>
                                    </div>
                                </div>
                                <Button size="sm" variant="secondary" asChild className="shrink-0 bg-white text-blue-600 hover:bg-blue-50">
                                    <a href={res.url || '#'} target="_blank" rel="noopener noreferrer">
                                        Descargar <Download size={14} className="ml-2" />
                                    </a>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CMSResourcesSection;
