import { createClient } from '@sanity/client';

// Configuración del cliente para conectarse al backend de Sanity.io
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'your-project-id', // ID provisto por Sanity
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',            // Dataset del CMS
  apiVersion: '2026-06-13',                                                 // Versión de API
  useCdn: true,                                                             // Usar CDN de Sanity para máxima velocidad (SSG)
});
