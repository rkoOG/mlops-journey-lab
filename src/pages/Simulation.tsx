import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, CheckCircle, TrendingUp, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Simulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [results, setResults] = useState<any>(null);

  const runSimulation = () => {
    setIsRunning(true);
    setLogs([]);
    setResults(null);

    const simulatedLogs = [
      "[00:00] Iniciando pipeline de treino...",
      "[00:01] Carregando dataset: iris.csv",
      "[00:02] ✓ Dataset carregado: 150 samples, 4 features",
      "[00:03] Dividindo dados: 80% treino, 20% teste",
      "[00:04] ✓ Train: 120 samples | Test: 30 samples",
      "[00:05] Inicializando Random Forest Classifier...",
      "[00:07] Treinando modelo...",
      "[00:10] Epoch 1/3 - Loss: 0.45, Accuracy: 0.82",
      "[00:13] Epoch 2/3 - Loss: 0.31, Accuracy: 0.88",
      "[00:16] Epoch 3/3 - Loss: 0.27, Accuracy: 0.91",
      "[00:17] ✓ Treino concluído",
      "[00:18] Avaliando modelo no conjunto de teste...",
      "[00:19] ✓ Avaliação concluída",
      "[00:20] Guardando modelo no registry...",
      "[00:21] ✓ Modelo registado: iris_v1.2.3",
      "[00:22] Iniciando deployment...",
      "[00:24] ✓ Deployment concluído - Endpoint: /api/predict",
      "[00:25] Pipeline finalizado com sucesso! 🎉",
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < simulatedLogs.length) {
        setLogs((prev) => [...prev, simulatedLogs[index]]);
        index++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setResults({
          accuracy: 0.91,
          loss: 0.27,
          trainingTime: "25s",
          modelVersion: "iris_v1.2.3",
          endpoint: "/api/predict",
        });
      }
    }, 500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Simulação de Treino</h1>
              <p className="text-lg text-muted-foreground">
                Executa uma simulação de treino MLOps completa e observa o processo em tempo real
              </p>
            </div>
          </div>
        </section>

        {/* Simulation Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-6">
              {/* Control Panel */}
              <Card>
                <CardHeader>
                  <CardTitle>Controlo de Simulação</CardTitle>
                  <CardDescription>
                    Inicia uma simulação de treino de modelo com o dataset Iris
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={runSimulation}
                    disabled={isRunning}
                    className="w-full md:w-auto"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    {isRunning ? "A executar..." : "Run Training"}
                  </Button>
                </CardContent>
              </Card>

              {/* Logs Terminal */}
              {logs.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
                      Logs em Tempo Real
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-96 overflow-y-auto rounded-lg bg-card border border-border p-4 font-mono text-sm">
                      {logs.map((log, index) => (
                        <div
                          key={index}
                          className="animate-fade-in mb-1 text-muted-foreground"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          {log}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Results */}
              {results && (
                <div className="animate-fade-in-up space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Resultados do Treino</h2>
                    <Badge variant="outline" className="bg-success/10 text-success border-success">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Deploy Concluído
                    </Badge>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Accuracy</p>
                            <p className="text-3xl font-bold text-success">
                              {(results.accuracy * 100).toFixed(1)}%
                            </p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-success" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Loss</p>
                            <p className="text-3xl font-bold">{results.loss}</p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Tempo</p>
                            <p className="text-3xl font-bold">{results.trainingTime}</p>
                          </div>
                          <Clock className="h-8 w-8 text-accent" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Versão</p>
                          <p className="text-xl font-bold">{results.modelVersion}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {results.endpoint}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Simulation;
