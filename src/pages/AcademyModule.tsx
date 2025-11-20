import { useState, useEffect } from "react";
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
import { Link, useParams, useNavigate } from "react-router-dom";
import introVideo from "@/assets/mlops-intro-video.mp4";
import { markModuleComplete, getSpecificTrailProgress } from "@/lib/storage";
import { toast } from "sonner";

const moduleData = {
  "mlops-fundamentals": {
    1: {
      title: "Introdução ao MLOps",
      description: "Compreende os fundamentos de MLOps e porque é essencial para projetos de ML em produção.",
      duration: "1h",
      lessons: [
        { id: 1, title: "O que é MLOps?", type: "video", duration: "10min", completed: false, videoUrl: introVideo },
        { id: 2, title: "Ciclo de vida de ML", type: "reading", duration: "15min", completed: false, videoUrl: introVideo },
        { id: 3, title: "Desafios em produção", type: "video", duration: "12min", completed: false, videoUrl: introVideo },
        { id: 4, title: "Ferramentas essenciais", type: "reading", duration: "18min", completed: false, videoUrl: introVideo },
      ],
      content: {
        overview: "Neste módulo vais aprender os conceitos fundamentais de MLOps, incluindo o ciclo de vida completo de um modelo de machine learning em produção.",
        videoUrl: "https://example.com/video",
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
    2: {
      title: "Data Ingestion & Validation",
      description: "Aprende a construir pipelines de ingestão de dados robustos e implementar validação automática.",
      duration: "1.5h",
      lessons: [
        { id: 1, title: "Arquiteturas de ingestão", type: "video", duration: "15min", completed: false, videoUrl: introVideo },
        { id: 2, title: "Streaming vs Batch", type: "reading", duration: "20min", completed: false, videoUrl: introVideo },
        { id: 3, title: "Data validation com Great Expectations", type: "video", duration: "25min", completed: false, videoUrl: introVideo },
        { id: 4, title: "Schema evolution", type: "reading", duration: "15min", completed: false, videoUrl: introVideo },
        { id: 5, title: "Data quality monitoring", type: "video", duration: "15min", completed: false, videoUrl: introVideo },
      ],
      content: {
        overview: "Neste módulo vais dominar técnicas de ingestão e validação de dados para garantir qualidade e consistência nos teus pipelines ML.",
        videoUrl: "https://example.com/video",
        keyPoints: [
          "Padrões de arquitetura: batch, streaming, micro-batch",
          "Validação de schema e tipos de dados",
          "Data quality checks automatizados",
          "Deteção de anomalias e drift nos dados",
          "Integração com ferramentas como Great Expectations",
        ],
        codeSnippet: `# Exemplo: Data validation com Great Expectations
import great_expectations as ge
from great_expectations.dataset import PandasDataset

# Carregar dados
df = ge.read_csv('data/training_data.csv')

# Definir expectativas
df.expect_column_values_to_not_be_null('user_id')
df.expect_column_values_to_be_between('age', 0, 120)
df.expect_column_values_to_be_in_set('country', ['PT', 'ES', 'FR'])

# Validar dados
results = df.validate()

if not results['success']:
    print("Validação falhou!")
    for check in results['results']:
        if not check['success']:
            print(f"Erro: {check['expectation_config']['kwargs']}")`,
        exercises: [
          "Implementa um pipeline de ingestão batch e streaming",
          "Define expectativas de qualidade para um dataset",
          "Configura alertas para data quality issues",
          "Cria testes automatizados para schema validation",
        ],
      },
    },
    3: {
      title: "Model Training Pipeline",
      description: "Constrói pipelines de treino escaláveis com experiment tracking e hyperparameter tuning.",
      duration: "2h",
      lessons: [
        { id: 1, title: "Pipeline orchestration", type: "video", duration: "20min", completed: false, videoUrl: introVideo },
        { id: 2, title: "Feature engineering", type: "reading", duration: "25min", completed: false, videoUrl: introVideo },
        { id: 3, title: "Hyperparameter tuning distribuído", type: "video", duration: "25min", completed: false, videoUrl: introVideo },
        { id: 4, title: "Experiment tracking com MLflow", type: "reading", duration: "20min", completed: false, videoUrl: introVideo },
        { id: 5, title: "Model artifacts", type: "video", duration: "15min", completed: false, videoUrl: introVideo },
        { id: 6, title: "Reprodutibilidade", type: "reading", duration: "15min", completed: false, videoUrl: introVideo },
      ],
      content: {
        overview: "Aprende a construir pipelines de treino profissionais com orchestration, tracking e reprodutibilidade garantida.",
        videoUrl: "https://example.com/video",
        keyPoints: [
          "Orchestração com Airflow, Kubeflow ou Prefect",
          "Feature stores para reutilização de features",
          "Distributed training e hyperparameter optimization",
          "Experiment tracking e comparação de modelos",
          "Versionamento de dados, código e modelos",
          "Garantir reprodutibilidade total",
        ],
        codeSnippet: `# Exemplo: Training pipeline com MLflow e Optuna
import mlflow
import optuna
from sklearn.ensemble import RandomForestClassifier

def objective(trial):
    with mlflow.start_run(nested=True):
        # Hyperparameters
        n_estimators = trial.suggest_int('n_estimators', 50, 300)
        max_depth = trial.suggest_int('max_depth', 3, 15)
        min_samples_split = trial.suggest_int('min_samples_split', 2, 20)
        
        # Treinar modelo
        clf = RandomForestClassifier(
            n_estimators=n_estimators,
            max_depth=max_depth,
            min_samples_split=min_samples_split,
            random_state=42
        )
        clf.fit(X_train, y_train)
        
        # Avaliar
        accuracy = clf.score(X_test, y_test)
        
        # Log no MLflow
        mlflow.log_params({
            'n_estimators': n_estimators,
            'max_depth': max_depth,
            'min_samples_split': min_samples_split
        })
        mlflow.log_metric('accuracy', accuracy)
        mlflow.sklearn.log_model(clf, 'model')
        
        return accuracy

# Otimização com Optuna
study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=50)

print(f"Melhor accuracy: {study.best_value}")
print(f"Melhores params: {study.best_params}")`,
        exercises: [
          "Cria um pipeline Airflow para treino automatizado",
          "Implementa feature store para partilha de features",
          "Configura hyperparameter tuning distribuído",
          "Implementa versionamento de datasets e modelos",
          "Garante reprodutibilidade com seeds e ambientes",
        ],
      },
    },
    4: {
      title: "Model Registry & Versioning",
      description: "Gestão profissional de modelos com registry, versionamento semântico e lifecycle management.",
      duration: "1.5h",
      lessons: [
        { id: 1, title: "Model Registry: conceitos", type: "video", duration: "20min", completed: false, videoUrl: introVideo },
        { id: 2, title: "Versionamento semântico", type: "reading", duration: "25min", completed: false, videoUrl: introVideo },
        { id: 3, title: "Model lifecycle stages", type: "video", duration: "25min", completed: false, videoUrl: introVideo },
        { id: 4, title: "Gestão de metadados", type: "reading", duration: "20min", completed: false, videoUrl: introVideo },
      ],
      content: {
        overview: "Aprende a gerir modelos de forma profissional com registry centralizado, versionamento e tracking de lifecycle.",
        videoUrl: "https://example.com/video",
        keyPoints: [
          "Model Registry: repositório centralizado de modelos",
          "Versionamento semântico (major.minor.patch)",
          "Stages: Staging, Production, Archived",
          "Metadata tracking: métricas, dependencies, datasets",
          "Promoção automática de modelos baseada em métricas",
          "Rollback e auditoria de mudanças",
        ],
        codeSnippet: `# Exemplo: Model Registry com MLflow
import mlflow
from mlflow.tracking import MlflowClient

client = MlflowClient()

# 1. Registar modelo após treino
model_uri = f"runs:/{run_id}/model"
model_details = mlflow.register_model(
    model_uri=model_uri,
    name="fraud_detection_model"
)

# 2. Adicionar descrição e tags
client.update_model_version(
    name="fraud_detection_model",
    version=model_details.version,
    description="Random Forest com SMOTE para balanceamento"
)

client.set_model_version_tag(
    name="fraud_detection_model",
    version=model_details.version,
    key="validation_status",
    value="passed"
)

# 3. Transicionar para Production se métricas OK
if accuracy > 0.95 and f1_score > 0.90:
    client.transition_model_version_stage(
        name="fraud_detection_model",
        version=model_details.version,
        stage="Production",
        archive_existing_versions=True
    )
    print(f"Modelo v{model_details.version} promovido para Production!")

# 4. Carregar modelo de Production
production_model = mlflow.pyfunc.load_model(
    model_uri="models:/fraud_detection_model/Production"
)

# 5. Rollback se necessário
client.transition_model_version_stage(
    name="fraud_detection_model",
    version="3",  # versão anterior
    stage="Production"
)`,
        exercises: [
          "Implementa um model registry com MLflow",
          "Define estratégia de versionamento semântico",
          "Cria pipeline de promoção automática de modelos",
          "Implementa sistema de aprovação com 2-step review",
          "Configura alertas para mudanças em Production",
        ],
      },
    },
    5: {
      title: "CI/CD para ML",
      description: "Automatiza testing, validação e deployment de modelos com pipelines CI/CD adaptados para ML.",
      duration: "1.5h",
      lessons: [
        { id: 1, title: "CI/CD tradicional vs ML", type: "video", duration: "20min", completed: false, videoUrl: introVideo },
        { id: 2, title: "Testes para modelos ML", type: "reading", duration: "25min", completed: false, videoUrl: introVideo },
        { id: 3, title: "Deployment strategies", type: "video", duration: "20min", completed: false, videoUrl: introVideo },
        { id: 4, title: "GitOps para ML", type: "reading", duration: "15min", completed: false, videoUrl: introVideo },
        { id: 5, title: "Canary deployments", type: "video", duration: "20min", completed: false, videoUrl: introVideo },
      ],
      content: {
        overview: "Domina CI/CD para machine learning com testes automatizados, deployment strategies e GitOps.",
        videoUrl: "https://example.com/video",
        keyPoints: [
          "Diferenças entre CI/CD tradicional e ML",
          "Tipos de testes: unit, integration, model validation",
          "Data testing e drift detection",
          "Deployment strategies: blue-green, canary, shadow",
          "GitOps: Git como single source of truth",
          "Rollback automático baseado em métricas",
        ],
        codeSnippet: `# Exemplo: CI/CD Pipeline com GitHub Actions
# .github/workflows/ml-pipeline.yml

name: ML Model CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install pytest pytest-cov
      
      - name: Run unit tests
        run: pytest tests/unit --cov
      
      - name: Data validation tests
        run: python tests/validate_data.py
      
      - name: Model performance tests
        run: |
          python train.py
          python tests/test_model_performance.py

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to staging
        run: |
          # Deploy modelo para ambiente de staging
          python scripts/deploy.py --env staging
      
      - name: Integration tests
        run: python tests/integration_tests.py
      
      - name: Performance monitoring
        run: python scripts/monitor_staging.py --duration 3600

  deploy-production:
    needs: deploy-staging
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Canary deployment
        run: |
          # Deploy com 10% de tráfego
          python scripts/deploy.py --env production --strategy canary --traffic 10
      
      - name: Monitor canary metrics
        run: python scripts/monitor_canary.py --threshold 0.95
      
      - name: Full rollout
        run: python scripts/deploy.py --env production --traffic 100`,
        exercises: [
          "Cria pipeline CI/CD para modelo ML no GitHub Actions",
          "Implementa testes automatizados (unit, integration, model)",
          "Configura canary deployment com rollback automático",
          "Implementa GitOps workflow com ArgoCD",
          "Adiciona gates de aprovação baseados em métricas",
        ],
      },
    },
    6: {
      title: "Monitoring & Observability",
      description: "Monitoriza modelos em produção com métricas, alertas e deteção de drift para garantir performance contínua.",
      duration: "1.5h",
      lessons: [
        { id: 1, title: "Métricas de produção", type: "video", duration: "20min", completed: false, videoUrl: introVideo },
        { id: 2, title: "Data drift detection", type: "reading", duration: "25min", completed: false, videoUrl: introVideo },
        { id: 3, title: "Concept drift", type: "video", duration: "15min", completed: false, videoUrl: introVideo },
        { id: 4, title: "Alerting e incident response", type: "reading", duration: "20min", completed: false, videoUrl: introVideo },
        { id: 5, title: "Observability stack", type: "video", duration: "20min", completed: false, videoUrl: introVideo },
      ],
      content: {
        overview: "Aprende a monitorizar modelos ML em produção com deteção de drift, alertas inteligentes e observability completa.",
        videoUrl: "https://example.com/video",
        keyPoints: [
          "Métricas de negócio vs métricas técnicas",
          "Data drift: mudanças na distribuição dos dados",
          "Concept drift: mudanças na relação X → Y",
          "Prediction drift: mudanças nas previsões do modelo",
          "Alerting inteligente com thresholds dinâmicos",
          "Observability: logs, metrics, traces",
          "Retraining triggers automáticos",
        ],
        codeSnippet: `# Exemplo: Monitoring com Evidently e Prometheus
from evidently.report import Report
from evidently.metric_preset import DataDriftPreset, DataQualityPreset
from prometheus_client import Gauge, Counter, start_http_server
import pandas as pd

# Métricas Prometheus
prediction_latency = Gauge('model_prediction_latency_seconds', 'Latência das previsões')
prediction_counter = Counter('model_predictions_total', 'Total de previsões')
data_drift_score = Gauge('model_data_drift_score', 'Score de data drift')
accuracy_gauge = Gauge('model_accuracy', 'Accuracy em produção')

# Dados de referência (training data)
reference_data = pd.read_csv('training_data.csv')

# Monitorização contínua
def monitor_predictions(current_data):
    """Monitoriza previsões e deteta drift"""
    
    # 1. Criar relatório de drift
    report = Report(metrics=[
        DataDriftPreset(),
        DataQualityPreset(),
    ])
    
    report.run(
        reference_data=reference_data,
        current_data=current_data
    )
    
    # 2. Extrair métricas
    drift_results = report.as_dict()
    dataset_drift = drift_results['metrics'][0]['result']['dataset_drift']
    drift_share = drift_results['metrics'][0]['result']['share_of_drifted_columns']
    
    # 3. Atualizar métricas Prometheus
    data_drift_score.set(drift_share)
    
    # 4. Alertar se drift detetado
    if dataset_drift:
        print(f"⚠️ DATA DRIFT DETETADO! {drift_share*100:.1f}% das features com drift")
        trigger_retraining_pipeline()
    
    # 5. Calcular accuracy em produção (se labels disponíveis)
    if 'actual_label' in current_data.columns:
        accuracy = (current_data['prediction'] == current_data['actual_label']).mean()
        accuracy_gauge.set(accuracy)
        
        if accuracy < 0.85:  # Threshold
            print(f"⚠️ ACCURACY BAIXA: {accuracy:.3f}")
            send_alert_to_slack(f"Modelo com accuracy {accuracy:.3f}")

# Iniciar servidor Prometheus
start_http_server(8000)

# Loop de monitorização
while True:
    current_batch = get_latest_predictions()
    monitor_predictions(current_batch)
    time.sleep(3600)  # Verificar a cada hora`,
        exercises: [
          "Implementa dashboard de monitorização com Grafana",
          "Configura deteção de data drift e concept drift",
          "Cria sistema de alertas baseado em thresholds",
          "Implementa retraining automático quando drift detetado",
          "Configura observability stack (Prometheus + Grafana + Loki)",
          "Define SLIs e SLOs para modelos ML",
        ],
      },
    },
  },
};

export default function AcademyModule() {
  const { trailId, moduleId } = useParams();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  
  const module = moduleData[trailId as keyof typeof moduleData]?.[Number(moduleId) as keyof typeof moduleData["mlops-fundamentals"]];
  const totalModules = 6; // Total de módulos no curso

  useEffect(() => {
    // Carregar progresso do localStorage
    const savedProgress = localStorage.getItem(`module_${trailId}_${moduleId}`);
    if (savedProgress) {
      setCompletedLessons(JSON.parse(savedProgress));
    } else {
      // Reset se não houver progresso salvo (novo módulo)
      setCompletedLessons([]);
    }
    // Reset lição atual ao mudar de módulo
    setCurrentLesson(0);
  }, [trailId, moduleId]);

  useEffect(() => {
    // Salvar progresso
    if (completedLessons.length > 0) {
      localStorage.setItem(`module_${trailId}_${moduleId}`, JSON.stringify(completedLessons));
    }
  }, [completedLessons, trailId, moduleId]);

  const markLessonComplete = (lessonIndex: number) => {
    if (!completedLessons.includes(lessonIndex)) {
      setCompletedLessons(prev => [...prev, lessonIndex]);
      toast.success("Lição concluída!");
      
      // Se todas as lições completadas, marcar módulo como completo
      if (completedLessons.length + 1 === module.lessons.length) {
        markModuleComplete(trailId as string, moduleId as string, totalModules);
        toast.success("🎉 Módulo concluído!");
      }
    }
  };

  const goToNextLesson = () => {
    // Marcar lição atual como completa
    markLessonComplete(currentLesson);
    
    // Avançar para próxima lição se não for a última
    if (currentLesson < module.lessons.length - 1) {
      setCurrentLesson(prev => prev + 1);
    }
    // Se for a última lição, apenas marca como completa (o botão mudará automaticamente)
  };

  const goToNextModule = () => {
    // Garantir que a última lição está marcada como completa antes de avançar
    if (!completedLessons.includes(currentLesson)) {
      markLessonComplete(currentLesson);
    }
    
    const nextModule = Number(moduleId) + 1;
    if (nextModule <= totalModules) {
      navigate(`/academy/trail/${trailId}/module/${nextModule}`);
      window.scrollTo(0, 0);
    } else {
      // Curso completo - voltar para página do curso
      navigate(`/academy/trail/${trailId}`);
      toast.success("🎓 Parabéns! Completaste o curso!");
    }
  };

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

  const progress = (completedLessons.length / module.lessons.length) * 100;
  const allLessonsCompleted = completedLessons.length === module.lessons.length;
  const isLastModule = Number(moduleId) === totalModules;
  
  // Verificar se o curso inteiro está completo
  const trailProgress = getSpecificTrailProgress(trailId as string);
  const isCourseComplete = trailProgress?.completedModules.length === totalModules;

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
                  {module.lessons.map((lesson, index) => {
                    const isCompleted = completedLessons.includes(index);
                    return (
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
                        {isCompleted ? (
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
                  )})}
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
                    <Badge variant={completedLessons.includes(currentLesson) ? "default" : "outline"}>
                      {completedLessons.includes(currentLesson) ? "Concluída" : "Em progresso"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Video/Reading Area */}
                  {module.lessons[currentLesson].type === "video" ? (
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
                      <video 
                        key={currentLesson}
                        controls 
                        className="w-full h-full"
                        poster=""
                      >
                        <source src={module.lessons[currentLesson].videoUrl} type="video/mp4" />
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
                
                {/* Se todas as lições completas, mostrar botão para próximo módulo */}
                {allLessonsCompleted ? (
                  <Button 
                    className="bg-academy hover:bg-academy/80 text-academy-foreground"
                    onClick={goToNextModule}
                  >
                    {isLastModule ? (isCourseComplete ? "Voltar ao Curso" : "Concluir Curso") : "Próximo Módulo"}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  /* Botão para marcar lição como completa e avançar */
                  <Button 
                    className="bg-academy hover:bg-academy/80 text-academy-foreground"
                    onClick={goToNextLesson}
                  >
                    {currentLesson === module.lessons.length - 1 ? "Concluir Módulo" : "Marcar como Completa"}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
