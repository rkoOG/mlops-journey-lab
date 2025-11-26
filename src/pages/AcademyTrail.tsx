import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  Circle,
  PlayCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getSpecificTrailProgress } from "@/lib/storage";

const trailData = {
  "mlops-fundamentals": {
    title: "MLOps Fundamentals",
    description:
      "Aprende os fundamentos de MLOps desde a ingestão de dados até à monitorização em produção.",
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
      {
        id: 1,
        title: "Introdução ao MLOps",
        duration: "1h",
        completed: false,
        lessons: 4,
      },
      {
        id: 2,
        title: "Data Ingestion & Validation",
        duration: "1.5h",
        completed: false,
        lessons: 5,
      },
      {
        id: 3,
        title: "Model Training Pipeline",
        duration: "2h",
        completed: false,
        lessons: 6,
      },
      {
        id: 4,
        title: "Model Registry & Versioning",
        duration: "1.5h",
        completed: false,
        lessons: 4,
      },
      {
        id: 5,
        title: "CI/CD para ML",
        duration: "1.5h",
        completed: false,
        lessons: 5,
      },
      {
        id: 6,
        title: "Monitoring & Observability",
        duration: "1.5h",
        completed: false,
        lessons: 5,
      },
    ],
  },
  "cicd-ml": {
    title: "CI/CD para ML",
    description:
      "Implementa pipelines de integração e deployment contínuo para modelos de machine learning.",
    duration: "6 horas",
    level: "Intermédio",
    prerequisites: ["MLOps Fundamentals", "Git", "Docker básico"],
    tools: ["GitHub Actions", "GitLab CI", "Jenkins", "ArgoCD", "Kubernetes"],
    outcomes: [
      "Configurar pipelines CI/CD para modelos ML",
      "Automatizar testes e validação de modelos",
      "Implementar deployment contínuo",
      "Gerir múltiplos ambientes (dev, staging, prod)",
    ],
    modules: [
      {
        id: 1,
        title: "Fundamentos de CI/CD",
        duration: "1h",
        completed: false,
        lessons: 4,
      },
      {
        id: 2,
        title: "Testing de Modelos ML",
        duration: "1.5h",
        completed: false,
        lessons: 5,
      },
      {
        id: 3,
        title: "Continuous Training",
        duration: "1.5h",
        completed: false,
        lessons: 4,
      },
      {
        id: 4,
        title: "Deployment Strategies",
        duration: "1h",
        completed: false,
        lessons: 4,
      },
      {
        id: 5,
        title: "Infrastructure as Code",
        duration: "1h",
        completed: false,
        lessons: 3,
      },
    ],
  },
  "experiment-tracking": {
    title: "Experiment Tracking & Registry",
    description:
      "Gere experiências e versões de modelos com ferramentas modernas de tracking.",
    duration: "5 horas",
    level: "Intermédio",
    prerequisites: ["Python", "Machine Learning básico"],
    tools: ["MLflow", "Weights & Biases", "DVC", "Neptune.ai"],
    outcomes: [
      "Configurar sistemas de tracking de experiências",
      "Versionar modelos e artefactos",
      "Comparar resultados de experiências",
      "Implementar model registry",
    ],
    modules: [
      {
        id: 1,
        title: "Introdução ao Experiment Tracking",
        duration: "1h",
        completed: false,
        lessons: 3,
      },
      {
        id: 2,
        title: "MLflow em Profundidade",
        duration: "2h",
        completed: false,
        lessons: 6,
      },
      {
        id: 3,
        title: "Model Registry",
        duration: "1h",
        completed: false,
        lessons: 4,
      },
      {
        id: 4,
        title: "Versionamento de Datasets",
        duration: "1h",
        completed: false,
        lessons: 4,
      },
    ],
  },
  "monitoring-drift": {
    title: "Monitorização & Drift",
    description:
      "Monitoriza modelos em produção e detecta data drift para garantir qualidade.",
    duration: "7 horas",
    level: "Avançado",
    prerequisites: ["MLOps Fundamentals", "Estatística básica"],
    tools: ["Prometheus", "Grafana", "Evidently AI", "Seldon Core"],
    outcomes: [
      "Implementar monitorização de modelos em produção",
      "Detectar e alertar sobre data drift",
      "Criar dashboards de métricas de modelo",
      "Definir SLOs e SLAs para sistemas ML",
    ],
    modules: [
      {
        id: 1,
        title: "Fundamentos de Monitorização ML",
        duration: "1.5h",
        completed: false,
        lessons: 5,
      },
      {
        id: 2,
        title: "Data Drift Detection",
        duration: "2h",
        completed: false,
        lessons: 6,
      },
      {
        id: 3,
        title: "Model Performance Monitoring",
        duration: "1.5h",
        completed: false,
        lessons: 5,
      },
      {
        id: 4,
        title: "Alerting & Incident Response",
        duration: "1h",
        completed: false,
        lessons: 4,
      },
      {
        id: 5,
        title: "Observability em ML Systems",
        duration: "1h",
        completed: false,
        lessons: 3,
      },
    ],
  },
  "chatbots-llm": {
    title: "Chatbots & LLM Ops",
    description:
      "Constrói e opera chatbots com Large Language Models em produção.",
    duration: "10 horas",
    level: "Avançado",
    prerequisites: ["Python avançado", "APIs", "MLOps Fundamentals"],
    tools: ["OpenAI API", "LangChain", "HuggingFace", "Vector DBs", "FastAPI"],
    outcomes: [
      "Desenvolver chatbots com LLMs",
      "Implementar RAG (Retrieval-Augmented Generation)",
      "Otimizar custos de APIs de LLM",
      "Monitorizar qualidade de respostas",
    ],
    modules: [
      {
        id: 1,
        title: "Introdução a LLMs",
        duration: "1.5h",
        completed: false,
        lessons: 5,
      },
      {
        id: 2,
        title: "Prompt Engineering",
        duration: "2h",
        completed: false,
        lessons: 6,
      },
      {
        id: 3,
        title: "LangChain & Frameworks",
        duration: "2h",
        completed: false,
        lessons: 7,
      },
      {
        id: 4,
        title: "RAG Systems",
        duration: "2h",
        completed: false,
        lessons: 6,
      },
      {
        id: 5,
        title: "Vector Databases",
        duration: "1h",
        completed: false,
        lessons: 4,
      },
      {
        id: 6,
        title: "LLM Deployment",
        duration: "1h",
        completed: false,
        lessons: 3,
      },
      {
        id: 7,
        title: "Monitoring & Cost Optimization",
        duration: "0.5h",
        completed: false,
        lessons: 3,
      },
    ],
  },
};

