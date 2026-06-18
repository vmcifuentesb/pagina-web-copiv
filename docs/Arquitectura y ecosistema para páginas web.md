# Arquitectura y Ecosistema de Desarrollo Web: Estándar de Alto Rendimiento

Este documento define el flujo de trabajo, el stack tecnológico y los estándares de calidad para la creación de sitios web de primer nivel. El objetivo es garantizar que cada proyecto sea **ultrarrápido**, **seguro**, **optimizado para SEO** y **fácilmente editable** para el cliente, utilizando un enfoque basado puramente en código moderno.

---

## 1. Stack Tecnológico (Core)

Para alcanzar el máximo rendimiento (100/100 en Google PageSpeed), el ecosistema se basa en la arquitectura **Jamstack** y el uso de **Islands Architecture**.

| Componente | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Framework Base** | **Astro** | Generación de sitios estáticos (SSG) y renderizado bajo demanda. Cero JavaScript por defecto. |
| **UI Framework** | **React / TypeScript** | Creación de componentes interactivos y complejos ("Islas"). |
| **Estilos** | **Tailwind CSS** | Diseño rápido, consistente y optimizado para producción. |
| **Animaciones** | **GSAP** (prioritario) / Framer Motion | Efectos visuales de alto impacto, parallax y micro-interacciones premium. GSAP para animaciones complejas de scroll/timeline; Framer Motion para componentes React interactivos. |
| **Content Management** | **Sanity.io (Headless CMS)** | Gestión de contenido desacoplado que permite al cliente editar sin tocar el código. |
| **Hosting / Edge** | **Vercel / Netlify / GCP** | Despliegue continuo (CI/CD) con entrega de contenido desde el borde (Edge). |

---

## 2. Flujo de Trabajo (Workflow)

Cada proyecto debe seguir estas fases para asegurar la eficiencia y la calidad:

### Fase 1: Modelado de Datos y CMS
1. Definir los esquemas de contenido en **Sanity** (Servicios, Blog, Miembros del Equipo).
2. Entregar acceso al cliente para que empiece a cargar contenido real mientras se desarrolla el frontend.

### Fase 2: Estructura y Maquetación (Astro)
1. Configurar el proyecto base con Astro y Tailwind.
2. Crear los **Layouts** globales (Header, Footer, Navegación).
3. Desarrollar componentes de UI atómicos y reutilizables en `src/components/`.

### Fase 3: Interactividad y "Efectos Vistosos"
1. Identificar secciones que requieren dinamismo.
2. Implementar animaciones de entrada y scroll con **GSAP** para el toque "premium".
3. Utilizar directivas de Astro (ej: `client:visible`) para cargar JavaScript solo cuando sea necesario.

### Fase 4: Optimización Técnica
1. **Imágenes:** Usar el componente `<Image />` de Astro para conversión automática a WebP/AVIF.
2. **SEO:** Configurar metadatos dinámicos, Open Graph y Sitemap por cada ruta.
3. **Fuentes:** Alojar fuentes localmente o usar Fontsource para evitar bloqueos de renderizado.

### Fase 5: Calidad y Testing
1. **Pruebas Unitarias:** Vitest para lógica de utilidades y componentes.
2. **Pruebas E2E:** Playwright para flujos críticos (formularios, navegación).
3. **Auditoría Lighthouse:** Meta >95 en Performance, Accessibility, SEO y Best Practices.
4. Validación de accesibilidad (WCAG 2.1 AA).

### Fase 6: Despliegue y Entornos
1. Configurar entornos: `development`, `staging` y `production`.
2. Gestionar variables de entorno con `.env` y validación mediante `zod` o similar.
3. Conectar repositorio de GitHub con plataforma de hosting (Vercel/Netlify).
4. Implementar previews automáticas para cada Pull Request.

---

## 3. Control de Versiones y Colaboración

### Convenciones de Commits (Conventional Commits)
- `feat:` Nuevas funcionalidades
- `fix:` Corrección de errores
- `refactor:` Cambios de código sin cambiar comportamiento
- `docs:` Cambios en documentación
- `style:` Formateo, faltantes de punto y coma, etc.
- `test:` Agregar o corregir pruebas

### Ramas (Git Flow Simplificado)
- `main`: Producción (protegida, requiere PR)
- `develop`: Integración de funcionalidades
- `feature/*`: Nuevas funcionalidades
- `hotfix/*`: Correcciones urgentes en producción

