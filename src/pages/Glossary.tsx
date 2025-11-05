import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "CI/CD",
    definition:
      "Continuous Integration e Continuous Deployment - práticas de automação que permitem integrar código frequentemente e fazer deployment automático para produção.",
    category: "DevOps",
  },
  {
    term: "Data Drift",
    definition:
      "Mudança na distribuição estatística dos dados de entrada ao longo do tempo, podendo impactar a performance do modelo em produção.",
    category: "Monitorização",
  },
  {
    term: "Feature Store",
    definition:
      "Sistema centralizado para armazenar, gerir e servir features para treino e inferência de modelos ML, garantindo consistência entre ambientes.",
    category: "Dados",
  },
  {
    term: "Model Registry",
    definition:
      "Repositório centralizado para versionar, armazenar e gerir modelos ML, incluindo metadados, métricas e informações de linhagem.",
    category: "MLOps",
  },
  {
    term: "Pipeline",
    definition:
      "Sequência automatizada de etapas para processar dados, treinar modelos e fazer deployment, garantindo reprodutibilidade e rastreabilidade.",
    category: "MLOps",
  },
  {
    term: "A/B Testing",
    definition:
      "Técnica de comparar duas versões de um modelo em produção, dividindo o tráfego para avaliar qual performa melhor.",
    category: "Deployment",
  },
  {
    term: "Concept Drift",
    definition:
      "Mudança na relação entre features e target ao longo do tempo, tornando o modelo menos preciso mesmo sem data drift.",
    category: "Monitorização",
  },
  {
    term: "MLflow",
    definition:
      "Plataforma open-source para gerir o ciclo de vida de ML, incluindo experimentação, reprodutibilidade, deployment e model registry.",
    category: "Ferramentas",
  },
  {
    term: "Monitoring",
    definition:
      "Processo contínuo de acompanhar métricas de performance, drift e saúde do modelo em produção para detetar degradação.",
    category: "Monitorização",
  },
  {
    term: "Orchestration",
    definition:
      "Coordenação e automação de workflows complexos de ML, gerindo dependências e execução de tarefas em ordem.",
    category: "MLOps",
  },
  {
    term: "Reproducibility",
    definition:
      "Capacidade de reproduzir exatamente os resultados de um experimento ou treino de modelo, através de versionamento de código, dados e ambiente.",
    category: "Best Practices",
  },
  {
    term: "Shadow Mode",
    definition:
      "Estratégia de deployment onde o novo modelo recebe tráfego real mas suas predições não são servidas, apenas comparadas com o modelo atual.",
    category: "Deployment",
  },
  {
    term: "Versioning",
    definition:
      "Prática de manter controlo de versões de código, dados, modelos e configurações para garantir rastreabilidade e rollback.",
    category: "Best Practices",
  },
];

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTerms = glossaryTerms.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(glossaryTerms.map((t) => t.category))).sort();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Glossário & Referências</h1>
              <p className="text-lg text-muted-foreground">
                Termos essenciais de MLOps explicados de forma clara e concisa
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-8">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar termos, definições ou categorias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12 pl-10 text-base"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSearchTerm(category)}
                    className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Results Count */}
              <p className="text-sm text-muted-foreground">
                {filteredTerms.length === glossaryTerms.length
                  ? `${glossaryTerms.length} termos no glossário`
                  : `${filteredTerms.length} resultados encontrados`}
              </p>

              {/* Glossary Terms */}
              <div className="grid gap-4 md:grid-cols-2">
                {filteredTerms.map((item, index) => (
                  <Card key={index} className="transition-shadow hover:shadow-card-hover">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-xl">{item.term}</CardTitle>
                        <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent">
                          {item.category}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.definition}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredTerms.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-lg text-muted-foreground">
                    Nenhum termo encontrado. Tenta outra pesquisa.
                  </p>
                </div>
              )}

              {/* How to Build Section */}
              <Card className="mt-12 bg-gradient-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Como Construir um Pipeline MLOps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold">Ingestão e Validação</h4>
                        <p className="text-sm text-muted-foreground">
                          Configura fontes de dados, valida schemas e qualidade dos dados
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold">Experimentação e Treino</h4>
                        <p className="text-sm text-muted-foreground">
                          Treina modelos, faz tracking de experimentos e otimiza hiperparâmetros
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold">Registry e Versionamento</h4>
                        <p className="text-sm text-muted-foreground">
                          Regista modelos com metadados completos e mantém controlo de versões
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold">CI/CD e Deployment</h4>
                        <p className="text-sm text-muted-foreground">
                          Automatiza testes, deployment e rollback com pipelines CI/CD
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        5
                      </div>
                      <div>
                        <h4 className="font-semibold">Monitorização Contínua</h4>
                        <p className="text-sm text-muted-foreground">
                          Acompanha métricas, deteta drift e mantém alertas ativos em produção
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Glossary;
