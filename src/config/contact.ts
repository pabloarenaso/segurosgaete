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

// Insurance partner logos - using publicly accessible URLs
// The onError handler in Index.tsx will show the company name if logo fails to load
export const INSURANCE_PARTNERS = [
  { name: 'HDI Seguros', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/HDI_Seguros_logo.svg/200px-HDI_Seguros_logo.svg.png' },
  { name: 'BCI Seguros', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Logo_Bci.svg/200px-Logo_Bci.svg.png' },
  { name: 'Liberty', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Liberty_Mutual_logo.svg/200px-Liberty_Mutual_logo.svg.png' },
  { name: 'MAPFRE', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/MAPFRE_Logo.svg/200px-MAPFRE_Logo.svg.png' },
  { name: 'Zurich', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Zurich_Insurance_Group_logo.svg/200px-Zurich_Insurance_Group_logo.svg.png' },
  { name: 'MetLife', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/MetLife_logo.svg/200px-MetLife_logo.svg.png' },
  { name: 'AIG', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/AIG_logo.svg/200px-AIG_logo.svg.png' },
  { name: 'Chubb', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Chubb_Limited_Logo.svg/200px-Chubb_Limited_Logo.svg.png' },
  { name: 'Consorcio', logo: '' },
  { name: 'Chilena Consolidada', logo: '' },
  { name: 'SURA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Sura_logo.svg/200px-Sura_logo.svg.png' },
  { name: 'BUPA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Bupa_logo.svg/200px-Bupa_logo.svg.png' },
  { name: 'Santander Seguros', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/200px-Banco_Santander_Logotipo.svg.png' },
  { name: 'BNP Paribas Cardif', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Logo_BNP_Paribas.svg/200px-Logo_BNP_Paribas.svg.png' },
  { name: 'Vida Security', logo: '' },
  { name: 'Renta Nacional', logo: '' },
  { name: 'Southbridge', logo: '' },
  { name: 'Orsan', logo: '' },
] as const;