### Herramientas
- **Husky:** Hooks de git para validaciones pre-commit
- **lint-staged:** Ejecutar linters solo en archivos staged
- **Commitizen:** Ayuda para seguir convenciones de commits

---

## 4. Estructura del Proyecto (Estandarización)

Para mantener la consistencia entre desarrolladores y proyectos, se debe seguir esta estructura de carpetas:

```text
/
├── src/
│   ├── components/         # Componentes reutilizables (.astro o .tsx)
│   │   ├── ui/            # Botones, inputs, tarjetas (átomos)
│   │   ├── sections/      # Secciones de página (Hero, Features, ContactForm)
│   │   └── layouts/       # Sub-layouts y wrappers específicos
│   ├── pages/             # Rutas del sitio (index.astro, servicios/[slug].astro)
│   ├── layouts/           # Plantillas de página (BaseLayout.astro, BlogLayout.astro)
│   ├── styles/            # CSS global, variables y configuraciones de Tailwind
│   ├── lib/               # Configuración de Sanity, helpers y utilidades de API
│   ├── assets/            # Imágenes locales, fuentes y SVGs originales
│   ├── hooks/             # Custom hooks de React (si se usa React)
│   └── types/             # Definiciones de tipos TypeScript compartidos
├── public/                # Archivos estáticos (favicon, robots.txt, sitemap.xml)
├── tests/                 # Pruebas E2E y utilidades de testing
├── .husky/                # Git hooks (pre-commit, pre-push)
├── astro.config.mjs       # Configuración del framework
├── tailwind.config.ts     # Configuración de Tailwind
├── tsconfig.json          # Configuración de TypeScript
├── vitest.config.ts       # Configuración de pruebas unitarias
└── playwright.config.ts   # Configuración de pruebas E2E
```

---

## 5. Seguridad

Cada proyecto debe incorporar medidas de seguridad desde el inicio, no como un añadido posterior:

### Content Security Policy (CSP)
- Definir una CSP estricta por entorno (development, staging, production).
- Bloquear `inline-scripts` no autorizados y restringir orígenes de fuentes externas.
- Incluir la cabecera CSP en la respuesta del servidor (configurable en Vercel/Netlify mediante `_headers` o `vercel.json`/`netlify.toml`).

### Sanitización de Entradas
- Sanitizar todo contenido proveniente del CMS antes de renderizar (especialmente HTML rich text).
- Validar y escapar entradas de formularios del lado del servidor (Astro endpoints o funciones serverless).
- Usar librerías como `DOMPurify` para limpiar contenido HTML generado por el cliente.

### Auditoría de Dependencias
- Ejecutar `npm audit` en cada PR (integrar en CI).
- Activar Dependabot o Renovate para actualizaciones automáticas de seguridad.
- No mergear PRs con vulnerabilidades críticas o altas sin resolver.

### Secretos y Variables de Entorno
- Nunca commitear secretos en el repositorio — usar variables de entorno de la plataforma de hosting.
- Rotar claves de API y tokens periódicamente (mínimo cada 90 días).
- Validar variables de entorno en tiempo de build con `zod` para evitar errores por configuración incompleta.

---

## 6. Observabilidad y Medición Continua

El rendimiento debe medirse en producción, no solo en el entorno local de desarrollo:

### Core Web Vitals en Producción
- Integrar `web-vitals` para medir LCP, FID/INP, CLS con datos de usuarios reales (RUM).
- Enviar métricas a un dashboard (Google Analytics 4, Datadog, o solución propia).
- Establecer umbrales: LCP < 2.5s, INP < 200ms, CLS < 0.1.

### Lighthouse CI
- Ejecutar Lighthouse en cada PR contra las rutas críticas (home, landing pages, contactos).
- Thresholds estrictos: Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95.
- Bloquear el merge si algún threshold no se cumple.

### Alertas Automáticas
- Configurar alertas cuando métricas de performance, SEO o accesibilidad bajen del 95.
- Integrar con Slack, Discord o email del equipo mediante webhooks.

---

## 7. Testing Avanzado

Refuerzo de la fase de calidad con estándares cuantificables:

### Cobertura Mínima
- **Utilidades y helpers (`src/lib/`)**: cobertura ≥ 80%.
- **Componentes React (`src/components/`)**: cobertura ≥ 60%.
- **Configuración**: usar `istanbul` con Vitest y establecer thresholds en `vitest.config.ts` que fallen el build si no se cumplen.

