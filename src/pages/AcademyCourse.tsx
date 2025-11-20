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
  Clock,
  Award
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import introVideo from "@/assets/mlops-intro-video.mp4";

const courseData = {
  "intro-mlops": {
    title: "Introdução ao MLOps",
    description: "Conceitos básicos e casos de uso de MLOps",
    duration: "2h",
    level: "Iniciante",
    lessons: [
      {
        id: 1,
        title: "O que é MLOps?",
        type: "video",
        duration: "15min",
        completed: false,
        videoUrl: introVideo,
        content: {
          overview: "Introdução aos conceitos fundamentais de MLOps e sua importância no ciclo de vida de ML.",
          keyPoints: [
            "Definição de MLOps e seus objetivos",
            "Diferenças entre DevOps e MLOps",
            "Benefícios de implementar MLOps",
            "Casos de uso reais de MLOps"
          ],
          codeSnippet: "# Conceitos básicos\n# MLOps = ML + Dev + Ops\n# Objetivo: automatizar e monitorizar o ciclo de vida de ML",
          exercises: [
            "Identifica 3 diferenças entre DevOps e MLOps",
            "Lista 5 benefícios de implementar MLOps numa organização"
          ]
        }
      },
      {
        id: 2,
        title: "Casos de Uso de MLOps",
        type: "reading",
        duration: "20min",
        completed: false,
        videoUrl: introVideo,
        content: {
          overview: "Explora casos de uso reais de MLOps em diferentes indústrias.",
          keyPoints: [
            "MLOps em e-commerce e recomendação",
            "MLOps em serviços financeiros",
            "MLOps em saúde e diagnóstico",
            "MLOps em manufatura e IoT"
          ],
          codeSnippet: "# Exemplo: Sistema de recomendação\n# Pipeline de treino → deployment → monitorização\n# Retraining automático baseado em feedback",
          exercises: [
            "Escolhe uma indústria e descreve como MLOps pode ajudar",
            "Identifica desafios específicos de MLOps nessa indústria"
          ]
        }
      }
    ]
  },
  "python-ml-pipeline": {
    title: "Python para ML Pipeline",
    description: "Best practices e ferramentas Python para pipelines de ML",
    duration: "4h",
    level: "Iniciante",
    lessons: [
      {
        id: 1,
        title: "Configuração do Ambiente Python",
        type: "video",
        duration: "25min",
        completed: false,
        videoUrl: introVideo,
        content: {
          overview: "Aprende a configurar um ambiente Python robusto para projetos de ML.",
          keyPoints: [
            "Gestão de dependências com Poetry/Pipenv",
            "Ambientes virtuais e isolamento",
            "Configuração de ferramentas de desenvolvimento",
            "Boas práticas de estruturação de projetos"
          ],
          codeSnippet: "# Criar ambiente virtual\npython -m venv mlops-env\nsource mlops-env/bin/activate\n\n# Instalar dependências\npip install scikit-learn pandas mlflow",
          exercises: [
            "Cria um projeto Python com Poetry",
            "Configura pre-commit hooks para qualidade de código"
          ]
        }
      },
      {
        id: 2,
        title: "Data Processing com Pandas",
        type: "video",
        duration: "30min",
        completed: false,
        videoUrl: introVideo,
        content: {
          overview: "Técnicas de processamento de dados com Pandas para ML.",
          keyPoints: [
            "Leitura e escrita de dados",
            "Limpeza e transformação de dados",
            "Feature engineering",
            "Validação de dados"
          ],
          codeSnippet: "import pandas as pd\n\n# Carregar dados\ndf = pd.read_csv('data.csv')\n\n# Limpeza\ndf = df.dropna()\ndf['feature'] = df['feature'].apply(lambda x: x.strip())\n\n# Feature engineering\ndf['new_feature'] = df['a'] * df['b']",
          exercises: [
            "Cria um pipeline de limpeza de dados",
            "Implementa validação de schema com Pandera"
          ]
        }
      }
    ]
  },
  "docker-kubernetes-ml": {
    title: "Docker & Kubernetes para ML",
    description: "Containerização e orquestração de aplicações de ML",
    duration: "6h",
    level: "Intermédio",
    lessons: [
      {
        id: 1,
        title: "Introdução ao Docker",
        type: "video",
        duration: "30min",
        completed: false,
        videoUrl: introVideo,
        content: {
          overview: "Aprende os fundamentos de Docker para containerizar aplicações de ML.",
          keyPoints: [
            "Conceitos básicos de containers",
            "Criação de Dockerfiles",
            "Build e gestão de imagens",
            "Docker Compose para multi-container"
          ],
          codeSnippet: "# Dockerfile para aplicação ML\nFROM python:3.9-slim\n\nWORKDIR /app\n\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\nCOPY . .\n\nCMD [\"python\", \"app.py\"]",
          exercises: [
            "Cria um Dockerfile para uma aplicação de ML",
            "Usa Docker Compose para orquestrar API + Database"
          ]
        }
      },
      {
        id: 2,
        title: "Kubernetes para ML",
        type: "video",
        duration: "45min",
        completed: false,
        videoUrl: introVideo,
        content: {
          overview: "Orquestra aplicações de ML em produção com Kubernetes.",
          keyPoints: [
            "Arquitetura de Kubernetes",
            "Deployments e Services",
            "ConfigMaps e Secrets",
            "Auto-scaling de modelos ML"
          ],
          codeSnippet: "# deployment.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: ml-model\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: ml-model\n  template:\n    metadata:\n      labels:\n        app: ml-model\n    spec:\n      containers:\n      - name: model-server\n        image: ml-model:v1\n        ports:\n        - containerPort: 8080",
          exercises: [
            "Cria um deployment Kubernetes para um modelo",
            "Configura auto-scaling baseado em CPU/memória"
          ]
        }
      }
    ]
  }
};

