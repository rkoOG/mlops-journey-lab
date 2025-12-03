export type ReadingSlide = {
  title: string;
  source: string;
  url: string;
  excerpt: string;
  tag?: string;
  est?: string;
};

// Mapeia pelo título da lesson (type: "reading")
export const readingContent: Record<string, ReadingSlide[]> = {
  "Ciclo de vida de ML": [
    {
      title: "Ciclo completo de ML em produção",
      source: "Rules of ML (Google)",
      url: "https://developers.google.com/machine-learning/guides/rules-of-ml",
      excerpt:
        "Planeia o ciclo como um produto: dados, treino, validação, deploy, monitorização e re-treino. Cada etapa deve ter métricas e donos claros.",
      tag: "fundamentos",
      est: "5 min",
    },
    {
      title: "Design Patterns para ML",
      source: "ML Design Patterns (Lakshmanan et al.)",
      url: "https://www.oreilly.com/library/view/machine-learning-design/9781098115777/",
      excerpt:
        "Padrões como Pipeline, Feature Store e Drift Detection ajudam a estruturar o ciclo de vida e reduzir débito técnico em ML.",
      tag: "patterns",
      est: "4 min",
    },
  ],
  "Ferramentas essenciais": [
    {
      title: "Stack típica de MLOps",
      source: "Chip Huyen - Designing ML Systems",
      url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/",
      excerpt:
        "Versionamento (Git, DVC), orquestração (Airflow/Prefect), tracking (MLflow/W&B) e serving (KFServing, Bento) formam a espinha dorsal.",
      tag: "stack",
      est: "5 min",
    },
  ],
  "Streaming vs Batch": [
    {
      title: "Lambda/Kappa para ML",
      source: "Data Engineering on AWS (Housley)",
      url: "https://docs.aws.amazon.com/whitepapers/latest/building-data-lakes/designing-data-lakes.html",
      excerpt:
        "Escolhe batch para volumetria e custo; streaming para latência e frescura. Define SLOs de atraso e precisão para guiar a escolha.",
      tag: "arquitetura",
      est: "5 min",
    },
  ],
  "Schema evolution": [
    {
      title: "Evolução de schema com contratos",
      source: "TFX Data Validation",
      url: "https://www.tensorflow.org/tfx/data_validation/consuming_data",
      excerpt:
        "Define schema e contratos (tipos, intervalos, domínios). Compatibiliza breaking changes com versionamento e migração assistida.",
      tag: "qualidade",
      est: "4 min",
    },
  ],
  "Feature engineering": [
    {
      title: "Feature Stores em produção",
      source: "Feast Docs",
      url: "https://docs.feast.dev/",
      excerpt:
        "Separa ingestão e materialização online/offline para evitar training-serving skew. Usa TTL e entidades bem definidas.",
      tag: "feature-store",
      est: "6 min",
    },
  ],
  "Experiment tracking com MLflow": [
    {
      title: "Como organizar runs",
      source: "MLflow Tracking Guide",
      url: "https://mlflow.org/docs/latest/tracking.html",
      excerpt:
        "Regista parâmetros, métricas, artefactos e modelos. Define convenções de nomes e tags (dataset, versão de código, owner) para filtrar runs.",
      tag: "tracking",
      est: "5 min",
    },
  ],
  Reprodutibilidade: [
    {
      title: "Reproducibility checklist",
      source: "Weights & Biases Blog",
      url: "https://wandb.ai/site/articles/reproducible-ml",
      excerpt:
        "Fixar seeds não basta: versiona dados, código, ambiente e artefactos. Garante determinismo ou regista o ruído introduzido.",
      tag: "boas práticas",
      est: "4 min",
    },
  ],
  "Versionamento semântico": [
    {
      title: "SemVer aplicado a modelos",
      source: "Semantic Versioning 2.0.0",
      url: "https://semver.org/",
      excerpt:
        "Major para mudanças incompatíveis (schema/contrato), minor para novas features/inputs opcionais, patch para correções e bugfixes de performance.",
      tag: "governança",
      est: "3 min",
    },
  ],
  "Gestão de metadados": [
    {
      title: "Metadata & lineage",
      source: "MLflow Model Registry",
      url: "https://mlflow.org/docs/latest/model-registry.html",
      excerpt:
        "Regista origem (dataset, commit), métricas e estágio. Usa tags e descrições para auditar e reproduzir decisões de promoção.",
      tag: "auditoria",
      est: "4 min",
    },
  ],
  "Testes para modelos ML": [
    {
      title: "Testar código e dados",
      source: "Testing & Monitoring in ML (E. Yan)",
      url: "https://eugeneyan.com/writing/testing-ml/",
      excerpt:
        "Une testes de código, validação de dados (schema, ranges) e expectativas de performance. Automatiza em CI com dados sintéticos.",
      tag: "qualidade",
      est: "6 min",
    },
  ],
  "GitOps para ML": [
    {
      title: "GitOps para pipelines de ML",
      source: "Weaveworks GitOps Guide",
      url: "https://www.weave.works/technologies/gitops/",
      excerpt:
        "Git é a source of truth para infra e modelos. ArgoCD/Kargo sincronizam cluster e promovem versões de forma auditável.",
      tag: "operacional",
      est: "5 min",
    },
  ],
  "Data drift detection": [
    {
      title: "Detectar drift com PSI e KS",
      source: "EvidentlyAI Guides",
      url: "https://www.evidentlyai.com/",
      excerpt:
        "PSI compara distribuições de treino vs produção. KS testa diferenças em variáveis contínuas. Define limiares e janelas de tempo.",
      tag: "drift",
      est: "5 min",
    },
  ],
  "Alerting e incident response": [
    {
      title: "Runbooks para modelos",
      source: "SRE Workbook (adaptado para ML)",
      url: "https://sre.google/workbook/",
      excerpt:
        "Define sintomas, causas prováveis e ações rápidas (parar modelo, rollback, re-treino). Usa quem-on-call e SLOs de qualidade.",
      tag: "SRE",
      est: "4 min",
    },
  ],
  "Integração Contínua (CI)": [
    {
      title: "CI em ML: o que validar",
      source: "Practical MLOps (K. Arango)",
      url: "https://www.oreilly.com/library/view/practical-mlops/9781098103002/",
      excerpt:
        "Corre lint, testes unitários e checks de dados leves em cada PR. Para cargas pesadas, usa nightly ou PR labels específicas.",
      tag: "CI",
      est: "4 min",
    },
  ],
  "Canary deployments": [
    {
      title: "Canary para modelos",
      source: "Argo Rollouts Docs",
      url: "https://argoproj.github.io/argo-rollouts/",
      excerpt:
        "Divisão de tráfego gradual com métricas de guardrail (latência, erro, métrica de modelo). Automação de rollback com análise de métricas.",
      tag: "deploy",
      est: "5 min",
    },
  ],
  "Componentes de infra ML": [
    {
      title: "Infra como código para ML",
      source: "HashiCorp - Terraform Patterns",
      url: "https://developer.hashicorp.com/terraform",
      excerpt:
        "Modulariza compute, storage e rede. Usa workspaces/var files para ambientes. Versiona planos e aplica com revisões.",
      tag: "IaC",
      est: "4 min",
    },
  ],
  "Tipos de drift": [
    {
      title: "Data, concept e prediction drift",
      source: "ML Design Patterns",
      url: "https://www.oreilly.com/library/view/machine-learning-design/9781098115777/",
      excerpt:
        "Data drift: input muda; concept drift: relação X->Y muda; prediction drift: distribuição de saídas muda. Tratas cada um com sinais e limiares diferentes.",
      tag: "drift",
      est: "4 min",
    },
  ],
  "Alertas baseados em drift": [
    {
      title: "Alertas acionáveis",
      source: "EvidentlyAI Playbook",
      url: "https://www.evidentlyai.com/blog",
      excerpt:
        "Evita alertas barulhentos: consolida por janela, adiciona histerese e liga alertas a runbooks e owners claros.",
      tag: "operacional",
      est: "3 min",
    },
  ],
  "Arquitetura de um sistema RAG": [
    {
      title: "Pipeline RAG robusto",
      source: "LLM Patterns",
      url: "https://www.llmpatterns.com/",
      excerpt:
        "Ingestão → chunking → embeddings → store → retrieval → reranking → geração. Observabilidade e avaliações humanas/automáticas são partes centrais.",
      tag: "RAG",
      est: "5 min",
    },
  ],
  "Conceitos base (embeddings, índices)": [
    {
      title: "Como escolher o índice",
      source: "Pinecone Docs",
      url: "https://docs.pinecone.io/",
      excerpt:
        "Escolhe HNSW ou IVF para equilíbrio entre recall e latência. Ajusta tamanhos de cluster e replica para SLOs de leitura.",
      tag: "vetorial",
      est: "4 min",
    },
  ],
  "Escalabilidade e latência": [
    {
      title: "Serving de LLMs com caching",
      source: "BentoML + OpenLLM",
      url: "https://docs.bentoml.com/",
      excerpt:
        "Cache de prompts/respostas, batching e streaming reduzem latência e custo. Define timeouts e políticas de fallback.",
      tag: "serving",
      est: "4 min",
    },
  ],
  "Monitorização de custos e uso": [
    {
      title: "Custos em LLM Ops",
      source: "Arize AI - Cost Monitoring",
      url: "https://arize.com/blog",
      excerpt:
        "Acompanha custo por chamada e por utilizador. Usa sampling e limites diários, e desliga features caras fora do horário de pico.",
      tag: "custos",
      est: "3 min",
    },
  ],
  "Reproducibility": [
    {
      title: "Reproducible ML na prática",
      source: "Rules of ML (Google)",
      url: "https://developers.google.com/machine-learning/guides/rules-of-ml",
      excerpt:
        "Versiona dados, código, ambiente e artefactos. Guarda seeds, hashes e configs para repetir treinos com segurança.",
      tag: "repro",
      est: "4 min",
    },
  ],
  "Integração com CI/CD": [
    {
      title: "Ligar CT a CI/CD",
      source: "CD4ML (Martin Fowler)",
      url: "https://martinfowler.com/articles/cd4ml.html",
      excerpt:
        "Retraining disparado por drift ou tempo deve passar por validações de dados, testes de performance e promoção gradual.",
      tag: "cd4ml",
      est: "4 min",
    },
  ],
  "Triggers de re-treino": [
    {
      title: "Quando re-treinar modelos",
      source: "Continuous Training Playbook",
      url: "https://www.evidentlyai.com/blog/continuous-training",
      excerpt:
        "Combina triggers baseados em tempo, drift e performance. Evita loops excessivos com janelas mínimas e orçamentos de risco.",
      tag: "CT",
      est: "4 min",
    },
  ],
  "Ferramentas para drift detection": [
    {
      title: "Tooling para drift",
      source: "Evidently / WhyLogs",
      url: "https://www.evidentlyai.com/",
      excerpt:
        "Bibliotecas para perfis de dados, monitorização contínua e métricas como PSI/KS. Integra com dashboards e alertas.",
      tag: "drift",
      est: "4 min",
    },
  ],
  "Cálculo de métricas em janelas de tempo": [
    {
      title: "Métricas por janela",
      source: "Practical Monitoring (Baron Schwartz)",
      url: "https://www.oreilly.com/library/view/practical-monitoring/9781491957323/",
      excerpt:
        "Define janelas (diária, semanal) para suavizar ruído. Segmenta por cohort para entender queda de performance.",
      tag: "monitorização",
      est: "4 min",
    },
  ],
  "Alertas de performance baixa": [
    {
      title: "Alertas acionáveis de performance",
      source: "SRE for ML",
      url: "https://arize.com/blog",
      excerpt:
        "Usa guardrails com limiares e histerese. Combina com evidências (drift, latência) antes de acionar rollback.",
      tag: "alertas",
      est: "3 min",
    },
  ],
  "Rollback e mitigação de risco": [
    {
      title: "Rollbacks rápidos",
      source: "Argo Rollouts",
      url: "https://argoproj.github.io/argo-rollouts/",
      excerpt:
        "Promove com canário e métricas de guardrail. Se falhar, rollback automático para versão estável e notifica on-call.",
      tag: "deploy",
      est: "4 min",
    },
  ],
  "Stack de observability (Prometheus, Grafana, etc.)": [
    {
      title: "Observability stack para ML",
      source: "Grafana Observability",
      url: "https://grafana.com/solutions/observability/",
      excerpt:
        "Combina métricas (Prometheus), logs (Loki) e traces (Tempo). Dashboards para latência, erro, drift e custo.",
      tag: "observability",
      est: "5 min",
    },
  ],
  "Deteção de data drift": [
    {
      title: "Detectar drift em produção",
      source: "EvidentlyAI Guides",
      url: "https://www.evidentlyai.com/",
      excerpt:
        "Define janelas de comparação, escolhe métricas (PSI, JS, KS) e cria limiares por feature. Alerta só com histerese.",
      tag: "drift",
      est: "5 min",
    },
  ],
  "Métricas de negócio vs técnicas": [
    {
      title: "Ligar métricas de modelo ao negócio",
      source: "Google PAIR - ML Metrics",
      url: "https://ai.google/education",
      excerpt:
        "Traduz precisão/recall em KPIs de negócio (CAC, LTV, fraude evitada). Define SLIs/SLOs que misturam ambas.",
      tag: "métricas",
      est: "4 min",
    },
  ],
  "Introdução a SLIs e SLOs": [
    {
      title: "SLIs e SLOs para ML",
      source: "SRE Workbook",
      url: "https://sre.google/workbook/",
      excerpt:
        "Escolhe SLIs centrados no utilizador (latência, frescura de dados, qualidade mínima). SLOs guiam alertas e orçamentos de erro.",
      tag: "SRE",
      est: "4 min",
    },
  ],
  "Runbooks e playbooks": [
    {
      title: "Escrever playbooks acionáveis",
      source: "Incident Response Playbook",
      url: "https://sre.google/workbook/incident-response/",
      excerpt:
        "Lista sintomas, hipóteses e passos rápidos. Mantém-no curto; liga a owners e a comandos prontos.",
      tag: "operacional",
      est: "3 min",
    },
  ],
  "Post-mortems e melhoria contínua": [
    {
      title: "Postmortems sem culpa",
      source: "SRE Book",
      url: "https://sre.google/sre-book/postmortem/",
      excerpt:
        "Foca em causas sistémicas, ações preventivas e owners. Evita culpar indivíduos; documenta aprendizagens.",
      tag: "aprendizagem",
      est: "4 min",
    },
  ],
  "Testes de dados": [
    {
      title: "Validar dados continuamente",
      source: "TFX Data Validation",
      url: "https://www.tensorflow.org/tfx/data_validation",
      excerpt:
        "Schema, estatísticas e anomalias automáticas. Integra em CI com amostras e thresholds claros.",
      tag: "qualidade",
      est: "4 min",
    },
  ],
  "Testes de performance": [
    {
      title: "Performance mínima em ML",
      source: "Practical MLOps",
      url: "https://www.oreilly.com/library/view/practical-mlops/9781098103002/",
      excerpt:
        "Define métricas de aceitação (F1, AUC, latency). Usa datasets fixos e seeds para regressão controlada.",
      tag: "testes",
      est: "4 min",
    },
  ],
  "CI/CD em ML vs tradicional": [
    {
      title: "O que muda em ML",
      source: "Continuous Delivery for ML",
      url: "https://martinfowler.com/articles/cd4ml.html",
      excerpt:
        "Além de código, versiona dados e modelos. Pipelines incluem validação de dados e avaliações de performance.",
      tag: "cd4ml",
      est: "5 min",
    },
  ],
  "O que trackear (parâmetros, métricas, artefactos)": [
    {
      title: "Checklist de tracking",
      source: "MLflow Tracking",
      url: "https://mlflow.org/docs/latest/tracking.html",
      excerpt:
        "Parâmetros, métricas, artefactos, versão de código, dataset, ambiente. Use tags consistentes para filtrar.",
      tag: "tracking",
      est: "4 min",
    },
  ],
  "Logging de parâmetros e métricas": [
    {
      title: "Boas práticas de logging",
      source: "MLflow Guide",
      url: "https://mlflow.org/docs/latest/tracking.html#logging-data",
      excerpt:
        "Loga métricas agregadas e por passo; usa nested runs para múltiplos trials. Mantém nomes consistentes.",
      tag: "mlflow",
      est: "4 min",
    },
  ],
  "MLflow UI": [
    {
      title: "Navegar e comparar runs",
      source: "MLflow UI",
      url: "https://mlflow.org/docs/latest/tracking.html#viewing-runs",
      excerpt:
        "Filtros por tags e parâmetros, comparação de métricas e artefactos. Exporta grids para relatórios.",
      tag: "mlflow",
      est: "3 min",
    },
  ],
  "Boas práticas com MLflow": [
    {
      title: "Padronizar convenções",
      source: "Databricks MLflow Best Practices",
      url: "https://docs.databricks.com/en/mlflow/best-practices.html",
      excerpt:
        "Nomes de experimento por projeto, tags obrigatórias, regista seed e hash de dados. Automatiza limpeza de runs antigos.",
      tag: "boas práticas",
      est: "4 min",
    },
  ],
  "Versionamento de modelos": [
    {
      title: "Controlar versões em registry",
      source: "MLflow Model Registry",
      url: "https://mlflow.org/docs/latest/model-registry.html",
      excerpt:
        "Usa stages (Staging/Prod), comentários e tags. Promove apenas com artefactos e métricas anexadas.",
      tag: "registry",
      est: "4 min",
    },
  ],
  "Promoção e rollback de versões": [
    {
      title: "Fluxo de promoção",
      source: "CD4ML Playbook",
      url: "https://martinfowler.com/articles/cd4ml.html",
      excerpt:
        "Testes em Staging, canário, métricas de guardrail e rollback automático. Documenta motivos da promoção.",
      tag: "deploy",
      est: "4 min",
    },
  ],
  "Ferramentas (DVC, LakeFS, etc.)": [
    {
      title: "Versionar dados na prática",
      source: "DVC Guide",
      url: "https://dvc.org/doc",
      excerpt:
        "Datasets versionados como código. Usa remotos baratos (S3/GCS) e integra com CI para checar hashes.",
      tag: "dados",
      est: "4 min",
    },
  ],
  "Reprodutibilidade completa": [
    {
      title: "Linha de base reprodutível",
      source: "LakeFS Docs",
      url: "https://docs.lakefs.io/",
      excerpt:
        "Branches de dados, snapshots e commits permitem reproduzir um treino antigo. Amarra com hash de código e modelo.",
      tag: "repro",
      est: "4 min",
    },
  ],
  "Componentes infra ML": [
    {
      title: "Infra modular",
      source: "Terraform + ML",
      url: "https://developer.hashicorp.com/terraform",
      excerpt:
        "Módulos para rede, compute e storage. Outputs alimentam pipelines; ambientes isolados via workspaces.",
      tag: "IaC",
      est: "4 min",
    },
  ],
  "Types of drift": [
    {
      title: "Comparar drifts",
      source: "EvidentlyAI - Drift Types",
      url: "https://www.evidentlyai.com/blog",
      excerpt:
        "Data drift (inputs), concept drift (relação), prediction drift (saídas). Usa sinais distintos e respostas diferentes.",
      tag: "drift",
      est: "4 min",
    },
  ],
  "Alerts based on drift": [
    {
      title: "Alertas que importam",
      source: "SRE for ML",
      url: "https://arize.com/blog",
      excerpt:
        "Consolida alertas por janela, adiciona severidade e acopla runbooks. Evita fatiga de alertas.",
      tag: "alertas",
      est: "3 min",
    },
  ],
  "Arquitetura base (Transformers)": [
    {
      title: "Como funciona um Transformer",
      source: "The Annotated Transformer",
      url: "http://nlp.seas.harvard.edu/2018/04/03/attention.html",
      excerpt:
        "Self-attention, embeddings, positional encoding e camadas empilhadas. Base dos LLMs modernos.",
      tag: "LLM",
      est: "6 min",
    },
  ],
  "Limitações e riscos": [
    {
      title: "Riscos de LLMs",
      source: "NIST AI Risk Framework",
      url: "https://www.nist.gov/itl/ai-risk-management-framework",
      excerpt:
        "Hallucinations, bias, segurança e privacidade. Mitiga com guardrails, red-teaming e monitorização contínua.",
      tag: "riscos",
      est: "5 min",
    },
  ],
  "Estratégias (few-shot, chain-of-thought, etc.)": [
    {
      title: "Prompting avançado",
      source: "OpenAI Prompt Guide",
      url: "https://platform.openai.com/docs/guides/prompting",
      excerpt:
        "Few-shot, CoT e decomposição de tarefas aumentam fiabilidade. Dá exemplos claros e instruções explícitas.",
      tag: "prompts",
      est: "4 min",
    },
  ],
  "Evitar respostas perigosas": [
    {
      title: "Guardrails básicos",
      source: "Anthropic Prompting",
      url: "https://www.anthropic.com/index/prompting-guide",
      excerpt:
        "Estabelece políticas, filtros e contextos seguros. Usa validação pós-geração e listas de bloqueio.",
      tag: "segurança",
      est: "4 min",
    },
  ],
  "Documentar e versionar prompts": [
    {
      title: "Prompts como artefactos",
      source: "PromptOps",
      url: "https://www.promptops.dev/",
      excerpt:
        "Versiona prompts com Git, armazena exemplos e métricas de avaliação. Usa IDs e changelog.",
      tag: "governança",
      est: "3 min",
    },
  ],
  "Chains e agents": [
    {
      title: "Orquestração com LangChain",
      source: "LangChain Docs",
      url: "https://python.langchain.com/docs/get_started/introduction",
      excerpt:
        "Chains compõem passos; agents decidem qual ferramenta usar. Define memória e contexto para consistência.",
      tag: "frameworks",
      est: "4 min",
    },
  ],
  "Ferramentas (tools) e chamadas a APIs": [
    {
      title: "Tool use seguro",
      source: "LangChain Tools",
      url: "https://python.langchain.com/docs/modules/agents/tools",
      excerpt:
        "Define schema de inputs, valida saídas e controla tempo de execução. Loga chamadas para auditoria.",
      tag: "tools",
      est: "3 min",
    },
  ],
  "Logging e tracing em LangChain": [
    {
      title: "Observability para LLM",
      source: "LangSmith",
      url: "https://docs.smith.langchain.com/",
      excerpt:
        "Regista spans de cada chamada, tokens e latência. Liga a avaliações offline/online.",
      tag: "observability",
      est: "4 min",
    },
  ],
  "Ingestão e chunking de documentos": [
    {
      title: "Chunking eficaz",
      source: "Pinecone - Chunking Strategies",
      url: "https://www.pinecone.io/learn/chunking-strategies/",
      excerpt:
        "Ajusta tamanho de chunk e sobreposição. Inclui títulos e hierarquia para melhorar relevância.",
      tag: "RAG",
      est: "4 min",
    },
  ],
  "Melhores práticas e pitfalls": [
    {
      title: "RAG sem dor",
      source: "LLM Patterns",
      url: "https://www.llmpatterns.com/",
      excerpt:
        "Cuida da qualidade do corpus, avalia retrieval, re-ranking e guarda logs para debug. Evita referências quebradas.",
      tag: "RAG",
      est: "4 min",
    },
  ],
  "Boas práticas de schema e queries": [
    {
      title: "Schema em bases vetoriais",
      source: "Weaviate Docs",
      url: "https://weaviate.io/developers",
      excerpt:
        "Define classes claras, campos textuais e vetores separados. Indexa metadados para filtros híbridos.",
      tag: "vetorial",
      est: "4 min",
    },
  ],
};
