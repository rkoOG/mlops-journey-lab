import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Link as LinkIcon,
  Filter,
  Search,
  ExternalLink,
} from "lucide-react";

type GlossaryCategory =
  | "Fundamentos"
  | "Dados"
  | "CI/CD"
  | "Monitorização"
  | "LLMs & RAG";

interface GlossaryEntry {
  term: string;
  short: string;
  description: string;
  category: GlossaryCategory;
}

interface Resource {
  title: string;
  description: string;
  url: string;
  type: "Artigo" | "Documentação" | "Ferramenta" | "Curso";
  category: GlossaryCategory;
}

const glossaryEntries: GlossaryEntry[] = [
  {
    term: "MLOps",
    short: "Machine Learning + DevOps",
    description:
      "Conjunto de práticas que unem ML, DevOps e engenharia de dados para levar modelos para produção e os manter operacionais com qualidade.",
    category: "Fundamentos",
  },
  {
    term: "Pipeline",
    short: "Fluxo automatizado",
    description:
      "Sequência de passos automatizados (ingestão, treino, validação, deployment, monitorização) que transformam dados em valor de negócio.",
    category: "Fundamentos",
  },
  {
    term: "Reprodutibilidade",
    short: "Resultados consistentes",
    description:
      "Capacidade de obter os mesmos resultados quando usamos o mesmo código, dados e ambiente — essencial para auditoria e debugging.",
    category: "Fundamentos",
  },
  {
    term: "Data Drift",
    short: "Mudança nos dados de entrada",
    description:
      "Quando a distribuição dos dados em produção deixa de parecer-se com os dados usados no treino, podendo degradar a performance do modelo.",
    category: "Dados",
  },
  {
    term: "Concept Drift",
    short: "Mudança na relação X → Y",
    description:
      "Quando a relação entre features (X) e target (Y) muda ao longo do tempo; o fenómeno em si está diferente.",
    category: "Monitorização",
  },
  {
    term: "Experiment Tracking",
    short: "Registo de experiências",
    description:
      "Processo de registar parâmetros, métricas, código e artefactos de cada treino para facilitar comparação e auditoria.",
    category: "Fundamentos",
  },
  {
    term: "Model Registry",
    short: "Catálogo de modelos",
    description:
      "Repositório central onde modelos são registados, versionados e promovidos entre stages como Staging e Production.",
    category: "Fundamentos",
  },
  {
    term: "CI/CD",
    short: "Continuous Integration / Delivery",
    description:
      "Práticas que automatizam testes, validação e deployment de código, dados e modelos para garantir entregas frequentes e seguras.",
    category: "CI/CD",
  },
  {
    term: "Continuous Training (CT)",
    short: "Re-treino contínuo",
    description:
      "Processo automatizado que re-treina modelos com base em triggers como tempo, volume de dados ou deteção de drift.",
    category: "CI/CD",
  },
  {
    term: "Observability",
    short: "Ver dentro do sistema",
    description:
      "Capacidade de inferir o estado interno de um sistema a partir de logs, métricas e traces — fundamental para sistemas de ML em produção.",
    category: "Monitorização",
  },
  {
    term: "LLM (Large Language Model)",
    short: "Modelo de linguagem grande",
    description:
      "Modelo de linguagem treinado em grandes quantidades de texto, capaz de gerar e compreender linguagem natural em múltiplos contextos.",
    category: "LLMs & RAG",
  },
  {
    term: "Prompt Engineering",
    short: "Desenho de prompts",
    description:
      "Arte de desenhar instruções e exemplos para orientar o comportamento de LLMs e obter respostas mais úteis e seguras.",
    category: "LLMs & RAG",
  },
  {
    term: "RAG (Retrieval-Augmented Generation)",
    short: "Geração + pesquisa",
    description:
      "Arquitectura que combina um LLM com recuperação de informação externa (por exemplo, via vector DB) para usar conteúdo actualizado e específico.",
    category: "LLMs & RAG",
  },
  {
    term: "Vector Database",
    short: "Pesquisa semântica",
    description:
      "Base de dados optimizada para guardar embeddings e fazer pesquisa por similaridade semântica, usada em sistemas RAG.",
    category: "LLMs & RAG",
  },
];

