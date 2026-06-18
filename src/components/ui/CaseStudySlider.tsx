import React, { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { getCaseStudies, type CaseStudy } from '../../lib/content/contentService';

function CaseStudySliderInner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getCaseStudies().then(data => {
      if (active) {
        setCaseStudies(data);
        setIsLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const handleNext = () => {
    if (caseStudies.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev + 1) % caseStudies.length);
  };

  const handlePrev = () => {
    if (caseStudies.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setDisplayIndex(currentIndex);
        setIsTransitioning(false);
      }, 300); // Match transit time
      return () => clearTimeout(timer);
    } else {
      setDisplayIndex(currentIndex);
    }
  }, [currentIndex, isTransitioning]);

  if (isLoading || caseStudies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3 bg-copiv-darkGray/40 border border-copiv-green/30 rounded-3xl">
        <i className="fa-solid fa-spinner text-3xl text-copiv-gold animate-spin"></i>
        <span className="text-xs text-gray-400 font-sans">Cargando bitácora de incidentes...</span>
      </div>
    );
  }

  const study = caseStudies[displayIndex];

  return (
    <div className="bg-gradient-to-r from-copiv-darkGray/60 to-copiv-black border border-copiv-green/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left">
          <span className="text-[10px] text-copiv-gold font-bold uppercase tracking-wider block">
            <i className="fa-solid fa-circle-exclamation mr-1"></i> Central Tikal en Acción
          </span>
          <h3 className="font-montserrat font-extrabold text-xl text-white m-0">Casos de Éxito de Intrusiones Frustradas</h3>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex gap-2">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-lg bg-copiv-black border border-copiv-green text-white hover:border-copiv-gold transition flex items-center justify-center cursor-pointer"
            aria-label="Caso anterior"
          >
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-lg bg-copiv-black border border-copiv-green text-white hover:border-copiv-gold transition flex items-center justify-center cursor-pointer"
            aria-label="Siguiente caso"
          >
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>

      {/* Case content box */}
      <div 
        className={`bg-copiv-black/40 border border-copiv-green/10 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center gap-6 transition-all duration-300 ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <div className="w-full md:w-1/3 h-44 rounded-xl overflow-hidden shrink-0">
          <img 
            src={study.img} 
            alt={study.title}
            loading="lazy"
            className="w-full h-full object-cover grayscale opacity-85 hover:grayscale-0 transition-all duration-500" 
          />
        </div>
        
        <div className="space-y-3 flex-grow text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-copiv-red/20 border border-copiv-red/40 rounded-full text-[9px] font-bold text-copiv-red uppercase">
            <i className="fa-solid fa-bolt"></i> <span>{study.category}</span>
          </div>
          
          <h4 className="font-montserrat font-bold text-lg text-white m-0">{study.title}</h4>
          
          <p className="text-xs text-gray-300 leading-relaxed font-sans font-light m-0">{study.desc}</p>
          
          <div className="border-t border-copiv-green/10 pt-3 flex flex-wrap gap-4 text-[10px] text-gray-400">
            <span>Ubicación: <strong className="text-white">{study.loc}</strong></span>
            <span>Efectividad: <strong className="text-copiv-gold">{study.eff}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudySlider() {
  return (
    <ErrorBoundary>
      <CaseStudySliderInner />
    </ErrorBoundary>
  );
}