### Accesibilidad Automatizada
- Integrar `@axe-core/playwright` en los tests E2E.
- Cada flujo crítico debe pasar la auditoría de a11y sin violaciones.
- Agregar al pipeline de CI para fallar automáticamente si hay violaciones de nivel crítico o serio.

### Regresión Visual
- Usar **Percy**, **Chromatic** o **Playwright Visual Comparisons** para detectar cambios CSS no intencionados.
- Capturar componentes clave y páginas enteras en cada PR.
- Revisión humana obligatoria de los diffs visuales antes de aprobar.

---

## 8. Performance Avanzada

Más allá de las optimizaciones básicas, aplicar técnicas de vanguardia:

### Especulación de Navegación
- Implementar `<script type="speculationrules">` para precargar rutas probables (ej: pages enlazadas desde el Hero).
- Complementar con `prefetch` nativo de Astro para enlaces visibles.

### Priorización de Carga
- Usar `fetchpriority="high"` en el elemento LCP identificado (imagen principal, hero text).
- `loading="lazy"` para imágenes fuera del viewport inicial.
- `preload` para fuentes críticas y hero images.

### Análisis de Bundle
- Ejecutar `astro build --analyze` (o `vite-bundle-visualizer`) como paso obligatorio pre-merge.
- Revisar visualmente el tamaño de los bundles y detectar imports no tree-shakeables.
- Establecer un presupuesto máximo de JS por ruta (ej: < 50kB de JS por página).

---

## 9. Proceso de Revisión y Calidad

### Checklist Automatizado de PR
Cada Pull Request debe validar automáticamente:
- [ ] Lighthouse CI pasa thresholds (≥95 en todas las categorías)
- [ ] Cobertura de código no disminuye
- [ ] Sin vulnerabilidades críticas/altas (`npm audit`)
- [ ] Tests unitarios y E2E pasan
- [ ] Auditoría de accesibilidad sin violaciones críticas
- [ ] Sin `console.log` ni `debugger` en el código

### Revisión Humana
- `main` protegida: requiere al menos un approval de otro desarrollador.
- Los PRs de `hotfix/*` deben tener revisión prioritaria (máximo 2 horas en horario laboral).

### Definition of Done (DoD)
Una tarea o funcionalidad se considera completada solo si:
1. El código está en `develop` con PR aprobado y mergeado.
2. Pasa todas las verificaciones automáticas del checklist.
3. Se ha verificado visualmente en staging.
4. La documentación relevante está actualizada (si aplica).
5. No introduce nuevas vulnerabilidades.

---

## 10. Documentación Viva

La documentación debe evolucionar con el proyecto, no quedar obsoleta:

### Architecture Decision Records (ADR)
- Documentar decisiones importantes de arquitectura (cambio de CMS, nuevo framework, migración de hosting).
- Formato: `docs/adr/001-titulo-breve.md` con contexto, decisión y consecuencias.
- Mantenerlos en el repositorio junto al código.

### README Generado Automáticamente
- Incluir badges de estado: CI, cobertura, vulnerabilidades, Lighthouse score.
- Generar dinámicamente con herramientas como `badge-maker` o shields.io.
- Actualizar automáticamente en cada deploy.

### Guía de Onboarding
- Mantener un archivo `CONTRIBUTING.md` con:
  - Requisitos previos (Node, npm/pnpm, acceso a Sanity).
  - Pasos para clonar y correr el proyecto localmente.
  - Enlaces a documentación del stack.
  - Tiempo estimado para el primer build exitoso.

---

## 11. Extensibilidad

El estándar debe prepararse para escalar sin reescribir desde cero:

### Estrategia de Migración de CMS
- Abstracer el CMS detrás de una capa de servicios (`src/lib/content/`) con interfaces TypeScript.
- Si en el futuro se migra de Sanity a otro CMS, solo cambia la implementación del adaptador.
- Ejemplo: `ContentService.getPosts()` debe funcionar independientemente del proveedor.

### Planteamiento de Monorepo
- Cuando existan 2+ proyectos compartiendo componentes UI, migrar a monorepo con Turborepo o Nx.
- Compartir paquetes de UI, tipos y utilidades sin duplicar código.
- Mantener un único estándar de linting, testing y CI para todos los proyectos.

### Versionado del Propio Estándar
- Este documento debe tener versionado semántico (`v1.0.0`, `v1.1.0`, `v2.0.0`).
- Los cambios se aprueban por el equipo técnico y se reflejan en el CHANGELOG.
- Cada proyecto debe indicar qué versión del estándar sigue en su README.
