import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Trophy } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question: "O que é MLOps?",
    options: [
      "Um framework de machine learning",
      "Práticas para operacionalizar ML em produção",
      "Uma linguagem de programação para ML",
      "Um tipo específico de algoritmo ML",
    ],
    correctAnswer: 1,
    explanation:
      "MLOps é um conjunto de práticas que combina Machine Learning, DevOps e Data Engineering para automatizar e melhorar o processo de desenvolvimento e deployment de modelos ML.",
  },
  {
    question: "Qual é a principal função do Model Registry?",
    options: [
      "Treinar modelos",
      "Validar dados de entrada",
      "Versionar e gerir modelos ML",
      "Monitorizar performance em produção",
    ],
    correctAnswer: 2,
    explanation:
      "O Model Registry é responsável por versionar, armazenar e gerir modelos ML, incluindo seus metadados, facilitando o controlo de versões e a promoção entre ambientes.",
  },
  {
    question: "O que é Data Drift?",
    options: [
      "Erro no código de treino",
      "Mudança nas distribuições dos dados ao longo do tempo",
      "Perda de dados durante ingestão",
      "Aumento no tempo de inferência",
    ],
    correctAnswer: 1,
    explanation:
      "Data Drift ocorre quando a distribuição dos dados de produção muda em relação aos dados de treino, podendo degradar a performance do modelo.",
  },
  {
    question: "Qual ferramenta NÃO é típica de CI/CD para ML?",
    options: ["GitHub Actions", "Jenkins", "Jupyter Notebook", "ArgoCD"],
    correctAnswer: 2,
    explanation:
      "Jupyter Notebook é uma ferramenta de desenvolvimento e exploração, não de CI/CD. GitHub Actions, Jenkins e ArgoCD são ferramentas de automação de deployment.",
  },
  {
    question: "O que deve ser monitorizado em produção?",
    options: [
      "Apenas accuracy do modelo",
      "Apenas latência das predições",
      "Métricas de performance, drift e latência",
      "Apenas logs de erro",
    ],
    correctAnswer: 2,
    explanation:
      "Em produção, é crucial monitorizar múltiplas métricas: performance do modelo (accuracy, F1), data/concept drift, latência, throughput e logs de erro.",
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowFeedback(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setCompleted(false);
  };

  const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
  const scorePercentage = Math.round((score / questions.length) * 100);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Quiz MLOps</h1>
              <p className="text-lg text-muted-foreground">
                Testa os teus conhecimentos sobre MLOps com estas perguntas
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              {!completed ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardDescription>
                        Pergunta {currentQuestion + 1} de {questions.length}
                      </CardDescription>
                      <Badge variant="outline">
                        Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">
                      {questions[currentQuestion].question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup
                      value={selectedAnswer?.toString()}
                      onValueChange={(value) => setSelectedAnswer(parseInt(value))}
                      disabled={showFeedback}
                    >
                      <div className="space-y-3">
                        {questions[currentQuestion].options.map((option, index) => (
                          <div
                            key={index}
                            className={`flex items-center space-x-3 rounded-lg border-2 p-4 transition-colors ${
                              showFeedback
                                ? index === questions[currentQuestion].correctAnswer
                                  ? "border-success bg-success/10"
                                  : index === selectedAnswer
                                  ? "border-destructive bg-destructive/10"
                                  : "border-border"
                                : "border-border hover:border-primary"
                            }`}
                          >
                            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                            <Label
                              htmlFor={`option-${index}`}
                              className="flex-1 cursor-pointer font-medium"
                            >
                              {option}
                            </Label>
                            {showFeedback && index === questions[currentQuestion].correctAnswer && (
                              <CheckCircle className="h-5 w-5 text-success" />
                            )}
                            {showFeedback &&
                              index === selectedAnswer &&
                              index !== questions[currentQuestion].correctAnswer && (
                                <XCircle className="h-5 w-5 text-destructive" />
                              )}
                          </div>
                        ))}
                      </div>
                    </RadioGroup>

                    {showFeedback && (
                      <div
                        className={`animate-fade-in rounded-lg p-4 ${
                          isCorrect ? "bg-success/10 border border-success" : "bg-destructive/10 border border-destructive"
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
                        <Button onClick={handleNext} className="ml-auto" size="lg" variant="hero">
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
                      <div className="text-6xl font-bold text-primary">{scorePercentage}%</div>
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
                          ? "Excelente! Dominas bem os conceitos de MLOps! 🎉"
                          : scorePercentage >= 60
                          ? "Bom trabalho! Continua a aprender sobre MLOps. 👍"
                          : "Continua a estudar! Revê os conceitos principais. 📚"}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <Button onClick={handleRestart} size="lg" variant="hero">
                        Tentar Novamente
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
