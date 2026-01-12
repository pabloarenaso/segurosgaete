export const CONTACT = {
  whatsapp: '+56934574031',
  whatsappSecondary: '+56999180152',
  phones: ['+56 9 3457 4031', '+56 9 9918 0152'],
  email: 'contacto@segurosgaete.cl',
  address: '8 Norte 310 Local 5, Viña del Mar',
  schedule: 'Lunes a Viernes, 09:00 - 14:00 hrs. y 15:00 - 18:00 hrs.',
  registration: 'Registro Nº 3575 SVS',
  social: {
    facebook: 'https://facebook.com/segurosgaete',
    instagram: 'https://instagram.com/segurosgaete',
    linkedin: 'https://linkedin.com/company/segurosgaete'
  }
} as const;

export const COMPANY = {
  name: 'Seguros Gaete',
  fullName: 'Seguros Gaete Corredores de Seguros',
  tagline: 'Más de 35 años protegiendo tu tranquilidad',
  foundedYear: 1987,
  yearsExperience: new Date().getFullYear() - 1987,
  clients: '1,200+',
  insurers: '10+',
} as const;

// Insurance partner logos from the current website
export const INSURANCE_PARTNERS = [
  { name: 'AIG', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/AIG_300.png' },
  { name: 'Assurant', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/Assurant_300.png' },
  { name: 'BCI Seguros', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/BCI-Seguros_300.png' },
  { name: 'BNP Paribas Cardif', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/BNP-Paribas-Cardif_300.png' },
  { name: 'BUPA', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/BUPA_300.png' },
  { name: 'Chilena Consolidada', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/Chilena-Consolidada_300.png' },
  { name: 'Chubb', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/Chubb_300.png' },
  { name: 'Consorcio', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/Consorcio_300.png' },
  { name: 'FID', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/FID_300.png' },
  { name: 'HDI Seguros', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/HDI-Seguros_300.png' },
  { name: 'Liberty', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/Liberty_300.png' },
  { name: 'MAPFRE', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/MAPFRE_300.png' },
  { name: 'MetLife', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/MetLife_300.png' },
  { name: 'Orsan', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/Orsan_300.png' },
  { name: 'Renta Nacional', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/Renta-Nacional_300.png' },
  { name: 'Santander Seguros', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/Santander-Seguros_300.png' },
  { name: 'Seguros SURA', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/Seguros-SURA_300.png' },
  { name: 'Southbridge', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/Southbridge_300.png' },
  { name: 'SURA', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/SURA_300.png' },
  { name: 'Vida Security', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/Vida-Security_300.png' },
  { name: 'Yo Aseguro', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/YoAseguro_300.png' },
  { name: 'Zurich', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/Zurich_300.png' },
  { name: 'Zenit Seguros', logo: 'https://segurosgaete.cl/wp-content/uploads/2023/03/Zenit-Seguros_300.png' },
] as const;