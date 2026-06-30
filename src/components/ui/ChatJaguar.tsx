import React, { useState, useEffect, useRef } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'system_loading';
}

const SYSTEM_INSTRUCTION = `
Actúas como "Copiv - Promptend", un asistente oficial inteligente de la marca COPIV TIKAL (Corporación Privada de Investigación y Vigilancia, Sociedad Anónima Tikal).
    Debes responder consultas de seguridad basándote en la información institucional de la marca.

Valores institucionales:
- Misión: Brindar servicios de soporte técnico y soluciones tecnológicas en seguridad privada con altos estándares de calidad, confiabilidad y eficiencia, garantizando la continuidad operativa y la protección integral de nuestros clientes.
- Visión: Ser líderes reconocidos por nuestra excelencia, innovación constante y compromiso.
- Colores de marca: Rojo para alerta y acción inmediata (#E22732), Verde para estabilidad, confianza y seguridad institucional (#37553A), Negro para formalidad y Blanco para claridad. El Jaguar es nuestro símbolo de control, liderazgo, capacidad de reacción y anticipación de campo.
- Servicios principales: Plataforma de Garitas SMART, CCTV con Monitoreo Activo e Inteligencia Artificial (IA), Controles de Acceso, Alarmas, GPS satelital, Agentes de Centro Comercial, Custodios de Activos y Valores, Agentes de Instituciones, y Moto Patrullas de Reacción.
- Dirección central: 15 avenida 1-73 Ciudad San Cristóbal Z.8 Mixco.
- Contacto: Teléfono +502 5212 0606 (Ventas), (502) 4854-2084 (Soporte Técnico). Emails: ventas@copivgt.com, soportecnico@copivgt.com.

Instrucciones para las respuestas:
- Responde siempre con profesionalismo, elegancia y un tono de seguridad táctica. No hables de cosas administrativas, cotizaciones detalladas o soporte técnico operativo interno. Concéntrate en la excelencia del servicio y la protección.
- Invita periódicamente a los usuarios a utilizar el "Autodiagnóstico de Vulnerabilidad" en nuestra pestaña de la web.
- Si el usuario pregunta algo que no figura en los servicios de COPIV, aclara educadamente que representas a COPIV TIKAL y ofréceles una alternativa de nuestro portafolio.
`;

