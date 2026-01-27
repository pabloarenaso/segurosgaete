import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink, Loader2, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEditorStore } from "@/store/editorStore";
import { landingService } from "@/services/api";

const ResourcesEditor = () => {
    const { currentLanding, updateLanding } = useEditorStore();

    // Fetch global resources
    const { data: globalResources = [], isLoading } = useQuery({
        queryKey: ['resources'],
        queryFn: landingService.getAllResources
    });

    if (!currentLanding) return null;
    const { resources } = currentLanding.content;

    const updateResources = (updates: any) => {
        updateLanding({
            content: {
                ...currentLanding.content,
                resources: { ...resources, ...updates }
            }
        });
    };

    const toggleResource = (id: string, checked: boolean) => {
        let newIds = [...resources.enabledResourceIds];
        if (checked) {
            if (!newIds.includes(id)) newIds.push(id);
        } else {
            newIds = newIds.filter(rid => rid !== id);
        }
        updateResources({ enabledResourceIds: newIds });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border">
                <div className="space-y-0.5">
                    <Label className="text-base">Mostrar Sección de Recursos</Label>
                    <p className="text-xs text-muted-foreground">Habilita esta sección para ofrecer descargas.</p>
                </div>
                <Switch
                    checked={resources.visible}
                    onCheckedChange={(c) => updateResources({ visible: c })}
                />
            </div>

            {resources.visible && (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-2">
                        <Label>Título de Sección</Label>
                        <Input
                            value={resources.title}
                            onChange={(e) => updateResources({ title: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Subtítulo</Label>
                        <Input
                            value={resources.subtitle}
                            onChange={(e) => updateResources({ subtitle: e.target.value })}
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Recursos Disponibles</Label>
                            <Button variant="link" size="sm" asChild className="h-auto p-0 text-blue-600">
                                <Link to="/admin/recursos" target="_blank" className="flex items-center gap-1">
                                    Administrar Biblioteca <ExternalLink size={12} />
                                </Link>
                            </Button>
                        </div>

                        {isLoading ? (
                            <div className="py-4 text-center"><Loader2 className="animate-spin inline mr-2" /> Cargando...</div>
                        ) : globalResources.length === 0 ? (
                            <div className="py-4 text-center text-sm text-muted-foreground border-2 border-dashed rounded">
                                No hay recursos en la biblioteca global.
                            </div>
                        ) : (
                            <div className="grid gap-2">
                                {globalResources.map((res: any) => (
                                    <div key={res.id} className="flex items-start space-x-3 p-3 border rounded hover:bg-slate-50 relative">
                                        <Checkbox
                                            id={`res-${res.id}`}
                                            checked={resources.enabledResourceIds.includes(res.id)}
                                            onCheckedChange={(c) => toggleResource(res.id, !!c)}
                                            className="mt-1"
                                        />
                                        <div className="flex-1 space-y-1">
                                            <Label htmlFor={`res-${res.id}`} className="font-medium cursor-pointer flex items-center gap-2">
                                                <FileText size={14} className="text-muted-foreground" />
                                                {res.title}
                                            </Label>
                                            <p className="text-xs text-muted-foreground line-clamp-1">{res.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResourcesEditor;
