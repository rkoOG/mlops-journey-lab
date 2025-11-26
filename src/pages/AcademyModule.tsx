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
  ExternalLink,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import introVideo from "@/assets/mlops-intro-video.mp4";
import { markModuleComplete, getSpecificTrailProgress } from "@/lib/storage";
import { toast } from "sonner";

const moduleData = {
  // 🔹 Mantém aqui EXACTAMENTE o que já tinhas para mlops-fundamentals
  "mlops-fundamentals": {
    1: {
      title: "Introdução ao MLOps",
      description:
        "Compreende os fundamentos de MLOps e porque é essencial para projetos de ML em produção.",
      duration: "1h",
      lessons: [
        {
          id: 1,
          title: "O que é MLOps?",
          type: "video",
          duration: "10min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Ciclo de vida de ML",
          type: "reading",
          duration: "15min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Desafios em produção",
          type: "video",
          duration: "12min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Ferramentas essenciais",
          type: "reading",
          duration: "18min",
          completed: false,
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Neste módulo vais aprender os conceitos fundamentais de MLOps, incluindo o ciclo de vida completo de um modelo de machine learning em produção.",
        videoUrl: "https://example.com/video",
        keyPoints: [
          "Definição e importância de MLOps",
          "Diferenças entre ML tradicional e MLOps",
          "Componentes principais de um sistema MLOps",
          "Ciclo de vida: desenvolvimento → deployment → monitorização",
        ],
        exercises: [
          "Identifica os componentes principais de um pipeline MLOps",
          "Descreve 3 desafios de modelos ML em produção",
          "Lista ferramentas open-source para cada etapa do ciclo",
        ],
      },
    },
    2: {
      title: "Data Ingestion & Validation",
      description:
        "Aprende a construir pipelines de ingestão de dados robustos e implementar validação automática.",
      duration: "1.5h",
      lessons: [
        {
          id: 1,
          title: "Arquiteturas de ingestão",
          type: "video",
          duration: "15min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Streaming vs Batch",
          type: "reading",
          duration: "20min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Data validation com Great Expectations",
          type: "video",
          duration: "25min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Schema evolution",
          type: "reading",
          duration: "15min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 5,
          title: "Data quality monitoring",
          type: "video",
          duration: "15min",
          completed: false,
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Neste módulo vais dominar técnicas de ingestão e validação de dados para garantir qualidade e consistência nos teus pipelines ML.",
        videoUrl: "https://example.com/video",
        keyPoints: [
          "Padrões de arquitetura: batch, streaming, micro-batch",
          "Validação de schema e tipos de dados",
          "Data quality checks automatizados",
          "Deteção de anomalias e drift nos dados",
          "Integração com ferramentas como Great Expectations",
        ],
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
      description:
        "Constrói pipelines de treino escaláveis com experiment tracking e hyperparameter tuning.",
      duration: "2h",
      lessons: [
        {
          id: 1,
          title: "Pipeline orchestration",
          type: "video",
          duration: "20min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Feature engineering",
          type: "reading",
          duration: "25min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Hyperparameter tuning distribuído",
          type: "video",
          duration: "25min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Experiment tracking com MLflow",
          type: "reading",
          duration: "20min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 5,
          title: "Model artifacts",
          type: "video",
          duration: "15min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 6,
          title: "Reprodutibilidade",
          type: "reading",
          duration: "15min",
          completed: false,
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Aprende a construir pipelines de treino profissionais com orchestration, tracking e reprodutibilidade garantida.",
        videoUrl: "https://example.com/video",
        keyPoints: [
          "Orchestração com Airflow, Kubeflow ou Prefect",
          "Feature stores para reutilização de features",
          "Distributed training e hyperparameter optimization",
          "Experiment tracking e comparação de modelos",
          "Versionamento de dados, código e modelos",
          "Garantir reprodutibilidade total",
        ],
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
      description:
        "Gestão profissional de modelos com registry, versionamento semântico e lifecycle management.",
      duration: "1.5h",
      lessons: [
        {
          id: 1,
          title: "Model Registry: conceitos",
          type: "video",
          duration: "20min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Versionamento semântico",
          type: "reading",
          duration: "25min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Model lifecycle stages",
          type: "video",
          duration: "25min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Gestão de metadados",
          type: "reading",
          duration: "20min",
          completed: false,
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Aprende a gerir modelos de forma profissional com registry centralizado, versionamento e tracking de lifecycle.",
        videoUrl: "https://example.com/video",
        keyPoints: [
          "Model Registry: repositório centralizado de modelos",
          "Versionamento semântico (major.minor.patch)",
          "Stages: Staging, Production, Archived",
          "Metadata tracking: métricas, dependencies, datasets",
          "Promoção automática de modelos baseada em métricas",
          "Rollback e auditoria de mudanças",
        ],
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
      description:
        "Automatiza testing, validação e deployment de modelos com pipelines CI/CD adaptados para ML.",
      duration: "1.5h",
      lessons: [
        {
          id: 1,
          title: "CI/CD tradicional vs ML",
          type: "video",
          duration: "20min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Testes para modelos ML",
          type: "reading",
          duration: "25min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Deployment strategies",
          type: "video",
          duration: "20min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "GitOps para ML",
          type: "reading",
          duration: "15min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 5,
          title: "Canary deployments",
          type: "video",
          duration: "20min",
          completed: false,
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Domina CI/CD para machine learning com testes automatizados, deployment strategies e GitOps.",
        videoUrl: "https://example.com/video",
        keyPoints: [
          "Diferenças entre CI/CD tradicional e ML",
          "Tipos de testes: unit, integration, model validation",
          "Data testing e drift detection",
          "Deployment strategies: blue-green, canary, shadow",
          "GitOps: Git como single source of truth",
          "Rollback automático baseado em métricas",
        ],
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
      description:
        "Monitoriza modelos em produção com métricas, alertas e deteção de drift para garantir performance contínua.",
      duration: "1.5h",
      lessons: [
        {
          id: 1,
          title: "Métricas de produção",
          type: "video",
          duration: "20min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Data drift detection",
          type: "reading",
          duration: "25min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Concept drift",
          type: "video",
          duration: "15min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Alerting e incident response",
          type: "reading",
          duration: "20min",
          completed: false,
          videoUrl: introVideo,
        },
        {
          id: 5,
          title: "Observability stack",
          type: "video",
          duration: "20min",
          completed: false,
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Aprende a monitorizar modelos ML em produção com deteção de drift, alertas inteligentes e observability completa.",
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

  // 🔹 CICD-ML
  "cicd-ml": {
    1: {
      title: "Fundamentos de CI/CD",
      description: "Conceitos essenciais de CI/CD aplicados a projetos ML.",
      duration: "1h",
      lessons: [
        {
          id: 1,
          title: "O que é CI/CD?",
          type: "video",
          duration: "10min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Integração Contínua (CI)",
          type: "reading",
          duration: "15min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Deployment Contínuo (CD)",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "CI/CD em ML vs tradicional",
          type: "reading",
          duration: "15min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Neste módulo vais entender os conceitos base de CI/CD e como se adaptam ao contexto de machine learning.",
        keyPoints: [
          "Definição de CI e CD",
          "Benefícios de automatizar o ciclo de entrega",
          "Desafios específicos de ML em CI/CD",
        ],
        exercises: [
          "Desenha um pipeline simples de CI/CD para uma API",
          "Lista 3 diferenças entre CI/CD tradicional e CI/CD para ML",
        ],
      },
    },
    2: {
      title: "Testing de Modelos ML",
      description: "Como testar código, dados e modelos em pipelines ML.",
      duration: "1.5h",
      lessons: [
        {
          id: 1,
          title: "Tipos de testes em ML",
          type: "video",
          duration: "15min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Testes de dados",
          type: "reading",
          duration: "25min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Testes de modelos",
          type: "video",
          duration: "25min",
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Testes de performance",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 5,
          title: "Integração de testes em CI",
          type: "video",
          duration: "15min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Aprende a garantir qualidade em todas as camadas: dados, código e modelos.",
        keyPoints: [
          "Unit tests para código de ML",
          "Testes de integridade e schema de dados",
          "Testes de performance mínima de modelos",
        ],
        exercises: [
          "Define 5 testes unitários para uma função de feature engineering",
          "Cria critérios de aprovação para um modelo (accuracy mínima, etc.)",
        ],
      },
    },
    3: {
      title: "Continuous Training",
      description: "Implementa re-treino automatizado de modelos ML.",
      duration: "1.5h",
      lessons: [
        {
          id: 1,
          title: "O que é Continuous Training",
          type: "video",
          duration: "15min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Triggers de re-treino",
          type: "reading",
          duration: "25min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Orquestração de CT",
          type: "video",
          duration: "25min",
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Integração com CI/CD",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Aprende a ligar monitorização a re-treino automático de modelos.",
        keyPoints: [
          "Conceito de Continuous Training",
          "Re-treino baseado em tempo vs baseado em eventos",
          "Riscos de re-treino automático",
        ],
        exercises: [
          "Desenha um pipeline onde drift dispara re-treino automático",
          "Define regras de segurança para evitar re-treino excessivo",
        ],
      },
    },
    4: {
      title: "Deployment Strategies",
      description: "Blue-green, canary e shadow deployments para ML.",
      duration: "1h",
      lessons: [
        {
          id: 1,
          title: "Blue-Green deployments",
          type: "video",
          duration: "15min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Canary deployments",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Shadow deployments",
          type: "video",
          duration: "15min",
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Rollback e mitigação de risco",
          type: "reading",
          duration: "10min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Explora estratégias de deployment que reduzem o risco de colocar um modelo novo em produção.",
        keyPoints: [
          "Quando usar blue-green vs canary",
          "Como medir impacto num canary deployment",
          "Rollback rápido em caso de degradação",
        ],
        exercises: [
          "Escolhe uma estratégia para lançar um modelo de fraude bancária e justifica",
        ],
      },
    },
    5: {
      title: "Infrastructure as Code",
      description: "Define infra-estrutura para pipelines ML com IaC.",
      duration: "1h",
      lessons: [
        {
          id: 1,
          title: "Fundamentos de IaC",
          type: "video",
          duration: "15min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Componentes de infra ML",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Versionamento e ambientes",
          type: "video",
          duration: "25min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Percebe como descrever e versionar a infra-estrutura necessária para ML.",
        keyPoints: [
          "Benefícios de IaC em MLOps",
          "Separação de ambientes (dev, staging, prod)",
          "Reprodutibilidade através de código",
        ],
        exercises: [
          "Desenha a infra básica para servir um modelo em produção",
          "Lista recursos necessários (compute, storage, rede)",
        ],
      },
    },
  },

  // 🔹 Experiment Tracking
  "experiment-tracking": {
    1: {
      title: "Introdução ao Experiment Tracking",
      description: "Conceitos base de tracking de experiências em ML.",
      duration: "1h",
      lessons: [
        {
          id: 1,
          title: "Porquê trackear experiências?",
          type: "video",
          duration: "15min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "O que trackear (parâmetros, métricas, artefactos)",
          type: "reading",
          duration: "25min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Organização de experiências",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Introdução aos conceitos e benefícios de um sistema de experiment tracking.",
        keyPoints: [
          "Problemas sem tracking",
          "O que é um experimento em ML",
          "Tipos de informação que devem ser registados",
        ],
        exercises: [
          "Descreve um cenário onde a falta de tracking causou confusão",
          "Lista os campos mínimos para registar um experimento",
        ],
      },
    },
    2: {
      title: "MLflow em Profundidade",
      description: "Como usar MLflow para gerir experiências e modelos.",
      duration: "2h",
      lessons: [
        {
          id: 1,
          title: "MLflow Tracking",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Logging de parâmetros e métricas",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Logging de modelos e artefactos",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "MLflow UI",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 5,
          title: "Organização em experiments e runs",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 6,
          title: "Boas práticas com MLflow",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Neste módulo vais aprender a usar MLflow de forma prática para gerir experiências.",
        keyPoints: [
          "Componentes principais do MLflow",
          "Como integrar MLflow no código de treino",
          "Visualização e comparação de runs",
        ],
        exercises: [
          "Adiciona MLflow a um script de treino existente",
          "Cria pelo menos 5 runs diferentes e compara as métricas",
        ],
      },
    },
    3: {
      title: "Model Registry",
      description: "Registo, versionamento e promoção de modelos.",
      duration: "1h",
      lessons: [
        {
          id: 1,
          title: "Porquê usar um Model Registry",
          type: "video",
          duration: "15min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Versionamento de modelos",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Stages (Staging, Production, Archived)",
          type: "video",
          duration: "15min",
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Promoção e rollback de versões",
          type: "reading",
          duration: "10min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Este módulo foca-se na gestão de modelos ao longo do seu ciclo de vida.",
        keyPoints: [
          "Vantagens de ter um registry centralizado",
          "Diferença entre runs e registered models",
          "Fluxo de aprovação de modelos",
        ],
        exercises: [
          "Desenha um fluxo de aprovação para promover um modelo a production",
          "Define critérios para fazer rollback de uma versão",
        ],
      },
    },
    4: {
      title: "Versionamento de Datasets",
      description: "Como versionar dados usados em experiências ML.",
      duration: "1h",
      lessons: [
        {
          id: 1,
          title: "Porque versionar dados",
          type: "video",
          duration: "15min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Ferramentas (DVC, LakeFS, etc.)",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Ligação entre data versions e modelos",
          type: "video",
          duration: "15min",
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Reprodutibilidade completa",
          type: "reading",
          duration: "10min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Aprende a garantir que consegues sempre saber com que dados um modelo foi treinado.",
        keyPoints: [
          "Problemas de não versionar dados",
          "Estratégias de versionamento",
          "Ligação entre dataset, código e modelo",
        ],
        exercises: [
          "Desenha um esquema onde cada modelo aponta para uma versão de dados",
          "Explica como reproduzir um experimento antigo 6 meses depois",
        ],
      },
    },
  },

  // 🔹 Monitoring & Drift
  "monitoring-drift": {
    1: {
      title: "Fundamentos de Monitorização ML",
      description: "O que monitorizar num modelo em produção.",
      duration: "1.5h",
      lessons: [
        {
          id: 1,
          title: "Porquê monitorizar modelos?",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Métricas de negócio vs técnicas",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Sinais de degradação de performance",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Introdução a SLIs e SLOs",
          type: "reading",
          duration: "25min",
          videoUrl: introVideo,
        },
        {
          id: 5,
          title: "Stack típica de monitorização",
          type: "video",
          duration: "25min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Este módulo introduz os conceitos base de monitorização em ML.",
        keyPoints: [
          "Diferença entre métricas de modelo e métricas de negócio",
          "Exemplos de métricas para classificação e regressão",
          "Como definir SLIs e SLOs",
        ],
        exercises: [
          "Define 3 métricas técnicas e 3 métricas de negócio para um modelo real",
          "Escreve um SLO para tempo de resposta de inferência",
        ],
      },
    },
    2: {
      title: "Data Drift Detection",
      description: "Deteção de alterações na distribuição dos dados.",
      duration: "2h",
      lessons: [
        {
          id: 1,
          title: "O que é data drift",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Tipos de drift",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Métricas e testes estatísticos",
          type: "video",
          duration: "25min",
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Ferramentas para drift detection",
          type: "reading",
          duration: "25min",
          videoUrl: introVideo,
        },
        {
          id: 5,
          title: "Integração com pipelines",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 6,
          title: "Alertas baseados em drift",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Aprende a detetar quando os dados em produção deixam de parecer-se com os dados de treino.",
        keyPoints: [
          "Diferença entre data drift, concept drift e prediction drift",
          "Exemplos de métricas de drift (PSI, KS test, etc.)",
          "Quando agir sobre um alerta de drift",
        ],
        exercises: [
          "Dá um exemplo real onde data drift pode ocorrer (domínio à tua escolha)",
          "Define um plano de ação quando é detetado drift severo",
        ],
      },
    },
    3: {
      title: "Model Performance Monitoring",
      description: "Monitorização contínua da performance do modelo.",
      duration: "1.5h",
      lessons: [
        {
          id: 1,
          title: "Recolha de labels em produção",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Cálculo de métricas em janelas de tempo",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Degradação gradual vs súbita",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Alertas de performance baixa",
          type: "reading",
          duration: "25min",
          videoUrl: introVideo,
        },
        {
          id: 5,
          title: "Ligações com re-treino",
          type: "video",
          duration: "25min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Monitora continuamente a performance real do modelo em produção.",
        keyPoints: [
          "Desafios quando labels chegam atrasadas",
          "Como definir janelas de análise (diária, semanal...)",
          "Relação entre performance e negócio",
        ],
        exercises: [
          "Descreve como avaliarias um modelo de churn 1 mês após deployment",
          "Define thresholds de alerta para uma métrica de F1-score",
        ],
      },
    },
    4: {
      title: "Alerting & Incident Response",
      description: "Como reagir quando algo corre mal com o modelo.",
      duration: "1h",
      lessons: [
        {
          id: 1,
          title: "Desenho de alertas eficazes",
          type: "video",
          duration: "15min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Runbooks e playbooks",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Gestão de incidentes",
          type: "video",
          duration: "15min",
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Post-mortems e melhoria contínua",
          type: "reading",
          duration: "10min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Aprende a preparar-te para incidentes em produção e a responder com calma.",
        keyPoints: [
          "Características de um bom alerta",
          "O que é um runbook",
          "Como fazer um post-mortem produtivo",
        ],
        exercises: [
          "Escreve um mini runbook para quando um modelo começa a falhar",
          "Descreve um exemplo de incidente e as lições aprendidas",
        ],
      },
    },
    5: {
      title: "Observability em ML Systems",
      description: "Observabilidade fim-a-fim em sistemas de ML.",
      duration: "1h",
      lessons: [
        {
          id: 1,
          title: "Logs, métricas e traces",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Stack de observability (Prometheus, Grafana, etc.)",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Correlacionar problemas",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Uma visão integrada de tudo o que está a acontecer com o teu sistema de ML.",
        keyPoints: [
          "Diferença entre logging, metrics e tracing",
          "Exemplos de dashboards úteis",
          "Como diagnosticar problemas complexos",
        ],
        exercises: [
          "Desenha um dashboard ideal para um serviço de scoring em tempo real",
          "Lista 5 métricas técnicas que colocarias num painel de observability",
        ],
      },
    },
  },

  // 🔹 Chatbots & LLM Ops
  "chatbots-llm": {
    1: {
      title: "Introdução a LLMs",
      description:
        "Fundamentos de Large Language Models e aplicações em chatbots.",
      duration: "1.5h",
      lessons: [
        {
          id: 1,
          title: "O que é um LLM",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Arquitetura base (Transformers)",
          type: "reading",
          duration: "25min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Casos de uso típicos",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Limitações e riscos",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 5,
          title: "Visão geral de LLM Ops",
          type: "video",
          duration: "15min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Explora os conceitos essenciais por trás de LLMs e como são usados em chatbots.",
        keyPoints: [
          "O que diferencia LLMs de modelos clássicos de NLP",
          "Forças e fraquezas de LLMs",
          "Riscos de hallucinations e viés",
        ],
        exercises: [
          "Lista 3 casos de uso onde LLMs fazem sentido",
          "Lista 3 casos de uso onde NÃO fazem sentido",
        ],
      },
    },
    2: {
      title: "Prompt Engineering",
      description: "Como desenhar prompts eficazes para LLMs.",
      duration: "2h",
      lessons: [
        {
          id: 1,
          title: "Prompting básico",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Estratégias (few-shot, chain-of-thought, etc.)",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Controlar estilo e persona",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Evitar respostas perigosas",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 5,
          title: "Testes A/B de prompts",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 6,
          title: "Documentar e versionar prompts",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Aprende técnicas práticas para tirar o máximo partido de LLMs através de prompts bem desenhados.",
        keyPoints: [
          "Boas práticas de escrita de prompts",
          "Diferença entre zero-shot, one-shot e few-shot",
          "Importância de exemplos concretos",
        ],
        exercises: [
          "Escreve dois prompts diferentes para o mesmo objetivo e compara respostas",
          "Cria um template de prompt reutilizável para um caso de uso",
        ],
      },
    },
    3: {
      title: "LangChain & Frameworks",
      description: "Uso de LangChain e outros frameworks para orquestrar LLMs.",
      duration: "2h",
      lessons: [
        {
          id: 1,
          title: "Introdução ao LangChain",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Chains e agents",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Memória em chatbots",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Ferramentas (tools) e chamadas a APIs",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 5,
          title: "Integração com bases de dados",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 6,
          title: "Logging e tracing em LangChain",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 7,
          title: "Alternativas a LangChain",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Constrói pipelines mais complexos à volta de LLMs com frameworks modernas.",
        keyPoints: [
          "Componentes principais de LangChain",
          "Como combinar múltiplas chamadas de LLM",
          "Integração com fontes externas",
        ],
        exercises: [
          "Desenha um fluxo de um chatbot com memória e acesso a API externa",
          "Lista vantagens e desvantagens de usar um framework em vez de chamadas diretas à API",
        ],
      },
    },
    4: {
      title: "RAG Systems",
      description:
        "Retrieval-Augmented Generation para resposta com contexto externo.",
      duration: "2h",
      lessons: [
        {
          id: 1,
          title: "O que é RAG",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Ingestão e chunking de documentos",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Embeddings e similaridade",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Arquitetura de um sistema RAG",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 5,
          title: "Avaliação de qualidade em RAG",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 6,
          title: "Melhores práticas e pitfalls",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Aprende a combinar LLMs com dados externos para respostas mais fiáveis.",
        keyPoints: [
          "Diferença entre RAG e fine-tuning",
          "Desafios na construção de pipelines de retrieval",
          "Importância de dados bem preparados",
        ],
        exercises: [
          "Descreve um sistema RAG para FAQs de uma empresa",
          "Lista potenciais problemas de segurança num sistema destes",
        ],
      },
    },
    5: {
      title: "Vector Databases",
      description:
        "Bases de dados vetoriais para armazenamento e pesquisa semântica.",
      duration: "1h",
      lessons: [
        {
          id: 1,
          title: "Porquê usar bases de dados vetoriais",
          type: "video",
          duration: "15min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Conceitos base (embeddings, índices)",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Exemplos de ferramentas (Pinecone, Weaviate, etc.)",
          type: "video",
          duration: "15min",
          videoUrl: introVideo,
        },
        {
          id: 4,
          title: "Boas práticas de schema e queries",
          type: "reading",
          duration: "10min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Fundamentos de armazenamento vetorial para suportar RAG e buscas semânticas.",
        keyPoints: [
          "Como funcionam embeddings",
          "O que é um índice vetorial",
          "Trade-offs entre precisão e performance",
        ],
        exercises: [
          "Desenha o schema simples de uma collection de documentos",
          "Descreve uma query típica de similarity search",
        ],
      },
    },
    6: {
      title: "LLM Deployment",
      description: "Como colocar LLMs em produção de forma robusta.",
      duration: "1h",
      lessons: [
        {
          id: 1,
          title: "Arquiteturas de serving (API, serverless, etc.)",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Escalabilidade e latência",
          type: "reading",
          duration: "20min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Gestão de limites de taxa (rate limits)",
          type: "video",
          duration: "20min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview: "Considerações práticas para expor LLMs em produção.",
        keyPoints: [
          "Diferença entre self-hosted e API externa",
          "Técnicas de caching de respostas",
          "Estratégias para lidar com picos de tráfego",
        ],
        exercises: [
          "Desenha a arquitetura de um serviço que chama um LLM externo",
          "Lista medidas para reduzir latência percebida pelo utilizador",
        ],
      },
    },
    7: {
      title: "Monitoring & Cost Optimization",
      description:
        "Monitorizar qualidade e controlar custos em sistemas com LLMs.",
      duration: "0.5h",
      lessons: [
        {
          id: 1,
          title: "Métricas de qualidade para LLMs",
          type: "video",
          duration: "10min",
          videoUrl: introVideo,
        },
        {
          id: 2,
          title: "Monitorização de custos e uso",
          type: "reading",
          duration: "10min",
          videoUrl: introVideo,
        },
        {
          id: 3,
          title: "Estratégias de optimização",
          type: "video",
          duration: "10min",
          videoUrl: introVideo,
        },
      ],
      content: {
        overview:
          "Gere a longo prazo qualidade e custo dos teus sistemas com LLMs.",
        keyPoints: [
          "Tipos de métricas de qualidade (human eval, automáticas, etc.)",
          "Como controlar custos por utilizador",
          "Técnicas para reduzir chamadas desnecessárias",
        ],
        exercises: [
          "Define 3 métricas para avaliar um chatbot em produção",
          "Descreve medidas de controlo de custo num sistema de suporte ao cliente baseado em LLM",
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

  
  // Obter todos os módulos da trilha actual
  const currentTrailModules = (moduleData as any)?.[trailId as string];

  // Módulo actual
  const module = currentTrailModules?.[Number(moduleId)];

  // Número total de módulos desta trilha (pode ser 5, 6, 7, etc.)
  const totalModules = currentTrailModules
    ? Object.keys(currentTrailModules).length
    : 0;

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
      localStorage.setItem(
        `module_${trailId}_${moduleId}`,
        JSON.stringify(completedLessons)
      );
    }
  }, [completedLessons, trailId, moduleId]);

  // Garantir que, se todas as lições estiverem completas, o módulo fica marcado como concluído na trilha
  useEffect(() => {
    if (!module) return;

    if (
      completedLessons.length === module.lessons.length &&
      module.lessons.length > 0
    ) {
      markModuleComplete(trailId as string, moduleId as string, totalModules);
    }
  }, [completedLessons, module, trailId, moduleId, totalModules]);

  const markLessonComplete = (lessonIndex: number) => {
    if (!completedLessons.includes(lessonIndex)) {
      setCompletedLessons((prev) => [...prev, lessonIndex]);
      toast.success("Lição concluída!");

      // Se todas as lições completadas, marcar módulo como completo
      if (completedLessons.length + 1 === module.lessons.length) {
        markModuleComplete(trailId as string, moduleId as string, totalModules);
        toast.success("🎉 Módulo concluído!");
      }
    }
  };

  const goToNextLesson = () => {
    const isLastLesson = currentLesson === module.lessons.length - 1;

    // Tenta sempre marcar esta lição como completa
    markLessonComplete(currentLesson);

    if (!isLastLesson) {
      // Ainda há mais lições neste módulo → só avançar dentro do módulo
      setCurrentLesson((prev) => prev + 1);
    } else {
      // Última lição → garante que o módulo fica marcado como completo
      markModuleComplete(trailId as string, moduleId as string, totalModules);
      toast.success("🎉 Módulo concluído!");
      // E depois segue para próximo módulo / fim do curso
      goToNextModule();
    }
  };

  const goToNextModule = () => {
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
  const isCourseComplete =
    trailProgress?.completedModules.length === totalModules;

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
                  <Link to={`/academy/trail/${trailId}`}>
                    ← Voltar à trilha
                  </Link>
                </Button>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Módulo {moduleId}: {module.title}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {module.description}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline">{module.duration}</Badge>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {Math.round(progress)}%
                  </div>
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
                            ? "bg-academy/20 border border-academy"
                            : "hover:bg-muted"
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
                    );
                  })}
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>
                        {module.lessons[currentLesson].title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        {module.lessons[currentLesson].type === "video" ? (
                          <PlayCircle className="h-4 w-4" />
                        ) : (
                          <BookOpen className="h-4 w-4" />
                        )}
                        {module.lessons[currentLesson].duration}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        completedLessons.includes(currentLesson)
                          ? "default"
                          : "outline"
                      }
                    >
                      {completedLessons.includes(currentLesson)
                        ? "Concluída"
                        : "Em progresso"}
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
                        <source
                          src={module.lessons[currentLesson].videoUrl}
                          type="video/mp4"
                        />
                        O teu navegador não suporta vídeos.
                      </video>
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-6">
                      <div className="text-center">
                        <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Conteúdo de leitura
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">Visão Geral</TabsTrigger>

                  <TabsTrigger value="exercises">Exercícios</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sobre este módulo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        {module.content.overview}
                      </p>

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
                  onClick={() =>
                    setCurrentLesson((prev) => Math.max(0, prev - 1))
                  }
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
                    {isLastModule
                      ? isCourseComplete
                        ? "Voltar ao Curso"
                        : "Concluir Curso"
                      : "Próximo Módulo"}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  /* Botão para marcar lição como completa e avançar */
                  <Button
                    className="bg-academy hover:bg-academy/80 text-academy-foreground"
                    onClick={goToNextLesson}
                  >
                    {currentLesson === module.lessons.length - 1
                      ? "Concluir Módulo"
                      : "Marcar como Completa"}
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