function ChatJaguarInner() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: '¡Hola! Soy tu asistente de marca **COPIV TIKAL**. Me especializo en la información de seguridad de nuestro portafolio y manual de marca. ¿Deseas conocer más sobre nuestra Plataforma de Garitas SMART, CCTV con IA o cómo se evalúan nuestros agentes tácticos?',
      sender: 'ai'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const generateLocalFallback = (question: string): string => {
    const lower = question.toLowerCase();
    if (lower.includes('smart') || lower.includes('garita') || lower.includes('acceso')) {
      return "Nuestra **Plataforma de Garitas SMART** integra un innovador control de accesos para visitas y condóminos, lectura de placas LPR y bitácoras electrónicas. Esto garantiza un flujo organizado en residenciales y complejos industriales. ¿Deseas realizar nuestro Autodiagnóstico de Vulnerabilidad?";
    }
    if (lower.includes('cctv') || lower.includes('camara') || lower.includes('ia') || lower.includes('monitoreo')) {
      return "En **COPIV TIKAL** diseñamos sistemas de CCTV IP con Inteligencia Artificial capaz de analizar patrones sospechosos 24/7/365. Cualquier evento se reporta de inmediato a nuestra central de reacción. ¡Su tranquilidad es nuestra ciencia!";
    }
    if (lower.includes('agente') || lower.includes('guardia') || lower.includes('custodio') || lower.includes('personal')) {
      return "Contamos con agentes especializados certificados en centros comerciales, instituciones y custodia de activos/valores. Cada especialista pasa por evaluaciones tácticas y de primeros auxilios de forma regular. ¿Le gustaría realizar un autodiagnóstico de riesgos en línea para su empresa?";
    }
    if (lower.includes('contacto') || lower.includes('telefono') || lower.includes('ubicacion') || lower.includes('oficina') || lower.includes('correo')) {
      return "Nuestras oficinas centrales están en la **15 avenida 1-73 Ciudad San Cristóbal Z.8 Mixco**. Puede escribirnos directamente a **ventas@copivgt.com** o llamarnos al **+502 5212 0606**.";
    }
    return "Como representante de **COPIV TIKAL S.A.**, le informo que ofrecemos soporte avanzado en seguridad privada, investigación, garitas SMART, patrullas y guardias de alta confiabilidad. ¿Le gustaría realizar un autodiagnóstico de riesgos en línea para su empresa?";
  };

  const sendChatMessage = async () => {
    const prompt = inputValue.trim();
    if (!prompt) return;

    // Add user message
    const userMsgId = 'msg-' + Math.random().toString(36).substr(2, 9);
    setMessages(prev => [...prev, { id: userMsgId, text: prompt, sender: 'user' }]);
    setInputValue('');

    // Add loading message
    const loadingId = 'loading-' + Math.random().toString(36).substr(2, 9);
    setMessages(prev => [...prev, { id: loadingId, text: 'Pensando respuesta de seguridad...', sender: 'system_loading' }]);

    try {
      const apiKey = import.meta.env.PUBLIC_GEMINI_API_KEY || "";
      if (!apiKey) {
        throw new Error("No API Key configured");
      }

      // We use Gemini 2.5 Flash as standard or fallback, since gemini-3-flash-preview might not be universally accessible
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Remove loading message
      setMessages(prev => prev.filter(m => m.id !== loadingId));

      const result = await response.json();
      const candidate = result.candidates?.[0];
      if (candidate && candidate.content?.parts?.[0]?.text) {
        const responseText = candidate.content.parts[0].text;
        const aiMsgId = 'msg-' + Math.random().toString(36).substr(2, 9);
        setMessages(prev => [...prev, { id: aiMsgId, text: responseText, sender: 'ai' }]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.warn("API Error or Missing Key, using local fallback responses:", error);
      // Remove loading message
      setMessages(prev => prev.filter(m => m.id !== loadingId));
      
      const fallbackResponse = generateLocalFallback(prompt);
      const aiMsgId = 'msg-' + Math.random().toString(36).substr(2, 9);
      setMessages(prev => [...prev, { id: aiMsgId, text: fallbackResponse, sender: 'ai' }]);
    }
  };

  const handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendChatMessage();
    }
  };

  // Helper to safely render bold text markdown
  const renderText = (text: string) => {
    // Basic Markdown parser for **bold** text
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Bubble */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        id="chat-bubble-btn" 
        className="w-14 h-14 bg-gradient-to-br from-copiv-red to-copiv-redDark text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all group relative border-2 border-copiv-gold cursor-pointer"
        aria-label="Chat con el asistente"
      >
        <i id="chat-icon" className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-headset'} text-xl`}></i>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-copiv-gold rounded-full flex items-center justify-center text-[8px] text-copiv-black font-bold">
            <i className="fa-solid fa-wand-magic-sparkles animate-pulse"></i>
          </span>
        )}
      </button>

      {/* Chat Widget Panel */}
      {isOpen && (
        <div id="chat-widget" className="mt-3 w-80 sm:w-96 h-[480px] bg-copiv-darkGray border-2 border-copiv-gold rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-[translate-y_0.2s_ease-out]">
          {/* Header */}
          <div className="bg-gradient-to-r from-copiv-green to-copiv-black p-4 flex justify-between items-center border-b border-copiv-green/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-copiv-gold flex items-center justify-center text-copiv-black text-sm">
                <i className="fa-solid fa-user-tie"></i>
              </div>
              <div className="text-left">
                <h4 className="font-montserrat font-bold text-white text-xs m-0">Asistente Jaguar COPIV</h4>
                <span className="text-[9px] text-green-400 flex items-center gap-1 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Representante de Marca
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white hover:text-copiv-red text-sm bg-transparent border-0 cursor-pointer"
              aria-label="Minimizar chat"
            >
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>

          {/* Messages Stream */}
          <div id="chat-messages" className="flex-grow p-4 overflow-y-auto space-y-3 text-xs no-scrollbar bg-copiv-black/20">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto justify-end' : ''}`}
              >
                {msg.sender !== 'user' && (
                  <div className={`w-6 h-6 rounded-full ${msg.sender === 'system_loading' ? 'bg-copiv-gold animate-spin' : 'bg-copiv-gold'} flex items-center justify-center text-copiv-black text-[10px] mt-0.5 shrink-0`}>
                    <i className={`fa-solid ${msg.sender === 'system_loading' ? 'fa-spinner' : 'fa-shield-halved'}`}></i>
                  </div>
                )}
                
                <div className={`p-3 rounded-2xl font-sans text-left border ${
                  msg.sender === 'user' 
                    ? 'bg-copiv-green text-white border-copiv-greenLight rounded-tr-none' 
                    : msg.sender === 'system_loading'
                      ? 'bg-copiv-black/40 text-gray-400 border-transparent italic'
                      : 'bg-copiv-black/60 text-gray-200 border-copiv-green/20 rounded-tl-none'
                }`}>
                  {msg.sender === 'system_loading' ? msg.text : renderText(msg.text)}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Controls */}
          <div className="p-3 border-t border-copiv-green/20 bg-copiv-black/40 flex items-center gap-2">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeydown}
              placeholder="Preguntar sobre servicios de COPIV..." 
              className="flex-grow bg-copiv-black text-white px-3 py-2 rounded-lg border border-copiv-green/50 text-xs focus:border-copiv-gold focus-visible:ring-2 focus-visible:ring-copiv-gold font-sans"
            />
            <button 
              onClick={sendChatMessage}
              className="w-8 h-8 rounded-lg bg-copiv-red hover:bg-copiv-redDark text-white flex items-center justify-center transition shrink-0 cursor-pointer border-0"
              aria-label="Enviar"
            >
              <i className="fa-solid fa-paper-plane text-xs"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ChatJaguar() {
  return (
    <ErrorBoundary>
      <ChatJaguarInner />
    </ErrorBoundary>
  );
}
