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
    id: "agentes-centro-comercial",
    title: "Agentes de Centro Comercial",
    category: "physical",
    categoryLabel: "Física",
    description: "Especializados en la atención al público, prevención de robos, control de flujos de personas y coordinación con comerciantes.",
    image: "https://images.unsplash.com/photo-1507207611509-ec012433ff52?auto=format&fit=crop&w=800&q=80",
    features: [
      "Control de grandes flujos",
      "Coordinación con locales",
      "Prevención de robos táctica"
    ],
    ctaLabel: "Solicitar Información"
  },
  {
    id: "custodios-confianza",
    title: "Custodios de Confianza",
    category: "physical",
    categoryLabel: "Física",
    description: "Personal rigurosamente entrenado para la escolta y traslado de valores, documentos altamente confidenciales y activos.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    features: [
      "Traslados seguros blindados",
      "Custodia de documentos",
      "Protocolos de confidencialidad"
    ],
    ctaLabel: "Solicitar Información"
  },
  {
    id: "seguridad-institucional",
    title: "Seguridad para Instituciones",
    category: "physical",
    categoryLabel: "Física",
    description: "Personal especializado en el control estricto de accesos, validación de identidades y resguardo perimetral para bancos o colegios.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    features: [
      "Control de accesos de visitas",
      "Prevención de intrusiones",
      "Protección perimetral de elite"
    ],
    ctaLabel: "Solicitar Información"
  },
  {
    id: "garitas-smart",
    title: "Plataforma de Garitas SMART",
    category: "technological",
    categoryLabel: "Tecnología",
    description: "La última innovación para el control y automatización de accesos. Ideal para condominios residenciales y parques industriales.",
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=800&q=80",
    features: [
      "Registro digital automatizado",
      "Integración con cámaras LPR",
      "Reportes inmediatos inteligentes"
    ],
    ctaLabel: "Solicitar Información"
  },
  {
    id: "cctv-ia",
    title: "CCTV e Inteligencia Artificial (IA)",
    category: "technological",
    categoryLabel: "Tecnología",
    description: "Diseño e instalación de sistemas avanzados de cámaras IP acopladas a algoritmos inteligentes para análisis predictivo de amenazas.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    features: [
      "Detección de patrones extraños",
      "Central de alerta activa 24/7",
      "Notificación inmediata de riesgos"
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
