/**
 * Esquema de Sanity para el tipo "caseStudy" (Caso de Estudio)
 */

export default {
  name: 'caseStudy',
  title: 'Caso de Estudio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
    },
    {
      name: 'desc',
      title: 'Descripción',
      type: 'text',
      rows: 4,
    },
    {
      name: 'loc',
      title: 'Ubicación',
      type: 'string',
    },
    {
      name: 'eff',
      title: 'Efectividad',
      type: 'string',
    },
    {
      name: 'img',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'loc',
      media: 'img',
    },
  },
};
