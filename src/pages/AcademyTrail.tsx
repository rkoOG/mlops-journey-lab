import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Award, CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const trailData = {
  "mlops-fundamentals": {
    title: "MLOps Fundamentals",
    description: "Aprende os fundamentos de MLOps desde a ingestão de dados até à monitorização em produção.",
    duration: "8 horas",
    level: "Iniciante",
    prerequisites: ["Python básico", "Conceitos de Machine Learning"],
    tools: ["Python", "Docker", "Git", "MLflow", "DVC"],
    outcomes: [
      "Compreender o ciclo de vida completo de MLOps",
      "Implementar pipelines de dados e treino",
      "Versionar modelos e datasets",
      "Monitorizar modelos em produção",
    ],
    modules: [
      { id: 1, title: "Introdução ao MLOps", duration: "1h", completed: false, lessons: 4 },
      { id: 2, title: "Data Ingestion & Validation", duration: "1.5h", completed: false, lessons: 5 },
      { id: 3, title: "Model Training Pipeline", duration: "2h", completed: false, lessons: 6 },
      { id: 4, title: "Model Registry & Versioning", duration: "1.5h", completed: false, lessons: 4 },
      { id: 5, title: "CI/CD para ML", duration: "1.5h", completed: false, lessons: 5 },
      { id: 6, title: "Monitoring & Observability", duration: "1.5h", completed: false, lessons: 5 },
    ],
  },
};

export default function AcademyTrail() {
  const { trailId } = useParams();
  const trail = trailData[trailId as keyof typeof trailData];

  if (!trail) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Trilha não encontrada</h1>
          <Button asChild>
            <Link to="/academy">Voltar à Academy</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const completedModules = trail.modules.filter(m => m.completed).length;
  const progress = (completedModules / trail.modules.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border bg-card/50">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/academy">← Voltar</Link>
                </Button>
                <Badge variant={trail.level === "Iniciante" ? "secondary" : "default"}>
                  {trail.level}
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
                {trail.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                {trail.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {trail.duration}
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {trail.modules.length} módulos
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Certificado incluído
                </div>
              </div>

              {progress > 0 && (
                <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progresso da Trilha</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Roadmap da Trilha</h2>
                <div className="space-y-3">
                  {trail.modules.map((module, index) => (
                    <Card 
                      key={module.id} 
                      className={`hover:shadow-card-hover transition-all duration-300 animate-fade-in-up ${module.completed ? 'border-academy' : ''}`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-4">
                          <div className={`flex-shrink-0 mt-1 ${module.completed ? 'text-academy' : 'text-muted-foreground'}`}>
                            {module.completed ? (
                              <CheckCircle2 className="h-6 w-6" />
                            ) : (
                              <Circle className="h-6 w-6" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <CardTitle className="text-lg">
                                Módulo {module.id}: {module.title}
                              </CardTitle>
                              <Badge variant="outline" className="flex-shrink-0">{module.duration}</Badge>
                            </div>
                            <CardDescription className="flex items-center gap-2">
                              <PlayCircle className="h-4 w-4" />
                              {module.lessons} aulas
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          asChild 
                          variant={module.completed ? "outline" : "default"}
                          className="w-full"
                        >
                          <Link to={`/academy/trail/${trailId}/module/${module.id}`}>
                            {module.completed ? "Rever Módulo" : "Começar Módulo"}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>O que vais aprender</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {trail.outcomes.map((outcome, index) => (
                    <div key={index} className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-academy flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{outcome}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pré-requisitos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {trail.prerequisites.map((prereq, index) => (
                    <div key={index} className="flex gap-3">
                      <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                      <span className="text-sm">{prereq}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ferramentas usadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {trail.tools.map((tool, index) => (
                      <Badge key={index} variant="secondary">{tool}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button 
                size="lg" 
                className="w-full bg-academy hover:bg-academy/80 text-academy-foreground"
                asChild
              >
                <Link to={`/academy/trail/${trailId}/module/1`}>
                  {progress > 0 ? "Continuar Trilha" : "Iniciar Trilha"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
