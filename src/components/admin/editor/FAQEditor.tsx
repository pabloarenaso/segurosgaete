import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";
import ImagePicker from "../ImagePicker";

const FAQEditor = () => {
    const { currentLanding, updateLanding } = useEditorStore();

    if (!currentLanding) return null;
    const { faq } = currentLanding.content;

    const updateFAQ = (updates: any) => {
        updateLanding({
            content: {
                ...currentLanding.content,
                faq: { ...faq, ...updates }
            }
        });
    };

    const updateVideo = (field: string, value: string) => {
        updateFAQ({
            video: { ...faq.video, [field]: value }
        });
    };

    const updateQuestion = (index: number, field: string, value: string) => {
        const newQuestions = [...faq.questions];
        newQuestions[index] = { ...newQuestions[index], [field]: value };
        updateFAQ({ questions: newQuestions });
    };

    const addQuestion = () => {
        const newQuestion = {
            id: crypto.randomUUID(),
            question: "Nueva Pregunta",
            answer: ""
        };
        updateFAQ({ questions: [...faq.questions, newQuestion] });
    };

    const removeQuestion = (index: number) => {
        const newQuestions = faq.questions.filter((_, i) => i !== index);
        updateFAQ({ questions: newQuestions });
    };

    const moveQuestion = (index: number, direction: 'up' | 'down') => {
        const newQuestions = [...faq.questions];
        if (direction === 'up') {
            if (index === 0) return;
            [newQuestions[index - 1], newQuestions[index]] = [newQuestions[index], newQuestions[index - 1]];
        } else {
            if (index === newQuestions.length - 1) return;
            [newQuestions[index + 1], newQuestions[index]] = [newQuestions[index], newQuestions[index + 1]];
        }
        updateFAQ({ questions: newQuestions });
    };

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <Label className="text-base font-semibold">Configuración General</Label>
                <div className="space-y-2">
                    <Label>Título de Sección</Label>
                    <Input
                        value={faq.title}
                        onChange={(e) => updateFAQ({ title: e.target.value })}
                    />
                </div>
            </div>

            <Card className="bg-slate-50 border-blue-100">
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-blue-800">Video Destacado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>URL del Video (Embed URL)</Label>
                        <Input
                            value={faq.video?.iframeUrl || ''}
                            onChange={(e) => updateVideo('iframeUrl', e.target.value)}
                            placeholder="https://www.youtube.com/embed/..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Título del Video</Label>
                        <Input
                            value={faq.video?.title || ''}
                            onChange={(e) => updateVideo('title', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Imagen Miniatura</Label>
                        <ImagePicker
                            currentImage={faq.video?.thumbnail}
                            onSelect={(url) => updateVideo('thumbnail', url)}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Preguntas Frecuentes</Label>
                    <Button onClick={addQuestion} size="sm" className="gap-2">
                        <Plus size={16} /> Agregar Pregunta
                    </Button>
                </div>

                {faq.questions.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed rounded-lg text-muted-foreground">
                        No hay preguntas.
                    </div>
                )}

                {faq.questions.map((q, index) => (
                    <Card key={q.id || index} className="group hover:border-blue-300 transition-colors">
                        <CardContent className="p-4 flex gap-4">
                            <div className="w-8 pt-2 flex flex-col gap-1 items-center">
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveQuestion(index, 'up')} disabled={index === 0}>
                                    <ArrowUp size={14} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveQuestion(index, 'down')} disabled={index === faq.questions.length - 1}>
                                    <ArrowDown size={14} />
                                </Button>
                            </div>
                            <div className="flex-1 space-y-3">
                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">Pregunta</Label>
                                    <Input
                                        value={q.question}
                                        onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                                        className="font-medium"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">Respuesta</Label>
                                    <Textarea
                                        value={q.answer}
                                        onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
                                        rows={2}
                                    />
                                </div>
                            </div>
                            <div className="pt-2">
                                <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => removeQuestion(index)}>
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FAQEditor;
