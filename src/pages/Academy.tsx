import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Search,
  ExternalLink,
  Library,
  Link as LinkIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getTrailProgress } from "@/lib/storage";

// -------------------------------------
// TRILHAS DE CURSOS (AS TUAS ORIGINAIS)
// -------------------------------------

const trails = [
  {
    id: "mlops-fundamentals",
    title: "MLOps Fundamentals",
    description:
      "Aprende os fundamentos de MLOps desde a ingestão de dados até à monitorização em produção.",
    duration: "8 horas",
    level: "Iniciante",
    modules: 6,
  },
  {
    id: "cicd-ml",
    title: "CI/CD para ML",
    description:
      "Implementa pipelines de integração e deployment contínuo para modelos de machine learning.",
    duration: "6 horas",
    level: "Intermédio",
    modules: 5,
  },
  {
    id: "experiment-tracking",
    title: "Experiment Tracking & Registry",
    description:
      "Gere experiências e versões de modelos com ferramentas modernas de tracking.",
    duration: "5 horas",
    level: "Intermédio",
    modules: 4,
  },
  {
    id: "monitoring-drift",
    title: "Monitorização & Drift",
    description:
      "Monitoriza modelos em produção e detecta data drift para garantir qualidade.",
    duration: "7 horas",
    level: "Avançado",
    modules: 5,
  },
  {
    id: "chatbots-llm",
    title: "Chatbots & LLM Ops",
    description:
      "Constrói e opera chatbots com Large Language Models em produção.",
    duration: "10 horas",
    level: "Avançado",
    modules: 7,
  },
];

// -------------------------------------
// RECURSOS COMPLETOS (DOS TEUS FICHEIROS)
// -------------------------------------

const resourceGroups = [
  {
    category: "Documentação oficial",
    icon: BookOpen,
    items: [
      {
        label: "MLOps (Google Cloud)",
        description:
          "Guia de arquitectura e práticas de MLOps na Google Cloud.",
        url: "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning",
      },
      {
        label: "MLOps (Microsoft Azure)",
        description:
          "Gestão e deployment de modelos de ML no Azure Machine Learning.",
        url: "https://learn.microsoft.com/azure/machine-learning/concept-model-management-and-deployment",
      },
      {
        label: "MLOps (AWS)",
        description: "Boas práticas e serviços AWS para MLOps.",
        url: "https://aws.amazon.com/blogs/machine-learning/tag/mlops/",
      },
    ],
  },
  {
    category: "Ferramentas de MLOps",
    icon: Library,
    items: [
      {
        label: "MLflow",
        description: "Experiment tracking e model registry.",
        url: "https://mlflow.org/",
      },
      {
        label: "DVC",
        description: "Versionamento de dados e pipelines.",
        url: "https://dvc.org/",
      },
      {
        label: "Evidently AI",
        description: "Monitorização e deteção de drift.",
        url: "https://www.evidentlyai.com/",
      },
      {
        label: "Kubeflow",
        description: "Pipelines de ML em Kubernetes.",
        url: "https://www.kubeflow.org/",
      },
    ],
  },
  {
    category: "Repositórios recomendados",
    icon: LinkIcon,
    items: [
      {
        label: "Awesome MLOps",
        description: "Coleção curada de conteúdos sobre MLOps.",
        url: "https://github.com/visenger/awesome-mlops",
      },
      {
        label: "MLOps Zoomcamp",
        description: "Curso prático intensivo gratuito.",
        url: "https://github.com/DataTalksClub/mlops-zoomcamp",
      },
      {
        label: "Pipeline Templates (GCP)",
        description: "Templates de pipelines de produção.",
        url: "https://github.com/GoogleCloudPlatform/mlops-on-gcp",
      },
    ],
  },
  {
    category: "Materiais de apoio",
    icon: BookOpen,
    items: [
      {
        label: "MLOps Cheat Sheet",
        description: "Referência rápida de conceitos e comandos.",
        url: "https://ml-ops.org/content/references",
      },
      {
        label: "Artigos & Papers",
        description: "Literatura fundamental.",
        url: "https://arxiv.org/search/?query=mlops&searchtype=all",
      },
    ],
  },
];