export default function AcademyTrail() {
  const { trailId } = useParams();
  const trail = trailData[trailId as keyof typeof trailData];

  // Carregar progresso do localStorage
  const trailProgress = getSpecificTrailProgress(trailId as string);
  const completedModuleIds = trailProgress?.completedModules || [];

  if (!trail) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Curso não encontrado</h1>
          <Button asChild>
            <Link to="/academy">Voltar à Academy</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const completedModules = completedModuleIds.length;
  const progress = (completedModules / trail.modules.length) * 100;
  const isCourseComplete = completedModules === trail.modules.length;

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
                <Badge
                  variant={
                    trail.level === "Iniciante" ? "secondary" : "default"
                  }
                >
                  {trail.level}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
                {trail.title}
              </h1>
              <p
                className="text-lg text-muted-foreground mb-6 animate-fade-in-up"
                style={{ animationDelay: "100ms" }}
              >
                {trail.description}
              </p>

              <div
                className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6 animate-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {trail.duration}
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {trail.modules.length} módulos
                </div>
                <div className="flex items-center gap-2">
                  <Award
                    className={`h-4 w-4 ${
                      isCourseComplete ? "text-academy" : ""
                    }`}
                  />
                  {isCourseComplete ? (
                    <Button
                      variant="link"
                      className="p-0 h-auto text-academy font-semibold"
                      asChild
                    >
                      <Link to={`/academy/trail/${trailId}/certificate`}>
                        Descarregar certificado
                      </Link>
                    </Button>
                  ) : (
                    <span>Certificado incluído</span>
                  )}
                </div>
              </div>

              {isCourseComplete && (
                <div
                  className="flex items-center gap-2 p-4 bg-academy/10 border border-academy rounded-lg animate-fade-in-up"
                  style={{ animationDelay: "300ms" }}
                >
                  <Award className="h-5 w-5 text-academy" />
                  <span className="font-medium text-academy">
                    🎉 Curso Completo! Parabéns!
                  </span>
                </div>
              )}

              {progress > 0 && (
                <div
                  className="space-y-2 animate-fade-in-up"
                  style={{ animationDelay: "300ms" }}
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Progresso do Curso
                    </span>
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
                <h2 className="text-2xl font-bold mb-4">Roadmap do Curso</h2>
                <div className="space-y-3">
                  {trail.modules.map((module, index) => {
                    const isModuleComplete = completedModuleIds.includes(
                      String(module.id)
                    );
                    return (
                      <Card
                        key={module.id}
                        className={`hover:shadow-card-hover transition-all duration-300 animate-fade-in-up ${
                          isModuleComplete ? "border-academy" : ""
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-4">
                            <div
                              className={`flex-shrink-0 mt-1 ${
                                isModuleComplete
                                  ? "text-academy"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {isModuleComplete ? (
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
                                <Badge
                                  variant="outline"
                                  className="flex-shrink-0"
                                >
                                  {module.duration}
                                </Badge>
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
                            variant={isModuleComplete ? "outline" : "default"}
                            className="w-full"
                          >
                            <Link
                              to={`/academy/trail/${trailId}/module/${module.id}`}
                            >
                              {isModuleComplete
                                ? "Rever Módulo"
                                : "Começar Módulo"}
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
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
                      <Badge key={index} variant="secondary">
                        {tool}
                      </Badge>
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
                  {progress > 0 ? "Continuar Curso" : "Iniciar Curso"}
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
