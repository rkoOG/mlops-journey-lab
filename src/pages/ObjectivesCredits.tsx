import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, BookOpen, Sparkles } from "lucide-react";

export default function ObjectivesCredits() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
          {/* Título */}
          <header className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">Objetivos & Créditos</h1>
            <p className="text-muted-foreground">
              Esta página resume os objetivos pedagógicos do MLOps Explorer e
              reconhece a equipa que contribuiu para o projeto.
            </p>
          </header>

          {/* Objetivos do projeto */}
          <Card>
            <CardHeader className="flex items-center gap-3">
              <Target className="h-5 w-5 text-academy" />
              <CardTitle>Objetivos do projeto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                O <span className="font-semibold">MLOps Explorer</span> foi desenvolvido como um projeto educativo para:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Proporcionar uma visão prática sobre o ciclo de vida de modelos de
                  machine learning em produção.
                </li>
                <li>
                  Introduzir boas práticas de <span className="font-medium">MLOps e LLMOps</span> de forma acessível.
                </li>
                <li>
                  Simular um ambiente semelhante ao trabalho real em equipas de dados e desenvolvimento ágil.
                </li>
                <li>
                  Servir como portfolio técnico dos membros da equipa.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Como utilizar a plataforma */}
          <Card>
            <CardHeader className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-academy" />
              <CardTitle>Como tirar melhor proveito da plataforma</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Seguir o <span className="font-medium">percurso de cursos</span> pela ordem recomendada
                  (Fundamentals → CI/CD → Monitoring, etc.).
                </li>
                <li>
                  Pausar os vídeos e rever os <span className="font-medium">exercícios práticos</span> de cada módulo.
                </li>
                <li>
                  Utilizar o <span className="font-medium">Quiz</span> no final para consolidar conhecimento.
                </li>
                <li>
                  Consultar o <span className="font-medium">Glossário</span> sempre que surgir um termo desconhecido.
                </li>
                <li>
                  Explorar a página de <span className="font-medium">Recursos & Glossário</span> para continuar a aprender.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Créditos */}
          <Card>
            <CardHeader className="flex items-center gap-3">
              <Users className="h-5 w-5 text-academy" />
              <CardTitle>Equipa & créditos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                Abaixo encontram-se os papéis principais do projeto,
                seguindo uma estrutura inspirada em metodologias ágeis.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="border rounded-lg p-3">
                  <p className="font-semibold">Equipa do projeto</p>
                  <p className="text-xs text-muted-foreground">
                    Daniel<br />
                    Francisco Nunes<br />
                    Francisco Velhinho<br />
                    Rodrigo<br />
                    Miguel
                  </p>
                </div>

                <div className="border rounded-lg p-3">
                  <p className="font-semibold">Product Owner</p>
                  <p className="text-xs text-muted-foreground">
                    Miguel<br />
                    Rodrigo
                  </p>
                </div>

                <div className="border rounded-lg p-3">
                  <p className="font-semibold">Scrum Master</p>
                  <p className="text-xs text-muted-foreground">
                    Francisco Velhinho
                  </p>
                </div>

                <div className="border rounded-lg p-3">
                  <p className="font-semibold">Desenvolvimento</p>
                  <p className="text-xs text-muted-foreground">
                    Daniel<br />
                    Francisco Nunes
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Sparkles className="h-4 w-4 text-academy" />
                <span className="text-xs text-muted-foreground">
                  Este projeto foi desenvolvido para fins educativos no âmbito da unidade curricular de
                  MLOps / Engenharia de Software.
                </span>
              </div>

              <div className="pt-3">
                <Badge variant="outline" className="text-xs">
                  Obrigado a todos os que contribuíram para o MLOps Explorer ✨
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
