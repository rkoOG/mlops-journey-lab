import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, Library, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

const resources = [
  {
    category: "Documentação oficial",
    icon: BookOpen,
    items: [
      {
        label: "MLOps (Google Cloud)",
        url: "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning",
      },
      {
        label: "MLOps (Microsoft)",
        url: "https://learn.microsoft.com/azure/machine-learning/concept-model-management-and-deployment",
      },
      {
        label: "MLOps (AWS)",
        url: "https://aws.amazon.com/blogs/machine-learning/tag/mlops/",
      },
    ],
  },
  {
    category: "Ferramentas de MLOps",
    icon: Library,
    items: [
      { label: "MLflow", url: "https://mlflow.org/" },
      { label: "DVC", url: "https://dvc.org/" },
      { label: "Evidently AI", url: "https://www.evidentlyai.com/" },
      { label: "Kubeflow", url: "https://www.kubeflow.org/" },
    ],
  },
  {
    category: "Repositórios recomendados",
    icon: LinkIcon,
    items: [
      {
        label: "Awesome MLOps",
        url: "https://github.com/visenger/awesome-mlops",
      },
      {
        label: "MLOps Zoomcamp",
        url: "https://github.com/DataTalksClub/mlops-zoomcamp",
      },
    ],
  },
];

const quickGlossary = [
  {
    term: "MLOps",
    description:
      "Práticas para colocar modelos de ML em produção de forma fiável e repetível.",
  },
  {
    term: "Pipeline",
    description:
      "Conjunto de passos automatizados, desde a ingestão de dados até ao deployment.",
  },
  {
    term: "Drift",
    description:
      "Mudança nos dados ou nas relações que pode degradar o desempenho do modelo.",
  },
  {
    term: "Experiment Tracking",
    description:
      "Registo de experiências, hiperparâmetros e métricas para comparação.",
  },
  {
    term: "Model Registry",
    description:
      "Repositório central onde são guardadas as diferentes versões de modelos.",
  },
];

export default function ResourcesGlossary() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-10">
          <header className="max-w-3xl mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Recursos & Glossário
            </h1>
            <p className="text-muted-foreground">
              Uma colecção de recursos para continuares a aprender MLOps, e um
              glossário rápido com os conceitos mais usados ao longo do curso.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recursos */}
            <section className="lg:col-span-2 space-y-6">
              {resources.map((group) => {
                const Icon = group.icon;
                return (
                  <Card key={group.category}>
                    <CardHeader className="flex flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-academy" />
                        <CardTitle>{group.category}</CardTitle>
                      </div>
                      <Badge variant="outline">
                        {group.items.length} recursos
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {group.items.map((item) => (
                        <a
                          key={item.url}
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </a>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </section>

            {/* Glossário rápido */}
            <aside className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Glossário rápido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickGlossary.map((item) => (
                    <div key={item.term} className="border-b pb-2 last:border-0">
                      <p className="text-sm font-semibold flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-academy" />
                        {item.term}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Glossário completo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Queres rever todos os termos e definições usados na
                    plataforma?
                  </p>
                  <Button className="w-full" asChild>
                    <Link to="/glossary">Abrir glossário completo</Link>
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
