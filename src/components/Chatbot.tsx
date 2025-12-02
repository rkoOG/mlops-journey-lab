import { useEffect } from "react";

// Permitir o uso do web component no TSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "bsc-chat": any;
    }
  }
}

export const Chatbot = () => {
  useEffect(() => {
    if (!document.getElementById("botschool-script")) {
      const script = document.createElement("script");
      script.id = "botschool-script";
      script.src = "https://webchat.ng.botschool.ai/chat-component.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Injetar estilos personalizados no shadow DOM
  useEffect(() => {
    const injectCustomStyles = () => {
      const chatElement = document.querySelector("bsc-chat");
      if (!chatElement?.shadowRoot) {
        setTimeout(injectCustomStyles, 500);
        return;
      }

      const shadowRoot = chatElement.shadowRoot;
      if (shadowRoot.getElementById("custom-mlops-styles")) return;

      const style = document.createElement("style");
      style.id = "custom-mlops-styles";
      style.textContent = `
        /* Container principal - Sombra mais suave e elegante */
        #bsc-chat-container {
          width: 380px !important;
          height: 600px !important;
          max-height: 85vh !important;
          border-radius: 20px !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05) !important;
          background-color: #ffffff !important;
          overflow: hidden !important;
          backdrop-filter: blur(10px) !important;
        }

        /* Esconder container quando minimizado */
        #bsc-chat-container.bsc-chat-container-minimized {
          display: none !important;
        }

        /* Header - Dourado ISEC com gradiente mais refinado */
        #bsc-chat-container .bsc-header {
          background: linear-gradient(135deg, #D4A024 0%, #B8881C 50%, #A67A18 100%) !important;
          color: #ffffff !important;
          padding: 24px 20px !important;
          border-radius: 20px 20px 0 0 !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
          position: relative !important;
        }

        /* Adicionar brilho sutil ao header */
        #bsc-chat-container .bsc-header::before {
          content: "" !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          height: 2px !important;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent) !important;
        }

        #bsc-chat-container .bsc-header-details-text-title {
          color: #ffffff !important;
          font-size: 17px !important;
          font-weight: 600 !important;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
          letter-spacing: 0.4px !important;
          display: block !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        #bsc-chat-container .bsc-header-details-text {
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          position: relative !important;
          z-index: 10 !important;
        }

        /* Forçar o nome do bot a aparecer via CSS */
        #bsc-chat-container .bsc-header-details-text-title::before {
          content: "MLOps Assistant" !important;
          color: #ffffff !important;
          font-size: 17px !important;
          font-weight: 600 !important;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
          letter-spacing: 0.4px !important;
          display: block !important;
          position: relative !important;
          z-index: 100 !important;
        }

        /* Esconder o texto original se existir */
        #bsc-chat-container .bsc-header-details-text-title {
          color: transparent !important;
          font-size: 0 !important;
        }

        /* Garantir que o texto do bot name aparece */
        #bsc-chat-container .bsc-header-details-text span,
        #bsc-chat-container .bsc-header-details-text p {
          color: #ffffff !important;
          font-size: 17px !important;
          font-weight: 600 !important;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
        }

        #bsc-chat-container .bsc-header-details-image {
          display: none !important;
        }

        #bsc-chat-container .bsc-header-action-minimize-icon,
        #bsc-chat-container .bsc-header-action-close-icon {
          background-color: rgba(255, 255, 255, 0.95) !important;
          opacity: 0.9 !important;
          border-radius: 8px !important;
          padding: 7px !important;
          transition: all 0.2s ease !important;
          width: 32px !important;
          height: 32px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        #bsc-chat-container .bsc-header-action-minimize-icon {
          -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='5' y1='12' x2='19' y2='12'/%3E%3C/svg%3E") !important;
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='5' y1='12' x2='19' y2='12'/%3E%3C/svg%3E") !important;
          -webkit-mask-size: 18px 18px !important;
          mask-size: 18px 18px !important;
          -webkit-mask-position: center !important;
          mask-position: center !important;
          -webkit-mask-repeat: no-repeat !important;
          mask-repeat: no-repeat !important;
          background-color: #1f2937 !important;
        }

        #bsc-chat-container .bsc-header-action-close-icon {
          -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'/%3E%3Cline x1='6' y1='6' x2='18' y2='18'/%3E%3C/svg%3E") !important;
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'/%3E%3Cline x1='6' y1='6' x2='18' y2='18'/%3E%3C/svg%3E") !important;
          -webkit-mask-size: 18px 18px !important;
          mask-size: 18px 18px !important;
          -webkit-mask-position: center !important;
          mask-position: center !important;
          -webkit-mask-repeat: no-repeat !important;
          mask-repeat: no-repeat !important;
          background-color: #1f2937 !important;
        }

        #bsc-chat-container .bsc-header-action-minimize-icon:hover,
        #bsc-chat-container .bsc-header-action-close-icon:hover {
          opacity: 1 !important;
          background-color: #C8941D !important;
          transform: scale(1.1) rotate(5deg) !important;
          box-shadow: 0 2px 8px rgba(200, 148, 29, 0.3) !important;
        }

        /* Lista de mensagens - Background com textura sutil */
        #bsc-chat-container .bsc-message-list {
          background: linear-gradient(to bottom, #fafbfc 0%, #f5f6f8 100%) !important;
          padding: 24px 20px !important;
          overflow-y: auto !important;
        }

        /* Scrollbar personalizada para message-list */
        #bsc-chat-container .bsc-message-list::-webkit-scrollbar {
          width: 8px !important;
        }

        #bsc-chat-container .bsc-message-list::-webkit-scrollbar-track {
          background: rgba(232, 234, 237, 0.3) !important;
          border-radius: 10px !important;
          margin: 10px 0 !important;
        }

        #bsc-chat-container .bsc-message-list::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #D4A024 0%, #C8941D 100%) !important;
          border-radius: 10px !important;
          border: 2px solid transparent !important;
          background-clip: padding-box !important;
        }

        #bsc-chat-container .bsc-message-list::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #E5B135 0%, #D9A52E 100%) !important;
          background-clip: padding-box !important;
        }

        /* Scrollbar para o container interno */
        #bsc-chat-container .bsc-message-list-container::-webkit-scrollbar {
          width: 8px !important;
        }

        #bsc-chat-container .bsc-message-list-container::-webkit-scrollbar-track {
          background: rgba(232, 234, 237, 0.3) !important;
          border-radius: 10px !important;
          margin: 10px 0 !important;
        }

        #bsc-chat-container .bsc-message-list-container::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #D4A024 0%, #C8941D 100%) !important;
          border-radius: 10px !important;
          border: 2px solid transparent !important;
          background-clip: padding-box !important;
        }

        #bsc-chat-container .bsc-message-list-container::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #E5B135 0%, #D9A52E 100%) !important;
          background-clip: padding-box !important;
        }

        /* Mensagens do utilizador - Gradiente mais suave */
        #bsc-chat-container .bsc-message-list .bsc-local .bsc-message {
          background: linear-gradient(135deg, #D4A024 0%, #C8941D 100%) !important;
          color: #ffffff !important;
          border-radius: 18px 18px 4px 18px !important;
          padding: 13px 18px !important;
          box-shadow: 0 4px 12px rgba(200, 148, 29, 0.25), 0 1px 3px rgba(0, 0, 0, 0.1) !important;
          font-size: 15px !important;
          line-height: 1.5 !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }

        #bsc-chat-container .bsc-message-list .bsc-local .bsc-message:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 16px rgba(200, 148, 29, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1) !important;
        }

        /* Mensagens do bot - Mais destaque */
        #bsc-chat-container .bsc-message-list .bsc-remote .bsc-message {
          background-color: #ffffff !important;
          color: #1f2937 !important;
          border-radius: 18px 18px 18px 4px !important;
          padding: 13px 18px !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.05) !important;
          border: 1px solid rgba(0, 0, 0, 0.05) !important;
          font-size: 15px !important;
          line-height: 1.5 !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }

        #bsc-chat-container .bsc-message-list .bsc-remote .bsc-message:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05) !important;
        }

        /* Footer - Mais elegante e clean */
        #bsc-chat-container .bsc-footer {
          background: #ffffff !important;
          padding: 16px 20px 18px 20px !important;
          border-radius: 0 0 20px 20px !important;
          border-top: 1px solid #e8eaed !important;
        }

        /* Container do input e botão */
        #bsc-chat-container .bsc-footer #bsc-footer-zones {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          padding: 0 !important;
        }

        /* Input - Design ultra moderno */
        #bsc-chat-container .bsc-footer #bsc-user-input {
          background-color: #f8f9fa !important;
          border-radius: 28px !important;
          padding: 14px 24px !important;
          font-size: 15px !important;
          border: 2px solid #e8eaed !important;
          color: #1f2937 !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
          flex: 1 !important;
          min-height: 48px !important;
        }

        #bsc-chat-container .bsc-footer #bsc-user-input:hover {
          border-color: #d1d5db !important;
          background-color: #ffffff !important;
        }

        #bsc-chat-container .bsc-footer #bsc-user-input:focus {
          background-color: #ffffff !important;
          border-color: #D4A024 !important;
          box-shadow: 0 0 0 4px rgba(212, 160, 36, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08) !important;
          outline: none !important;
        }

        #bsc-chat-container .bsc-footer #bsc-user-input::placeholder {
          color: #9ca3af !important;
          font-weight: 400 !important;
          font-size: 14.5px !important;
        }

        /* Botão enviar - Design premium */
        #bsc-chat-container .bsc-footer #bsc-send-button {
          background: linear-gradient(135deg, #D4A024 0%, #C8941D 100%) !important;
          border-radius: 50% !important;
          width: 48px !important;
          height: 48px !important;
          min-width: 48px !important;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
          box-shadow: 0 4px 14px rgba(200, 148, 29, 0.35) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          border: none !important;
          position: relative !important;
          overflow: hidden !important;
        }

        /* Ícone de enviar personalizado */
        #bsc-chat-container .bsc-footer #bsc-send-button svg,
        #bsc-chat-container .bsc-footer #bsc-send-button path {
          fill: white !important;
          stroke: white !important;
          width: 20px !important;
          height: 20px !important;
        }

        #bsc-chat-container .bsc-footer #bsc-send-button::after {
          content: "" !important;
          position: absolute !important;
          width: 20px !important;
          height: 20px !important;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z'/%3E%3C/svg%3E") !important;
          background-size: contain !important;
          background-repeat: no-repeat !important;
          background-position: center !important;
          transform: translateX(1px) !important;
        }

        /* Efeito de brilho no botão */
        #bsc-chat-container .bsc-footer #bsc-send-button::before {
          content: "" !important;
          position: absolute !important;
          top: 0 !important;
          left: -100% !important;
          width: 100% !important;
          height: 100% !important;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent) !important;
          transition: left 0.5s ease !important;
        }

        #bsc-chat-container .bsc-footer #bsc-send-button:hover::before {
          left: 100% !important;
        }

        #bsc-chat-container .bsc-footer #bsc-send-button:hover {
          background: linear-gradient(135deg, #E0AC2B 0%, #D4A024 100%) !important;
          transform: scale(1.12) rotate(5deg) !important;
          box-shadow: 0 8px 24px rgba(200, 148, 29, 0.45) !important;
        }

        #bsc-chat-container .bsc-footer #bsc-send-button:active {
          transform: scale(1.05) rotate(0deg) !important;
          box-shadow: 0 4px 12px rgba(200, 148, 29, 0.35) !important;
        }

        /* Ícone do botão enviar */
        #bsc-chat-container .bsc-footer #bsc-send-button svg,
        #bsc-chat-container .bsc-footer #bsc-send-button::after {
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1)) !important;
        }

        /* Botão minimizado - Mais destaque e elegante */
.bsc-chat-minimized {
  width: 64px !important;
  height: 64px !important;
  border-radius: 50% !important;
  background: linear-gradient(135deg, #D4A024 0%, #C8941D 50%, #A67A18 100%) !important;
  box-shadow: 0 12px 32px rgba(200, 148, 29, 0.35), 0 4px 8px rgba(0, 0, 0, 0.15) !important;
  bottom: 28px !important;
  right: 28px !important;
  cursor: pointer !important;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border: 3px solid rgba(255, 255, 255, 0.2) !important;
}

/* Ícone de chat dentro do círculo */
.bsc-chat-minimized::before {
  content: "" !important;
  display: block !important;
  width: 28px !important;
  height: 28px !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H9.25L6 18.5V15H7a3 3 0 0 1-3-3V5z'/%3E%3C/svg%3E") !important;
  background-size: 24px 24px !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
}

.bsc-chat-minimized:hover {
  transform: scale(1.15) translateY(-4px) !important;
  box-shadow: 0 16px 40px rgba(200, 148, 29, 0.45), 0 8px 16px rgba(0, 0, 0, 0.2) !important;
  border-color: rgba(255, 255, 255, 0.4) !important;
}

.bsc-chat-minimized:active {
  transform: scale(1.05) translateY(-2px) !important;
}

/* Esconder qualquer texto do botão minimizado */
.bsc-chat-minimized .bsc-text-container {
  display: none !important;
}


        /* Botões de ação */
        #bsc-chat-container button {
          cursor: pointer !important;
          transition: all 0.2s ease !important;
        }

        /* Loading dots */
        #bsc-chat-container .dot-1,
        #bsc-chat-container .dot-2,
        #bsc-chat-container .dot-3 {
          background-color: #C8941D !important;
        }

        /* Scrollbar personalizada */
        #bsc-chat-container .bsc-message-list::-webkit-scrollbar {
          width: 6px !important;
        }

        #bsc-chat-container .bsc-message-list::-webkit-scrollbar-track {
          background: transparent !important;
        }

        #bsc-chat-container .bsc-message-list::-webkit-scrollbar-thumb {
          background: #C8941D !important;
          border-radius: 3px !important;
        }

        #bsc-chat-container .bsc-message-list::-webkit-scrollbar-thumb:hover {
          background: #A67A18 !important;
        }
      `;

      shadowRoot.appendChild(style);
    };

    const timer = setTimeout(injectCustomStyles, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <bsc-chat
      id="chatbot"
      apikey={(import.meta as any).env?.VITE_BOTSCHOOL_API_KEY}
      type="llm"
      theme="/chatbot-theme.json"
    />
  );
};
