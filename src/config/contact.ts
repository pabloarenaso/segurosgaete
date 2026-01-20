// Partner logos - local imports
import fidSeguros from '@/assets/partners/fid-seguros.png';
import assistCard from '@/assets/partners/assist-card.png';
import auxiliaClub from '@/assets/partners/auxilia-club.jpg';
import avlaSeguros from '@/assets/partners/avla-seguros.png';
import bciSeguros from '@/assets/partners/bci-seguros.png';
import biceVida from '@/assets/partners/bice-vida.png';
import celesteAsistencia from '@/assets/partners/celeste-asistencia.png';
import chubb from '@/assets/partners/chubb.png';
import consorcio from '@/assets/partners/consorcio.png';
import continental from '@/assets/partners/continental.png';
import sura from '@/assets/partners/sura.png';
import hdiSeguros from '@/assets/partners/hdi-seguros.png';
import porvenir from '@/assets/partners/porvenir.png';
import orion from '@/assets/partners/orion.png';
import ohioNational from '@/assets/partners/ohio-national.png';
import orsan from '@/assets/partners/orsan.png';
import reale from '@/assets/partners/reale.png';
import rentaNacional from '@/assets/partners/renta-nacional.jpg';
import segurosOrion from '@/assets/partners/seguros-orion.png';
import southbridge from '@/assets/partners/southbridge.jpg';
import universalAssistance from '@/assets/partners/universal-assistance.png';
import unnio from '@/assets/partners/unnio.png';
import zurich from '@/assets/partners/zurich.png';

export const CONTACT = {
  whatsapp: '+56934574031',
  whatsappSecondary: '+56999180152',
  phones: ['+56 9 3457 4031', '+56 9 9918 0152'],
  email: 'contacto@segurosgaete.cl',
  address: '8 Norte 310 Local 5, Viña del Mar',
  addresses: [
    '8 Norte 310 Local 5, Viña del Mar',
    'Cerro el Plomo 5931 Of. 1011, Las Condes'
  ],
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
  insurers: '23+',
} as const;

// Insurance partner logos with local assets
export const INSURANCE_PARTNERS = [
  { name: 'HDI Seguros', logo: hdiSeguros },
  { name: 'BCI Seguros', logo: bciSeguros },
  { name: 'BICE Vida', logo: biceVida },
  { name: 'Sura', logo: sura },
  { name: 'Zurich', logo: zurich },
  { name: 'Chubb', logo: chubb },
  { name: 'Consorcio', logo: consorcio },
  { name: 'Continental', logo: continental },
  { name: 'Orsan', logo: orsan },
  { name: 'Reale', logo: reale },
  { name: 'Renta Nacional', logo: rentaNacional },
  { name: 'Southbridge', logo: southbridge },
  { name: 'Fid Seguros', logo: fidSeguros },
  { name: 'AVLA Seguros', logo: avlaSeguros },
  { name: 'Porvenir', logo: porvenir },
  { name: 'Orion', logo: orion },
  { name: 'Seguros Orion', logo: segurosOrion },
  { name: 'Ohio National', logo: ohioNational },
  { name: 'UNNIO', logo: unnio },
  { name: 'Assist Card', logo: assistCard },
  { name: 'Auxilia Club', logo: auxiliaClub },
  { name: 'Celeste Asistencia', logo: celesteAsistencia },
  { name: 'Universal Assistance', logo: universalAssistance },
] as const;
