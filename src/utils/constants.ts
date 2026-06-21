export const SITE = {
  name: 'COPIV TIKAL S.A.',
  url: 'https://copivtikal.com',
  phone: '+502 3066 2135',
  email: 'info@copivtikal.com',
  address: 'Guatemala City, Guatemala',
  description: 'Soluciones avanzadas de seguridad privada, agentes tácticos y plataforma de garitas inteligentes en Guatemala.',
};

export const NAV_ITEMS = [
  { href: import.meta.env.BASE_URL, label: 'Inicio' },
  { href: `${import.meta.env.BASE_URL}servicios`, label: 'Servicios' },
  { href: `${import.meta.env.BASE_URL}empresa`, label: 'La Empresa' },
  { href: `${import.meta.env.BASE_URL}diagnostico`, label: 'Análisis de Riesgo' },
  { href: `${import.meta.env.BASE_URL}contacto`, label: 'Contacto' },
];
