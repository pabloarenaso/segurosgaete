import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { landingService } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Trash2, Upload, Search, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock for now until API returns list of images
// Real implementation needs GET /api/images or similar.
// Since I didn't verify that endpoint, I'll rely on MOCK + upload.
// Wait, I *should* check if I can list images. 
// Step 77 server setup didn't include LIST images endpoint.
// I will add it to the implementation plan or server first??
// Actually, `ImagePicker` used a mock list. 
// I SHOULD update the server to list images from the uploads folder.

// Let's stub the component first, and realize I need to update the server.

const Images = () => {
    const [uploading, setUploading] = useState(false);
    const queryClient = useQueryClient();

    // Real API fetch
    const { data: images = [], isLoading } = useQuery({
        queryKey: ['images'],
        queryFn: landingService.getAllImages
    });

    const uploadMutation = useMutation({
        mutationFn: landingService.uploadImage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['images'] });
            toast.success("Imagen subida correctamente");
        },
        onError: () => toast.error("Error al subir imagen")
    });

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            await uploadMutation.mutateAsync(file);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Biblioteca de Imágenes</h1>
                    <p className="text-gray-500">Gestiona las imágenes utilizadas en tus landing pages.</p>
                </div>
                <div className="relative">
                    <Button disabled={uploading} className="relative cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            onChange={handleUpload}
                        />
                        {uploading ? <Loader2 className="animate-spin mr-2" /> : <Upload className="mr-2 h-4 w-4" />}
                        Subir Imagen
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-6">
                    {/* Gallery Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {images.map((img: any, idx: number) => (
                            <div key={idx} className="group relative border rounded-lg overflow-hidden aspect-square bg-slate-50 shadow-sm hover:shadow-md transition-all">
                                <img src={img.url} alt={img.name} className="w-full h-full object-cover" />

                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                                    <span className="text-white text-xs truncate max-w-full px-2">{img.name}</span>
                                    <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => toast.info("Eliminar no implementado en MVP")}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Images;
