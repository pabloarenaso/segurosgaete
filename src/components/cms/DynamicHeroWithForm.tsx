import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { LandingContent, FormField } from '@/types/landing.types';

interface DynamicHeroWithFormProps {
    data: LandingContent;
    previewMode?: boolean;
}

const DynamicHeroWithForm = ({ data, previewMode = false }: DynamicHeroWithFormProps) => {
    const { hero, form: formConfig } = data;
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0);

    // Split fields into steps logic
    // Step 1: Contact info (Name, Email, Phone, Company, Role)
    // Step 2: Details (Rut, Address, Units, etc)
    const { step1Fields, step2Fields } = useMemo(() => {
        const s1: FormField[] = [];
        const s2: FormField[] = [];

        // Enhanced Logic: Check if explicit 'step' property exists
        const hasExplicitSteps = formConfig.fields.some(f => f.step !== undefined);

        if (hasExplicitSteps) {
            formConfig.fields.forEach(field => {
                if (field.step === 2) {
                    s2.push(field);
                } else {
                    // Default to step 1
                    s1.push(field);
                }
            });
            return { step1Fields: s1, step2Fields: s2 };
        }

        // Backward Compatibility (Keyword matching)
        const contactKeywords = ['name', 'nombre', 'email', 'mail', 'phone', 'telefono', 'teléfono', 'company', 'empresa', 'cargo', 'position'];

        formConfig.fields.forEach(field => {
            const idLower = field.id.toLowerCase();
            if (contactKeywords.some(k => idLower.includes(k))) {
                s1.push(field);
            } else {
                s2.push(field);
            }
        });

        // Fallback: If everything went to s2 (no keywords match), put first 3 in s1
        if (s1.length === 0 && s2.length > 0) {
            return { step1Fields: s2.slice(0, 3), step2Fields: s2.slice(3) };
        }

        // Fallback: If s2 is empty, everything is in s1 (Single step)
        return { step1Fields: s1, step2Fields: s2 };
    }, [formConfig.fields]);

    const hasStep2 = step2Fields.length > 0;
    const totalSteps = hasStep2 ? 2 : 1;

    // Generate Schema dynamically
    const schema = useMemo(() => {
        const shape: any = {};
        formConfig.fields.forEach((field: FormField) => {
            let validator: any = z.string();
            if (field.type === 'email') validator = validator.email("Email inválido");
            if (field.required) {
                validator = validator.min(1, `${field.label} es requerido`);
            } else {
                validator = validator.optional();
            }
            shape[field.id] = validator;
        });
        return z.object(shape);
    }, [formConfig.fields]);

    const { register, handleSubmit, trigger, setValue, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema),
        mode: 'onBlur'
    });

    const onSubmit = async (formData: any) => {
        console.log('CMS Form Data:', formData);
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success('¡Solicitud enviada!', {
            description: 'Un ejecutivo te contactará a la brevedad.'
        });
        setStep(1);
    };

    const handleNext = async () => {
        if (previewMode) {
            setDirection(1);
            setStep(2);
            return;
        }

        const fieldsToValidate = step1Fields.map(f => f.id);
        const isStep1Valid = await trigger(fieldsToValidate);
        if (isStep1Valid) {
            setDirection(1);
            setStep(2);
        }
    };

    const handleBack = () => {
        setDirection(-1);
        setStep(1);
    };

    const variants = {
        enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0 })
    };

    return (
        <section className="relative bg-slate-50 overflow-hidden py-16 lg:py-24">
            {/* Decorative background element - MATCHING ORIGINAL DESIGN */}
            {/* Decorative background element - RESPONSIVE SCALING */}
            <div className="absolute top-0 right-0 w-[80%] pt-[80%] md:w-[60%] md:pt-[60%] bg-gaete-primary/20 rounded-full -z-0 translate-x-1/3 -translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Left Column: Text Content */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h1 className="text-4xl lg:text-6xl font-heading font-bold text-gaete-primary leading-tight mb-6">
                            {hero.title}
                        </h1>
                        <p className="text-lg lg:text-xl font-body text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 whitespace-pre-line">
                            {hero.subtitle}
                        </p>
                        {hero.backgroundImage && (
                            <div className="mt-8 hidden lg:block rounded-2xl overflow-hidden shadow-2xl border border-gray-200 w-full max-w-[600px] aspect-video">
                                <img
                                    src={hero.backgroundImage}
                                    alt={hero.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Right Column: Multi-step Form */}
                    <div className="lg:w-1/2 w-full max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">

                            {/* Header / Progress */}
                            <div className="bg-gray-50 px-8 py-5 border-b border-gray-100 flex justify-between items-center">
                                <span className="font-heading font-bold text-gray-700 text-lg">{formConfig.title}</span>
                                {hasStep2 && (
                                    <div className="flex items-center gap-3">
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${step >= 1 ? "bg-gaete-primary border-gaete-primary text-white shadow-md scale-110" : "border-gray-300 text-gray-400"}`}>
                                            <span className="font-bold text-sm">1</span>
                                        </div>
                                        <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-gaete-primary transition-all duration-500 ease-out" style={{ width: step === 2 ? '100%' : '0%' }} />
                                        </div>
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${step >= 2 ? "bg-gaete-primary border-gaete-primary text-white shadow-md scale-110" : "border-gray-300 text-gray-400 bg-white"}`}>
                                            <span className="font-bold text-sm">2</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-8">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <AnimatePresence mode="wait" custom={direction}>
                                        {step === 1 ? (
                                            <motion.div
                                                key="step1"
                                                custom={direction}
                                                variants={variants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{ duration: 0.3 }}
                                                className="space-y-4"
                                            >
                                                {step1Fields.map((field) => (
                                                    <div key={field.id} className="space-y-2">
                                                        <Label className="text-gaete-primary font-semibold">
                                                            {field.label} {field.required && <span className="text-red-500">*</span>}
                                                        </Label>
                                                        {field.type === 'select' ? (
                                                            <Select onValueChange={(val) => setValue(field.id, val, { shouldValidate: true })}>
                                                                <SelectTrigger className={errors[field.id] ? "border-red-500" : ""}>
                                                                    <SelectValue placeholder={field.placeholder || "Seleccionar..."} />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {field.options?.map((opt) => (
                                                                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        ) : (
                                                            <Input
                                                                {...register(field.id)}
                                                                type={field.type}
                                                                placeholder={field.placeholder}
                                                                className={errors[field.id] ? "border-red-500" : ""}
                                                            />
                                                        )}
                                                        {errors[field.id] && <p className="text-red-500 text-xs">{errors[field.id]?.message as string}</p>}
                                                    </div>
                                                ))}

                                                {hasStep2 ? (
                                                    <Button
                                                        type="button"
                                                        onClick={handleNext}
                                                        className="w-full bg-gaete-primary hover:bg-gaete-primary/90 text-white font-bold py-6 rounded-xl mt-4 text-base shadow-lg hover:shadow-xl transition-all"
                                                    >
                                                        Continuar <ArrowRight className="ml-2 w-5 h-5" />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-full bg-gaete-accent hover:bg-gaete-accent/90 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all mt-4"
                                                    >
                                                        {isSubmitting ? 'Enviando...' : 'SOLICITAR COTIZACIÓN'}
                                                    </Button>
                                                )}
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="step2"
                                                custom={direction}
                                                variants={variants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{ duration: 0.3 }}
                                                className="space-y-4"
                                            >
                                                <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-2 text-sm text-blue-700 mb-4 border border-blue-100">
                                                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                                                    <p>¡Casi listo! Completa estos datos para una cotización más exacta.</p>
                                                </div>

                                                {step2Fields.map((field) => (
                                                    <div key={field.id} className="space-y-2">
                                                        <Label className="text-gaete-primary font-semibold">
                                                            {field.label} {field.required && <span className="text-red-500">*</span>}
                                                        </Label>
                                                        {field.type === 'select' ? (
                                                            <Select onValueChange={(val) => setValue(field.id, val, { shouldValidate: true })}>
                                                                <SelectTrigger className={errors[field.id] ? "border-red-500" : ""}>
                                                                    <SelectValue placeholder={field.placeholder || "Seleccionar..."} />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {field.options?.map((opt) => (
                                                                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        ) : (
                                                            <Input
                                                                {...register(field.id)}
                                                                type={field.type}
                                                                placeholder={field.placeholder}
                                                                className={errors[field.id] ? "border-red-500" : ""}
                                                            />
                                                        )}
                                                        {errors[field.id] && <p className="text-red-500 text-xs">{errors[field.id]?.message as string}</p>}
                                                    </div>
                                                ))}

                                                <div className="flex gap-3 mt-6">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={handleBack}
                                                        className="flex-1 py-6 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
                                                    >
                                                        <ArrowLeft className="mr-2 w-4 h-4" /> Atrás
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="flex-[2] bg-gaete-accent hover:bg-gaete-accent/90 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                                                    >
                                                        {isSubmitting ? 'Enviando...' : 'SOLICITAR COTIZACIÓN'}
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DynamicHeroWithForm;
