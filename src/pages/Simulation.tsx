import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, CheckCircle, TrendingUp, Clock, Zap, AlertTriangle, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { saveSimulationResult } from "@/lib/storage";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type TrainingScenario = {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
};

const scenarios: TrainingScenario[] = [
  {
    id: "optimal",
    name: "Treino Ótimo",
    description: "Convergência saudável com boa generalização",
    icon: CheckCircle,
    color: "text-success",
  },
  {
    id: "overfitting",
    name: "Overfitting",
    description: "Modelo memoriza dados de treino mas falha no teste",
    icon: AlertTriangle,
    color: "text-warning",
  },
  {
    id: "underfitting",
    name: "Underfitting",
    description: "Modelo muito simples, não aprende padrões",
    icon: TrendingDown,
    color: "text-destructive",
  },
  {
    id: "fast",
    name: "Treino Rápido",
    description: "Convergência rápida com bom resultado",
    icon: Zap,
    color: "text-primary",
  },
];

const Simulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [results, setResults] = useState<any>(null);
  const [selectedScenario, setSelectedScenario] = useState<string>("optimal");

  const generateScenarioData = (scenario: string) => {
    const baseVersion = `iris_v${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`;
    
    switch (scenario) {
      case "optimal":
        return {
          epochs: [
            { epoch: 1, trainLoss: 0.52, trainAcc: 0.78, valLoss: 0.49, valAcc: 0.80 },
            { epoch: 2, trainLoss: 0.35, trainAcc: 0.87, valLoss: 0.36, valAcc: 0.86 },
            { epoch: 3, trainLoss: 0.28, trainAcc: 0.91, valLoss: 0.29, valAcc: 0.90 },
          ],
          finalAccuracy: 0.90 + Math.random() * 0.05,
          finalLoss: 0.28 + Math.random() * 0.05,
          trainingTime: `${20 + Math.floor(Math.random() * 10)}s`,
          version: baseVersion,
          status: "success",
        };
      
      case "overfitting":
        return {
          epochs: [
            { epoch: 1, trainLoss: 0.48, trainAcc: 0.82, valLoss: 0.47, valAcc: 0.81 },
            { epoch: 2, trainLoss: 0.25, trainAcc: 0.93, valLoss: 0.42, valAcc: 0.83 },
            { epoch: 3, trainLoss: 0.12, trainAcc: 0.98, valLoss: 0.58, valAcc: 0.79 },
          ],
          finalAccuracy: 0.78 + Math.random() * 0.04,
          finalLoss: 0.55 + Math.random() * 0.08,
          trainingTime: `${25 + Math.floor(Math.random() * 10)}s`,
          version: baseVersion,
          status: "warning",
        };
      
      case "underfitting":
        return {
          epochs: [
            { epoch: 1, trainLoss: 0.68, trainAcc: 0.65, valLoss: 0.67, valAcc: 0.66 },
            { epoch: 2, trainLoss: 0.64, trainAcc: 0.68, valLoss: 0.65, valAcc: 0.67 },
            { epoch: 3, trainLoss: 0.62, trainAcc: 0.70, valLoss: 0.63, valAcc: 0.69 },
          ],
          finalAccuracy: 0.68 + Math.random() * 0.04,
          finalLoss: 0.62 + Math.random() * 0.05,
          trainingTime: `${15 + Math.floor(Math.random() * 8)}s`,
          version: baseVersion,
          status: "error",
        };
      
      case "fast":
        return {
          epochs: [
            { epoch: 1, trainLoss: 0.42, trainAcc: 0.85, valLoss: 0.40, valAcc: 0.84 },
            { epoch: 2, trainLoss: 0.26, trainAcc: 0.92, valLoss: 0.28, valAcc: 0.91 },
          ],
          finalAccuracy: 0.91 + Math.random() * 0.04,
          finalLoss: 0.27 + Math.random() * 0.04,
          trainingTime: `${10 + Math.floor(Math.random() * 5)}s`,
          version: baseVersion,
          status: "success",
        };
      
      default:
        return generateScenarioData("optimal");
    }
  };

  const runSimulation = () => {
    setIsRunning(true);
    setLogs([]);
    setResults(null);
    
    const scenarioData = generateScenarioData(selectedScenario);
    const scenarioName = scenarios.find(s => s.id === selectedScenario)?.name || "Treino";

    const baseLogs = [
      `[00:00] 🚀 Iniciando ${scenarioName}...`,
      "[00:01] 📂 Carregando dataset: iris.csv",
      "[00:02] ✓ Dataset carregado: 150 samples, 4 features",
      "[00:03] 🔀 Dividindo dados: 80% treino, 20% teste",
      "[00:04] ✓ Train: 120 samples | Test: 30 samples",
      `[00:05] 🤖 Inicializando Random Forest Classifier...`,
      "[00:06] 📊 Configurando hiperparâmetros...",
      "[00:07] 🏋️ Iniciando treino...",
    ];

    const epochLogs = scenarioData.epochs.flatMap((epoch, idx) => [
      `[00:${8 + idx * 3}] Epoch ${epoch.epoch}/${scenarioData.epochs.length}`,
      `[00:${9 + idx * 3}]   Train - Loss: ${epoch.trainLoss.toFixed(3)}, Acc: ${(epoch.trainAcc * 100).toFixed(1)}%`,
      `[00:${10 + idx * 3}]   Val   - Loss: ${epoch.valLoss.toFixed(3)}, Acc: ${(epoch.valAcc * 100).toFixed(1)}%`,
    ]);

    const statusEmoji = scenarioData.status === "success" ? "✓" : scenarioData.status === "warning" ? "⚠️" : "❌";
    const statusMsg = scenarioData.status === "success" 
      ? "Treino concluído com sucesso!" 
      : scenarioData.status === "warning"
      ? "Treino concluído com avisos (possível overfitting)"
      : "Treino concluído - performance abaixo do esperado";

    const endLogs = [
      `[00:${8 + scenarioData.epochs.length * 3}] ${statusEmoji} ${statusMsg}`,
      `[00:${9 + scenarioData.epochs.length * 3}] 🧪 Avaliando modelo no conjunto de teste...`,
      `[00:${10 + scenarioData.epochs.length * 3}] ✓ Test Accuracy: ${(scenarioData.finalAccuracy * 100).toFixed(2)}%`,
      `[00:${11 + scenarioData.epochs.length * 3}] 💾 Guardando modelo no registry...`,
      `[00:${12 + scenarioData.epochs.length * 3}] ✓ Modelo registado: ${scenarioData.version}`,
      `[00:${13 + scenarioData.epochs.length * 3}] 🚀 Iniciando deployment...`,
      `[00:${14 + scenarioData.epochs.length * 3}] ✓ Deployment concluído - Endpoint: /api/predict`,
      `[00:${15 + scenarioData.epochs.length * 3}] 🎉 Pipeline finalizado!`,
    ];

    const allLogs = [...baseLogs, ...epochLogs, ...endLogs];

    let index = 0;
    const interval = setInterval(() => {
      if (index < allLogs.length) {
        setLogs((prev) => [...prev, allLogs[index]]);
        index++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        
        const finalResults = {
          accuracy: scenarioData.finalAccuracy,
          loss: scenarioData.finalLoss,
          trainingTime: scenarioData.trainingTime,
          modelVersion: scenarioData.version,
          endpoint: "/api/predict",
          status: scenarioData.status,
          scenario: scenarioName,
        };
        
        setResults(finalResults);
        
        // Save to localStorage
        saveSimulationResult({
          id: `sim_${Date.now()}`,
          accuracy: scenarioData.finalAccuracy,
          loss: scenarioData.finalLoss,
          trainingTime: scenarioData.trainingTime,
          modelVersion: scenarioData.version,
          scenario: scenarioName,
          timestamp: Date.now(),
        });
        
        toast.success(`Simulação concluída! Accuracy: ${(scenarioData.finalAccuracy * 100).toFixed(1)}%`);
      }
    }, 400);
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
                    Escolhe um cenário de treino e executa a simulação
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Scenario Selector */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Cenário de Treino</label>
                    <Select value={selectedScenario} onValueChange={setSelectedScenario} disabled={isRunning}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {scenarios.map((scenario) => {
                          const Icon = scenario.icon;
                          return (
                            <SelectItem key={scenario.id} value={scenario.id}>
                              <div className="flex items-center gap-2">
                                <Icon className={`h-4 w-4 ${scenario.color}`} />
                                <div className="flex flex-col">
                                  <span className="font-medium">{scenario.name}</span>
                                  <span className="text-xs text-muted-foreground">{scenario.description}</span>
                                </div>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="hero"
                    size="lg"
                    onClick={runSimulation}
                    disabled={isRunning}
                    className="w-full"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    {isRunning ? "A executar..." : "Iniciar Simulação"}
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
                    <Badge 
                      variant="outline" 
                      className={
                        results.status === "success" 
                          ? "bg-success/10 text-success border-success"
                          : results.status === "warning"
                          ? "bg-warning/10 text-warning border-warning"
                          : "bg-destructive/10 text-destructive border-destructive"
                      }
                    >
                      {results.status === "success" && <CheckCircle className="mr-1 h-3 w-3" />}
                      {results.status === "warning" && <AlertTriangle className="mr-1 h-3 w-3" />}
                      {results.status === "error" && <TrendingDown className="mr-1 h-3 w-3" />}
                      {results.status === "success" ? "Deploy Concluído" : results.status === "warning" ? "Aviso: Overfitting" : "Performance Baixa"}
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
