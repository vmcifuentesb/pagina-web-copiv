import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

const API_BASE = import.meta.env.PUBLIC_API_URL || '/api';

function EmergencyButtonInner() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setName('');
    setPhone('');
    setDesc('');
  };

  const showToast = (msg: string) => {
    document.dispatchEvent(new CustomEvent('show-toast', { detail: msg }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/emergencia.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, desc })
      });
      const data = await res.json();

      if (data.success) {
        showToast('🚨 Alerta enviada. Un asesor le contactará inmediatamente.');
        handleClose();
      } else {
        throw new Error(data.message || 'Error del servidor');
      }
    } catch {
      showToast('❌ Error al enviar alerta. Llame al +502 3066 2135.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Red Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button 
          onClick={handleOpen}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-copiv-red to-copiv-redDark text-white font-black text-xs uppercase tracking-wider rounded-full shadow-2xl border-2 border-white hover:scale-110 active:scale-95 transition-all group font-montserrat cursor-pointer"
        >
          <span className="flex h-3.5 w-3.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
          </span>
          <span>🚨 ¿Emergencia o Amenaza?</span>
        </button>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-copiv-darkGray border-2 border-copiv-red max-w-md w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-[translate-y_0.3s_ease-out]">
            {/* Header */}
            <div className="bg-gradient-to-r from-copiv-red to-copiv-redDark p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-triangle-exclamation animate-bounce"></i>
                <h4 className="font-montserrat font-black text-xs sm:text-sm tracking-wider uppercase">Atención de Crisis de Seguridad</h4>
              </div>
              <button 
                onClick={handleClose}
                className="text-white hover:text-copiv-black text-lg focus-visible:ring-2 focus-visible:ring-copiv-gold rounded cursor-pointer"
                aria-label="Cerrar modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-gray-300 font-sans">
                ¿Su empresa, condominio o comercio acaba de sufrir una intrusión, vulneración de garita o amenaza activa de seguridad?
              </p>
              <p className="text-xs text-white font-semibold border-l-2 border-copiv-gold pl-2 font-sans">
                Registre sus datos inmediatamente. Un especialista sénior de seguridad se contactará con usted con absoluta prioridad.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 font-sans">
                    Nombre del Solicitante o Empresa:
                  </label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                    placeholder="Ej: Roberto Asturias / Condominio Platino" 
                    className="w-full bg-copiv-black text-white px-3 py-2 rounded-lg border border-copiv-red/40 focus:border-copiv-red focus-visible:ring-2 focus-visible:ring-copiv-red text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 font-sans">
                    Teléfono Directo de Contacto:
                  </label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required 
                    placeholder="Ej: 4854 2084" 
                    className="w-full bg-copiv-black text-white px-3 py-2 rounded-lg border border-copiv-red/40 focus:border-copiv-red focus-visible:ring-2 focus-visible:ring-copiv-red text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 font-sans">
                    Detalle Sucinto del Incidente:
                  </label>
                  <textarea 
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    rows={3} 
                    required 
                    placeholder="Describa el incidente (ej: intrusión perimetral fallida, sospecha, necesidad de patrulla inmediata...)" 
                    className="w-full bg-copiv-black text-white px-3 py-2 rounded-lg border border-copiv-red/40 focus:border-copiv-red focus-visible:ring-2 focus-visible:ring-copiv-red text-xs resize-none font-sans"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-copiv-red to-copiv-redDark text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider hover:scale-[1.01] transition-all flex items-center justify-center gap-2 font-montserrat cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enviando...' : 'Solicitar Intervención Comercial Táctica'} <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-tower-broadcast'}`}></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function EmergencyButton() {
  return (
    <ErrorBoundary>
      <EmergencyButtonInner />
    </ErrorBoundary>
  );
}
