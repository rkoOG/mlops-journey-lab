import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Brain, CheckCircle2, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-pipeline.jpg";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-hero">
          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-8 animate-fade-in-up">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                    Domina{" "}
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                      MLOps & LLMOps
                    </span>
                    {" "}em Produção
                  </h1>
                  <p className="text-lg text-muted-foreground md:text-xl">
                    Aprende através de cursos estruturados, valida conhecimentos com quizzes 
                    interativos e consulta o glossário sempre que precisares.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" className="bg-academy hover:bg-academy/80">
                    <a href="/academy">
                      Começar a Aprender
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href="/glossary">Ver Glossário</a>
                  </Button>
                </div>
              </div>

              <div className="animate-fade-in relative">
                <div className="relative overflow-hidden rounded-2xl shadow-card-hover">
                  <img
                    src={heroImage}
                    alt="Pipeline MLOps visual com etapas conectadas"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Como Funciona a Plataforma
              </h2>
              <p className="text-lg text-muted-foreground">
                Aprende de forma estruturada e valida os teus conhecimentos
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Cursos */}
              <Card className="group transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover border-academy/30">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-academy/10">
                    <BookOpen className="h-8 w-8 text-academy" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">Cursos Estruturados</h3>
                  <p className="mb-6 text-muted-foreground leading-relaxed">
                    Percursos de aprendizagem organizados em módulos e lições. 
                    Progride do básico ao avançado com conteúdo teórico e prático.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-academy" />
                      <span>Vídeos explicativos</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-academy" />
                      <span>Material de leitura</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-academy" />
                      <span>Progresso salvo</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-academy hover:bg-academy/80">
                    <a href="/academy">
                      Explorar Cursos
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Quiz */}
              <Card className="group transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover border-primary/30">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">Quizzes Interativos</h3>
                  <p className="mb-6 text-muted-foreground leading-relaxed">
                    Testa e consolida os teus conhecimentos com perguntas de escolha múltipla.
                    Recebe feedback imediato e acompanha a evolução.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Feedback instantâneo</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Histórico de tentativas</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Melhor pontuação</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full" variant="default">
                    <a href="/quiz">
                      Fazer Quiz
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Glossário */}
              <Card className="group transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover border-success/30">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10">
                    <Trophy className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">Glossário Completo</h3>
                  <p className="mb-6 text-muted-foreground leading-relaxed">
                    Dicionário com termos essenciais de MLOps e LLMOps. 
                    Consulta definições claras e exemplos práticos.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Definições claras</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Exemplos práticos</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Pesquisa rápida</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full" variant="outline">
                    <a href="/glossary">
                      Consultar Glossário
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-academy mb-2">5</div>
                <div className="text-muted-foreground">Cursos Disponíveis</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">25+</div>
                <div className="text-muted-foreground">Lições Interativas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-success mb-2">100+</div>
                <div className="text-muted-foreground">Termos no Glossário</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-primary py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center text-primary-foreground">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Pronto para Começar?
              </h2>
              <p className="mb-8 text-lg opacity-90">
                Inicia o teu percurso de aprendizagem em MLOps. Aprende ao teu ritmo,
                valida conhecimentos e consulta recursos sempre que precisares.
              </p>
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <a href="/academy">
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