export default function Academy() {
  const [trailsProgress, setTrailsProgress] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState(null);

  useEffect(() => {
    const progress = getTrailProgress();
    const map = {};
    progress.forEach((p) => (map[p.trailId] = p.progress));
    setTrailsProgress(map);
  }, []);

  const filteredTrails = trails.filter((trail) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !term ||
      trail.title.toLowerCase().includes(term) ||
      trail.description.toLowerCase().includes(term);

    const matchesLevel =
      !levelFilter || trail.level.toString() === levelFilter.toString();

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-12 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-academy/10 border mb-6">
            <Award className="h-4 w-4 text-academy" />
            <span className="text-sm font-medium text-academy">
              Aprende ao teu ritmo
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Cursos de MLOps
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trilhas completas com conteúdo estruturado, exercícios práticos e
            material de apoio.
          </p>
        </section>

        {/* TABS */}
        <section className="container mx-auto px-4 pb-20">
          <Tabs defaultValue="trilhas">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="trilhas">Cursos</TabsTrigger>
              <TabsTrigger value="recursos">Recursos</TabsTrigger>
            </TabsList>

            {/* ------------------------------ */}
            {/* TRILHAS */}
            {/* ------------------------------ */}
            <TabsContent value="trilhas">
              {/* Pesquisar / Filtros */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar cursos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex gap-2">
                  {["Iniciante", "Intermédio", "Avançado"].map((lvl) => (
                    <Badge
                      key={lvl}
                      variant={levelFilter === lvl ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() =>
                        setLevelFilter((prev) => (prev === lvl ? null : lvl))
                      }
                    >
                      {lvl}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Cartões das trilhas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {filteredTrails.map((trail) => {
                  const progress = trailsProgress[trail.id] || 0;
                  return (
                    <Card key={trail.id} className="group hover:shadow-lg transition">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge
                            variant={
                              trail.level === "Iniciante"
                                ? "secondary"
                                : trail.level === "Intermédio"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {trail.level}
                          </Badge>

                          <BookOpen className="h-5 w-5 text-academy" />
                        </div>

                        <CardTitle>{trail.title}</CardTitle>
                        <CardDescription>{trail.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {trail.duration}
                          </span>

                          <span className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            {trail.modules} módulos
                          </span>
                        </div>

                        {progress > 0 && (
                          <>
                            <div className="flex justify-between text-sm">
                              <span>Progresso</span>
                              <span className="font-medium">{progress}%</span>
                            </div>

                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-academy transition"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </>
                        )}

                        <Button asChild className="w-full bg-academy">
                          <Link to={`/academy/trail/${trail.id}`}>
                            {progress > 0 ? "Continuar" : "Iniciar Curso"}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* ------------------------------ */}
            {/* RECURSOS */}
            {/* ------------------------------ */}
            <TabsContent value="recursos" className="space-y-10">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-semibold">Recursos recomendados</h2>
                <p className="text-muted-foreground text-sm">
                  Documentação, ferramentas, repositórios e materiais essenciais para aprofundares o teu conhecimento.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resourceGroups.map((group) => {
                  const Icon = group.icon;
                  return (
                    <Card key={group.category} className="hover:shadow-lg transition">
                      <CardHeader className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-academy" />
                          <CardTitle className="text-base">
                            {group.category}
                          </CardTitle>
                        </div>

                        <Badge variant="outline">{group.items.length}</Badge>
                      </CardHeader>

                      <CardContent className="space-y-2">
                        {group.items.map((item) => (
                          <a
                            key={item.url}
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 rounded-md hover:bg-muted flex justify-between gap-3 transition"
                          >
                            <div>
                              <p className="text-sm font-medium">{item.label}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            </div>

                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          </a>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
}
