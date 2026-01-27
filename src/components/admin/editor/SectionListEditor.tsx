import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import IconPicker from "../IconPicker";
import { useEditorStore } from "@/store/editorStore";

interface SectionListEditorProps {
    sectionKey: 'coverages' | 'benefits'; // Typed explicitly for our use cases
}

const SectionListEditor = ({ sectionKey }: SectionListEditorProps) => {
    const { currentLanding, updateLanding } = useEditorStore();

    if (!currentLanding) return null;
    const section = currentLanding.content[sectionKey];

    const updateSection = (updates: any) => {
        updateLanding({
            content: {
                ...currentLanding.content,
                [sectionKey]: { ...section, ...updates }
            }
        });
    };

    const updateItem = (index: number, field: string, value: string) => {
        const newItems = [...section.items];
        newItems[index] = { ...newItems[index], [field]: value };
        updateSection({ items: newItems });
    };

    const addItem = () => {
        const newItem = {
            id: crypto.randomUUID(),
            icon: "Shield", // Default
            title: "Nuevo Elemento",
            description: ""
        };
        updateSection({ items: [...section.items, newItem] });
    };

    const removeItem = (index: number) => {
        const newItems = section.items.filter((_, i) => i !== index);
        updateSection({ items: newItems });
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        const newItems = [...section.items];
        if (direction === 'up') {
            if (index === 0) return;
            [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
        } else {
            if (index === newItems.length - 1) return;
            [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
        }
        updateSection({ items: newItems });
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Título de Sección</Label>
                    <Input
                        value={section.title}
                        onChange={(e) => updateSection({ title: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Subtítulo</Label>
                    <Input
                        value={section.subtitle}
                        onChange={(e) => updateSection({ subtitle: e.target.value })}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Lista de Elementos</Label>
                    <Button onClick={addItem} size="sm" className="gap-2">
                        <Plus size={16} /> Agregar Elemento
                    </Button>
                </div>

                {section.items.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed rounded-lg text-muted-foreground">
                        No hay elementos. Agrega uno para comenzar.
                    </div>
                )}

                {section.items.map((item: any, index: number) => (
                    <Card key={item.id || index} className="group hover:border-blue-300 transition-colors">
                        <CardContent className="p-4 flex gap-4">
                            <div className="w-12 pt-8 flex flex-col gap-1 items-center">
                                {/* Sort Controls */}
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveItem(index, 'up')} disabled={index === 0}>
                                    <ArrowUp size={14} />
                                </Button>
                                <span className="text-xs text-muted-foreground font-mono">{index + 1}</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveItem(index, 'down')} disabled={index === section.items.length - 1}>
                                    <ArrowDown size={14} />
                                </Button>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-[150px_1fr] gap-4">
                                    <div className="space-y-2">
                                        <Label>Icono</Label>
                                        <IconPicker
                                            value={item.icon}
                                            onChange={(val) => updateItem(index, 'icon', val)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Título</Label>
                                        <Input
                                            value={item.title}
                                            onChange={(e) => updateItem(index, 'title', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Descripción</Label>
                                    <Textarea
                                        value={item.description}
                                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                                        rows={2}
                                    />
                                </div>
                            </div>

                            <div className="pt-8">
                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => removeItem(index)}>
                                    <Trash2 size={18} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SectionListEditor;