export default function AcademyCourse() {
  const { courseId } = useParams();
  const [currentLesson, setCurrentLesson] = useState(0);
  
  const course = courseData[courseId as keyof typeof courseData];

  if (!course) {
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

  const completedLessons = course.lessons.filter(l => l.completed).length;
  const progress = (completedLessons / course.lessons.length) * 100;

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
                  <Link to="/academy">← Voltar à Academy</Link>
                </Button>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {course.title}
                </h1>
                <p className="text-muted-foreground mt-1">{course.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  {course.level}
                </Badge>
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
                  {course.lessons.map((lesson, index) => (
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
                      <CardTitle>{course.lessons[currentLesson].title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        {course.lessons[currentLesson].type === "video" ? (
                          <PlayCircle className="h-4 w-4" />
                        ) : (
                          <BookOpen className="h-4 w-4" />
                        )}
                        {course.lessons[currentLesson].duration}
                      </CardDescription>
                    </div>
                    <Badge variant={course.lessons[currentLesson].completed ? "default" : "outline"}>
                      {course.lessons[currentLesson].completed ? "Concluída" : "Em progresso"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Video/Reading Area */}
                  {course.lessons[currentLesson].type === "video" ? (
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
                      <video 
                        key={currentLesson}
                        controls 
                        className="w-full h-full"
                        poster=""
                      >
                        <source src={course.lessons[currentLesson].videoUrl} type="video/mp4" />
                        O teu navegador não suporta vídeos.
                      </video>
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-6">
                      <div className="text-center">
                        <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Conteúdo de leitura</p>
                      </div>
                    </div>
                  )}
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
                      <CardTitle>Sobre esta lição</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        {course.lessons[currentLesson].content.overview}
                      </p>
                      <div>
                        <h4 className="font-semibold mb-3">Pontos-chave:</h4>
                        <ul className="space-y-2">
                          {course.lessons[currentLesson].content.keyPoints.map((point, index) => (
                            <li key={index} className="flex gap-3">
                              <CheckCircle2 className="h-5 w-5 text-academy flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
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
                        <code>{course.lessons[currentLesson].content.codeSnippet}</code>
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
                      {course.lessons[currentLesson].content.exercises.map((exercise, index) => (
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
                  disabled={currentLesson === course.lessons.length - 1}
                  onClick={() => setCurrentLesson(prev => Math.min(course.lessons.length - 1, prev + 1))}
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
