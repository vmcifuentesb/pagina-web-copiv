import React, { useState } from 'react';
import { resolvePath } from '../../utils/constants';

interface Detail {
  title: string;
  iconClass: string;
  desc: string;
}

const DETAILS: Record<string, Detail> = {
  lpr: {
    title: "Cámaras LPR (Lectura de Matrículas)",
    iconClass: "fa-solid fa-car-rear",
    desc: "La tecnología LPR (License Plate Recognition) integrada en la Plataforma Garitas SMART de COPIV captura y procesa patentes de vehículos en menos de 1 segundo. Almacena marcas, colores e historiales de ingresos directamente sincronizados en la nube."
  },
  biometric: {
    title: "Validación Biométrica y Accesos QR",
    iconClass: "fa-solid fa-qrcode",
    desc: "Evita las bitácoras físicas inseguras de papel. Nuestra integración tecnológica permite a condóminos generar accesos dinámicos QR para sus visitas temporales con vencimiento programado, con notificaciones instantáneas al administrador."
  },
  perimeter: {
    title: "Barreras Microondas Perimetrales",
    iconClass: "fa-solid fa-wave-square",
    desc: "Detección invisible en perímetros extensos de fábricas o condominios residenciales en Guatemala. Genera un muro electromagnético de análisis térmico que diferencia intrusiones reales de animales pequeños o follaje soplado."
  },
  power: {
    title: "Centralización PoE y Respaldo Eléctrico",
    iconClass: "fa-solid fa-battery-three-quarters",
    desc: "Ante apagones de la red comercial eléctrica de Guatemala, nuestro engranaje de soporte técnico avanzado despliega centrales autónomas PoE y plantas solares de respaldo táctico, logrando que el sistema de CCTV e IA permanezca activo sin interrupciones."
  }
};

export default function BlueprintExploder() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleReveal = (key: string) => {
    setSelectedKey(key);
    const detail = DETAILS[key];
    if (detail) {
      const event = new CustomEvent('show-toast', {
        detail: `Explorando: ${detail.title}`
      });
      document.dispatchEvent(event);
    }
  };

  const currentDetail = selectedKey ? DETAILS[selectedKey] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Left Blueprint Visual Panel */}
      <div className="lg:col-span-7 relative h-96 sm:h-[480px] bg-copiv-black/80 rounded-3xl overflow-hidden border border-copiv-green/30 group">
        {/* Background image */}
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80" 
          alt="Plano táctico"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity filter blur-[1px]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-copiv-black via-transparent to-transparent"></div>
        
        {/* Laser scan line inside the exploder */}
        <div className="absolute left-0 right-0 h-[2px] bg-copiv-red/40 shadow-[0_0_10px_#E22732] top-1/4 animate-pulse"></div>

        {/* Hotspot 1: Cámara LPR */}
        <button 
          onClick={() => handleReveal('lpr')}
          className={`hotspot-pulse absolute top-1/4 left-1/3 w-8 h-8 bg-copiv-red text-white text-xs font-bold rounded-full flex items-center justify-center border border-white focus:outline-none z-10 transition hover:scale-125 cursor-pointer ${selectedKey === 'lpr' ? 'ring-4 ring-copiv-gold' : ''}`}
        >
          1
        </button>

        {/* Hotspot 2: Control QR */}
        <button 
          onClick={() => handleReveal('biometric')}
          className={`hotspot-pulse absolute top-1/2 left-2/3 w-8 h-8 bg-copiv-red text-white text-xs font-bold rounded-full flex items-center justify-center border border-white focus:outline-none z-10 transition hover:scale-125 cursor-pointer ${selectedKey === 'biometric' ? 'ring-4 ring-copiv-gold' : ''}`}
        >
          2
        </button>

        {/* Hotspot 3: Sensores Perimetrales */}
        <button 
          onClick={() => handleReveal('perimeter')}
          className={`hotspot-pulse absolute bottom-1/4 left-1/4 w-8 h-8 bg-copiv-red text-white text-xs font-bold rounded-full flex items-center justify-center border border-white focus:outline-none z-10 transition hover:scale-125 cursor-pointer ${selectedKey === 'perimeter' ? 'ring-4 ring-copiv-gold' : ''}`}
        >
          3
        </button>

        {/* Hotspot 4: Respaldo PoE */}
        <button 
          onClick={() => handleReveal('power')}
          className={`hotspot-pulse absolute top-2/3 left-[45%] w-8 h-8 bg-copiv-red text-white text-xs font-bold rounded-full flex items-center justify-center border border-white focus:outline-none z-10 transition hover:scale-125 cursor-pointer ${selectedKey === 'power' ? 'ring-4 ring-copiv-gold' : ''}`}
        >
          4
        </button>
      </div>

      {/* Right Detail Presentation Panel */}
      <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6 flex flex-col justify-between min-h-[360px]">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-copiv-green/10 text-copiv-green border border-copiv-green/30 rounded-full flex items-center justify-center text-xl">
            <i className={currentDetail ? currentDetail.iconClass : "fa-solid fa-microchip"}></i>
          </div>
          
          <h4 className="font-montserrat font-bold text-lg text-gray-900 text-left">
            {currentDetail ? currentDetail.title : "Tecnología de Seguridad COPIV"}
          </h4>
          
          <p className="text-xs text-gray-600 leading-relaxed font-light font-sans text-left">
            {currentDetail 
              ? currentDetail.desc 
              : "Seleccione cualquiera de los puntos numéricos del plano interactivo de la izquierda para desglosar el funcionamiento e integración de cada sistema táctico de protección."
            }
          </p>
        </div>
        
        <div className="border-t border-copiv-green/20 pt-4 text-left">
          <a href={resolvePath('diagnostico')} className="text-xs text-copiv-gold hover:underline font-bold decoration-none">
            <i className="fa-solid fa-shield-halved mr-1"></i> Evaluar riesgos perimetrales en autodiagnóstico →
          </a>
        </div>
      </div>
    </div>
  );
}
