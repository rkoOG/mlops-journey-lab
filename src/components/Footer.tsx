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
              Aprende MLOps de forma prática e interativa. Um projecto educativo
              para estudantes e profissionais.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Navegação</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a className="hover:text-foreground transition-colors" href="/academy">
                  Cursos
                </a>
              </li>
              <li>
                <a className="hover:text-foreground transition-colors" href="/quiz">
                  Quiz
                </a>
              </li>
              <li>
                <a className="hover:text-foreground transition-colors" href="/glossary">
                  Glossário
                </a>
              </li>
              <li>
                <a className="hover:text-foreground transition-colors" href="/objectives">
                  Objetivos & Créditos
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Contacto</h4>
            <div className="flex space-x-4">
              {/* GitHub */}
              <a
                href="https://github.com/rkoOG/mlops-journey-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/francisco-nunes-b2248a377/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              {/* Email */}
              <a
                href="mailto:rodrigo.meireles9@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MLOps Explorer. Projecto educativo.</p>
        </div>
      </div>
    </footer>
  );
};
