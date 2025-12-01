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
      const chatElement = document.querySelector('bsc-chat');
      if (!chatElement?.shadowRoot) {
        setTimeout(injectCustomStyles, 500);
        return;
      }

      const shadowRoot = chatElement.shadowRoot;
      if (shadowRoot.getElementById('custom-mlops-styles')) return;

      const style = document.createElement('style');
      style.id = 'custom-mlops-styles';
      style.textContent = `
        /* Container principal */
        #bsc-chat-container {
          width: 380px !important;
          height: 600px !important;
          max-height: 85vh !important;
          border-radius: 16px !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
          background-color: #ffffff !important;
          overflow: hidden !important;
        }

        /* Esconder container quando minimizado */
        #bsc-chat-container.bsc-chat-container-minimized {
          display: none !important;
        }

        /* Header - Dourado ISEC */
        #bsc-chat-container .bsc-header {
          background: linear-gradient(135deg, #C8941D 0%, #A67A18 100%) !important;
          color: #ffffff !important;
          padding: 20px !important;
          border-radius: 16px 16px 0 0 !important;
        }

        #bsc-chat-container .bsc-header-details-text-title {
          color: #ffffff !important;
          font-size: 18px !important;
          font-weight: 600 !important;
        }

        #bsc-chat-container .bsc-header-details-image {
          border: 2px solid #ffffff !important;
          border-radius: 50% !important;
        }

        #bsc-chat-container .bsc-header-action-minimize-icon,
        #bsc-chat-container .bsc-header-action-close-icon {
          background-color: #ffffff !important;
          opacity: 0.9 !important;
        }

        #bsc-chat-container .bsc-header-action-minimize-icon:hover,
        #bsc-chat-container .bsc-header-action-close-icon:hover {
          opacity: 1 !important;
        }

        /* Lista de mensagens */
        #bsc-chat-container .bsc-message-list {
          background-color: #f8f9fa !important;
          padding: 20px !important;
        }

        /* Mensagens do utilizador */
        #bsc-chat-container .bsc-message-list .bsc-local .bsc-message {
          background-color: #C8941D !important;
          color: #ffffff !important;
          border-radius: 16px 16px 4px 16px !important;
          padding: 12px 16px !important;
          box-shadow: 0 2px 8px rgba(200, 148, 29, 0.3) !important;
        }

        /* Mensagens do bot */
        #bsc-chat-container .bsc-message-list .bsc-remote .bsc-message {
          background-color: #ffffff !important;
          color: #1f2937 !important;
          border-radius: 16px 16px 16px 4px !important;
          padding: 12px 16px !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
        }

        /* Footer */
        #bsc-chat-container .bsc-footer {
          background-color: #ffffff !important;
          padding: 16px !important;
          border-radius: 0 0 16px 16px !important;
          border-top: 1px solid #e5e7eb !important;
        }

        /* Input */
        #bsc-chat-container .bsc-footer #bsc-user-input {
          background-color: #f3f4f6 !important;
          border-radius: 24px !important;
          padding: 12px 20px !important;
          font-size: 15px !important;
          border: none !important;
          color: #1f2937 !important;
        }

        /* Botão enviar */
        #bsc-chat-container .bsc-footer #bsc-send-button {
          background-color: #C8941D !important;
          border-radius: 50% !important;
          width: 44px !important;
          height: 44px !important;
          transition: all 0.3s ease !important;
        }

        #bsc-chat-container .bsc-footer #bsc-send-button:hover {
          background-color: #A67A18 !important;
          transform: scale(1.05) !important;
        }

        /* Botão minimizado */
        .bsc-chat-minimized {
          width: 60px !important;
          height: 60px !important;
          border-radius: 50% !important;
          background: linear-gradient(135deg, #C8941D 0%, #A67A18 100%) !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25) !important;
          bottom: 24px !important;
          right: 24px !important;
          cursor: pointer !important;
          transition: transform 0.3s ease !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .bsc-chat-minimized:hover {
          transform: scale(1.1) !important;
        }

        /* Esconder texto do botão minimizado */
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
      theme="https://webchat-themes.ng.botschool.ai/private-themes/botschool/theme.json"
    />
  );
};