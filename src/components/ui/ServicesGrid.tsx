import React, { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { getServices, type Service } from '../../lib/content/contentService';
import { resolvePath } from '../../utils/constants';

function ServicesGridInner() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'physical' | 'technological'>('all');
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getServices().then(data => {
      if (active) {
        setServices(data);
        setIsLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const filteredServices = services.filter(service => {
    if (activeFilter === 'all') return true;
    return service.category === activeFilter;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <i className="fa-solid fa-spinner text-3xl text-copiv-gold animate-spin"></i>
        <span className="text-xs text-gray-400 font-sans">Cargando servicios de seguridad táctica...</span>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3">
        <button 
          onClick={() => setActiveFilter('all')} 
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
            activeFilter === 'all' 
              ? 'bg-copiv-green text-white shadow-md shadow-copiv-green/20' 
              : 'border border-copiv-green/30 text-copiv-green hover:border-copiv-green bg-transparent'
          }`}
        >
          Todos
        </button>
        <button 
          onClick={() => setActiveFilter('physical')} 
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
            activeFilter === 'physical' 
              ? 'bg-copiv-green text-white shadow-md shadow-copiv-green/20' 
              : 'border border-copiv-green/30 text-copiv-green hover:border-copiv-green bg-transparent'
          }`}
        >
          Seguridad Física
        </button>
        <button 
          onClick={() => setActiveFilter('technological')} 
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
            activeFilter === 'technological' 
              ? 'bg-copiv-green text-white shadow-md shadow-copiv-green/20' 
              : 'border border-copiv-green/30 text-copiv-green hover:border-copiv-green bg-transparent'
          }`}
        >
          Soluciones Tecnológicas
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map(service => (
          <div 
            key={service.id} 
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm service-card transition-all duration-300 animate-[fade-in_0.3s_ease-out]"
          >
            <div className="relative h-48 overflow-hidden">
              {service.image && (
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-110" 
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
              <span className={`absolute top-4 right-4 text-[9px] uppercase font-extrabold px-3 py-1 rounded-full border backdrop-blur-md ${
                service.category === 'physical' 
                  ? 'bg-copiv-green/10 text-copiv-green border-copiv-green/20' 
                  : 'bg-copiv-red/10 text-copiv-red border-copiv-red/20'
              }`}>
                {service.category === 'physical' ? 'Física' : 'Tecnología'}
              </span>
            </div>

            <div className="p-6 flex-grow flex flex-col justify-between">
              <div className="text-left">
                <span className="text-[10px] text-copiv-red font-bold uppercase tracking-wider block mb-1 font-sans">{service.category === 'physical' ? 'Agente de Elite' : 'Soporte Inteligente'}</span>
                <h3 className="font-montserrat font-bold text-xl text-gray-900 mb-2">{service.title}</h3>
                <p className="text-xs text-gray-600 mb-6 font-sans text-left leading-relaxed">{service.description}</p>
                
                <ul className="text-xs text-gray-700 space-y-2 mb-6 list-none p-0 text-left">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <i className="fa-solid fa-check text-copiv-red mr-2"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 pt-0">
              <a 
                href={resolvePath('diagnostico')} 
                className="w-full bg-copiv-green hover:bg-copiv-greenLight text-white font-bold py-2.5 rounded-lg text-xs transition duration-300 decoration-none inline-block text-center cursor-pointer border-0"
              >
                {service.ctaLabel}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServicesGrid() {
  return (
    <ErrorBoundary>
      <ServicesGridInner />
    </ErrorBoundary>
  );
}
