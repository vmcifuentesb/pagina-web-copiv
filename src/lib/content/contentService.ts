import { sanityClient } from '../sanityClient';

export interface Service {
  id: string;
  title: string;
  category: 'physical' | 'technological';
  categoryLabel: string;
  description: string;
  image: string;
  features: string[];
  ctaLabel: string;
}

export interface CaseStudy {
  title: string;
  category: string;
  desc: string;
  loc: string;
  eff: string;
  img: string;
}

// ==========================================
// INTERRUPTOR DE CONEXIÓN CON SANITY CMS (BACKEND)
// ==========================================
// Cambiar a "true" para conectarse al backend de Sanity en lugar de mock local
const USE_SANITY = false;

const SERVICES: Service[] = [
  {
    id: "seguridad-institucional",
    title: "Seguridad para Instituciones",
    category: "physical",
    categoryLabel: "Física",
    description: "Vigilancia interna y externa, control de accesos estrictos, y resguardo perimetral para bancos, colegios y sedes corporativas con supervisión preventiva.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    features: [
      "Vigilancia interna y externa",
      "Control de accesos estricto",
      "Protocolos preventivos premium"
    ],
    ctaLabel: "Solicitar Información"
  },
  {
    id: "patrullas-seguridad",
    title: "Patrullas de Seguridad",
    category: "physical",
    categoryLabel: "Física",
    description: "Servicio de patrullaje preventivo, supervisión perimetral, verificación de alarmas y reacción inmediata ante emergencias con cobertura diurna y nocturna.",
    image: "https://images.unsplash.com/photo-1512428813824-f713c2411abb?auto=format&fit=crop&w=800&q=80",
    features: [
      "Patrullaje preventivo activo",
      "Verificación táctica de alarmas",
      "Cobertura 24/7 diurna/nocturna"
    ],
    ctaLabel: "Solicitar Información"
  },
  {
    id: "seguridad-residencial",
    title: "Seguridad Residencial",
    category: "physical",
    categoryLabel: "Física",
    description: "Control riguroso de ingreso y salida, registro digital de visitantes, rondines preventivos constantes y atención inmediata de incidentes en condominios y residenciales.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    features: [
      "Registro de visitas y residentes",
      "Rondines preventivos y patrullaje",
      "Atención inmediata de incidentes"
    ],
    ctaLabel: "Solicitar Información"
  },
  {
    id: "seguridad-centro-comercial",
    title: "Seguridad para Centros Comerciales",
    category: "physical",
    categoryLabel: "Física",
    description: "Prevención de robos y actos vandálicos, control de flujos de personas, atención y orientación a visitantes, y monitoreo preventivo de áreas comunes.",
    image: "https://images.unsplash.com/photo-1507207611509-ec012433ff52?auto=format&fit=crop&w=800&q=80",
    features: [
      "Prevención activa de pérdidas",
      "Atención y servicio al cliente",
      "Monitoreo de conductas sospechosas"
    ],
    ctaLabel: "Solicitar Información"
  },
  {
    id: "custodia-seguridad",
    title: "Custodia de Seguridad y Valores",
    category: "physical",
    categoryLabel: "Física",
    description: "Custodia de transporte de mercancía valiosa, protección ejecutiva VIP y acompañamiento preventivo de rutas con reacción inmediata ante emergencias en carreteras.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    features: [
      "Custodia en ruta y transporte",
      "Protección ejecutiva VIP",
      "Reacción inmediata a incidentes"
    ],
    ctaLabel: "Solicitar Información"
  },
  {
    id: "seguridad-eventos",
    title: "Seguridad para Eventos",
    category: "physical",
    categoryLabel: "Física",
    description: "Control de invitados, vigilancia de áreas restringidas, manejo preventivo de multitudes y apoyo logístico en emergencias para eventos corporativos y masivos.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    features: [
      "Control estricto de accesos",
      "Logística y manejo de multitudes",
      "Planes de evacuación y apoyo"
    ],
    ctaLabel: "Solicitar Información"
  },
  {
    id: "control-ingreso-inteligente",
    title: "Control de Ingreso Inteligente",
    category: "technological",
    categoryLabel: "Tecnología",
    description: "Soluciones de control de acceso digital, incluyendo Panel Central IDBox V2, identificación facial premium, molinetes y cerraduras inteligentes, y arcos detectores de metales.",
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=800&q=80",
    features: [
      "Panel IDBox V2 y biometría",
      "Identificación facial IP65",
      "Molinetes y arcos detectores"
    ],
    ctaLabel: "Solicitar Información"
  },
  {
    id: "cctv-ia-predictiva",
    title: "CCTV e Inteligencia Artificial (IA)",
    category: "technological",
    categoryLabel: "Tecnología",
    description: "Instalación de cámaras 4K IP, PTZ analógicas, multilente de 180° y cámaras con panel solar. Algoritmos de IA para protección perimetral, cruce de línea y conteo de personas.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    features: [
      "Cámaras 4K IP y Multilente",
      "Clasificación de objetos con IA",
      "Autonomía con Panel Solar"
    ],
    ctaLabel: "Solicitar Información"
  },
  {
    id: "gps-dascam-flotas",
    title: "GPS & Das-Cam Inteligente",
    category: "technological",
    categoryLabel: "Tecnología",
    description: "Monitoreo GPS en tiempo real de flotas, acompañado de Das-Cam de doble cámara Full HD y sistema de IA (DMS) para detectar fatiga y distracciones del conductor.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    features: [
      "Monitoreo GPS en ruta",
      "Das-Cam doble cámara Full HD",
      "Detección de fatiga con IA (DMS)"
    ],
    ctaLabel: "Solicitar Información"
  },
  {
    id: "centro-control-operativo",
    title: "Centro de Control Operativo (CCO)",
    category: "technological",
    categoryLabel: "Tecnología",
    description: "Núcleo de monitoreo y centralización de datos en tiempo real de alarmas, GPS y cámaras, coordinando el análisis avanzado y respuesta rápida las 24 horas.",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
    features: [
      "Centralización de datos en tiempo real",
      "Respuesta inmediata a alertas",
      "Análisis avanzado de flota 24/7"
    ],
    ctaLabel: "Solicitar Información"
  }
];

