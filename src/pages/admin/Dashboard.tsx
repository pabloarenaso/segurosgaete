import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Edit, Copy, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { landingService } from "@/services/api";
import { toast } from "sonner";
import { Landing } from "@/types/landing.types";
import { Star, StarOff } from "lucide-react";
// import { MENU_CATEGORIES } from "@/config/categories";

const MENU_CATEGORIES = [
    "Seguros para Personas",
    "Seguros para Empresas",
    "Seguros Comunidades",
    "Seguros de Ingeniería"
];

const Dashboard = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [duplicateItem, setDuplicateItem] = useState<Landing | null>(null);
    const [dupName, setDupName] = useState("");
    const [dupSlug, setDupSlug] = useState("");
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const [newName, setNewName] = useState("");
    const [newSlug, setNewSlug] = useState("");
    const [category, setCategory] = useState("Seguros para Empresas"); // Default

    // Fetch Landings
    const { data: landings = [], isLoading, isError } = useQuery({
        queryKey: ['landings'],
        queryFn: landingService.getAll,
        refetchOnWindowFocus: true
    });

    const featuredCount = landings.filter((l: any) => l.isFeatured).length;

    // Mutations
    const createMutation = useMutation({
        mutationFn: landingService.create,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['landings'] });
            setIsCreateOpen(false);
            toast.success("Landing creada exitosamente");
            setNewName("");
            setNewSlug("");
            // Navigate to editor
            navigate(`/admin/editor/${data.id}`);
        },
        onError: (err: any) => {
            console.error("Create Mutation Error:", err);
            const msg = err.response?.data?.details || err.response?.data?.error || err.message || "Error al crear landing";
            toast.error(`Error: ${msg}`);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: landingService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['landings'] });
            setDeleteId(null);
            toast.success("Landing eliminada");
        }
    });

    const toggleFeaturedMutation = useMutation({
        mutationFn: async ({ id, isFeatured }: { id: string, isFeatured: boolean }) => {
            // We need to fetch the full landing first to update it, 
            // but the table only has summary data. 
            // Ideally backend would support PATCH, but we have PUT.
            // For now, let's assume we can just send the flag? No, PUT replaces content.
            // We need to fetch, then update.
            const fullLanding = await landingService.getById(id);
            return landingService.update(id, { ...fullLanding, isFeatured });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['landings'] });
            toast.success("Estado destacado actualizado");
        },
        onError: (err: any) => {
            const msg = err.response?.data?.details || err.response?.data?.error || "Error al actualizar estado";
            toast.error(msg);
        }
    });

    const duplicateMutation = useMutation({
        mutationFn: async () => {
            if (!duplicateItem) return;
            // 1. Fetch full source content
            const fullSource = await landingService.getById(duplicateItem.id);
            const sourceContent = fullSource.content || {};

            // 2. Create the new landing (basic info)
            const newLanding = await landingService.create({
                name: dupName,
                slug: dupSlug,
                menuCategory: fullSource.menuCategory,
                // content: sourceContent // Try sending content, but we'll force update next to be sure
            });

            // 3. Force update with the content to ensure it's identical
            // This bypasses any "create with default content" logic the backend might have
            if (newLanding && newLanding.id) {
                await landingService.update(newLanding.id, {
                    ...newLanding,
                    content: sourceContent, // Deep copy effectively
                    isFeatured: false // Reset featured status
                });
            }

            return newLanding;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['landings'] });
            setDuplicateItem(null);
            toast.success("Landing duplicada exitosamente");
            if (data?.id) {
                navigate(`/admin/editor/${data.id}`);
            }
        },
        onError: (err: any) => {
            const msg = err.response?.data?.details || err.response?.data?.error || err.message || "Error al duplicar";
            toast.error(msg);
        }
    });

    const handleDuplicateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        duplicateMutation.mutate();
    };

    // Auto-generate duplicate slug
    const handleDupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setDupName(val);
        // Use source category for slug gen
        if (duplicateItem) {
            setDupSlug(generateSlug(val, duplicateItem.menuCategory));
        }
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createMutation.mutate({ name: newName, slug: newSlug, menuCategory: category });
    };

    const handleDelete = () => {
        if (deleteId) deleteMutation.mutate(deleteId);
    };

    // Auto-generate slug from name and category
    const generateSlug = (name: string, cat: string) => {
        const nameSlug = slugify(name);
        const catSlug = cat ? slugify(cat) : '';
        return catSlug ? `/${catSlug}/${nameSlug}` : `/${nameSlug}`;
    };

    useEffect(() => {
        if (newName) {
            setNewSlug(generateSlug(newName, category));
        }
    }, [category]);

    // Auto-generate slug from name
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setNewName(val);
        // Auto update slug if it hasn't been manually edited (simple heuristic or always)
        // For simplicity, always update based on current inputs
        setNewSlug(generateSlug(val, category));
    };

    const slugify = (text: string) => {
        return text.toLowerCase().trim().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    };

    return (
        <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-800">Panel de Landings</h2>
                    <p className="text-muted-foreground mt-1">Gestiona tus páginas de aterrizaje desde aquí.</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Featured Count Indicator */}
                    {!isLoading && (
                        <div className={`text-xs font-semibold px-3 py-1.5 rounded-full border flex items-center gap-1 ${featuredCount >= 8
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                            <Star className="w-3.5 h-3.5" fill="currentColor" />
                            <span>Destacados: {featuredCount}/8</span>
                        </div>
                    )}

                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                                <Plus size={18} /> Nueva Landing
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Crear Nueva Landing Page</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleCreate} className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre del Seguro</Label>
                                    <Input
                                        id="name"
                                        value={newName}
                                        onChange={handleNameChange}
                                        placeholder="Ej: Seguro de Vida"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">URL Amigable (Slug)</Label>
                                    <Input
                                        id="slug"
                                        value={newSlug}
                                        onChange={(e) => setNewSlug(e.target.value)}
                                        placeholder="/seguros/ejemplo"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Categoría en Menú</Label>
                                    <select
                                        id="category"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="">-- No incluír en menú --</option>
                                        <option value="Seguros">Seguros (General)</option>
                                        {MENU_CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-muted-foreground">Selecciona dónde aparecerá el enlace a esta landing.</p>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={createMutation.isPending}>
                                        {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Crear Landing
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>URL</TableHead>
                            <TableHead className="text-center">Destacado</TableHead>
                            <TableHead>Última Modificación</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                    Cargando...
                                </TableCell>
                            </TableRow>
                        ) : landings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                    No hay landings creadas aún.
                                </TableCell>
                            </TableRow>
                        ) : (
                            landings.map((landing: any) => (
                                <TableRow key={landing.id}>
                                    <TableCell className="font-medium text-slate-700">
                                        {landing.name}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-sm">
                                        {landing.slug}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleFeaturedMutation.mutate({ id: landing.id, isFeatured: !landing.isFeatured })}
                                            disabled={toggleFeaturedMutation.isPending}
                                            className={landing.isFeatured ? "text-yellow-500 hover:text-yellow-600" : "text-gray-300 hover:text-yellow-500"}
                                        >
                                            {landing.isFeatured ? <Star size={18} fill="currentColor" /> : <StarOff size={18} />}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        {landing.updatedAt ? new Date(landing.updatedAt).toLocaleDateString() : '-'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" title="Ver" asChild>
                                                {/* In dev mode, we link to dynamic landing route. 
                                                    Ideally: /preview/{id} or dynamic route */}
                                                <Link to={`/admin/preview/${landing.id}`} target="_blank">
                                                    <ExternalLink size={16} />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Editar" asChild>
                                                <Link to={`/admin/editor/${landing.id}`}>
                                                    <Edit size={16} className="text-blue-600" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="Duplicar"
                                                onClick={() => {
                                                    setDuplicateItem(landing);
                                                    setDupName(`${landing.name} (Copia)`);
                                                    setDupSlug(`${landing.slug}-clon`);
                                                }}
                                            >
                                                {duplicateMutation.isPending ? (
                                                    <Loader2 size={16} className="animate-spin text-amber-600" />
                                                ) : (
                                                    <Copy size={16} className="text-amber-600" />
                                                )}
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Eliminar" onClick={() => setDeleteId(landing.id)}>
                                                <Trash2 size={16} className="text-red-600" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará la landing y su configuración.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                        >
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Duplicate Dialog */}
            <Dialog open={!!duplicateItem} onOpenChange={(open) => !open && setDuplicateItem(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Duplicar Landing Page</DialogTitle>
                    </DialogHeader>
                    <div className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded mb-2 border border-yellow-100">
                        <p><strong>Atención:</strong> Estás a punto de duplicar "{duplicateItem?.name}".</p>
                        <p>Verifica el nombre y URL para la copia.</p>
                    </div>
                    <form onSubmit={handleDuplicateSubmit} className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="dupName">Nombre de la Copia</Label>
                            <Input
                                id="dupName"
                                value={dupName}
                                onChange={handleDupNameChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dupSlug">URL Amigable (Slug)</Label>
                            <Input
                                id="dupSlug"
                                value={dupSlug}
                                onChange={(e) => setDupSlug(e.target.value)}
                                required
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={duplicateMutation.isPending} className="bg-amber-600 hover:bg-amber-700 text-white">
                                {duplicateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Confirmar Duplicación
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Dashboard;
