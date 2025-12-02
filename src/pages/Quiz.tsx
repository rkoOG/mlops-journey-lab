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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Trophy, History, Award } from "lucide-react";
import {
  saveQuizResult,
  getBestQuizScore,
  getQuizResults,
} from "@/lib/storage";
import { toast } from "sonner";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
interface AnswerRecord {
  question: string;
  options: string[];
  selectedAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  explanation: string;
}

// Quantas perguntas queres por tentativa
const QUESTIONS_PER_QUIZ = 15;

// Baralha as opções de uma pergunta e actualiza o índice da resposta correcta
function shuffleQuestionOptions(question: Question): Question {
  const indices = question.options.map((_, i) => i);

  // baralhar índices
  const shuffledIndices = [...indices].sort(() => Math.random() - 0.5);

  // criar novo array de opções
  const newOptions = shuffledIndices.map((i) => question.options[i]);

  // encontrar novo índice da resposta correcta
  const newCorrectIndex = shuffledIndices.indexOf(question.correctAnswer);

  return {
    ...question,
    options: newOptions,
    correctAnswer: newCorrectIndex,
  };
}

// Escolhe N perguntas aleatórias do banco e baralha as opções de cada uma
function pickRandomQuestions(all: Question[], n: number): Question[] {
  const shuffledQuestions = [...all].sort(() => Math.random() - 0.5);
  const selected = shuffledQuestions.slice(0, Math.min(n, all.length));

  // para cada pergunta escolhida, baralhar as opções
  return selected.map((q) => shuffleQuestionOptions(q));
}

/**
 * Banco de perguntas MLOps / LLMOps
 * Todas em PT-PT, com termos técnicos em inglês.
 */
