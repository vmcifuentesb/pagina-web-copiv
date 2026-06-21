import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

const API_BASE = import.meta.env.PUBLIC_API_URL || '/api';

function ContactFormInner() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Agentes de Seguridad');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const showToast = (msg: string) => {
    document.dispatchEvent(new CustomEvent('show-toast', { detail: msg }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/contacto.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, phone, subject, message })
      });
      const data = await res.json();

      if (data.success) {
        showToast('Mensaje enviado correctamente. Un asesor le responder pronto.');
        setName('');
        setCompany('');
        setEmail('');
        setPhone('');
        setSubject('Agentes de Seguridad');
        setMessage('');
      } else {
        throw new Error(data.message || 'Error del servidor');
      }
    } catch {
      showToast('Error al enviar. Nosotros le llamamos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-sans">Su Nombre:</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
            placeholder="Ej: Juan Perez" 
            className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-copiv-green focus-visible:ring-2 focus-visible:ring-copiv-green text-sm font-sans"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-sans">Nombre de Empresa (Opcional):</label>
          <input 
            type="text" 
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Ej: Alimentos S.A." 
            className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-copiv-green focus-visible:ring-2 focus-visible:ring-copiv-green text-sm font-sans"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-sans">Correo Electronico:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            placeholder="correo@empresa.com" 
            className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-copiv-green focus-visible:ring-2 focus-visible:ring-copiv-green text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-sans">Telefono:</label>
          <input 
            type="tel" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required 
            placeholder="48542084" 
            className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-copiv-green focus-visible:ring-2 focus-visible:ring-copiv-green text-sm font-mono"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-sans">Servicio de Interes:</label>
        <select 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-copiv-green focus-visible:ring-2 focus-visible:ring-copiv-green text-sm font-sans"
        >
          <option value="Agentes de Seguridad">Agentes de Seguridad Fisica</option>
          <option value="Sistemas CCTV o IA">Sistemas de Videovigilancia CCTV e IA</option>
          <option value="Plataforma Garitas SMART">Plataforma Garitas SMART</option>
          <option value="Asesoria Tecnica">Asesoria de Gestion de Riesgo</option>
          <option value="Otro">Otro Requerimiento</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-sans">Mensaje o Requerimiento:</label>
        <textarea 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5} 
          required 
          placeholder="Describa brevemente las necesidades de resguardo tactico que requiere de COPIV..." 
          className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-copiv-green focus-visible:ring-2 focus-visible:ring-copiv-green text-sm resize-none font-sans"
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-gradient-to-r from-copiv-red to-copiv-redDark text-white font-bold py-3.5 rounded-xl shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 font-montserrat cursor-pointer border-0 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Enviando...' : 'Enviar Mensaje de Consulta'} <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
      </button>
    </form>
  );
}

export default function ContactForm() {
  return (
    <ErrorBoundary>
      <ContactFormInner />
    </ErrorBoundary>
  );
}
