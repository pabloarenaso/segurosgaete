import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { landingService } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Save, Link as LinkIcon, Folder, FileText } from 'lucide-react';
import { toast } from 'sonner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuItem } from '@/types/menu.types';

const MenuManager = () => {
    const queryClient = useQueryClient();
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [hasChanges, setHasChanges] = useState(false);

    const { data: serverMenu, isLoading } = useQuery({
        queryKey: ['menu'],
        queryFn: landingService.getMenu,
    });

    useEffect(() => {
        if (serverMenu && Array.isArray(serverMenu.items)) {
            // Ensure items have a type, default to link if missing (legacy compatibility)
            const sanitize = (items: any[]): MenuItem[] => items.map(i => ({
                ...i,
                type: i.type || (i.items && i.items.length > 0 ? 'category' : 'link'),
                items: i.items ? sanitize(i.items) : []
            }));
            setMenuItems(sanitize(serverMenu.items));
        }
    }, [serverMenu]);


    const saveMutation = useMutation({
        mutationFn: landingService.saveMenu,
        onSuccess: () => {
            toast.success("Menú actualizado correctamente");
            queryClient.invalidateQueries({ queryKey: ['menu'] });
            setHasChanges(false);
        },
        onError: () => {
            toast.error("Error al guardar el menú");
        }
    });

    const handleSave = () => {
        saveMutation.mutate({ items: menuItems });
    };

    const updateItem = (path: number[], field: keyof MenuItem, value: any) => {
        const newMenu = [...menuItems];
        let current: any = newMenu;

        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]].items;
        }

        current[path[path.length - 1]][field] = value;
        setMenuItems(newMenu);
        setHasChanges(true);
    };

    const addItem = (path: number[], type: 'category' | 'link') => {
        const newMenu = [...menuItems];

        const newItem: MenuItem = {
            label: type === 'category' ? 'Nueva Categoría' : 'Nuevo Enlace',
            href: type === 'category' ? '#' : '/',
            type: type,
            items: []
        };

        if (path.length === 0) {
            // Add to root
            newMenu.push(newItem);
        } else {
            let current: any = newMenu;
            for (let i = 0; i < path.length; i++) {
                current = current[path[i]];
                if (i < path.length - 1) current = current.items;
            }
            if (!current.items) current.items = [];
            current.items.push(newItem);
        }

        setMenuItems(newMenu);
        setHasChanges(true);
    };

    const deleteItem = (path: number[]) => {
        const newMenu = [...menuItems];

        if (path.length === 1) {
            newMenu.splice(path[0], 1);
        } else {
            let current: any = newMenu;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]].items;
            }
            current.splice(path[path.length - 1], 1);
        }

        setMenuItems(newMenu);
        setHasChanges(true);
    };

    const renderTypeIcon = (type: string) => {
        switch (type) {
            case 'category': return <Folder className="w-4 h-4 text-blue-500" />;
            case 'landing': return <FileText className="w-4 h-4 text-green-500" />;
            case 'link': return <LinkIcon className="w-4 h-4 text-gray-500" />;
            default: return <LinkIcon className="w-4 h-4" />;
        }
    };

    const renderTypeLabel = (type: string) => {
        switch (type) {
            case 'category': return "Categoría";
            case 'landing': return "Landing Page";
            case 'link': return "Enlace";
            default: return "Item";
        }
    };

    const renderTree = (items: MenuItem[], path: number[] = []) => {
        return (
            <ul className="pl-4 space-y-2 border-l border-border ml-2">
                {items.map((item, index) => {
                    const currentPath = [...path, index];
                    const isLanding = item.type === 'landing';
                    const isCategory = item.type === 'category';

                    return (
                        <li key={index} className="space-y-2">
                            <div className="flex items-center gap-2 bg-card p-2 rounded-md border border-border">
                                <div className="grid gap-2 flex-1 md:grid-cols-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 flex justify-center" title={renderTypeLabel(item.type)}>
                                            {renderTypeIcon(item.type)}
                                        </div>
                                        <div className="flex-1">
                                            <Label className="text-[10px] text-muted-foreground uppercase">{renderTypeLabel(item.type)}</Label>
                                            <Input
                                                value={item.label}
                                                onChange={(e) => updateItem(currentPath, 'label', e.target.value)}
                                                className="h-8"
                                                disabled={isLanding} // Landing names controlled by landing itself
                                                placeholder="Etiqueta"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1">
                                            <Label className="text-[10px] text-muted-foreground uppercase">URL</Label>
                                            <Input
                                                value={item.href}
                                                onChange={(e) => updateItem(currentPath, 'href', e.target.value)}
                                                className="h-8 font-mono text-xs"
                                                disabled={isLanding || isCategory} // Categories usually don't have links, Landings controlled by slug
                                                placeholder={isCategory ? "Agrupador" : "/url"}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    {isCategory && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-primary"
                                            onClick={() => addItem(currentPath, 'link')}
                                            title="Agregar enlace interno/externo"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive"
                                        onClick={() => deleteItem(currentPath)}
                                        title="Eliminar"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {item.items && item.items.length > 0 && renderTree(item.items, currentPath)}
                        </li>
                    );
                })}
            </ul>
        );
    };

    if (isLoading) return <div>Cargando menú...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Gestión del Menú</h2>
                    <p className="text-muted-foreground">Estructura del sitio. Las <b>Landings</b> se agregan desde la pestaña "Landings".</p>
                </div>
                <Button onClick={handleSave} disabled={!hasChanges && !saveMutation.isPending}>
                    <Save className="w-4 h-4 mr-2" />
                    {saveMutation.isPending ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
            </div>

            <div className="bg-background rounded-xl border border-border p-6">
                {/* Root Level Render - slightly different wrapper than recursive to handle root naming if needed, 
                 but for now we use the same recursive function logic manually unrolled for root to show specific "Add" buttons */}

                {menuItems.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">El menú está vacío.</p>
                    </div>
                )}

                <div className="space-y-4">
                    {menuItems.map((item, index) => (
                        <div key={index}>
                            <div className="flex items-center gap-2 bg-secondary/30 p-3 rounded-lg border border-border mb-2">
                                <div className="grid gap-2 flex-1 md:grid-cols-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 flex justify-center" title={renderTypeLabel(item.type)}>
                                            {renderTypeIcon(item.type)}
                                        </div>
                                        <div className="flex-1">
                                            <Label className="text-[10px] text-muted-foreground uppercase">{renderTypeLabel(item.type)}</Label>
                                            <Input
                                                value={item.label}
                                                onChange={(e) => updateItem([index], 'label', e.target.value)}
                                                className="h-9 font-medium"
                                                disabled={item.type === 'landing'}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1">
                                            <Label className="text-[10px] text-muted-foreground uppercase">URL</Label>
                                            <Input
                                                value={item.href}
                                                onChange={(e) => updateItem([index], 'href', e.target.value)}
                                                className="h-9 font-mono text-xs"
                                                disabled={item.type === 'landing' || item.type === 'category'}
                                                placeholder={item.type === 'category' ? "#" : "/url"}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {item.type === 'category' && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-primary"
                                            onClick={() => addItem([index], 'link')}
                                            title="Agregar enlace dentro de esta categoría"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive"
                                        onClick={() => deleteItem([index])}
                                        title="Eliminar"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            {item.items && item.items.length > 0 && renderTree(item.items, [index])}
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 mt-6 border-t pt-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full border-dashed">
                                <Plus className="w-4 h-4 mr-2" />
                                Agregar Item Principal
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => addItem([], 'category')}>
                                <Folder className="w-4 h-4 mr-2" /> Nueva Categoría
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => addItem([], 'link')}>
                                <LinkIcon className="w-4 h-4 mr-2" /> Nuevo Enlace
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};

export default MenuManager;