const questionBank: Question[] = [
  // ----------------------------------------------------
  // FUNDAMENTOS DE MLOps (nível iniciante)
  // ----------------------------------------------------
  {
    question: "O que é MLOps?",
    options: [
      "Uma biblioteca específica de Machine Learning",
      "Um conjunto de práticas para operacionalizar modelos de ML em produção",
      "Um tipo de rede neuronal",
      "Um método de visualização de dados",
    ],
    correctAnswer: 1,
    explanation:
      "MLOps é o conjunto de práticas que combina ML, DevOps e engenharia de dados para levar modelos para produção e os manter operacionais.",
  },
  {
    question:
      "Qual destas fases faz parte do ciclo de vida de um modelo de ML?",
    options: [
      "Renderização de gráficos",
      "Ingestão de dados",
      "Desenho de logótipos",
      "Criação de apresentações",
    ],
    correctAnswer: 1,
    explanation:
      "O ciclo de vida de ML inclui ingestão de dados, treino, validação, deployment e monitorização.",
  },
  {
    question: "Porque é que a reprodutibilidade é importante em MLOps?",
    options: [
      "Porque torna o código mais curto",
      "Porque permite obter os mesmos resultados com os mesmos dados, código e ambiente",
      "Porque reduz sempre o tempo de treino",
      "Porque dispensa documentação",
    ],
    correctAnswer: 1,
    explanation:
      "Reprodutibilidade permite investigar bugs, comparar modelos e auditar decisões.",
  },
  {
    question: "O que é um pipeline em MLOps?",
    options: [
      "Uma sequência de scripts executados manualmente",
      "Um fluxo automatizado de passos como ingestão, treino e deployment",
      "Um tipo de modelo de regressão",
      "Uma base de dados relacional",
    ],
    correctAnswer: 1,
    explanation:
      "Pipelines automatizam tarefas repetitivas, reduzem erros humanos e tornam o processo escalável.",
  },
  {
    question: "Qual é uma vantagem clara de aplicar MLOps?",
    options: [
      "Maior dependência de tarefas manuais",
      "Ciclos de treino e deployment mais rápidos e controlados",
      "Menos visibilidade sobre modelos em produção",
      "Processos impossíveis de auditar",
    ],
    correctAnswer: 1,
    explanation:
      "MLOps reduz tempo entre experimentação e produção, com mais controlo e monitorização.",
  },
  {
    question: "O que é um modelo em produção?",
    options: [
      "Um modelo que ainda está a ser testado localmente",
      "Um modelo que está a servir previsões para casos de uso reais",
      "Um modelo guardado num ficheiro ZIP",
      "Um modelo que foi apenas treinado uma vez",
    ],
    correctAnswer: 1,
    explanation:
      "Produção significa que o modelo está integrado num sistema real, com utilizadores e impacto de negócio.",
  },
  {
    question: "Qual destas práticas NÃO é típica de MLOps?",
    options: [
      "Monitorização de modelos em produção",
      "Versionamento de modelos e datasets",
      "Automatização de pipelines de treino",
      "Escolha de paleta de cores da aplicação web",
    ],
    correctAnswer: 3,
    explanation: "Design visual não faz parte do foco de MLOps.",
  },
  {
    question:
      "O que significa olhar para o ciclo de vida de ML de ponta a ponta?",
    options: [
      "Focar apenas na escolha do algoritmo",
      "Cuidar de todas as fases, desde dados até monitorização e re-treino",
      "Apenas optimizar hiperaparâmetros",
      "Apenas desenhar a API de inferência",
    ],
    correctAnswer: 1,
    explanation:
      "MLOps olha para todo o ciclo: dados → treino → deployment → monitorização → re-treino.",
  },
  {
    question:
      "Porque é importante separar ambientes (dev, staging, prod) em MLOps?",
    options: [
      "Para gastar mais máquinas sem necessidade",
      "Para testar alterações sem impactar utilizadores finais",
      "Para duplicar trabalho manual",
      "Para evitar testes automatizados",
    ],
    correctAnswer: 1,
    explanation:
      "Ambientes separados permitem validar alterações e reduzir risco em produção.",
  },
  {
    question: "Qual destas opções é típica de uma equipa de MLOps?",
    options: [
      "Gerir pipelines, monitorização e deployment de modelos",
      "Criar logótipos e identidade visual",
      "Escrever artigos de marketing",
      "Gerir apenas bases de dados transaccionais",
    ],
    correctAnswer: 0,
    explanation:
      "A equipa de MLOps é responsável pela parte operacional de sistemas de ML.",
  },

  // ----------------------------------------------------
  // DADOS, INGESTÃO E VALIDAÇÃO
  // ----------------------------------------------------
  {
    question: "O que é data drift?",
    options: [
      "Erro num script de logging",
      "Mudança na distribuição dos dados de produção em relação aos dados de treino",
      "Actualização do sistema operativo do servidor",
      "Alteração no logótipo da aplicação",
    ],
    correctAnswer: 1,
    explanation:
      "Data drift acontece quando os dados que chegam ao modelo deixam de se parecer com os dados usados no treino.",
  },
  {
    question: "Qual é o principal objectivo da validação de dados?",
    options: [
      "Aumentar o tamanho dos ficheiros CSV",
      "Detectar problemas de qualidade de dados antes de treinar ou fazer previsão",
      "Reduzir o número de colunas de um dataset",
      "Garantir que todos os valores são sempre nulos",
    ],
    correctAnswer: 1,
    explanation:
      "Validação de dados reduz o risco de treinar ou servir com dados inválidos ou inesperados.",
  },
  {
    question: "Quando faz mais sentido usar ingestão em streaming?",
    options: [
      "Quando os dados são actualizados uma vez por mês",
      "Quando existe um fluxo contínuo de eventos quase em tempo real",
      "Quando todos os dados vêm de um único ficheiro Excel estático",
      "Quando a latência não tem qualquer importância",
    ],
    correctAnswer: 1,
    explanation:
      "Streaming é indicado quando os dados chegam de forma contínua e a latência importa.",
  },
  {
    question: "O que é o schema de um conjunto de dados?",
    options: [
      "A métrica de accuracy do modelo",
      "A descrição das colunas, tipos e restrições dos dados",
      "O tamanho máximo de um ficheiro ZIP",
      "O diagrama de rede da empresa",
    ],
    correctAnswer: 1,
    explanation:
      "O schema define a estrutura e tipos dos dados, essencial para validação.",
  },
  {
    question:
      "Porque é arriscado aceitar qualquer CSV sem validar numa pipeline de ML?",
    options: [
      "Porque ficheiros CSV são sempre muito grandes",
      "Porque tipos, colunas ou intervalos de valores podem mudar sem aviso",
      "Porque CSV não suporta texto",
      "Porque modelos não conseguem ler ficheiros CSV",
    ],
    correctAnswer: 1,
    explanation:
      "Mudanças silenciosas num CSV podem partir pipelines ou enviesar o modelo.",
  },
  {
    question: "Qual destas é uma regra de qualidade de dados razoável?",
    options: [
      "Acurácia do modelo tem de ser 100%",
      "A coluna 'idade' deve ter valores entre 0 e 120",
      "A API tem de responder sempre em menos de 1 ms",
      "O dataset tem de ter milhões de linhas",
    ],
    correctAnswer: 1,
    explanation:
      "Regras de qualidade definem limites aceitáveis para valores e distribuições.",
  },
  {
    question: "Ferramentas como Great Expectations são usadas para:",
    options: [
      "Treinar redes neuronais profundas",
      "Validar e testar dados de forma automática",
      "Construir dashboards de negócio",
      "Gerir clusters de Kubernetes",
    ],
    correctAnswer: 1,
    explanation:
      "Great Expectations é focado em data quality e data validation.",
  },
  {
    question: "O que é data quality monitoring?",
    options: [
      "Monitorizar apenas a CPU dos servidores",
      "Monitorizar continuamente se os dados respeitam regras e distribuições definidas",
      "Monitorizar apenas a latência da API",
      "Monitorizar o número de commits por dia",
    ],
    correctAnswer: 1,
    explanation:
      "Data quality monitoring ajuda a detectar anomalias nos dados em produção.",
  },
  {
    question:
      "O que pode acontecer se um campo obrigatório passar a ser opcional na origem de dados?",
    options: [
      "A API fica sempre mais rápida",
      "O modelo pode começar a receber valores nulos inesperados",
      "O modelo torna-se automaticamente mais preciso",
      "O dataset deixa de ter colunas",
    ],
    correctAnswer: 1,
    explanation:
      "Valores nulos inesperados podem partir pipelines ou influenciar previsões.",
  },
  {
    question:
      "Porque é que pipelines batch ainda são úteis mesmo quando há streaming?",
    options: [
      "Porque streaming é incompatível com ML",
      "Porque muitos casos exigem processamento periódico de grandes volumes",
      "Porque pipelines batch são sempre mais lentas",
      "Porque streaming não suporta números inteiros",
    ],
    correctAnswer: 1,
    explanation:
      "Batch continua útil para reprocessamentos, relatórios e treinos periódicos.",
  },

  // ----------------------------------------------------
  // TREINO, EXPERIMENTOS E TRACKING
  // ----------------------------------------------------
  {
    question: "O que é experiment tracking em ML?",
    options: [
      "Guardar apenas o melhor modelo final",
      "Registar parâmetros, métricas e artefactos de cada execução de treino",
      "Medir apenas o tempo de treino",
      "Contar o número de linhas de código",
    ],
    correctAnswer: 1,
    explanation:
      "Experiment tracking documenta o que foi feito em cada run para comparação e auditoria.",
  },
  {
    question: "Uma boa prática ao treinar modelos em equipa é:",
    options: [
      "Dar nomes como 'modelo_final_definitivo_V3_versao_nova'",
      "Usar ferramentas como MLflow ou Weights & Biases para tracking",
      "Guardar modelos apenas no portátil pessoal",
      "Não registar hiperaparâmetros",
    ],
    correctAnswer: 1,
    explanation:
      "Ferramentas de tracking centralizam runs e facilitam colaboração.",
  },
  {
    question: "Porque é importante versionar datasets usados em treino?",
    options: [
      "Para reduzir o uso de disco",
      "Para conseguir reproduzir o treino de um modelo específico no futuro",
      "Para apagar dados antigos sem impacto",
      "Para evitar testes automatizados",
    ],
    correctAnswer: 1,
    explanation:
      "Sem versionamento de dados, não se sabe exactamente com que dados o modelo foi treinado.",
  },
  {
    question: "Que tipo de informação faz sentido registar numa experiência?",
    options: [
      "Versão de código, hiperaparâmetros e métricas de validação",
      "Número de monitores usados pela equipa",
      "Preferências de teclado dos developers",
      "Cor do tema do editor de texto",
    ],
    correctAnswer: 0,
    explanation:
      "Experiment tracking deve capturar tudo o que influencia o resultado do modelo.",
  },
  {
    question: "O que é hyperparameter tuning?",
    options: [
      "Ajustar parâmetros do sistema operativo",
      "Explorar combinações de hiperaparâmetros do modelo para melhorar performance",
      "Alterar métricas depois de calculadas",
      "Remover features aleatoriamente",
    ],
    correctAnswer: 1,
    explanation:
      "Hiperparâmetros controlam o comportamento do modelo e são ajustados via tuning sistemático.",
  },
  {
    question: "Porque é útil definir seeds aleatórios no código de treino?",
    options: [
      "Para tornar o código mais lento",
      "Para garantir reprodutibilidade dos resultados",
      "Para impedir o uso de GPUs",
      "Para aumentar tamanho de logs",
    ],
    correctAnswer: 1,
    explanation:
      "Seeds fixos reduzem variação entre execuções e facilitam debugging.",
  },
  {
    question: "O que é um artefacto num contexto de MLOps?",
    options: [
      "Apenas imagens PNG",
      "Qualquer ficheiro resultante de uma run: modelo, relatórios, gráficos, etc.",
      "Apenas o ficheiro .pkl do modelo",
      "Apenas ficheiros de configuração",
    ],
    correctAnswer: 1,
    explanation:
      "Artefactos incluem tudo o que pode ser reutilizado ou auditado mais tarde.",
  },
  {
    question:
      "Qual é o papel de um orquestrador (Airflow, Kubeflow) em treino de modelos?",
    options: [
      "Substituir o código do modelo",
      "Agendar, monitorizar e reexecutar pipelines complexas",
      "Criar dashboards de negócio",
      "Gerir apenas logs de sistema",
    ],
    correctAnswer: 1,
    explanation:
      "Orquestradores são essenciais para pipelines repetitivas e críticas.",
  },
  {
    question: "O que é uma feature store?",
    options: [
      "Um local para guardar gráficos",
      "Um sistema para gerir e reutilizar features entre equipas e modelos",
      "Uma tabela temporária na base de dados",
      "Um tipo de rede neuronal",
    ],
    correctAnswer: 1,
    explanation:
      "Feature stores padronizam features e reduzem duplicação entre equipas.",
  },
  {
    question:
      "Porque é importante separar código de treino do código de serving/inferência?",
    options: [
      "Para usar linguagens totalmente diferentes",
      "Para reduzir acoplamento e permitir pipelines específicas para cada fase",
      "Para impedir testes",
      "Para duplicar lógica de negócio",
    ],
    correctAnswer: 1,
    explanation:
      "Separação permite optimizar, testar e escalar treinos e inferência de forma independente.",
  },

  // ----------------------------------------------------
  // MODEL REGISTRY & VERSIONAMENTO
  // ----------------------------------------------------
  {
    question: "Qual é o principal objectivo de um Model Registry?",
    options: [
      "Treinar modelos automaticamente",
      "Armazenar, versionar e gerir modelos ao longo do ciclo de vida",
      "Substituir o Git para código",
      "Criar dashboards de negócio",
    ],
    correctAnswer: 1,
    explanation:
      "Model registries centralizam modelos, versões, estados e metadados.",
  },
  {
    question: "O que é versionamento semântico de modelos?",
    options: [
      "Um tipo de regularização",
      "Um esquema do tipo MAJOR.MINOR.PATCH para identificar versões",
      "Uma métrica de classificação",
      "Um formato de ficheiro para modelos",
    ],
    correctAnswer: 1,
    explanation:
      "Versionamento semântico ajuda a comunicar o tipo de mudança entre versões.",
  },
  {
    question: "Qual destas é tipicamente uma stage num Model Registry?",
    options: ["Beta", "Produção (Production)", "Correcção", "Análise"],
    correctAnswer: 1,
    explanation: "Stages comuns: None, Staging, Production, Archived.",
  },
  {
    question: "Porque é importante guardar metadados no Model Registry?",
    options: [
      "Para gastar mais espaço em disco sem motivo",
      "Para suportar auditoria, debugging e rastreabilidade",
      "Para evitar documentar modelos",
      "Para substituir logs de aplicação",
    ],
    correctAnswer: 1,
    explanation: "Metadados ajudam a entender o contexto de cada modelo.",
  },
  {
    question: "O que significa fazer rollback de modelo?",
    options: [
      "Apagar todos os modelos antigos",
      "Reverter para uma versão anterior após problemas em produção",
      "Treinar um modelo com menos dados",
      "Remover logs antigos",
    ],
    correctAnswer: 1,
    explanation:
      "Rollback é fundamental quando um modelo novo degrada a performance.",
  },
  {
    question:
      "Quando é que faz sentido promover um modelo de Staging para Production?",
    options: [
      "Quando é o modelo mais recente, mesmo com métricas piores",
      "Quando passa testes e mostra melhoria consistente face ao modelo actual",
      "Quando ainda não foi avaliado",
      "Quando não há experiment tracking configurado",
    ],
    correctAnswer: 1,
    explanation: "Promoção deve ser baseada em evidência e critérios claros.",
  },
  {
    question: "Ter um Model Registry central ajuda a:",
    options: [
      "Aumentar conflitos entre equipas",
      "Reduzir duplicação e facilitar governança",
      "Impedir colaboração",
      "Evitar testes automatizados",
    ],
    correctAnswer: 1,
    explanation:
      "Um registry centralizado melhora a gestão de modelos numa organização.",
  },
  {
    question: "Num contexto MLflow, o que é um 'registered model'?",
    options: [
      "Uma run individual",
      "Uma entidade lógica que agrega várias versões de um modelo",
      "Um dataset específico",
      "Um pipeline de CI/CD",
    ],
    correctAnswer: 1,
    explanation:
      "Um registered model representa um modelo ao longo das suas versões.",
  },
  {
    question:
      "Porque é útil associar modelos a datasets e experiências específicos?",
    options: [
      "Para complicar o sistema",
      "Para rastrear de onde veio cada modelo e poder reproduzir resultados",
      "Para poder apagar dados sem rasto",
      "Para reduzir a transparência",
    ],
    correctAnswer: 1,
    explanation:
      "Ligação entre dados, código e modelo é base de governança em MLOps.",
  },
  {
    question:
      "Que tipo de informação NÃO faz sentido guardar num Model Registry?",
    options: [
      "Métricas do modelo",
      "Descrição da versão",
      "Fotos de férias da equipa",
      "Informação de deployment",
    ],
    correctAnswer: 2,
    explanation:
      "O registry deve conter apenas informação relevante para gestão de modelos.",
  },

  // ----------------------------------------------------
  // CI/CD PARA ML
  // ----------------------------------------------------
  {
    question: "Qual é a diferença principal entre CI tradicional e CI para ML?",
    options: [
      "CI para ML não usa testes",
      "CI para ML tem de considerar dados e modelos, não apenas código",
      "CI tradicional não pode ser automatizado",
      "CI para ML não usa Git",
    ],
    correctAnswer: 1,
    explanation:
      "Em ML, é necessário validar dados, métricas de modelo e artefactos.",
  },
  {
    question: "O que é Continuous Deployment (CD) num contexto de ML?",
    options: [
      "Fazer deploy manual no servidor de produção",
      "Pipeline automática que leva modelos aprovados para ambientes alvo",
      "Um relatório mensal de métricas",
      "Um tipo de base de dados",
    ],
    correctAnswer: 1,
    explanation: "CD automatiza o caminho desde build/test até ao deployment.",
  },
  {
    question: "Qual destes testes é específico de ML?",
    options: [
      "Testes unitários a funções utilitárias",
      "Validação de modelo com métricas mínimas aceitáveis",
      "Testes de UI",
      "Testes de snapshot de componentes React",
    ],
    correctAnswer: 1,
    explanation:
      "Testes de validação de modelo verificam se o modelo cumpre requisitos de qualidade.",
  },
  {
    question: "O que é uma pipeline de CI para um modelo?",
    options: [
      "Um ficheiro README",
      "Um workflow com passos como lint, testes, treino e validação",
      "Uma folha Excel estática",
      "Um script corrido à mão de vez em quando",
    ],
    correctAnswer: 1,
    explanation: "CI automatiza verificações a cada alteração relevante.",
  },
  {
    question: "Qual é uma boa prática em pipelines CI/CD para ML?",
    options: [
      "Misturar dados sensíveis no repositório",
      "Separar testes de dados, testes de modelo e passos de deployment",
      "Executar tudo apenas em laptops pessoais",
      "Nunca usar branches",
    ],
    correctAnswer: 1,
    explanation: "Separar responsabilidades facilita debugging e governança.",
  },
  {
    question: "O que é uma estratégia de canary deployment?",
    options: [
      "Fazer deploy para 100% dos utilizadores de imediato",
      "Fazer deploy para uma pequena percentagem de tráfego para reduzir risco",
      "Fazer deploy apenas em batch nocturno",
      "Nunca fazer rollback",
    ],
    correctAnswer: 1,
    explanation:
      "Canary permite testar um modelo novo em ambiente real com impacto limitado.",
  },
  {
    question: "O que é GitOps num contexto de ML?",
    options: [
      "Escrever código ML directamente em produção",
      "Usar Git como fonte de verdade para infra-estrutura e configurações",
      "Eliminar testes",
      "Substituir monitorização por scripts manuais",
    ],
    correctAnswer: 1,
    explanation:
      "GitOps descreve o estado desejado em Git e automatiza a aplicação dessas alterações.",
  },
  {
    question: "Porque é importante ter gates automáticos em CI/CD?",
    options: [
      "Para atrasar deploys",
      "Para impedir que modelos que não passam critérios mínimos cheguem a produção",
      "Para aumentar trabalho manual",
      "Para remover métricas de decisão",
    ],
    correctAnswer: 1,
    explanation:
      "Gates baseados em métricas e testes protegem produção contra regressões.",
  },
  {
    question: "Qual ferramenta é frequentemente usada para CI/CD de ML?",
    options: ["GitHub Actions", "Paint", "PowerPoint", "Figma"],
    correctAnswer: 0,
    explanation: "GitHub Actions é uma plataforma comum para pipelines CI/CD.",
  },
  {
    question: "O que é Continuous Training (CT)?",
    options: [
      "Treinar o modelo uma vez por ano",
      "Re-treinar modelos de forma automática com base em triggers como tempo ou drift",
      "Treinar apenas em CPUs",
      "Treinar sempre com o mesmo dataset fixo",
    ],
    correctAnswer: 1,
    explanation:
      "CT liga monitorização e re-treino de forma programática e controlada.",
  },

  // ----------------------------------------------------
  // MONITORIZAÇÃO, DRIFT E OBSERVABILITY
  // ----------------------------------------------------
  {
    question:
      "Qual é a diferença entre métricas técnicas e métricas de negócio?",
    options: [
      "Não existe diferença",
      "Métricas técnicas avaliam o sistema/modelo, métricas de negócio avaliam impacto real",
      "Métricas de negócio são sempre percentagens",
      "Métricas técnicas não são numéricas",
    ],
    correctAnswer: 1,
    explanation:
      "É possível ter boas métricas técnicas e, ainda assim, fraco impacto de negócio.",
  },
  {
    question: "O que é concept drift?",
    options: [
      "Mudança no logótipo da empresa",
      "Mudança na relação entre features e target ao longo do tempo",
      "Actualização da versão do Python",
      "Alteração de número de colunas do dataset",
    ],
    correctAnswer: 1,
    explanation:
      "Concept drift ocorre quando o fenómeno em si muda, não apenas a distribuição dos inputs.",
  },
  {
    question: "Prediction drift refere-se a:",
    options: [
      "Mudanças na distribuição das previsões do modelo em produção",
      "Mudança no esquema da base de dados",
      "Atrasos na rede",
      "Alterações em ficheiros de configuração",
    ],
    correctAnswer: 0,
    explanation:
      "É útil monitorizar como as previsões se distribuem ao longo do tempo.",
  },
  {
    question:
      "Porque é difícil monitorizar performance de modelos em alguns cenários?",
    options: [
      "Porque não existem logs",
      "Porque as labels podem chegar muito tempo depois da previsão",
      "Porque não existem métricas de negócio",
      "Porque os modelos não produzem saída",
    ],
    correctAnswer: 1,
    explanation:
      "Labels atrasadas dificultam o cálculo de métricas em tempo quase real.",
  },
  {
    question:
      "Que tipo de visualização é útil para monitorizar performance ao longo do tempo?",
    options: [
      "Histograma do tamanho do ficheiro de código",
      "Série temporal de métricas (por exemplo, F1 diário)",
      "Gráfico de pizza com cores aleatórias",
      "Tabela estática sem datas",
    ],
    correctAnswer: 1,
    explanation:
      "Séries temporais permitem detectar tendências e degradações graduais.",
  },
  {
    question: "O que é um SLO (Service Level Objective) num sistema de ML?",
    options: [
      "Um script aleatório",
      "Um objectivo mensurável para um indicador de serviço",
      "Um log de debug",
      "Um diagrama UML",
    ],
    correctAnswer: 1,
    explanation:
      "SLOs definem objectivos, por exemplo: 95% das respostas em menos de 300 ms.",
  },
  {
    question: "O que é um runbook em contexto de incidentes de ML?",
    options: [
      "Um livro de corrida",
      "Um conjunto de passos documentados para responder a um tipo de incidente",
      "Uma lista de modelos treinados",
      "Uma base de dados relacional",
    ],
    correctAnswer: 1,
    explanation:
      "Runbooks ajudam a responder a incidentes de forma consistente e rápida.",
  },
  {
    question: "Porque é importante fazer post-mortems depois de incidentes?",
    options: [
      "Para procurar culpados",
      "Para aprender com o incidente e melhorar processos",
      "Para aumentar a quantidade de documentos",
      "Para justificar mais servidores",
    ],
    correctAnswer: 1,
    explanation:
      "Post-mortems orientados a aprendizagem ajudam a reduzir repetição de problemas.",
  },
  {
    question: "O que significa observability em sistemas de ML?",
    options: [
      "Capacidade de ver apenas métricas técnicas",
      "Capacidade de inferir o estado interno do sistema a partir de logs, métricas e traces",
      "Capacidade de ver apenas logs de erro",
      "Capacidade de apagar dados antigos",
    ],
    correctAnswer: 1,
    explanation:
      "Observability vai além de logging simples, integrando várias fontes de sinais.",
  },
  {
    question: "Que componentes são típicos numa stack de observability?",
    options: [
      "Editor de texto, teclado e rato",
      "Logs, métricas e traces",
      "Apenas folhas Excel",
      "Apenas apresentações em PowerPoint",
    ],
    correctAnswer: 1,
    explanation:
      "Uma stack de observability combina diferentes tipos de sinais sobre o sistema.",
  },

  // ----------------------------------------------------
  // LLMs, PROMPT ENGINEERING E CHATBOTS
  // ----------------------------------------------------
  {
    question: "O que é um LLM (Large Language Model)?",
    options: [
      "Um modelo de visão computacional",
      "Um modelo de linguagem com muitos parâmetros treinado em grandes quantidades de texto",
      "Uma base de dados relacional",
      "Um tipo de servidor de API",
    ],
    correctAnswer: 1,
    explanation:
      "LLMs são modelos de linguagem de grande dimensão usados em chatbots e outras aplicações.",
  },
  {
    question: "Porque é que LLMs podem produzir 'hallucinations'?",
    options: [
      "Porque lêem sempre dados errados da base de dados",
      "Porque geram texto com base em padrões, não em verificação de factos",
      "Porque não conseguem lidar com texto",
      "Porque não têm memória de curto prazo",
    ],
    correctAnswer: 1,
    explanation:
      "LLMs não garantem verdade factual; apenas geram texto plausível.",
  },
  {
    question: "O que é prompt engineering?",
    options: [
      "Escrever código C++ para GPUs",
      "Desenhar prompts para obter melhores respostas de LLMs",
      "Criar esquemas de base de dados",
      "Desenhar APIs REST",
    ],
    correctAnswer: 1,
    explanation:
      "Prompt engineering é a arte de formular instruções eficazes para modelos de linguagem.",
  },
  {
    question: "O que é few-shot prompting?",
    options: [
      "Dar muitos exemplos ao modelo",
      "Fornecer alguns exemplos para guiar o comportamento do modelo",
      "Não dar qualquer contexto ao modelo",
      "Executar o modelo em poucas GPUs",
    ],
    correctAnswer: 1,
    explanation:
      "Few-shot prompting usa alguns exemplos no próprio prompt para orientar a resposta.",
  },
  {
    question:
      "Porque é útil definir bem o papel (persona) do modelo num prompt?",
    options: [
      "Para aumentar o tempo de resposta",
      "Para alinhar o estilo e o tipo de resposta com o caso de uso",
      "Para reduzir o tamanho do modelo",
      "Para evitar métricas",
    ],
    correctAnswer: 1,
    explanation:
      "Instruções claras sobre o papel ajudam o modelo a responder de forma mais consistente.",
  },
  {
    question:
      "O que é importante ao desenhar prompts para evitar respostas perigosas?",
    options: [
      "Pedir explicitamente conteúdos perigosos",
      "Especificar limites e temas proibidos",
      "Nunca dar contexto",
      "Misturar várias línguas sem motivo",
    ],
    correctAnswer: 1,
    explanation:
      "Prompts devem incluir instruções de segurança e limites claros.",
  },
  {
    question: "Porque é útil documentar prompts em produção?",
    options: [
      "Para preencher espaço em disco",
      "Para poder reproduzir comportamentos e comparar versões",
      "Para dispensar testes",
      "Para evitar auditorias",
    ],
    correctAnswer: 1,
    explanation:
      "Prompts também fazem parte do sistema e devem ser versionados e auditados.",
  },
  {
    question: "Qual é um risco específico de sistemas com LLMs em produção?",
    options: [
      "Nunca respondem",
      "Podem gerar conteúdo ofensivo ou enganador se não forem bem controlados",
      "Não suportam múltiplos idiomas",
      "Não escalam horizontalmente",
    ],
    correctAnswer: 1,
    explanation: "Controlo de segurança e filtragem é essencial em LLMOps.",
  },
  {
    question:
      "O que significa avaliar um chatbot com métricas humanas (human eval)?",
    options: [
      "Avaliar o modelo apenas por accuracy numérica",
      "Ter pessoas a avaliar a qualidade das respostas",
      "Avaliar apenas latência",
      "Avaliar tamanho do modelo",
    ],
    correctAnswer: 1,
    explanation:
      "Human eval é importante para medir qualidade percebida em tarefas complexas.",
  },
  {
    question: "Porque é relevante controlar o custo de chamadas a LLMs?",
    options: [
      "Porque as chamadas são sempre gratuitas",
      "Porque cada chamada tem custo e pode escalar rapidamente em ambiente real",
      "Porque os modelos não funcionam sem custo",
      "Porque as chamadas não podem ser monitorizadas",
    ],
    correctAnswer: 1,
    explanation:
      "Monitorizar custos por utilizador e por caso de uso é essencial em LLMOps.",
  },

  // ----------------------------------------------------
  // RAG, VECTOR DBs E LLM OPS EM PRODUÇÃO
  // ----------------------------------------------------
  {
    question: "O que é RAG (Retrieval-Augmented Generation)?",
    options: [
      "Um tipo de rede neuronal convolucional",
      "Uma abordagem que combina LLMs com recuperação de contexto externo",
      "Uma base de dados relacional",
      "Um tipo de compressão de texto",
    ],
    correctAnswer: 1,
    explanation:
      "RAG permite que o modelo use informação actualizada e específica de fontes externas.",
  },
  {
    question: "Porque se usam bases de dados vectoriais em sistemas RAG?",
    options: [
      "Para armazenar apenas inteiros",
      "Para armazenar embeddings e fazer pesquisa semântica eficiente",
      "Para substituir completamente todas as bases de dados",
      "Para guardar apenas logs de sistema",
    ],
    correctAnswer: 1,
    explanation:
      "Vector DBs permitem pesquisar documentos por similaridade semântica.",
  },
  {
    question: "O que é um embedding num contexto de LLMs?",
    options: [
      "Um ficheiro ZIP",
      "Uma representação numérica densa de texto",
      "Um tipo de gráfico",
      "Um script de deployment",
    ],
    correctAnswer: 1,
    explanation:
      "Embeddings mapeiam texto para vectores em espaço de alta dimensão.",
  },
  {
    question: "Qual é um risco de um sistema RAG mal configurado?",
    options: [
      "O modelo nunca responde",
      "O sistema pode recuperar documentos irrelevantes ou desactualizados",
      "As chamadas deixam de ter custo",
      "O modelo deixa de saber língua portuguesa",
    ],
    correctAnswer: 1,
    explanation:
      "A qualidade do retrieval é crítica para a qualidade da resposta final.",
  },
  {
    question: "Porque é importante fazer chunking de documentos em RAG?",
    options: [
      "Para aumentar o tamanho de cada embedding",
      "Para dividir documentos em partes geríveis e relevantes para pesquisa",
      "Para reduzir o número de documentos indexados",
      "Para impedir caching",
    ],
    correctAnswer: 1,
    explanation:
      "Chunks adequados melhoram a relevância das passagens recuperadas.",
  },
  {
    question: "Porque é necessário monitorizar um sistema RAG em produção?",
    options: [
      "Porque RAG nunca funciona à primeira",
      "Porque a qualidade depende tanto do modelo como dos dados e do retrieval",
      "Porque não existem logs",
      "Porque os utilizadores não vêem as respostas",
    ],
    correctAnswer: 1,
    explanation:
      "Monitorização ajuda a detectar problemas de relevância, latência e custos.",
  },
  {
    question:
      "Qual é uma métrica útil para avaliar um sistema de QA baseado em RAG?",
    options: [
      "Tamanho médio do ficheiro de log",
      "Taxa de respostas consideradas úteis por avaliadores humanos",
      "Número de pods em Kubernetes",
      "Consumo de memória do editor de texto",
    ],
    correctAnswer: 1,
    explanation:
      "Métricas de utilidade percebida são importantes em sistemas de QA.",
  },
  {
    question: "Porque é importante ter caching num sistema com LLMs?",
    options: [
      "Para aumentar o custo das chamadas",
      "Para reutilizar respostas idênticas e reduzir latência e custo",
      "Para impedir monitorização",
      "Para evitar logs",
    ],
    correctAnswer: 1,
    explanation:
      "Caching reduz o número de chamadas ao modelo para pedidos repetidos ou semelhantes.",
  },
  {
    question:
      "Que tipo de limites faz sentido aplicar num sistema de LLM em produção?",
    options: [
      "Nenhum limite, para ser mais flexível",
      "Rate limits por utilizador ou cliente",
      "Limites apenas por país",
      "Limites por tamanho do ecrã",
    ],
    correctAnswer: 1,
    explanation: "Rate limits protegem a infra-estrutura e controlam custos.",
  },
  {
    question:
      "Porque é importante registar prompts e respostas em produção (respeitando privacidade)?",
    options: [
      "Para aumentar a quantidade de dados pessoais sem controlo",
      "Para poder analisar qualidade, detectar abusos e melhorar o sistema",
      "Para substituir toda a monitorização",
      "Para treinar modelos sem consentimento",
    ],
    correctAnswer: 1,
    explanation:
      "Logs (anónimos sempre que necessário) são essenciais para evolução do sistema.",
  },
];

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  useEffect(() => {
    setBestScore(getBestQuizScore());
    setAttemptCount(getQuizResults().length);
    iniciarNovoQuiz();
  }, []);

  const iniciarNovoQuiz = () => {
    const selected = pickRandomQuestions(questionBank, QUESTIONS_PER_QUIZ);
    setQuestions(selected);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setCompleted(false);
    setAnswers([]); // limpar histórico de respostas
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const current = questions[currentQuestion];
    const isCorrect = selectedAnswer === current.correctAnswer;

    setShowFeedback(true);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // guardar resposta no histórico
    setAnswers((prev) => [
      ...prev,
      {
        question: current.question,
        options: current.options,
        selectedAnswer,
        correctAnswer: current.correctAnswer,
        isCorrect,
        explanation: current.explanation,
      },
    ]);
  };

  const finalizarQuiz = () => {
    // garante que a última resposta é contada correctamente
    const isLastCorrect =
      selectedAnswer !== null &&
      selectedAnswer === questions[currentQuestion].correctAnswer;
    const finalScore = score + (showFeedback ? 0 : isLastCorrect ? 1 : 0);
    const percentage = Math.round((finalScore / questions.length) * 100);

    setScore(finalScore);

    saveQuizResult({
      score: finalScore,
      totalQuestions: questions.length,
      percentage,
      timestamp: Date.now(),
    });

    const previousBest = bestScore;
    const newBest = getBestQuizScore();

    if (newBest > previousBest) {
      toast.success(`🏆 Novo recorde! ${percentage}%`);
    }

    setBestScore(newBest);
    setAttemptCount(getQuizResults().length);
    setCompleted(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      finalizarQuiz();
    }
  };

  const handleRestart = () => {
    iniciarNovoQuiz();
  };

  const isCorrect =
    selectedAnswer !== null &&
    questions.length > 0 &&
    selectedAnswer === questions[currentQuestion].correctAnswer;

  const scorePercentage =
    questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                Quiz MLOps
              </h1>
              <p className="text-lg text-muted-foreground">
                Testa os teus conhecimentos sobre MLOps
              </p>
              {bestScore > 0 && (
                <div className="flex items-center justify-center gap-4 text-sm">
                  <Badge variant="outline" className="bg-primary/10">
                    <Award className="mr-1 h-3 w-3" />
                    Melhor: {bestScore}%
                  </Badge>
                  <Badge variant="outline" className="bg-muted">
                    <History className="mr-1 h-3 w-3" />
                    {attemptCount}{" "}
                    {attemptCount === 1 ? "tentativa" : "tentativas"}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              {questions.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>A carregar perguntas...</CardTitle>
                    <CardDescription>
                      A preparar o teu quiz personalizado.
                    </CardDescription>
                  </CardHeader>
                </Card>
              ) : !completed ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardDescription>
                        Pergunta {currentQuestion + 1} de {questions.length}
                      </CardDescription>
                      <Badge variant="outline">
                        Score: {score}/
                        {currentQuestion + (showFeedback ? 0 : 0)}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">
                      {questions[currentQuestion].question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup
                      value={selectedAnswer?.toString() ?? ""}
                      onValueChange={(value) =>
                        setSelectedAnswer(parseInt(value, 10))
                      }
                      disabled={showFeedback}
                    >
                      <div className="space-y-3">
                        {questions[currentQuestion].options.map(
                          (option, index) => (
                            <div
                              key={index}
                              className={`flex items-center space-x-3 rounded-lg border-2 p-4 transition-colors ${
                                showFeedback
                                  ? index ===
                                    questions[currentQuestion].correctAnswer
                                    ? "border-success bg-success/10"
                                    : index === selectedAnswer
                                    ? "border-destructive bg-destructive/10"
                                    : "border-border"
                                  : "border-border hover:border-primary"
                              }`}
                            >
                              <RadioGroupItem
                                value={index.toString()}
                                id={`option-${index}`}
                              />
                              <Label
                                htmlFor={`option-${index}`}
                                className="flex-1 cursor-pointer font-medium"
                              >
                                {option}
                              </Label>
                              {showFeedback &&
                                index ===
                                  questions[currentQuestion].correctAnswer && (
                                  <CheckCircle className="h-5 w-5 text-success" />
                                )}
                              {showFeedback &&
                                index === selectedAnswer &&
                                index !==
                                  questions[currentQuestion].correctAnswer && (
                                  <XCircle className="h-5 w-5 text-destructive" />
                                )}
                            </div>
                          )
                        )}
                      </div>
                    </RadioGroup>

                    {showFeedback && (
                      <div
                        className={`animate-fade-in rounded-lg p-4 ${
                          isCorrect
                            ? "bg-success/10 border border-success"
                            : "bg-destructive/10 border border-destructive"
                        }`}
                      >
                        <h4 className="mb-2 font-semibold">
                          {isCorrect ? "✓ Correto!" : "✗ Incorreto"}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {questions[currentQuestion].explanation}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between gap-4">
                      {!showFeedback ? (
                        <Button
                          onClick={handleSubmit}
                          disabled={selectedAnswer === null}
                          className="ml-auto"
                          size="lg"
                        >
                          Submeter Resposta
                        </Button>
                      ) : (
                        <Button
                          onClick={handleNext}
                          className="ml-auto"
                          size="lg"
                          variant="hero"
                        >
                          {currentQuestion < questions.length - 1
                            ? "Próxima Pergunta"
                            : "Ver Resultados"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary">
                      <Trophy className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-3xl">Quiz Concluído!</CardTitle>
                    <CardDescription className="text-lg">
                      Aqui está o teu resultado final
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="text-6xl font-bold text-primary">
                        {scorePercentage}%
                      </div>
                      <p className="text-lg text-muted-foreground">
                        {score} de {questions.length} respostas corretas
                      </p>
                    </div>

                    <div className="mx-auto max-w-md space-y-2">
                      <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full bg-gradient-primary transition-all duration-500"
                          style={{ width: `${scorePercentage}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {scorePercentage >= 80
                          ? "Excelente! Dominas bem os conceitos de MLOps e LLM Ops! 🎉"
                          : scorePercentage >= 60
                          ? "Bom trabalho! Continua a praticar para consolidar os conceitos. 👍"
                          : "Continua a estudar! Volta aos módulos e revê os temas principais. 📚"}
                      </p>
                    </div>
                    {answers.length > 0 && (
                      <div className="text-left space-y-3 max-h-[360px] overflow-y-auto border rounded-lg p-4">
                        <h3 className="font-semibold mb-2 text-center">
                          Resumo das tuas respostas
                        </h3>
                        {answers.map((ans, index) => (
                          <div
                            key={index}
                            className="border-b pb-3 last:border-0 last:pb-0"
                          >
                            <p className="text-sm font-medium mb-1">
                              {index + 1}. {ans.question}
                            </p>
                            <p className="text-xs">
                              A tua resposta:{" "}
                              <span
                                className={
                                  ans.isCorrect
                                    ? "text-green-600"
                                    : "text-red-500"
                                }
                              >
                                {ans.options[ans.selectedAnswer]}
                              </span>
                            </p>
                            {!ans.isCorrect && (
                              <p className="text-xs">
                                Correta:{" "}
                                <span className="text-green-600">
                                  {ans.options[ans.correctAnswer]}
                                </span>
                              </p>
                            )}
                            {ans.explanation && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {ans.explanation}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <Button onClick={handleRestart} size="lg" variant="hero">
                        Tentar Novamente (perguntas novas)
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <a href="/glossary">Ver Glossário</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Quiz;
