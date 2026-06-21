import React, { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { getServices, type Service } from '../../lib/content/contentService';

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
      {/* Filter Navigation */}
      <div className="flex flex-wrap justify-center gap-4">
        <button 
          onClick={() => setActiveFilter('all')} 
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition cursor-pointer ${
            activeFilter === 'all' 
              ? 'bg-copiv-gold text-copiv-black shadow-lg shadow-copiv-gold/20' 
              : 'border border-copiv-green text-white hover:border-copiv-gold bg-transparent'
          }`}
        >
          Todos los Servicios
        </button>
        <button 
          onClick={() => setActiveFilter('physical')} 
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition cursor-pointer ${
            activeFilter === 'physical' 
              ? 'bg-copiv-gold text-copiv-black shadow-lg shadow-copiv-gold/20' 
              : 'border border-copiv-green text-white hover:border-copiv-gold bg-transparent'
          }`}
        >
          Seguridad Física y Agentes
        </button>
        <button 
          onClick={() => setActiveFilter('technological')} 
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition cursor-pointer ${
            activeFilter === 'technological' 
              ? 'bg-copiv-gold text-copiv-black shadow-lg shadow-copiv-gold/20' 
              : 'border border-copiv-green text-white hover:border-copiv-gold bg-transparent'
          }`}
        >
          Soluciones Tecnológicas e IA
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map(service => (
          <div 
            key={service.id} 
            className="bg-copiv-darkGray border border-copiv-green/20 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg service-card transition-all duration-300 animate-[fade-in_0.3s_ease-out]"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-copiv-darkGray to-transparent"></div>
                <span className={`absolute top-4 right-4 text-[10px] uppercase font-bold px-3 py-1 rounded-full border ${
                  service.category === 'physical' 
                    ? 'bg-copiv-green/80 text-copiv-gold border-copiv-gold/30' 
                    : 'bg-copiv-red/80 text-white border-copiv-red/30'
                }`}>
                  {service.categoryLabel}
                </span>
              </div>
              
              <div className="p-6">
                <h3 className="font-montserrat font-bold text-lg text-white mb-2 text-left">{service.title}</h3>
                <p className="text-xs text-gray-400 mb-6 font-sans text-left leading-relaxed">{service.description}</p>
                
                <ul className="text-xs text-gray-300 space-y-2 mb-6 list-none p-0 text-left">
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
                href={import.meta.env.BASE_URL + 'diagnostico'} 
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
