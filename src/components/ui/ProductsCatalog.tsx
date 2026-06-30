import React, { useState } from 'react';
import { resolvePath } from '../../utils/constants';

type Category = 'Todos' | 'Cámaras CCTV' | 'Control de Acceso' | 'Biométricos' | 'Sistemas de Alarma';

interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  features: string[];
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'cam-ptz-01',
    name: 'Cámara Domo PTZ 4K IR Inteligente',
    category: 'Cámaras CCTV',
    description: 'Cámara de videovigilancia de alta resolución con seguimiento automático basado en IA, ideal para perímetros grandes.',
    features: ['Resolución 4K Ultra HD', 'Visión nocturna IR 150m', 'Zoom óptico 25x', 'Detección de humanos/vehículos'],
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'cam-bullet-02',
    name: 'Cámara Bullet Disuasiva Starlight',
    category: 'Cámaras CCTV',
    description: 'Cámara resistente a la intemperie con luz estroboscópica y sirena integradas para disuasión activa de intrusos.',
    features: ['Sirena 110dB integrada', 'Visión a color 24/7 (Starlight)', 'Audio bidireccional', 'Certificación IP67'],
    image: 'https://images.unsplash.com/photo-1549109926-58f039549485?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'acc-bio-01',
    name: 'Terminal Biometría Facial sin Contacto',
    category: 'Biométricos',
    description: 'Control de acceso ultrarrápido con reconocimiento facial 3D, ideal para corporativos y condominios.',
    features: ['Lectura en 0.2 segundos', 'Capacidad 10,000 rostros', 'Prevención de suplantación (Anti-Spoofing)', 'Integración con molinetes'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'acc-rfid-02',
    name: 'Lector RFID de Larga Distancia (UHF)',
    category: 'Control de Acceso',
    description: 'Solución perfecta para control de acceso vehicular en garitas, permite la apertura automática sin bajar el vidrio.',
    features: ['Lectura hasta 12 metros', 'Tags para parabrisas', 'Alta velocidad de paso', 'Resistente a exteriores'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'alm-hub-01',
    name: 'Panel de Alarma Inalámbrico Inteligente',
    category: 'Sistemas de Alarma',
    description: 'Centro neurálgico de seguridad con conexión 4G/WiFi. Envía alertas inmediatas a nuestra central de monitoreo.',
    features: ['Conexión dual WiFi/4G', 'Batería de respaldo 24hrs', 'Soporta hasta 100 sensores', 'App móvil para el cliente'],
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'acc-lock-03',
    name: 'Cerradura Inteligente Hotelera / Corporativa',
    category: 'Control de Acceso',
    description: 'Cerradura electrónica gestionable vía software, ideal para control de áreas restringidas o de alta gerencia.',
    features: ['Apertura por Tarjeta/App', 'Registro de auditoría', 'Alertas de puerta abierta', 'Baterías de larga duración'],
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=500&q=80',
  }
];

const CATEGORIES: Category[] = ['Todos', 'Cámaras CCTV', 'Control de Acceso', 'Biométricos', 'Sistemas de Alarma'];

export default function ProductsCatalog() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');

  const filteredProducts = PRODUCTS.filter(p => activeCategory === 'Todos' || p.category === activeCategory);

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-copiv-red text-white shadow-md shadow-copiv-red/20'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
            
            {/* Image Container */}
            <div className="h-56 overflow-hidden relative">
              <div className="absolute top-4 right-4 z-10 bg-copiv-green text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.category}
              </div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-2 leading-tight">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 font-sans mb-4 flex-grow">
                {product.description}
              </p>

              {/* Specs */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-700 font-medium">
                      <i className="fa-solid fa-check text-copiv-green mt-0.5 shrink-0"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a 
                href={resolvePath(`contacto?product=${product.id}`)}
                className="w-full text-center bg-white border-2 border-copiv-green text-copiv-green font-bold py-2.5 rounded-xl hover:bg-copiv-green hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 decoration-none"
              >
                Cotizar Solución <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 font-medium">No se encontraron productos en esta categoría.</p>
        </div>
      )}
    </div>
  );
}