const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Infiltración Detectada en Complejo Amatitlán",
    category: "Intrusión Perimetral",
    desc: "Dos sujetos cortaron la malla de un centro de distribución. Las barreras de microondas COPIV activaron un bloqueo inmediato y alertaron a la central. La moto-patrulla de reacción llegó en 9 minutos, frustrando la pérdida del inventario.",
    loc: "Amatitlán, Guatemala",
    eff: "100% de Pérdidas Evitadas",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Control de Accesos Masivos en Residencial Mixco",
    category: "Garitas SMART",
    desc: "Un vehículo con placas duplicadas intentó ingresar a un condominio. El sistema de cámaras LPR de la garita SMART detectó la irregularidad en la bitácora electrónica de COPIV bloqueando la barrera y coordinando con los guardias físicos.",
    loc: "Ciudad San Cristóbal, Mixco",
    eff: "Acceso No Autorizado Bloqueado",
    img: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Detección de Merma Sistemática en Carretera a El Salvador",
    category: "CCTV con IA Predictiva",
    desc: "Análisis inteligente identificó un patrón anómalo de carga en horarios no hábiles. El sistema notified de forma automatizada al administrador general por la App de Reportes, deteniendo un esquema interno de fuga de activos.",
    loc: "Carretera a El Salvador",
    eff: "Sinergia de Tecnología Avanzada",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
  }
];

// Método para obtener servicios desde Sanity o localmente
export async function getServices(): Promise<Service[]> {
  if (USE_SANITY) {
    try {
      return await sanityClient.fetch(`*[_type == "service"]{
        "id": _id,
        title,
        category,
        categoryLabel,
        description,
        "image": image.asset->url,
        features,
        ctaLabel
      }`);
    } catch (err) {
      console.error("Error fetching services from Sanity, using fallback data:", err);
      return SERVICES;
    }
  }
  return SERVICES;
}

// Método para obtener casos de estudio desde Sanity o localmente
export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (USE_SANITY) {
    try {
      return await sanityClient.fetch(`*[_type == "caseStudy"]{
        title,
        category,
        desc,
        loc,
        eff,
        "img": img.asset->url
      }`);
    } catch (err) {
      console.error("Error fetching case studies from Sanity, using fallback data:", err);
      return CASE_STUDIES;
    }
  }
  return CASE_STUDIES;
}