const resources: Resource[] = [
  // Fundamentos
  {
    title: "MLOps: Continuous delivery and automation pipelines in ML",
    description: "Visão geral de MLOps e ciclo de vida de ML em produção.",
    url: "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning",
    type: "Artigo",
    category: "Fundamentos",
  },
  {
    title: "MLOps Specialization (Coursera)",
    description:
      "Série de cursos focados em MLOps, pipelines e deployment de modelos.",
    url: "https://www.coursera.org/specializations/mlops-machine-learning-production",
    type: "Curso",
    category: "Fundamentos",
  },

  // Dados
  {
    title: "Great Expectations",
    description:
      "Ferramenta open source para validação e documentação de dados.",
    url: "https://greatexpectations.io/",
    type: "Ferramenta",
    category: "Dados",
  },
  {
    title: "Data Validation for Machine Learning",
    description:
      "Guia prático sobre validação de dados e data quality para ML.",
    url: "https://developers.google.com/machine-learning/data-prep/validation",
    type: "Artigo",
    category: "Dados",
  },

  // CI/CD
  {
    title: "GitHub Actions para MLOps",
    description:
      "Documentação oficial de GitHub Actions com exemplos aplicados a pipelines de ML.",
    url: "https://docs.github.com/actions",
    type: "Documentação",
    category: "CI/CD",
  },
  {
    title: "Continuous Delivery for Machine Learning",
    description:
      "Conceitos e padrões para CI/CD aplicado a sistemas de ML.",
    url: "https://martinfowler.com/articles/cd4ml.html",
    type: "Artigo",
    category: "CI/CD",
  },

  // Monitorização
  {
    title: "Evidently AI",
    description:
      "Ferramenta open source para monitorização, data drift e performance de modelos em produção.",
    url: "https://www.evidentlyai.com/",
    type: "Ferramenta",
    category: "Monitorização",
  },
  {
    title: "Prometheus + Grafana",
    description:
      "Stack popular para métricas, alertas e dashboards em sistemas de ML.",
    url: "https://prometheus.io/docs/introduction/overview/",
    type: "Documentação",
    category: "Monitorização",
  },

  // LLMs & RAG
  {
    title: "Documentação da OpenAI API",
    description:
      "Guia oficial para usar modelos de linguagem em produção (APIs, boas práticas, limites).",
    url: "https://platform.openai.com/docs",
    type: "Documentação",
    category: "LLMs & RAG",
  },
  {
    title: "LangChain",
    description:
      "Framework para construir aplicações com LLMs, RAG, ferramentas e cadeias de prompts.",
    url: "https://python.langchain.com/",
    type: "Ferramenta",
    category: "LLMs & RAG",
  },
  {
    title: "Vector Databases 101",
    description:
      "Introdução ao conceito de vector DBs e pesquisa semântica para RAG.",
    url: "https://www.pinecone.io/learn/vector-database/",
    type: "Artigo",
    category: "LLMs & RAG",
  },
];

const categories: { id: "all" | GlossaryCategory; label: string }[] = [
  { id: "all", label: "Todos os tópicos" },
  { id: "Fundamentos", label: "Fundamentos" },
  { id: "Dados", label: "Dados" },
  { id: "CI/CD", label: "CI/CD" },
  { id: "Monitorização", label: "Monitorização" },
  { id: "LLMs & RAG", label: "LLMs & RAG" },
];

export default function Glossary() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<"all" | GlossaryCategory>("all");

  const filteredGlossary = useMemo(() => {
    return glossaryEntries.filter((entry) => {
      const matchesCategory =
        activeCategory === "all" || entry.category === activeCategory;

      const term = entry.term.toLowerCase();
      const short = entry.short.toLowerCase();
      const desc = entry.description.toLowerCase();
      const query = search.toLowerCase();

      const matchesSearch =
        !query ||
        term.includes(query) ||
        short.includes(query) ||
        desc.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const matchesCategory =
        activeCategory === "all" || res.category === activeCategory;

      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        res.title.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="flex min-height-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-hero py-10 md:py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">
                Recursos &amp; Glossário
              </h1>
              <p className="text-muted-foreground text-lg">
                Consulta definições rápidas, aprofunda conceitos e explora
                recursos recomendados para continuares a aprender MLOps e LLM
                Ops.
              </p>
            </div>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="py-10">
          <div className="container mx-auto px-4 max-w-5xl space-y-6">
            {/* Filtros + Pesquisa */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Filtrar por tópico
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <Badge
                        key={cat.id}
                        variant={activeCategory === cat.id ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() =>
                          setActiveCategory(cat.id as "all" | GlossaryCategory)
                        }
                      >
                        {cat.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Procurar termo ou recurso (ex: drift, registry, RAG)..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Tabs Glossário / Recursos */}
            <Tabs defaultValue="glossary" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="glossary">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Glossário
                </TabsTrigger>
                <TabsTrigger value="resources">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Recursos recomendados
                </TabsTrigger>
              </TabsList>

              {/* Glossário */}
              <TabsContent value="glossary" className="space-y-3">
                {filteredGlossary.length === 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Nenhum termo encontrado</CardTitle>
                      <CardDescription>
                        Ajusta a pesquisa ou muda o filtro de tópico.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ) : (
                  filteredGlossary.map((entry) => (
                    <Card
                      key={entry.term}
                      className="hover:shadow-sm transition-shadow"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-lg">
                                {entry.term}
                              </CardTitle>
                              <Badge variant="outline">{entry.category}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {entry.short}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {entry.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* Recursos */}
              <TabsContent value="resources" className="space-y-3">
                {filteredResources.length === 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Nenhum recurso encontrado</CardTitle>
                      <CardDescription>
                        Tenta outro termo ou selecciona &quot;Todos os tópicos&quot;.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ) : (
                  filteredResources.map((res) => (
                    <Card
                      key={res.title}
                      className="hover:shadow-sm transition-shadow"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-base md:text-lg">
                                {res.title}
                              </CardTitle>
                              <Badge variant="secondary">{res.type}</Badge>
                              <Badge variant="outline">{res.category}</Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <p className="text-sm text-muted-foreground md:max-w-xl">
                          {res.description}
                        </p>
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-sm font-medium text-primary hover:underline mt-2 md:mt-0"
                        >
                          Abrir recurso
                          <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
