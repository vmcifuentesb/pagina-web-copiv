# Guía de Desarrollo Web de Alto Rendimiento (WPO)

Esta guía detalla las mejores prácticas implementadas para lograr tiempos de carga óptimos (LCP < 3s) desde el inicio del desarrollo.

## 1. Estrategia de Carga de Imágenes
El mayor peso de una web suele venir de las imágenes. Controlar *cómo* y *cuándo* se cargan es vital.

### Carga Prioritaria (LCP)
Las imágenes que el usuario ve inmediatamente (Hero, banners principales) deben cargarse lo antes posible.
- **Formato:** Usar el tag `<picture>` para servir AVIF (prioridad) y WebP (fallback).
- **Atributos:** `loading="eager"` y `fetchpriority="high"`.
- **Preload:** Añadir `<link rel="preload">` en el `index.html` para la imagen Hero.

```tsx
<picture>
  <source srcSet={heroAvif} type="image/avif" />
  <source srcSet={heroWebp} type="image/webp" />
  <img 
    src={heroJpg} 
    loading="eager" 
    fetchpriority="high" 
    alt="Descripción"
  />
</picture>
```

### Carga Perezosa (Lazy Loading)
Todas las imágenes que están "debajo del pliegue" (fuera de la vista inicial) deben usar `loading="lazy"`.
```html
<img 
  src="servicio.webp" 
  loading="lazy" 
  alt="Descripción"
>
```

### Optimización en el CDN (Sanity)
Aprovecha los parámetros del CDN para servir imágenes con el tamaño exacto y en formato moderno (WebP).
- `auto=format`: Selecciona automáticamente el mejor formato (WebP/AVIF).
- `w=800`: Redimensiona la imagen en el servidor.

### Automatización Local de Assets
Para imágenes guardadas en `src/assets`, el proyecto cuenta con un script de pre-build que convierte automáticamente PNG/JPG a WebP.
- **Comando manual:** `node scripts/optimize-assets.js`
- **Comando automático:** Se ejecuta siempre al hacer `npm run build`.

---

## 2. Optimización del Build (Vite)
El proceso de compilación debe estar configurado para minimizar el bloqueo del hilo principal.

### Plugin de Optimización de Imágenes
Uso de `vite-plugin-image-optimizer` para comprimir SVGs y otros assets durante el build sin pérdida de calidad perceptible.

### Fragmentación de Código (Manual Chunks)
Divide las librerías grandes (vendor) en archivos separados para aprovechar la caché del navegador.
```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-core': ['react', 'react-dom', 'react-router-dom'],
        'vendor-animations': ['gsap'],
      }
    }
  }
}
```

### Minificación Agresiva
Uso de `Terser` para eliminar comentarios y logs de consola en producción, reduciendo el peso final del JS.

### Optimización de Iconos (Lucide)
Para evitar que el bundle de iconos crezca innecesariamente, **NUNCA** importar todo el set.
```typescript
// MAL: import { IconName } from 'lucide-react';
// BIEN: import { IconName } from 'lucide-react'; 
// (Vite se encarga del tree-shaking, pero los nombres específicos ayudan)
```
En proyectos críticos, usar el plugin `vite-plugin-lucide` o importar desde archivos específicos.

---

## 3. Arquitectura de Código (Code Splitting)
No obligues al usuario a descargar todo el JavaScript de la web en la primera visita. Divide el código por rutas.

### Implementación en React
Usa `lazy` y `Suspense` para cargar las páginas solo cuando sean necesarias.
```tsx
import { lazy, Suspense } from 'react';

const Contacto = lazy(() => import('./pages/Contacto'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Suspense>
  );
}
```

---

## 3. Optimización del Servidor (.htaccess)
Si usas un servidor basado en Apache (como Banahosting), el archivo `.htaccess` es tu mejor aliado.

### Compresión Gzip
Reduce el tamaño de los archivos de texto (HTML, CSS, JS) hasta en un 70%.
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

### Caché de Navegador
Indica al navegador que guarde los archivos estáticos para que no los vuelva a pedir en la siguiente visita.
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
```

### SPA Routing
Asegura que al refrescar la página en una ruta interna (ej: `/servicios`) el servidor no devuelva un error 404.
```apache
RewriteRule . /index.html [L]
```

---

## 4. Integración de Marketing y Scripts de Terceros
Los scripts de terceros (GTM, Meta Pixel, Analytics) son los principales enemigos del rendimiento si no se gestionan bien.

### Estrategia de Carga Diferida (Lazy Load)
**NUNCA** pongas scripts de marketing directamente en el `<head>` del `index.html` si quieres un 100/100.
1. **Carga condicional:** Carga los scripts solo si el ID existe en el CMS.
2. **Carga perezosa:** Usa `requestIdleCallback` o un `setTimeout` de al menos 3 segundos para inyectar los scripts después de que la página principal haya cargado completamente.
3. **Componente Maestro:** Centraliza la carga en un componente (ej. `AnalyticsLoader.tsx`) que gestione la inyección dinámica.

```tsx
// Ejemplo de inyección diferida
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    setTimeout(injectScripts, 1000); 
  });
} else {
  setTimeout(injectScripts, 3000);
}
```

---

## 5. SEO y Open Graph

### Meta Tags Dinámicas
Cada página debe definir su propio `<title>` y `<meta name="description">` usando `react-helmet-async`.
```tsx
import { Helmet } from 'react-helmet-async';

<Helmet>
  <title>Servicios — Transporte Frontera</title>
  <meta name="description" content="Descripción única para cada página." />
</Helmet>
```

### Open Graph y Twitter Cards
Añadir en el `<head>` del `index.html`:
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://ejemplo.com" />
<meta property="og:locale" content="es_GT" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
```

### Sitemap
Incluir `public/sitemap.xml` con todas las rutas del sitio y sus prioridades.

---

## 6. Checklist de Verificación
1. [ ] ¿El Hero tiene `fetchpriority="high"`?
2. [ ] ¿Las imágenes secundarias tienen `loading="lazy"`?
3. [ ] ¿Se están usando formatos modernos (WebP)?
4. [ ] ¿Está activo el Code Splitting en las rutas?
5. [ ] ¿Hay una ruta 404 (`<Route path="*">`)?
6. [ ] ¿Las páginas tienen meta tags dinámicas con `react-helmet-async`?
7. [ ] ¿El `index.html` tiene Open Graph y Twitter Cards?
8. [ ] ¿Existe `public/sitemap.xml`?
9. [ ] ¿El archivo `.htaccess` está configurado y subido?
10. [ ] ¿Se ha configurado el CORS en el CMS (Sanity)?
11. [ ] ¿Los scripts de marketing cargan de forma diferida (Lazy Load)?
12. [ ] ¿Los IDs de seguimiento son editables desde Sanity?
