import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useEditorStore } from "@/store/editorStore";
import { FormField } from "@/types/landing.types";

import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

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

    const addField = () => {
        const newField: FormField = {
            id: `field_${Date.now()}`,
            label: "Nuevo Campo",
            type: "text",
            required: false,
            step: 1
        };

        updateLanding({
            content: {
                ...currentLanding.content,
                form: { ...form, fields: [...form.fields, newField] }
            }
        });
    };

    const removeField = (index: number) => {
        const newFields = form.fields.filter((_, i) => i !== index);
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
            <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
                <Label className="text-base font-semibold">Configuración General</Label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Título del Formulario</Label>
                        <Input
                            value={form.title}
                            onChange={(e) => updateFormTitle(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Email de Destino</Label>
                        <Input
                            value={form.emailTo || ''}
                            onChange={(e) => updateLanding({
                                content: { ...currentLanding.content, form: { ...form, emailTo: e.target.value } }
                            })}
                            placeholder="contacto@segurosgaete.cl"
                        />
                        <p className="text-xs text-muted-foreground">Por defecto: contacto@segurosgaete.cl</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Respuesta Automática (Body del Email)</Label>
                    <Textarea
                        value={form.successMessage || ''}
                        onChange={(e) => updateLanding({
                            content: { ...currentLanding.content, form: { ...form, successMessage: e.target.value } }
                        })}
                        placeholder="Mensaje genérico que le llegará al usuario..."
                        rows={2}
                    />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                        id="enableStep2"
                        checked={form.enableStep2 || false}
                        onCheckedChange={(checked) => updateLanding({
                            content: { ...currentLanding.content, form: { ...form, enableStep2: !!checked } }
                        })}
                    />
                    <Label htmlFor="enableStep2" className="cursor-pointer">Habilitar Paso 2 (Formulario Multi-paso)</Label>
                </div>
            </div>

            <div className="space-y-4">
                <Label className="text-base font-semibold">Campos del Formulario</Label>
                {form.fields.map((field, index) => (
                    <Card key={field.id || index} className="bg-slate-50">
                        <CardContent className="p-4 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono text-muted-foreground">ID: {field.id}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => removeField(index)}
                                        title="Eliminar campo"
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`req-${index}`}
                                        checked={field.required}
                                        onCheckedChange={(c) => updateField(index, { required: !!c })}
                                    />
                                    <Label htmlFor={`req-${index}`} className="text-sm cursor-pointer">Requerido</Label>
                                </div>
                            </div>

                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 md:col-span-5 space-y-2">
                                    <Label>Etiqueta</Label>
                                    <Input
                                        value={field.label}
                                        onChange={(e) => updateField(index, { label: e.target.value })}
                                        placeholder="Label del campo"
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-4 space-y-2">
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
                                {form.enableStep2 && (
                                    <div className="col-span-12 md:col-span-3 space-y-2">
                                        <Label>Paso</Label>
                                        <Select
                                            value={field.step?.toString() || "1"}
                                            onValueChange={(val) => updateField(index, { step: parseInt(val) })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Paso 1</SelectItem>
                                                <SelectItem value="2">Paso 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
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

                <Button variant="outline" onClick={addField} className="w-full gap-2 border-dashed">
                    <Plus size={16} /> Agregar Campo
                </Button>
            </div>
        </div>
    );
};

export default FormEditor;
