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
import { Loader2, Save, ArrowLeft, Monitor, Smartphone, Tablet, Settings, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

import HeroEditor from '@/components/admin/editor/HeroEditor';
import FormEditor from '@/components/admin/editor/FormEditor';
import SectionListEditor from '@/components/admin/editor/SectionListEditor';
import FAQEditor from '@/components/admin/editor/FAQEditor';
import ResourcesEditor from '@/components/admin/editor/ResourcesEditor';
import DynamicLanding from '@/pages/DynamicLanding';
import PreviewFrame from '@/components/admin/editor/PreviewFrame';
import { PreviewProvider } from '@/context/PreviewContext';

const Editor = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { currentLanding, setLanding, updateLanding, isDirty } = useEditorStore();
    const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

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
            queryClient.invalidateQueries({ queryKey: ['menu'] }); // Invalidate menu too
            toast.success("Cambios guardados exitosamente");
        },
        onError: () => {
            toast.error("Error al guardar los cambios");
        }
    });

    // Fetch Menu for categories and syncing
    const { data: menuConfig } = useQuery({
        queryKey: ['menu'],
        queryFn: landingService.getMenu
    });

    // Helper to get categories (same as Dashboard)
    const getCategories = (items: any[], depth = 0): any[] => {
        let cats: any[] = [];
        items.forEach(item => {
            const isCategory = item.type === 'category' || (item.items && item.items.length > 0);
            if (isCategory) {
                const isRootContainer = depth === 0;
                if (!isRootContainer) {
                    cats.push({ label: item.label, type: 'category' });
                }
                if (item.items) {
                    cats = [...cats, ...getCategories(item.items, depth + 1)];
                }
            }
        });
        return cats;
    };

    const rawCategories = menuConfig?.items ? getCategories(menuConfig.items) : [];
    const menuCategories = Array.from(new Set(rawCategories.map(c => c.label)))
        .map(label => rawCategories.find(c => c.label === label));

    const handleMenuUpdate = async (newCategory: string) => {
        if (!menuConfig) return;
        const newMenu = JSON.parse(JSON.stringify(menuConfig));

        // 1. Remove from old location (by slug)
        // We always remove first to ensure no duplicates if moving or just updating slug
        const removeRecursive = (items: any[]) => {
            return items.filter(item => {
                if (item.href === currentLanding.slug) return false;
                if (item.items) item.items = removeRecursive(item.items);
                return true;
            });
        };
        newMenu.items = removeRecursive(newMenu.items);

        // 2. Add to new category if selected
        if (newCategory) {
            const catIndex = newMenu.items.findIndex((item: any) => item.label === newCategory);
            // Note: This finds top-level categories. If we support nested categories, we need recursive find.
            // For now, let's assume top-level or use a recursive finder if needed.
            // Actually, `menuCategories` flattens them, but `newMenu.items` is tree.
            // Let's implement recursive find for the category to add to.

            const findCategoryAndAdd = (items: any[]) => {
                for (const item of items) {
                    if (item.label === newCategory && (item.type === 'category' || item.items)) {
                        if (!item.items) item.items = [];
                        item.items.push({
                            label: currentLanding.name,
                            href: currentLanding.slug,
                            type: 'landing'
                        });
                        return true;
                    }
                    if (item.items && findCategoryAndAdd(item.items)) return true;
                }
                return false;
            };

            findCategoryAndAdd(newMenu.items);
        }

        await landingService.saveMenu(newMenu);
    };

    const handleSave = async () => {
        if (!currentLanding) return;

        // Check if sensitive fields changed that require menu update
        // We compare with `landing` (original fetch)
        if (landing) {
            const categoryChanged = currentLanding.menuCategory !== landing.menuCategory;
            const slugChanged = currentLanding.slug !== landing.slug;
            const nameChanged = currentLanding.name !== landing.name;

            if (categoryChanged || slugChanged || nameChanged) {
                // Update menu first (or after? better before so if it fails we know)
                // But wait, if we update menu, we need the NEW values. 
                // `currentLanding` has the new values.
                try {
                    // If category is cleared, it will just remove. If changed, remove + add.
                    await handleMenuUpdate(currentLanding.menuCategory || '');
                } catch (e) {
                    console.error("Failed to update menu", e);
                    toast.error("Error al actualizar el menú, pero se guardará la landing.");
                }
            }
        }

        saveMutation.mutate(currentLanding);
    };

    if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
    if (isError) return <div className="h-screen flex items-center justify-center">Error al cargar landing</div>;
    if (!currentLanding) return null;

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row overflow-hidden bg-gray-100">
            {/* Sidebar (Editor) */}
            <div className="w-full md:w-[450px] lg:w-[500px] flex flex-col bg-white border-r h-full shadow-xl z-20">


                {/* Adjusted Header Layout to prevent overlap - User Request: Title above buttons */}
                <div className="p-4 border-b bg-white shrink-0 flex flex-col gap-3">
                    {/* Top Row: Title */}
                    <div>
                        <p className="text-xs text-muted-foreground font-medium mb-1">Editando Landing:</p>
                        <h2 className="text-sm font-bold text-slate-800 truncate" title={currentLanding.name}>
                            {currentLanding.name}
                        </h2>
                    </div>

                    {/* Bottom Row: Controls */}
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/landings')} className="text-muted-foreground hover:text-foreground p-0 h-auto">
                            <ArrowLeft size={16} className="mr-1" /> Volver al Dashboard
                        </Button>

                        <div className="flex items-center gap-2">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2 h-8 text-xs">
                                        <Settings size={14} /> Configuración
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    {/* ... existing dialog content ... */}
                                    <DialogHeader>
                                        <DialogTitle>Configuración de la Landing</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label>Categoría en Menú</Label>
                                            <select
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                value={currentLanding?.menuCategory || ''}
                                                onChange={(e) => updateLanding({ menuCategory: e.target.value })}
                                            >
                                                <option value="">-- No incluír en menú --</option>
                                                {menuCategories.map((cat: any) => (
                                                    <option key={cat.label} value={cat.label}>{cat.label}</option>
                                                ))}
                                            </select>
                                            <p className="text-xs text-muted-foreground">Define dónde aparecerá esta landing en el menú principal.</p>
                                        </div>
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
                                className="bg-green-600 hover:bg-green-700 whitespace-nowrap h-8 text-xs"
                                disabled={!isDirty || saveMutation.isPending}
                                onClick={handleSave}
                            >
                                {saveMutation.isPending ? <Loader2 className="animate-spin w-3 h-3 mr-1" /> : <Save className="w-3 h-3 mr-1" />}
                                Guardar
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {/* ... Tabs ... */}
                    <Tabs defaultValue="hero" className="w-full">
                        {/* ... */}
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
                <div className="h-12 bg-white border-b flex items-center justify-between px-4 shrink-0">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest hidden md:inline">Vista Previa</span>
                    <div className="flex items-center gap-2 ml-auto md:ml-0">
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
                                <ExternalLink size={14} /> <span className="hidden md:inline">Abrir</span>
                            </a>
                        </Button>
                    </div>
                </div>
                <div className={`flex-1 overflow-y-auto flex justify-center bg-gray-100 ${previewDevice === 'desktop' ? 'p-0' : 'p-4 md:p-8'}`}>
                    <div
                        className={`transition-all duration-300 border shadow-2xl bg-white overflow-hidden relative ${previewDevice === 'mobile' ? 'w-[375px] h-[667px] rounded-3xl border-gray-800 border-[3px]' :
                            previewDevice === 'tablet' ? 'w-[768px] h-[1024px] rounded-xl border-gray-800 border-[3px]' :
                                'w-full h-full border-0'
                            }`}
                    >
                        {/* Use PreviewFrame for isolation to ensure media queries work correctly */}
                        <PreviewFrame title="Preview">
                            <PreviewProvider value={true}>
                                <DynamicLanding
                                    landingData={currentLanding.content}
                                    previewId={id}
                                />
                            </PreviewProvider>
                        </PreviewFrame>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editor;
