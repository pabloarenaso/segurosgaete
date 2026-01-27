import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useEditorStore } from "@/store/editorStore";
import { FormField } from "@/types/landing.types";

const FIELD_TYPES = [
    { value: "text", label: "Texto" },
    { value: "email", label: "Email" },
    { value: "tel", label: "Teléfono" },
    { value: "select", label: "Lista Desplegable" }
];

const FormEditor = () => {
    const { currentLanding, updateLanding } = useEditorStore();

    if (!currentLanding) return null;
    const { form } = currentLanding.content;

    const updateFormTitle = (val: string) => {
        updateLanding({
            content: {
                ...currentLanding.content,
                form: { ...form, title: val }
            }
        });
    };

    const updateField = (index: number, updates: Partial<FormField>) => {
        const newFields = [...form.fields];
        newFields[index] = { ...newFields[index], ...updates };

        updateLanding({
            content: {
                ...currentLanding.content,
                form: { ...form, fields: newFields }
            }
        });
    };

    const handleOptionsChange = (index: number, val: string) => {
        // Split by comma or newline
        const options = val.split(/[,\n]/).map(s => s.trim()).filter(Boolean);
        updateField(index, { options });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Título del Formulario</Label>
                <Input
                    value={form.title}
                    onChange={(e) => updateFormTitle(e.target.value)}
                />
            </div>

            <div className="space-y-4">
                <Label className="text-base font-semibold">Campos del Formulario</Label>
                {form.fields.map((field, index) => (
                    <Card key={field.id || index} className="bg-slate-50">
                        <CardContent className="p-4 space-y-4">
                            <div className="flex items-start justify-between">
                                <span className="text-xs font-mono text-muted-foreground">Campo {index + 1} ({field.id})</span>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`req-${index}`}
                                        checked={field.required}
                                        onCheckedChange={(c) => updateField(index, { required: !!c })}
                                    />
                                    <Label htmlFor={`req-${index}`} className="text-sm cursor-pointer">Requerido</Label>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Etiqueta</Label>
                                    <Input
                                        value={field.label}
                                        onChange={(e) => updateField(index, { label: e.target.value })}
                                        placeholder="Label del campo"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Tipo</Label>
                                    <Select
                                        value={field.type}
                                        onValueChange={(val: any) => updateField(index, { type: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {FIELD_TYPES.map(t => (
                                                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Placeholder (Opcional)</Label>
                                <Input
                                    value={field.placeholder || ''}
                                    onChange={(e) => updateField(index, { placeholder: e.target.value })}
                                />
                            </div>

                            {field.type === 'select' && (
                                <div className="space-y-2 animate-in fade-in">
                                    <Label>Opciones (Separadas por coma o línea)</Label>
                                    <Textarea
                                        value={field.options?.join('\n')}
                                        onChange={(e) => handleOptionsChange(index, e.target.value)}
                                        placeholder="Opción 1, Opción 2..."
                                        rows={3}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FormEditor;
