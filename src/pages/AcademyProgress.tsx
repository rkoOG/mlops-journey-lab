import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp, Clock, Target, Download, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const userProgress = {
  totalTrails: 5,
  completedTrails: 1,
  inProgressTrails: 2,
  totalHours: 36,
  completedHours: 12,
  certificates: 1,
  trails: [
    {
      id: "mlops-fundamentals",
      title: "MLOps Fundamentals",
      progress: 100,
      status: "completed",
      completedDate: "2024-01-15",
      certificateUrl: "#",
    },
    {
      id: "cicd-ml",
      title: "CI/CD para ML",
      progress: 60,
      status: "in-progress",
      lastAccessed: "2024-01-20",
    },
    {
      id: "monitoring-drift",
      title: "Monitorização & Drift",
      progress: 25,
      status: "in-progress",
      lastAccessed: "2024-01-18",
    },
    {
      id: "experiment-tracking",
      title: "Experiment Tracking & Registry",
      progress: 0,
      status: "not-started",
    },
    {
      id: "chatbots-llm",
      title: "Chatbots & LLM Ops",
      progress: 0,
      status: "not-started",
    },
  ],
};

export default function AcademyProgress() {
  const overallProgress = (userProgress.completedHours / userProgress.totalHours) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border bg-card/50">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-4xl">
              <Button variant="ghost" size="sm" asChild className="mb-4">
                <Link to="/academy">← Voltar à Academy</Link>
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
                O Teu Progresso
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                Acompanha o teu progresso nas trilhas e conquista certificados.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="animate-fade-in-up">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Progresso Geral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{Math.round(overallProgress)}%</div>
                <Progress value={overallProgress} className="h-2" />
              </CardContent>
            </Card>

            <Card className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Trilhas Concluídas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {userProgress.completedTrails}/{userProgress.totalTrails}
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Horas de Estudo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {userProgress.completedHours}h
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  de {userProgress.totalHours}h totais
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in-up border-academy" style={{ animationDelay: "300ms" }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-academy flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Certificados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-academy">
                  {userProgress.certificates}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trails Progress */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Trilhas em Progresso</h2>
                <div className="space-y-4">
                  {userProgress.trails.map((trail, index) => (
                    <Card 
                      key={trail.id}
                      className={`hover:shadow-card-hover transition-all duration-300 animate-fade-in-up ${
                        trail.status === "completed" ? "border-academy" : ""
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">{trail.title}</CardTitle>
                            <CardDescription className="flex items-center gap-4 text-sm">
                              {trail.status === "completed" && (
                                <span className="text-academy font-medium">
                                  Concluída em {new Date(trail.completedDate!).toLocaleDateString('pt-PT')}
                                </span>
                              )}
                              {trail.status === "in-progress" && (
                                <span>
                                  Último acesso: {new Date(trail.lastAccessed!).toLocaleDateString('pt-PT')}
                                </span>
                              )}
                              {trail.status === "not-started" && (
                                <span>Ainda não iniciada</span>
                              )}
                            </CardDescription>
                          </div>
                          <Badge 
                            variant={
                              trail.status === "completed" ? "default" : 
                              trail.status === "in-progress" ? "secondary" : 
                              "outline"
                            }
                            className={trail.status === "completed" ? "bg-academy" : ""}
                          >
                            {trail.progress}%
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Progress value={trail.progress} className="h-2" />
                        <div className="flex gap-2">
                          <Button 
                            asChild 
                            variant={trail.status === "completed" ? "outline" : "default"}
                            size="sm"
                            className="flex-1"
                          >
                            <Link to={`/academy/trail/${trail.id}`}>
                              {trail.status === "completed" ? "Rever" : 
                               trail.status === "in-progress" ? "Continuar" : 
                               "Iniciar"}
                            </Link>
                          </Button>
                          {trail.status === "completed" && trail.certificateUrl && (
                            <Button variant="outline" size="sm">
                              <Award className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Certificates */}
            <div className="space-y-6">
              <Card className="border-academy">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-academy">
                    <Award className="h-5 w-5" />
                    Certificados Obtidos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userProgress.trails
                    .filter(t => t.status === "completed")
                    .map((trail) => (
                      <div key={trail.id} className="p-4 bg-academy/10 rounded-lg border border-academy/20">
                        <div className="flex items-start justify-between mb-3">
                          <Award className="h-8 w-8 text-academy" />
                          <Badge variant="outline" className="text-xs">
                            {new Date(trail.completedDate!).toLocaleDateString('pt-PT', { 
                              year: 'numeric', 
                              month: 'short' 
                            })}
                          </Badge>
                        </div>
                        <h4 className="font-semibold mb-1 text-sm">{trail.title}</h4>
                        <p className="text-xs text-muted-foreground mb-3">
                          Certificado de Conclusão
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Continua a Aprender
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Tens {userProgress.totalTrails - userProgress.completedTrails - userProgress.inProgressTrails} trilhas por iniciar.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/academy">Explorar Trilhas</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
