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
                    Aprende MLOps{" "}
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                      Fazendo
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground md:text-xl">
                    Explora, pratica e domina o ciclo completo de MLOps com simulações
                    interativas e exemplos práticos. Ideal para estudantes e profissionais júnior.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" variant="hero">
                    <a href="/pipeline">
                      Explorar Pipeline
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href="/simulation">Correr Simulação</a>
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
                Aprende MLOps de Forma Prática
              </h2>
              <p className="text-lg text-muted-foreground">
                Três experiências interativas para dominar MLOps do zero à produção
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Feature 1 */}
              <Card className="group transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary">
                    <Workflow className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">Pipeline Interativo</h3>
                  <p className="mb-4 text-muted-foreground">
                    Explora cada etapa do ciclo MLOps de forma visual. Clica para ver ferramentas,
                    riscos e código de exemplo.
                  </p>
                  <Button asChild variant="ghost" className="group-hover:text-primary">
                    <a href="/pipeline">
                      Explorar
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="group transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-success">
                    <Play className="h-7 w-7 text-success-foreground" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">Simulação de Treino</h3>
                  <p className="mb-4 text-muted-foreground">
                    Executa uma simulação completa de treino e deployment. Observa logs em tempo
                    real e resultados.
                  </p>
                  <Button asChild variant="ghost" className="group-hover:text-success">
                    <a href="/simulation">
                      Executar
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="group transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-glow">
                    <BarChart3 className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">Dashboard</h3>
                  <p className="mb-4 text-muted-foreground">
                    Visualiza métricas de monitorização, detecção de drift e performance em
                    produção.
                  </p>
                  <Button asChild variant="ghost" className="group-hover:text-accent">
                    <a href="/dashboard">
                      Ver Dashboard
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
                Pronto para Começar?
              </h2>
              <p className="mb-8 text-lg opacity-90">
                Explora o pipeline MLOps completo, faz o quiz para testar conhecimentos ou
                consulta o glossário detalhado.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" variant="secondary">
                  <a href="/pipeline">Começar Agora</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
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
