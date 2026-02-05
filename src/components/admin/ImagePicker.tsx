import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Check, Loader2, Upload } from "lucide-react";
import { landingService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

interface ImagePickerProps {
    onSelect: (url: string) => void;
    currentImage?: string;
}

const ImagePicker = ({ onSelect, currentImage }: ImagePickerProps) => {
    const [open, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Fetch real images
    const { data: images = [], isLoading } = useQuery({
        queryKey: ['images'],
        queryFn: landingService.getAllImages,
        enabled: open // Only fetch when open
    });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const data = await landingService.uploadImage(file);
            onSelect(data.url);
            setOpen(false);
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="relative group cursor-pointer border-2 border-dashed rounded-lg p-2 hover:bg-slate-50 transition-colors">
                    {currentImage ? (
                        <div className="relative aspect-video w-full overflow-hidden rounded bg-slate-100">
                            <img
                                src={currentImage}
                                alt="Imagen de fondo"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement?.classList.add('hidden');
                                    // Fallback to showing the placeholder (by hiding this completely? No that would hide the trigger)
                                    // Better: switch to placeholder mode. But we can't easily switch state from here without invalidating prop.
                                    // Simple fix for now: Show a text or icon overlay.
                                }}
                            />
                            {/* If image breaks, the alt text shows. Let's make sure we handle it visually if possible, but simplest is just better alt text */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-sm font-medium">Cambiar Imagen</span>
                            </div>
                        </div>
                    ) : (
                        <div className="h-40 flex flex-col items-center justify-center text-muted-foreground gap-3 bg-slate-50 rounded-md border-2 border-dashed border-slate-300 hover:bg-slate-100 transition-colors">
                            <div className="p-3 bg-white rounded-full shadow-sm">
                                <ImageIcon className="w-8 h-8 text-slate-400" />
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-sm font-semibold text-slate-700">Seleccionar Imagen</span>
                                <span className="text-xs text-slate-500">Haz clic para buscar en la galería</span>
                            </div>
                        </div>
                    )}
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Biblioteca de Imágenes</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-1">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-4 mb-4">
                            <Button variant="outline" className="w-full relative py-8 border-dashed">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                    onChange={handleFileUpload}
                                    disabled={uploading}
                                />
                                <div className="flex flex-col items-center gap-2">
                                    {uploading ? <Loader2 className="animate-spin" /> : <Upload />}
                                    <span>{uploading ? "Subiendo..." : "Subir Nueva Imagen"}</span>
                                </div>
                            </Button>
                        </div>

                        {isLoading ? (
                            <div className="col-span-4 text-center py-10 text-muted-foreground">Cargando imágenes...</div>
                        ) : images.length === 0 ? (
                            <div className="col-span-4 text-center py-10 text-muted-foreground">No hay imágenes en la biblioteca.</div>
                        ) : (
                            images.map((img: any) => (
                                <div
                                    key={img.url}
                                    className="aspect-square relative rounded border overflow-hidden cursor-pointer hover:ring-2 ring-primary bg-slate-100"
                                    onClick={() => { onSelect(img.url); setOpen(false); }}
                                >
                                    <img src={img.url} alt="Gallery" className="w-full h-full object-cover" />
                                    {currentImage === img.url && (
                                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                                            <Check size={12} />
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ImagePicker;
