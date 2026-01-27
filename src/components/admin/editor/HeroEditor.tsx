import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditorStore } from "@/store/editorStore";
import ImagePicker from "../ImagePicker";

const HeroEditor = () => {
    const { currentLanding, updateLanding } = useEditorStore();

    if (!currentLanding) return null;
    const { hero } = currentLanding.content;

    const updateHero = (field: string, value: string) => {
        updateLanding({
            content: {
                ...currentLanding.content,
                hero: {
                    ...hero,
                    [field]: value
                }
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Título Principal</Label>
                <Input
                    value={hero.title}
                    onChange={(e) => updateHero('title', e.target.value)}
                    placeholder="Ej: Seguro de Vida Integral"
                />
            </div>

            <div className="space-y-2">
                <Label>Subtítulo</Label>
                <Textarea
                    value={hero.subtitle}
                    onChange={(e) => updateHero('subtitle', e.target.value)}
                    placeholder="Breve descripción atractiva..."
                    rows={3}
                />
            </div>

            <div className="space-y-2">
                <Label>Imagen de Fondo</Label>
                <ImagePicker
                    currentImage={hero.backgroundImage}
                    onSelect={(url) => updateHero('backgroundImage', url)}
                />
                <p className="text-xs text-muted-foreground">Recomendado: 1920x1080px (JPG/WebP)</p>
            </div>
        </div>
    );
};

export default HeroEditor;
