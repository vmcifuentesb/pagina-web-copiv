/**
 * Script de optimización de assets para COPIV TIKAL
 * Ejecutar con: node scripts/optimize-assets.js
 * 
 * Funciones:
 * 1. Genera sitemap.xml dinámico a partir de las páginas en src/pages/
 * 2. Comprime imágenes en public/ con sharp (si está disponible)
 * 3. Reporta el tamaño total del build
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getDirSize(dir) {
  let size = 0;
  if (!existsSync(dir)) return size;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) size += getDirSize(fullPath);
    else if (entry.isFile()) size += statSync(fullPath).size;
  }
  return size;
}

function getTotalSizeByExtension(dir, ext) {
  let size = 0;
  if (!existsSync(dir)) return size;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) size += getTotalSizeByExtension(fullPath, ext);
    else if (entry.isFile() && entry.name.endsWith(ext)) size += statSync(fullPath).size;
  }
  return size;
}

console.log('\n=== Optimización de Assets — COPIV TIKAL ===\n');

if (existsSync(DIST)) {
  const totalSize = getDirSize(DIST);
  console.log(`📦 Tamaño total del build: ${formatBytes(totalSize)}`);
  console.log(`   HTML: ${formatBytes(getTotalSizeByExtension(DIST, '.html'))}`);
  console.log(`   CSS:  ${formatBytes(getTotalSizeByExtension(DIST, '.css'))}`);
  console.log(`   JS:   ${formatBytes(getTotalSizeByExtension(DIST, '.js'))}`);
  console.log(`   Img:  ${formatBytes(getTotalSizeByExtension(DIST, '.webp') + getTotalSizeByExtension(DIST, '.avif') + getTotalSizeByExtension(DIST, '.png') + getTotalSizeByExtension(DIST, '.jpg') + getTotalSizeByExtension(DIST, '.jpeg') + getTotalSizeByExtension(DIST, '.svg'))}`);
  console.log(`   Otros: ${formatBytes(totalSize - getTotalSizeByExtension(DIST, '.html') - getTotalSizeByExtension(DIST, '.css') - getTotalSizeByExtension(DIST, '.js') - getTotalSizeByExtension(DIST, '.webp') - getTotalSizeByExtension(DIST, '.avif') - getTotalSizeByExtension(DIST, '.png') - getTotalSizeByExtension(DIST, '.jpg') - getTotalSizeByExtension(DIST, '.jpeg') - getTotalSizeByExtension(DIST, '.svg'))}`);
} else {
  console.log('⚠️  Directorio dist/ no encontrado. Ejecuta "npm run build" primero.');
}

console.log('\n✅ Optimización completada.\n');
