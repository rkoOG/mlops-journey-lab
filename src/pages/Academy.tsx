import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Award, TrendingUp, Search } from "lucide-react";
import { Link } from "react-router-dom";

const trails = [
  {
    id: "mlops-fundamentals",
    title: "MLOps Fundamentals",
    description: "Aprende os fundamentos de MLOps desde a ingestão de dados até à monitorização em produção.",
    duration: "8 horas",
    level: "Iniciante",
    modules: 6,
    progress: 0,
  },
  {
    id: "cicd-ml",
    title: "CI/CD para ML",
    description: "Implementa pipelines de integração e deployment contínuo para modelos de machine learning.",
    duration: "6 horas",
    level: "Intermédio",
    modules: 5,
    progress: 0,
  },
  {
    id: "experiment-tracking",
    title: "Experiment Tracking & Registry",
    description: "Gere experiências e versões de modelos com ferramentas modernas de tracking.",
    duration: "5 horas",
    level: "Intermédio",
    modules: 4,
    progress: 0,
  },
  {
    id: "monitoring-drift",
    title: "Monitorização & Drift",
    description: "Monitoriza modelos em produção e detecta data drift para garantir qualidade.",
    duration: "7 horas",
    level: "Avançado",
    modules: 5,
    progress: 0,
  },
  {
    id: "chatbots-llm",
    title: "Chatbots & LLM Ops",
    description: "Constrói e opera chatbots com Large Language Models em produção.",
    duration: "10 horas",
    level: "Avançado",
    modules: 7,
    progress: 0,
  },
];

const courses = [
  {
    id: "intro-mlops",
    title: "Introdução ao MLOps",
    description: "Conceitos básicos e casos de uso",
    duration: "2 horas",
    level: "Iniciante",
  },
  {
    id: "python-ml-pipeline",
    title: "Python para ML Pipeline",
    description: "Best practices e ferramentas",
    duration: "4 horas",
    level: "Iniciante",
  },
  {
    id: "docker-kubernetes-ml",
    title: "Docker & Kubernetes para ML",
    description: "Containerização e orquestração",
    duration: "6 horas",
    level: "Intermédio",
  },
];

const resources = [
  {
    title: "MLOps Cheat Sheet",
    description: "Referência rápida de comandos e conceitos",
    type: "PDF",
    url: "https://ml-ops.org/content/references",
  },
  {
    title: "Pipeline Templates",
    description: "Templates prontos para diferentes casos de uso",
    type: "Código",
    url: "https://github.com/GoogleCloudPlatform/mlops-on-gcp",
  },
  {
    title: "Artigos & Papers",
    description: "Literatura essencial sobre MLOps",
    type: "Leitura",
    url: "https://arxiv.org/search/?query=mlops&searchtype=all",
  },
];

export default function Academy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-academy/10 border border-academy/20 mb-6">
              <Award className="h-4 w-4 text-academy" />
              <span className="text-sm font-medium text-academy">Aprende no teu ritmo</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-academy via-academy-glow to-primary bg-clip-text text-transparent">
              Academy: Trilhas de MLOps e Chatbots
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Conteúdos gratuitos e trilhas estruturadas para dominar MLOps, desde os fundamentos até tópicos avançados de produção.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 pb-20">
          <Tabs defaultValue="trilhas" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="trilhas">Trilhas</TabsTrigger>
              <TabsTrigger value="cursos">Cursos</TabsTrigger>
              <TabsTrigger value="recursos">Recursos</TabsTrigger>
            </TabsList>

            {/* Trilhas Tab */}
            <TabsContent value="trilhas" className="space-y-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Pesquisar trilhas..." className="pl-10" />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">Iniciante</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">Intermédio</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">Avançado</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trails.map((trail, index) => (
                  <Card key={trail.id} className="group hover:shadow-card-hover transition-all duration-300 hover:scale-105 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant={trail.level === "Iniciante" ? "secondary" : trail.level === "Intermédio" ? "default" : "destructive"}>
                          {trail.level}
                        </Badge>
                        <BookOpen className="h-5 w-5 text-academy" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-academy transition-colors">
                        {trail.title}
                      </CardTitle>
                      <CardDescription>{trail.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {trail.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {trail.modules} módulos
                        </div>
                      </div>
                      {trail.progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progresso</span>
                            <span className="font-medium">{trail.progress}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-academy transition-all duration-500" style={{ width: `${trail.progress}%` }} />
                          </div>
                        </div>
                      )}
                      <Button asChild className="w-full bg-academy hover:bg-academy/80 text-academy-foreground">
                        <Link to={`/academy/trail/${trail.id}`}>
                          {trail.progress > 0 ? "Continuar" : "Iniciar Trilha"}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Cursos Tab */}
            <TabsContent value="cursos" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                  <Card key={index} className="hover:shadow-card-hover transition-all duration-300 hover:scale-105 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline">{course.level}</Badge>
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <Button asChild variant="secondary" className="w-full">
                        <Link to={`/academy/course/${course.id}`}>Ver Curso</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Recursos Tab */}
            <TabsContent value="recursos" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                  <Card key={index} className="hover:shadow-card-hover transition-all duration-300 hover:scale-105 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline">{resource.type}</Badge>
                      </div>
                      <CardTitle className="text-xl">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" className="w-full">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          Download
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
}
