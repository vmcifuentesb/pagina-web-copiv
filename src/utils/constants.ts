export const SITE = {
  name: 'COPIV TIKAL S.A.',
  url: 'https://copivtikal.com',
  phone: '+502 3066 2135',
  email: 'info@copivtikal.com',
  address: 'Guatemala City, Guatemala',
  description: 'Soluciones avanzadas de seguridad privada, agentes tácticos y plataforma de garitas inteligentes en Guatemala.',
};

export const resolvePath = (path: string = '') => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const NAV_ITEMS = [
  { href: resolvePath(''), label: 'Inicio' },
  { href: resolvePath('servicios'), label: 'Servicios' },
  { href: resolvePath('empresa'), label: 'La Empresa' },
  { href: resolvePath('diagnostico'), label: 'Análisis de Riesgo' },
  { href: resolvePath('contacto'), label: 'Contacto' },
];
