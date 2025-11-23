 import { useEffect } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'bsc-chat': any;
    }
  }
}

export const Chatbot = () => {
  useEffect(() => {
    // Carregar o script do chatbot apenas uma vez
    if (!document.getElementById('botschool-script')) {
      const script = document.createElement('script');
      script.id = 'botschool-script';
      script.src = 'https://webchat.ng.botschool.ai/chat-component.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <bsc-chat
      id="chatbot"
      apikey={import.meta.env.VITE_BOTSCHOOL_API_KEY}
      theme="https://webchat-themes.ng.botschool.ai/private-themes/botschool/theme.json"
      type="llm"
      configs={JSON.stringify({
        maximized: false,
        isMarkdown: true,
        image: "./logo.png",
        welcomeMessages: ["Bem-vindo ao Assistente Virtual MLOps. Como posso ajudar?"],
        placeholder: "Escreva aqui a sua mensagem",
        title: "MLOps Assistant"
      })}
    />
  );
};