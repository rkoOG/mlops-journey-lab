import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  PlayCircle, 
  FileCode, 
  CheckCircle2, 
  Circle, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink 
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const moduleData = {
  "mlops-fundamentals": {
    1: {
      title: "Introdução ao MLOps",
      description: "Compreende os fundamentos de MLOps e porque é essencial para projetos de ML em produção.",
      duration: "1h",
      lessons: [
        { id: 1, title: "O que é MLOps?", type: "video", duration: "10min", completed: false },
        { id: 2, title: "Ciclo de vida de ML", type: "reading", duration: "15min", completed: false },
        { id: 3, title: "Desafios em produção", type: "video", duration: "12min", completed: false },
        { id: 4, title: "Ferramentas essenciais", type: "reading", duration: "18min", completed: false },
      ],
      content: {
        overview: "Neste módulo vais aprender os conceitos fundamentais de MLOps, incluindo o ciclo de vida completo de um modelo de machine learning em produção.",
        videoUrl: "https://example.com/video", // Placeholder
        keyPoints: [
          "Definição e importância de MLOps",
          "Diferenças entre ML tradicional e MLOps",
          "Componentes principais de um sistema MLOps",
          "Ciclo de vida: desenvolvimento → deployment → monitorização",
        ],
        codeSnippet: `# Exemplo: Pipeline MLOps básico
import mlflow
from sklearn.model_selection import train_test_split

# 1. Carregar e preparar dados
X_train, X_test, y_train, y_test = train_test_split(X, y)

# 2. Treinar modelo com tracking
with mlflow.start_run():
    model = train_model(X_train, y_train)
    
    # Log métricas
    mlflow.log_metric("accuracy", accuracy)
    mlflow.log_metric("f1_score", f1)
    
    # Log modelo
    mlflow.sklearn.log_model(model, "model")`,
        exercises: [
          "Identifica os componentes principais de um pipeline MLOps",
          "Descreve 3 desafios de modelos ML em produção",
          "Lista ferramentas open-source para cada etapa do ciclo",
        ],
      },
    },
  },
};

export default function AcademyModule() {
  const { trailId, moduleId } = useParams();
  const [currentLesson, setCurrentLesson] = useState(0);
  
  const module = moduleData[trailId as keyof typeof moduleData]?.[Number(moduleId) as keyof typeof moduleData["mlops-fundamentals"]];

  if (!module) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Módulo não encontrado</h1>
          <Button asChild>
            <Link to="/academy">Voltar à Academy</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const completedLessons = module.lessons.filter(l => l.completed).length;
  const progress = (completedLessons / module.lessons.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Header with Progress */}
        <section className="border-b border-border bg-card/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <Button variant="ghost" size="sm" asChild className="mb-2">
                  <Link to={`/academy/trail/${trailId}`}>← Voltar à trilha</Link>
                </Button>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Módulo {moduleId}: {module.title}
                </h1>
                <p className="text-muted-foreground mt-1">{module.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline">{module.duration}</Badge>
                <div className="text-right">
                  <div className="text-sm font-medium">{Math.round(progress)}%</div>
                  <Progress value={progress} className="w-24 h-2" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Lessons */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="text-lg">Conteúdos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {module.lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLesson(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentLesson === index 
                          ? 'bg-academy/20 border border-academy' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {lesson.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-academy flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm mb-1 truncate">
                            {lesson.title}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {lesson.type === "video" ? (
                              <PlayCircle className="h-3 w-3" />
                            ) : (
                              <BookOpen className="h-3 w-3" />
                            )}
                            {lesson.duration}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{module.lessons[currentLesson].title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        {module.lessons[currentLesson].type === "video" ? (
                          <PlayCircle className="h-4 w-4" />
                        ) : (
                          <BookOpen className="h-4 w-4" />
                        )}
                        {module.lessons[currentLesson].duration}
                      </CardDescription>
                    </div>
                    <Badge variant={module.lessons[currentLesson].completed ? "default" : "outline"}>
                      {module.lessons[currentLesson].completed ? "Concluída" : "Em progresso"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Video/Reading Area */}
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center">
                      <PlayCircle className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Área de vídeo/conteúdo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                  <TabsTrigger value="code">Código</TabsTrigger>
                  <TabsTrigger value="exercises">Exercícios</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sobre este módulo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{module.content.overview}</p>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Pontos-chave:</h4>
                        <ul className="space-y-2">
                          {module.content.keyPoints.map((point, index) => (
                            <li key={index} className="flex gap-3">
                              <CheckCircle2 className="h-5 w-5 text-academy flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button asChild variant="outline" className="w-full">
                        <Link to="/simulation">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Tentar na Simulação
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="code" className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Exemplo de Código</CardTitle>
                        <FileCode className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{module.content.codeSnippet}</code>
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="exercises" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Exercícios Práticos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {module.content.exercises.map((exercise, index) => (
                        <div key={index} className="p-4 bg-muted rounded-lg">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-academy text-academy-foreground flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </div>
                            <p className="text-sm flex-1">{exercise}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6">
                <Button 
                  variant="outline" 
                  disabled={currentLesson === 0}
                  onClick={() => setCurrentLesson(prev => Math.max(0, prev - 1))}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>
                <Button 
                  className="bg-academy hover:bg-academy/80 text-academy-foreground"
                  disabled={currentLesson === module.lessons.length - 1}
                  onClick={() => setCurrentLesson(prev => Math.min(module.lessons.length - 1, prev + 1))}
                >
                  Seguinte
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
