export const SITE = {
  name: 'COPIV TIKAL S.A.',
  url: 'https://copivtikal.com',
  phone: '+502 3099 0692',
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
  { href: resolvePath('empresa'), label: 'Quiénes Somos' },
  { href: resolvePath('servicios'), label: 'Servicios de Guardias' },
  { href: resolvePath('productos'), label: 'Soluciones Tecnológicas' },
  { href: resolvePath('contacto'), label: 'Contacto' },
];
