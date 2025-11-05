import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, Clock, Activity } from "lucide-react";
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

const accuracyData = [
  { time: "00:00", accuracy: 0.85 },
  { time: "04:00", accuracy: 0.87 },
  { time: "08:00", accuracy: 0.89 },
  { time: "12:00", accuracy: 0.91 },
  { time: "16:00", accuracy: 0.90 },
  { time: "20:00", accuracy: 0.88 },
  { time: "24:00", accuracy: 0.89 },
];

const latencyData = [
  { endpoint: "/predict", latency: 120 },
  { endpoint: "/classify", latency: 95 },
  { endpoint: "/inference", latency: 140 },
  { endpoint: "/batch", latency: 180 },
];

const Dashboard = () => {
  const driftLevel = 2.3;
  const isDriftHigh = driftLevel > 2.0;

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
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Accuracy Atual</p>
                        <p className="text-3xl font-bold text-success">89%</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-success" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Latência Média</p>
                        <p className="text-3xl font-bold">120ms</p>
                      </div>
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Data Drift</p>
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
                        <p className="text-sm text-muted-foreground">Uptime</p>
                        <p className="text-3xl font-bold">99.9%</p>
                      </div>
                      <Activity className="h-8 w-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Alerts */}
              {isDriftHigh && (
                <Card className="border-warning/50 bg-warning/5">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-1 h-5 w-5 text-warning" />
                      <div className="flex-1">
                        <h3 className="mb-1 font-semibold">Alerta de Data Drift</h3>
                        <p className="text-sm text-muted-foreground">
                          Foi detetado drift nos dados de entrada. Nível atual: {driftLevel}%
                          (limiar: 2.0%). Considera retreinar o modelo.
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
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Accuracy Over Time */}
                <Card>
                  <CardHeader>
                    <CardTitle>Accuracy ao Longo do Tempo</CardTitle>
                    <CardDescription>Últimas 24 horas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={accuracyData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="time" className="text-xs" />
                        <YAxis domain={[0.8, 1]} className="text-xs" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
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
                  </CardContent>
                </Card>

                {/* Latency by Endpoint */}
                <Card>
                  <CardHeader>
                    <CardTitle>Latência por Endpoint</CardTitle>
                    <CardDescription>Média em milissegundos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={latencyData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="endpoint" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar
                          dataKey="latency"
                          fill="hsl(var(--primary))"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
