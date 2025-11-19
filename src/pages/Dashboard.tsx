import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, Clock, Activity, BarChart3 } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getSimulationStats, getSimulationResults } from "@/lib/storage";

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [accuracyData, setAccuracyData] = useState<any[]>([]);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const simulationStats = getSimulationStats();
    const simulations = getSimulationResults();
    
    setStats(simulationStats);
    setHasData(simulations.length > 0);

    // Prepare accuracy over time data
    const recentSims = simulations.slice(-7);
    const chartData = recentSims.map((sim, idx) => {
      const date = new Date(sim.timestamp);
      return {
        time: date.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' }),
        accuracy: sim.accuracy,
      };
    });
    setAccuracyData(chartData);
  }, []);

  // Calculate drift based on variance in recent accuracies
  const calculateDrift = () => {
    if (!stats || stats.recentAccuracies.length < 2) return 0;
    const accuracies = stats.recentAccuracies.map((r: any) => r.accuracy);
    const mean = accuracies.reduce((a: number, b: number) => a + b, 0) / accuracies.length;
    const variance = accuracies.reduce((sum: number, acc: number) => sum + Math.pow(acc - mean, 2), 0) / accuracies.length;
    return (Math.sqrt(variance) * 100).toFixed(1);
  };

  const driftLevel = parseFloat(calculateDrift());
  const isDriftHigh = driftLevel > 2.0;
  
  const currentAccuracy = stats && stats.recentAccuracies.length > 0 
    ? stats.recentAccuracies[stats.recentAccuracies.length - 1].accuracy 
    : 0;
  
  const avgLatency = 100 + Math.floor(Math.random() * 50); // Simulated

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Dashboard de Monitorização</h1>
              <p className="text-lg text-muted-foreground">
                Acompanha métricas de performance, detecção de drift e saúde do modelo em produção
              </p>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="space-y-6">
              {/* Quick Stats */}
              {!hasData ? (
                <Card className="col-span-full">
                  <CardContent className="p-12 text-center">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Sem Dados Disponíveis</h3>
                    <p className="text-muted-foreground mb-4">
                      Executa algumas simulações de treino para ver métricas e gráficos aqui.
                    </p>
                    <a href="/simulation">
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                        Ir para Simulação
                      </button>
                    </a>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Accuracy Atual</p>
                            <p className="text-3xl font-bold text-success">{(currentAccuracy * 100).toFixed(1)}%</p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-success" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Média Geral</p>
                            <p className="text-3xl font-bold">{(stats.avgAccuracy * 100).toFixed(1)}%</p>
                          </div>
                          <Activity className="h-8 w-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Variação</p>
                            <p className="text-3xl font-bold">{driftLevel}%</p>
                          </div>
                          <AlertTriangle
                            className={`h-8 w-8 ${isDriftHigh ? "text-warning" : "text-success"}`}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Simulações</p>
                            <p className="text-3xl font-bold">{stats.totalRuns}</p>
                          </div>
                          <BarChart3 className="h-8 w-8 text-accent" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}

              {/* Alerts */}
              {hasData && isDriftHigh && (
                <Card className="border-warning/50 bg-warning/5">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-1 h-5 w-5 text-warning" />
                      <div className="flex-1">
                        <h3 className="mb-1 font-semibold">Alerta de Variação de Performance</h3>
                        <p className="text-sm text-muted-foreground">
                          Foi detetada alta variação na performance entre simulações. Variação: {driftLevel}%
                          (limiar: 2.0%). Isto pode indicar instabilidade no processo de treino.
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning">
                        Ativo
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Charts */}
              {hasData && (
                <div className="grid gap-6 lg:grid-cols-1">
                  {/* Accuracy Over Time */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Histórico de Accuracy</CardTitle>
                      <CardDescription>Últimas {accuracyData.length} simulações</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {accuracyData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={accuracyData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="time" className="text-xs" />
                            <YAxis domain={[0.6, 1]} className="text-xs" />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                              }}
                              formatter={(value: any) => `${(value * 100).toFixed(1)}%`}
                            />
                            <Line
                              type="monotone"
                              dataKey="accuracy"
                              stroke="hsl(var(--success))"
                              strokeWidth={2}
                              dot={{ fill: "hsl(var(--success))" }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      ) : (
                        <p className="text-center text-muted-foreground py-8">Sem dados suficientes</p>
                      )}
                    </CardContent>
                  </Card>
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

export default Dashboard;
