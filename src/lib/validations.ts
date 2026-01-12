import { z } from 'zod';

// Schema para Seguro Edificio
export const seguroEdificioSchema = z.object({
  coverage: z.enum(['basica', 'intermedia', 'premium'], {
    required_error: "Selecciona un tipo de cobertura"
  }),
  name: z.string()
    .min(3, 'Nombre debe tener al menos 3 caracteres')
    .max(100, 'Nombre muy largo')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo letras y espacios permitidos'),
  email: z.string()
    .email('Email inválido')
    .toLowerCase()
    .trim(),
  phone: z.string()
    .min(9, 'Teléfono debe tener al menos 9 dígitos')
    .regex(/^(\+56\s?)?9?\s?\d{4}\s?\d{4}$/, 'Formato válido: +56 9 XXXX XXXX')
    .trim(),
  address: z.string()
    .min(10, 'Dirección muy corta')
    .max(200, 'Dirección muy larga')
    .trim(),
  units: z.coerce.number()
    .int('Debe ser número entero')
    .min(1, 'Mínimo 1 departamento')
    .max(500, 'Máximo 500 departamentos'),
  termsAccepted: z.boolean()
    .refine(val => val === true, {
      message: 'Debes aceptar los términos y condiciones'
    })
});

// Schema para Vida Guardias DS-93
export const vidaGuardiasSchema = z.object({
  coverage: z.enum(['basico', 'completo', 'premium'], {
    required_error: "Selecciona un tipo de cobertura"
  }),
  name: z.string()
    .min(3, 'Nombre debe tener al menos 3 caracteres')
    .max(100, 'Nombre muy largo'),
  email: z.string()
    .email('Email inválido')
    .toLowerCase()
    .trim(),
  phone: z.string()
    .min(9, 'Teléfono debe tener al menos 9 dígitos')
    .regex(/^(\+56\s?)?9?\s?\d{4}\s?\d{4}$/, 'Formato válido: +56 9 XXXX XXXX')
    .trim(),
  companyName: z.string()
    .min(3, 'Nombre de empresa muy corto')
    .max(100, 'Nombre muy largo')
    .trim(),
  companyRut: z.string()
    .regex(/^\d{7,8}-[\dkK]$/, 'Formato RUT inválido (ej: 12345678-9)')
    .trim(),
  guardiasCount: z.coerce.number()
    .int()
    .min(1, 'Mínimo 1 guardia')
    .max(100, 'Para más de 100 guardias, contacta directamente'),
  position: z.enum(['guardia', 'conserje', 'portero'], {
    required_error: "Selecciona un cargo"
  }),
  termsAccepted: z.boolean()
    .refine(val => val === true, {
      message: 'Debes aceptar los términos y condiciones'
    })
});

// Tipos TypeScript generados
export type SeguroEdificioForm = z.infer<typeof seguroEdificioSchema>;
export type VidaGuardiasForm = z.infer<typeof vidaGuardiasSchema>;

// Schema para validación por pasos - Edificio
export const edificioStep1Schema = z.object({
  coverage: z.enum(['basica', 'intermedia', 'premium'], {
    required_error: "Selecciona un tipo de cobertura"
  }),
});

export const edificioStep2Schema = z.object({
  name: z.string().min(3, 'Nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Teléfono debe tener al menos 9 dígitos'),
  address: z.string().min(10, 'Dirección muy corta'),
  units: z.coerce.number().int().min(1, 'Mínimo 1 departamento'),
});

export const edificioStep3Schema = z.object({
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'Debes aceptar los términos y condiciones'
  })
});

// Schema para validación por pasos - Guardias
export const guardiasStep1Schema = z.object({
  coverage: z.enum(['basico', 'completo', 'premium'], {
    required_error: "Selecciona un tipo de cobertura"
  }),
});

export const guardiasStep2Schema = z.object({
  name: z.string().min(3, 'Nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Teléfono debe tener al menos 9 dígitos'),
  companyName: z.string().min(3, 'Nombre de empresa muy corto'),
  companyRut: z.string().regex(/^\d{7,8}-[\dkK]$/, 'Formato RUT inválido'),
  guardiasCount: z.coerce.number().int().min(1, 'Mínimo 1 guardia'),
  position: z.enum(['guardia', 'conserje', 'portero']),
});

export const guardiasStep3Schema = z.object({
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'Debes aceptar los términos y condiciones'
  })
});