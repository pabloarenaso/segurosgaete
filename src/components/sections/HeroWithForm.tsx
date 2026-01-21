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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const quoteSchema = z.object({
    nombre: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
    telefono: z.string().regex(/^\+?[0-9]{9,}$/, 'Teléfono inválido'),
    correo: z.string().email('Email inválido'),
    interes: z.string().min(1, 'Selecciona una opción'),
    servicios: z.array(z.string()).min(1, 'Selecciona al menos un servicio'),
});

type QuoteForm = z.infer<typeof quoteSchema>;

interface HeroWithFormProps {
    title: string;
    subtitle: string;
    image?: string;
    defaultService?: string;
    insuranceType?: string;
}

const HeroWithForm = ({
    title,
    subtitle,
    image = "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600",
    defaultService,
    insuranceType
}: HeroWithFormProps) => {
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<QuoteForm>({
        resolver: zodResolver(quoteSchema),
        defaultValues: {
            servicios: defaultService ? [defaultService] : [],
            interes: insuranceType || '',
        }
    });

    const onSubmit = async (data: QuoteForm) => {
        console.log('Form data:', data);
        // Simulation of API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('¡Cotización enviada!', { description: 'Te contactaremos en menos de 24 horas' });
    };

    const selectedServices = watch('servicios') || [];

    const handleServiceChange = (service: string) => {
        const next = selectedServices.includes(service)
            ? selectedServices.filter(s => s !== service)
            : [...selectedServices, service];
        setValue('servicios', next, { shouldValidate: true });
    };

    return (
        <section className="relative bg-slate-50 overflow-hidden py-16 lg:py-24">
            {/* Decorative background element similar to the yellow one in reference */}
            <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-yellow-400 rounded-bl-full opacity-20 -z-0 translate-x-1/4 -translate-y-1/4" />

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
                                alt="Feature Preview"
                                className="rounded-lg shadow-2xl border border-gray-200 w-full max-w-[600px] h-[400px] object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Column: Quotation Form */}
                    <div className="lg:w-1/2 w-full max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                            <h2 className="text-2xl font-heading font-bold text-gray-800 text-center mb-6">
                                Obtén una cotización
                            </h2>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nombre" className="font-heading text-gaete-primary">Nombre*</Label>
                                    <Input
                                        id="nombre"
                                        {...register('nombre')}
                                        className={errors.nombre ? 'border-red-500' : 'border-gray-200'}
                                    />
                                    {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="telefono" className="font-heading text-gaete-primary">Teléfono*</Label>
                                    <Input
                                        id="telefono"
                                        placeholder="+569..."
                                        {...register('telefono')}
                                        className={errors.telefono ? 'border-red-500' : 'border-gray-200'}
                                    />
                                    {errors.telefono && <p className="text-red-500 text-xs">{errors.telefono.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="correo" className="font-heading text-gaete-primary">Correo*</Label>
                                    <Input
                                        id="correo"
                                        type="email"
                                        {...register('correo')}
                                        className={errors.correo ? 'border-red-500' : 'border-gray-200'}
                                    />
                                    {errors.correo && <p className="text-red-500 text-xs">{errors.correo.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-heading text-gaete-primary">¿En qué podemos ayudarte?*</Label>
                                    <Select
                                        onValueChange={(val) => setValue('interes', val, { shouldValidate: true })}
                                        defaultValue={insuranceType}
                                    >
                                        <SelectTrigger className={errors.interes ? 'border-red-500' : 'border-gray-200'}>
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="edificio">Seguro de Edificio</SelectItem>
                                            <SelectItem value="vida">Seguro de Vida</SelectItem>
                                            <SelectItem value="salud">Seguro de Salud</SelectItem>
                                            <SelectItem value="otro">Otro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.interes && <p className="text-red-500 text-xs">{errors.interes.message}</p>}
                                </div>

                                <div className="space-y-3 pt-2">
                                    <Label className="font-heading text-gaete-primary">¿Qué te gustaría cotizar?*</Label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {['Seguro Edificio', 'Seguro Vida Guardias', 'Seguro Salud', 'Responsabilidad Civil'].map((service) => (
                                            <div key={service} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={service}
                                                    checked={selectedServices.includes(service)}
                                                    onCheckedChange={() => handleServiceChange(service)}
                                                />
                                                <label htmlFor={service} className="text-sm font-body text-gray-700 cursor-pointer">
                                                    {service}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.servicios && <p className="text-red-500 text-xs">{errors.servicios.message}</p>}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gaete-primary hover:bg-gaete-primary/90 text-white font-heading font-bold py-6 rounded-xl transition-all active:scale-95"
                                >
                                    {isSubmitting ? 'Enviando...' : 'COTIZAR AHORA'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroWithForm;
