import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { landingService } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus, FileText, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const Resources = () => {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        url: '',
        buttonText: 'Descargar'
    });

    const { data: resources = [], isLoading } = useQuery({
        queryKey: ['resources'],
        queryFn: landingService.getAllResources
    });

    const createMutation = useMutation({
        mutationFn: landingService.saveResource,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['resources'] });
            setOpen(false);
            setFormData({ title: '', description: '', url: '', buttonText: 'Descargar' });
            toast.success("Recurso creado");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createMutation.mutate(formData);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Biblioteca de Recursos</h1>
                    <p className="text-gray-500">Gestiona documentos y enlaces descargables.</p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus size={16} /> Nuevo Recurso
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Agregar Recurso</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Título</Label>
                                <Input
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Descripción</Label>
                                <Textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>URL de Descarga</Label>
                                <Input
                                    value={formData.url}
                                    onChange={e => setFormData({ ...formData, url: e.target.value })}
                                    placeholder="https://..."
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Texto del Botón</Label>
                                <Input
                                    value={formData.buttonText}
                                    onChange={e => setFormData({ ...formData, buttonText: e.target.value })}
                                />
                            </div>
                            <Button type="submit" disabled={createMutation.isPending} className="w-full">
                                {createMutation.isPending && <Loader2 className="animate-spin mr-2" />}
                                Guardar Recurso
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resources.map((res: any) => (
                    <div key={res.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{res.title}</h3>
                                    <p className="text-sm text-muted-foreground truncate max-w-[200px]">{res.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t flex justify-between items-center text-sm text-gray-500">
                            <a href={res.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                                Ver Enlace
                            </a>
                            {/* Delete would go here */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
