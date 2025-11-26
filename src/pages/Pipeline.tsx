import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PipelineStageCard } from "@/components/PipelineStageCard";
import {
  Database,
  CheckCircle,
  Brain,
  Package,
  Workflow,
  Activity,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const pipelineStages = [
  {
    icon: Database,
    title: "Ingestão de Dados",
    description: "Coleta e integração de dados de múltiplas fontes",
    bullets: [
      "Conectores para várias fontes de dados",
      "Validação de schema na entrada",
      "Processamento em batch e streaming",
    ],
    details: {
      tools: ["Apache Kafka", "AWS S3", "Apache Airflow"],
      risks: ["Dados inconsistentes", "Latência alta", "Falhas de conexão"],
      snippet: `# Exemplo de pipeline de ingestão
import pandas as pd
from airflow import DAG

def ingest_data():
    df = pd.read_csv('data.csv')
    validate_schema(df)
    return df`,
    },
  },
  {
    icon: CheckCircle,
    title: "Validação",
    description: "Verificação de qualidade e integridade dos dados",
    bullets: [
      "Detecção de anomalias",
      "Validação de tipos e ranges",
      "Testes de qualidade automatizados",
    ],
    details: {
      tools: [
        "Great Expectations",
        "Pandas Profiling",
        "TensorFlow Data Validation",
      ],
      risks: ["Dados corrompidos", "Drift de dados", "Missing values"],
      snippet: `# Validação de dados
from great_expectations import DataContext

def validate_data(df):
    context = DataContext()
    suite = context.get_expectation_suite()
    results = context.run_validation_operator(
        "action_list_operator", [batch]
    )
    return results.success`,
    },
  },
  {
    icon: Brain,
    title: "Treino",
    description: "Treinamento e otimização de modelos ML",
    bullets: [
      "Experimentação com hiperparâmetros",
      "Cross-validation e métricas",
      "Tracking de experimentos",
    ],
    details: {
      tools: ["MLflow", "Weights & Biases", "TensorBoard"],
      risks: ["Overfitting", "Underfitting", "Recursos computacionais"],
      snippet: `# Treino com tracking
import mlflow
from sklearn.ensemble import RandomForestClassifier

with mlflow.start_run():
    model = RandomForestClassifier()
    model.fit(X_train, y_train)
    accuracy = model.score(X_test, y_test)
    mlflow.log_metric("accuracy", accuracy)
    mlflow.sklearn.log_model(model, "model")`,
    },
  },
  {
    icon: Package,
    title: "Model Registry",
    description: "Versionamento e gestão de modelos",
    bullets: [
      "Controle de versões",
      "Staging e produção",
      "Metadados e linhagem",
    ],
    details: {
      tools: ["MLflow Model Registry", "DVC", "Amazon SageMaker"],
      risks: [
        "Perda de modelos",
        "Versionamento incorreto",
        "Metadados incompletos",
      ],
      snippet: `# Registar modelo
import mlflow

client = mlflow.tracking.MlflowClient()
model_uri = "runs:/<run-id>/model"
model_details = mlflow.register_model(
    model_uri=model_uri,
    name="iris_classifier"
)

# Promover para produção
client.transition_model_version_stage(
    name="iris_classifier",
    version=model_details.version,
    stage="Production"
)`,
    },
  },
  {
    icon: Workflow,
    title: "CI/CD",
    description: "Automação de deployment e testes",
    bullets: [
      "Testes automatizados",
      "Deployment contínuo",
      "Rollback automático",
    ],
    details: {
      tools: ["GitHub Actions", "Jenkins", "ArgoCD"],
      risks: ["Falhas de deployment", "Testes insuficientes", "Downtime"],
      snippet: `# GitHub Actions workflow
name: Deploy Model
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Test Model
        run: pytest tests/
      - name: Deploy to Production
        run: ./deploy.sh`,
    },
  },
  {
    icon: Activity,
    title: "Monitorização",
    description: "Tracking de performance e detecção de drift",
    bullets: [
      "Métricas em tempo real",
      "Alertas automáticos",
      "Análise de drift",
    ],
    details: {
      tools: ["Prometheus", "Grafana", "Evidently AI"],
      risks: ["Data drift", "Concept drift", "Performance degradation"],
      snippet: `# Monitorização com Evidently
from evidently import ColumnMapping
from evidently.dashboard import Dashboard
from evidently.tabs import DataDriftTab

dashboard = Dashboard(tabs=[DataDriftTab()])
dashboard.calculate(
    reference_data=reference_df,
    current_data=current_df,
    column_mapping=ColumnMapping()
)
dashboard.save("drift_report.html")`,
    },
  },
];

const Pipeline = () => {
  const [selectedStage, setSelectedStage] = useState<
    (typeof pipelineStages)[0] | null
  >(null);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                Pipeline MLOps Interativo
              </h1>
              <p className="text-lg text-muted-foreground">
                Explora cada etapa do pipeline MLOps de forma visual e
                interativa. Clica em cada componente para aprender mais.
              </p>
            </div>
          </div>
        </section>

        {/* Pipeline Stages Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pipelineStages.map((stage, index) => (
                <PipelineStageCard
                  key={index}
                  {...stage}
                  onClick={() => setSelectedStage(stage)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Stage Details Dialog */}
      <Dialog
        open={!!selectedStage}
        onOpenChange={() => setSelectedStage(null)}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              {selectedStage && (
                <selectedStage.icon className="h-6 w-6 text-primary" />
              )}
              {selectedStage?.title}
            </DialogTitle>
            <DialogDescription>{selectedStage?.description}</DialogDescription>
          </DialogHeader>

          {selectedStage && (
            <div className="space-y-6 pt-4">
              {/* Tools */}
              <div>
                <h3 className="mb-3 font-semibold">Ferramentas Típicas</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedStage.details.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Risks */}
              <div>
                <h3 className="mb-3 font-semibold">Riscos Comuns</h3>
                <ul className="space-y-2">
                  {selectedStage.details.risks.map((risk, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                      <span className="text-muted-foreground">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet */}
              <div>
                <h3 className="mb-3 font-semibold">Exemplo de Código</h3>
                <pre className="overflow-x-auto rounded-lg bg-muted p-4">
                  <code className="text-sm">
                    {selectedStage.details.snippet}
                  </code>
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pipeline;
