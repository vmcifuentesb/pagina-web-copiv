/**
 * Esquema de Sanity para el tipo "service" (Servicio COPIV)
 * 
 * Instrucciones:
 * 1. Crear un proyecto en sanity.io
 * 2. En la carpeta /schemas de tu estudio Sanity, crear este archivo
 * 3. Registrarlo en sanity.config.ts o sanity.cli.ts
 */

export default {
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título del Servicio',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Física', value: 'physical' },
          { title: 'Tecnología', value: 'technological' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'categoryLabel',
      title: 'Etiqueta de Categoría',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
    },
    {
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'features',
      title: 'Características',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'ctaLabel',
      title: 'Texto del Botón',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'categoryLabel',
      media: 'image',
    },
  },
};
