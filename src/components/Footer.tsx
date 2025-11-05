import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-3 text-lg font-bold">MLOps Explorer</h3>
            <p className="text-sm text-muted-foreground">
              Aprende MLOps de forma prática e interativa. Um projeto educativo para
              estudantes e profissionais.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Recursos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/pipeline" className="hover:text-foreground transition-colors">
                  Pipeline Interativo
                </a>
              </li>
              <li>
                <a href="/simulation" className="hover:text-foreground transition-colors">
                  Simulação de Treino
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/glossary" className="hover:text-foreground transition-colors">
                  Glossário
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Contacto</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MLOps Explorer. Projeto educativo.</p>
        </div>
      </div>
    </footer>
  );
};
