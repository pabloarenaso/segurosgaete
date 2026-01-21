import { useState } from 'react';
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
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Schema for Step 1: Contact Info
const step1Schema = z.object({
    nombre: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    telefono: z.string().regex(/^\+?[0-9]{8,}$/, 'Teléfono inválido (mínimo 8 dígitos)'),
    cargo: z.enum(['Administrador', 'Miembro Comité', 'Residente'], {
        errorMap: () => ({ message: 'Selecciona un cargo' })
    }),
});

// Schema for Step 2: Community Info (Optional)
const step2Schema = z.object({
    comunidadNombre: z.string().optional(),
    comunidadRut: z.string().optional(),
    direccion: z.string().optional(),
    cantidadDeptos: z.string().optional(),
});

// Combined Schema
const quoteSchema = step1Schema.merge(step2Schema);

type QuoteForm = z.infer<typeof quoteSchema>;

interface HeroWithFormProps {
    title: string;
    subtitle: string;
    image?: string;
    defaultService?: string; // Kept for prop compatibility, but not used in form
    insuranceType?: string; // Kept for prop compatibility, but not used in form
}

const HeroWithForm = ({
    title,
    subtitle,
    image = "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600",
}: HeroWithFormProps) => {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0);

    const { register, handleSubmit, trigger, formState: { errors, isSubmitting } } = useForm<QuoteForm>({
        resolver: zodResolver(quoteSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: QuoteForm) => {
        console.log('Form data:', data);
        // Simulation of API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success('¡Solicitud recibida!', {
            description: 'Un ejecutivo te contactará a la brevedad.'
        });
        setStep(1); // Reset form or show success state
    };

    const handleNext = async () => {
        const isStep1Valid = await trigger(['nombre', 'email', 'telefono', 'cargo']);
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
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    return (
        <section className="relative bg-slate-50 overflow-hidden py-16 lg:py-24">
            {/* Decorative background element - Fixed Circle Shape */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] md:w-[700px] md:h-[700px] lg:w-[1200px] lg:h-[1200px] bg-gaete-primary/20 rounded-full -z-0 translate-x-1/3 -translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Left Column: Text Content */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h1 className="text-4xl lg:text-6xl font-heading font-bold text-gaete-primary leading-tight mb-6"
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                        <p className="text-lg lg:text-xl font-body text-gray-600 mb-8 max-w-xl">
                            {subtitle}
                        </p>

                        <div className="mt-8 hidden lg:block">
                            <img
                                src={image}
                                alt="Visual de Seguros"
                                className="rounded-lg shadow-2xl border border-gray-200 w-full max-w-[600px] h-[400px] object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Column: Multi-step Form */}
                    <div className="lg:w-1/2 w-full max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                            {/* Header / Progress */}
                            <div className="bg-gray-50 px-8 py-5 border-b border-gray-100 flex justify-between items-center">
                                <span className="font-heading font-bold text-gray-700 text-lg">Cotiza tu Seguro</span>
                                <div className="flex items-center gap-3">
                                    {/* Step 1 Indicator */}
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${step >= 1
                                            ? "bg-gaete-primary border-gaete-primary text-white shadow-md scale-110"
                                            : "border-gray-300 text-gray-400"
                                        }`}>
                                        <span className="font-bold text-sm">1</span>
                                    </div>

                                    {/* Connector Line */}
                                    <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gaete-primary transition-all duration-500 ease-out"
                                            style={{ width: step === 2 ? '100%' : '0%' }}
                                        />
                                    </div>

                                    {/* Step 2 Indicator */}
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${step >= 2
                                            ? "bg-gaete-primary border-gaete-primary text-white shadow-md scale-110"
                                            : "border-gray-300 text-gray-400 bg-white"
                                        }`}>
                                        <span className="font-bold text-sm">2</span>
                                    </div>
                                </div>
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
                                                <div className="space-y-2">
                                                    <Label htmlFor="nombre" className="text-gaete-primary font-semibold">Nombre*</Label>
                                                    <Input id="nombre" {...register('nombre')} className={errors.nombre && "border-red-500"} />
                                                    {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre.message}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="email" className="text-gaete-primary font-semibold">Mail*</Label>
                                                    <Input id="email" type="email" {...register('email')} className={errors.email && "border-red-500"} />
                                                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="telefono" className="text-gaete-primary font-semibold">Teléfono*</Label>
                                                    <Input id="telefono" placeholder="+569..." {...register('telefono')} className={errors.telefono && "border-red-500"} />
                                                    {errors.telefono && <p className="text-red-500 text-xs">{errors.telefono.message}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label className="text-gaete-primary font-semibold">Cargo en la comunidad*</Label>
                                                    <Select onValueChange={(val: any) => {
                                                        const event = { target: { value: val, name: 'cargo' } };
                                                        register('cargo').onChange(event);
                                                    }}>
                                                        <SelectTrigger className={errors.cargo && "border-red-500"}>
                                                            <SelectValue placeholder="Seleccionar cargo" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Administrador">Administrador</SelectItem>
                                                            <SelectItem value="Miembro Comité">Miembro Comité</SelectItem>
                                                            <SelectItem value="Residente">Residente</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.cargo && <p className="text-red-500 text-xs">{errors.cargo.message}</p>}
                                                </div>

                                                <Button
                                                    type="button"
                                                    onClick={handleNext}
                                                    className="w-full bg-gaete-primary hover:bg-gaete-primary/90 text-white font-bold py-6 rounded-xl mt-4 text-base shadow-lg hover:shadow-xl transition-all"
                                                >
                                                    Continuar <ArrowRight className="ml-2 w-5 h-5" />
                                                </Button>
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
                                                    <p>¡Casi listo! Si tienes estos datos, inclúyelos para una cotización más exacta (Opcional).</p>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="comunidadNombre">Nombre Comunidad</Label>
                                                    <Input id="comunidadNombre" {...register('comunidadNombre')} placeholder="Ej: Edificio Los Andes" />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="comunidadRut">RUT Comunidad</Label>
                                                    <Input id="comunidadRut" {...register('comunidadRut')} placeholder="12.345.678-9" />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="direccion">Dirección y Comuna</Label>
                                                    <Input id="direccion" {...register('direccion')} />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="cantidadDeptos">Cantidad de Departamentos</Label>
                                                    <Input id="cantidadDeptos" type="number" {...register('cantidadDeptos')} />
                                                </div>

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

export default HeroWithForm;
