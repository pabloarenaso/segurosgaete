import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { landingService } from '@/services/api';
import DynamicHeroWithForm from '@/components/cms/DynamicHeroWithForm';
import CMSSectionList from '@/components/cms/CMSSectionList';
import CMSFAQSection from '@/components/cms/CMSFAQSection';
import CMSResourcesSection from '@/components/cms/CMSResourcesSection';
import Layout from '@/components/layout/Layout';
import { Loader2 } from 'lucide-react';
import { LandingContent } from '@/types/landing.types';

interface DynamicLandingProps {
    landingId?: string; // Public ID passed by Router
    previewId?: string; // Admin Preview ID
    landingData?: LandingContent; // Direct data for real-time preview
}

const DynamicLanding = ({ landingId, previewId, landingData }: DynamicLandingProps) => {
    // If used as specific route with ID (Preview)
    const { id } = useParams<{ id: string }>();

    // Priority: Preview Prop > Landing Prop > URL Param
    const effectiveId = previewId || landingId || id;

    // Preview Mode triggered explicitly by previewId/landingData prop or valid URL param
    const searchParams = new URLSearchParams(window.location.search);
    const isPreview = !!previewId || !!landingData || searchParams.get('preview') === 'true';

    const { data: landing, isLoading, isError } = useQuery({
        queryKey: ['landing', effectiveId],
        queryFn: () => landingService.getById(effectiveId!),
        enabled: !!effectiveId && !landingData, // Don't fetch if we have direct data
        retry: false
    });

    if (landingData) {
        // Direct render mode (Real-time editor preview)
        return (
            <div className="bg-white min-h-full">
                {/* No Layout wrapper for preview inside editor to avoid double header/footer if desired, 
                     but user probably wants full context. Let's keep Layout but maybe cleaner?
                     Actually, inside the small iframe-like div, Layout might be too much if it has fixed headers.
                     Let's check Layout usage. existing code used Layout. 
                     The user complaint was about "updating title not reflected".
                     Let's use Layout to be consistent with real site.
                 */}
                <Layout hideHeader={true} hideFooter={true}>
                    <div className="relative">
                        <DynamicHeroWithForm data={landingData} previewMode={isPreview} />
                        <CMSSectionList data={landingData} type="coverages" />
                        <CMSSectionList data={landingData} type="benefits" />
                        <CMSFAQSection data={landingData} />
                        <CMSResourcesSection data={landingData} />
                    </div>
                </Layout>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (isError || !landing) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Página no encontrada</h1>
                    <p className="text-gray-600">La landing page que buscas no existe o fue eliminada.</p>
                </div>
            </Layout>
        );
    }

    const { content } = landing;

    return (
        <Layout hideHeader={isPreview}>
            <div className="relative">
                {isPreview && (
                    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
                        <div className="bg-slate-900/90 backdrop-blur text-white p-2 rounded-lg shadow-xl flex items-center gap-3 pr-4 border border-slate-700">
                            <div className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                Vista Previa
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => window.close()}
                                    className="hover:bg-white/20 px-3 py-1.5 rounded transition-colors text-sm font-medium"
                                >
                                    Volver al Editor
                                </button>
                                <div className="w-px bg-white/20 mx-1"></div>
                                <button
                                    onClick={() => {
                                        // In a real app this might trigger a status update to 'published'
                                        // For now we simulate the action
                                        alert('¡Landing Page Publicada con éxito!');
                                        window.close();
                                    }}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded transition-colors text-sm font-bold flex items-center gap-2"
                                >
                                    <span>Publicar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <DynamicHeroWithForm data={content} previewMode={isPreview} />

                {/* Coverages Section (Mapped to 'What Protects' or 'Plans' depending on JSON) */}
                <CMSSectionList data={content} type="coverages" />

                {/* Benefits Section (Mapped to 'Why Choose Us') */}
                <CMSSectionList data={content} type="benefits" />

                <CMSFAQSection data={content} />

                <CMSResourcesSection data={content} />
            </div>
        </Layout>
    );
};

export default DynamicLanding;
