import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEditorStore } from '@/store/editorStore';
import { landingService } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, Eye, ArrowLeft, Monitor, Smartphone, Settings } from 'lucide-react';
import HeroEditor from '@/components/admin/editor/HeroEditor';
import FormEditor from '@/components/admin/editor/FormEditor';
import SectionListEditor from '@/components/admin/editor/SectionListEditor';
import FAQEditor from '@/components/admin/editor/FAQEditor';
import ResourcesEditor from '@/components/admin/editor/ResourcesEditor';

const Editor = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { currentLanding, setLanding, updateLanding, isDirty, setDirty } = useEditorStore();
    const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

    // Fetch Landing
    const { data: landing, isLoading, isError } = useQuery({
        queryKey: ['landing', id],
        queryFn: () => landingService.getById(id!),
        enabled: !!id,
        staleTime: 0 // Always fetch fresh
    });

    // Sync Store
    useEffect(() => {
        if (landing) {
            setLanding(landing);
        }
    }, [landing, setLanding]);

    // Save Mutation
    const saveMutation = useMutation({
        mutationFn: (data: any) => landingService.update(id!, data),
        onSuccess: (data) => {
            setLanding(data); // Resets dirty state
            queryClient.invalidateQueries({ queryKey: ['landings'] });
            toast.success("Cambios guardados exitosamente");
        },
        onError: () => {
            toast.error("Error al guardar los cambios");
        }
    });

    const handleSave = () => {
        if (!currentLanding) return;
        saveMutation.mutate(currentLanding);
    };

    if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
    if (isError) return <div className="h-screen flex items-center justify-center">Error al cargar landing</div>;
    if (!currentLanding) return null;

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row overflow-hidden bg-gray-100 -m-6">
            {/* Sidebar (Editor) */}
            <div className="w-full md:w-[450px] lg:w-[500px] flex flex-col bg-white border-r h-full shadow-xl z-10">
                <div className="p-4 border-b flex items-center justify-between bg-white">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/landings')}>
                            <ArrowLeft size={18} />
                        </Button>
                        <h2 className="font-semibold truncate max-w-[200px]">{currentLanding.name}</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Settings size={16} /> Configuración
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Configuración de la Landing</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label>Nombre Interno</Label>
                                        <Input
                                            value={currentLanding?.name || ''}
                                            onChange={(e) => updateLanding({ name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>URL (Slug)</Label>
                                        <Input
                                            value={currentLanding?.slug || ''}
                                            onChange={(e) => updateLanding({ slug: e.target.value })}
                                        />
                                        <p className="text-xs text-muted-foreground">Ejemplo: /seguros/mi-landing</p>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Button
                            size="sm"
                            variant="default"
                            className="bg-green-600 hover:bg-green-700"
                            disabled={!isDirty || saveMutation.isPending}
                            onClick={handleSave}
                        >
                            {saveMutation.isPending ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4 mr-2" />}
                            Guardar
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <Tabs defaultValue="hero" className="w-full">
                        <div className="px-4 pt-4 sticky top-0 bg-white z-10 pb-2 border-b">
                            <TabsList className="w-full grid grid-cols-3 h-auto gap-1 bg-slate-100 p-1">
                                <TabsTrigger value="hero" className="text-xs">Hero</TabsTrigger>
                                <TabsTrigger value="form" className="text-xs">Formulario</TabsTrigger>
                                <TabsTrigger value="coverages" className="text-xs">Coberturas</TabsTrigger>
                                <TabsTrigger value="benefits" className="text-xs">Beneficios</TabsTrigger>
                                <TabsTrigger value="faq" className="text-xs">FAQs</TabsTrigger>
                                <TabsTrigger value="resources" className="text-xs">Recursos</TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="p-4 pb-20">
                            <TabsContent value="hero" className="mt-0 space-y-4">
                                <HeroEditor />
                            </TabsContent>
                            <TabsContent value="form" className="mt-0 space-y-4">
                                <FormEditor />
                            </TabsContent>
                            <TabsContent value="coverages" className="mt-0 space-y-4">
                                <SectionListEditor sectionKey="coverages" />
                            </TabsContent>
                            <TabsContent value="benefits" className="mt-0 space-y-4">
                                <SectionListEditor sectionKey="benefits" />
                            </TabsContent>
                            <TabsContent value="faq" className="mt-0 space-y-4">
                                <FAQEditor />
                            </TabsContent>
                            <TabsContent value="resources" className="mt-0 space-y-4">
                                <ResourcesEditor />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>

            {/* Preview Pane */}
            <div className="flex-1 flex flex-col bg-gray-100 h-full relative transition-all duration-300">
                <div className="h-12 bg-white border-b flex items-center justify-between px-4">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Vista Previa</span>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={previewDevice === 'desktop' ? 'secondary' : 'ghost'}
                            size="icon"
                            title="Desktop"
                            onClick={() => setPreviewDevice('desktop')}
                        >
                            <Monitor size={16} />
                        </Button>
                        <Button
                            variant={previewDevice === 'mobile' ? 'secondary' : 'ghost'}
                            size="icon"
                            title="Mobile"
                            onClick={() => setPreviewDevice('mobile')}
                        >
                            <Smartphone size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" asChild className="ml-2 gap-1 text-blue-600">
                            <a href={`/admin/preview/${id}?preview=true`} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={14} /> Abrir
                            </a>
                        </Button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-gray-100">
                    <div
                        className={`transition-all duration-300 border rounded shadow-2xl bg-white overflow-hidden relative ${previewDevice === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full h-full max-w-[1400px]'
                            }`}
                    >
                        <iframe
                            src={`/admin/preview/${id}?preview=true`}
                            title="Landing Preview"
                            className="w-full h-full border-0"
                            key={isDirty ? 'dirty' : 'saved'}
                        />
                        {isDirty && (
                            <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold shadow border border-yellow-300 pointer-events-none">
                                Cambios no guardados (Vista previa desactualizada)
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Quick helper icon for open link
import { ExternalLink } from 'lucide-react';

export default Editor;
