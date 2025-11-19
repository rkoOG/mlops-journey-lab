import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Workflow, Play, BarChart3 } from "lucide-react";
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
                    MLOps Academy:{" "}
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                      Aprende Fazendo
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground md:text-xl">
                    Plataforma educacional completa com trilhas estruturadas, exercícios práticos e
                    quizzes interativos. Do zero à produção em MLOps e LLMOps.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" variant="hero">
                    <a href="/academy">
                      Iniciar Aprendizagem
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href="/quiz">Testar Conhecimentos</a>
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
                Cursos Estruturados de MLOps
              </h2>
              <p className="text-lg text-muted-foreground">
                Desde fundamentos até tópicos avançados, com conteúdo prático e progressivo
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Trail 1 */}
              <Card className="group transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary">
                    <Workflow className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">MLOps Fundamentals</h3>
                  <p className="mb-4 text-muted-foreground">
                    Aprende os fundamentos de MLOps desde a ingestão de dados até à monitorização em produção.
                    6 módulos • 8 horas
                  </p>
                  <Button asChild variant="ghost" className="group-hover:text-primary">
                    <a href="/academy">
                      Começar
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Trail 2 */}
              <Card className="group transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-success">
                    <Play className="h-7 w-7 text-success-foreground" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">CI/CD para ML</h3>
                  <p className="mb-4 text-muted-foreground">
                    Implementa pipelines de integração e deployment contínuo para modelos ML.
                    5 módulos • 6 horas
                  </p>
                  <Button asChild variant="ghost" className="group-hover:text-success">
                    <a href="/academy">
                      Começar
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Trail 3 */}
              <Card className="group transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-glow">
                    <BarChart3 className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">Chatbots & LLM Ops</h3>
                  <p className="mb-4 text-muted-foreground">
                    Constrói e opera chatbots com Large Language Models em produção.
                    7 módulos • 10 horas
                  </p>
                  <Button asChild variant="ghost" className="group-hover:text-accent">
                    <a href="/academy">
                      Começar
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-primary py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center text-primary-foreground">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Começa a Tua Jornada em MLOps
              </h2>
              <p className="mb-8 text-lg opacity-90">
                Escolhe um curso, testa os teus conhecimentos com quizzes
                ou consulta o glossário com termos essenciais.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" variant="secondary">
                  <a href="/academy">Explorar Cursos</a>
                </Button>
                <Button asChild size="lg" variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/80 border-0">
                  <a href="/quiz">Fazer Quiz</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
