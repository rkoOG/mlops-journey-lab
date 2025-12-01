import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Award, Download, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getSpecificTrailProgress } from "@/lib/storage";

// Títulos dos cursos
const trailTitles: Record<string, string> = {
  "mlops-fundamentals": "MLOps Fundamentals",
  "cicd-ml": "CI/CD para ML",
  "experiment-tracking": "Experiment Tracking & Registry",
  "monitoring-drift": "Monitorização & Drift",
  "chatbots-llm": "Chatbots & LLM Ops",
};

// Nº de módulos por curso
const trailModulesCount: Record<string, number> = {
  "mlops-fundamentals": 6,
  "cicd-ml": 5,
  "experiment-tracking": 4,
  "monitoring-drift": 5,
  "chatbots-llm": 7,
};

// Carga horária
const trailHours: Record<string, string> = {
  "mlops-fundamentals": "8 horas",
  "cicd-ml": "6 horas",
  "experiment-tracking": "5 horas",
  "monitoring-drift": "7 horas",
  "chatbots-llm": "10 horas",
};

export default function AcademyCertificate() {
  const { trailId } = useParams();
  const currentTrailId = trailId as string;

  const progress = getSpecificTrailProgress(currentTrailId);

  const courseTitle =
    trailTitles[currentTrailId] ?? "Curso de MLOps Explorer";

  const storedName =
    (typeof window !== "undefined" &&
      window.localStorage.getItem("studentName")) ||
    "";

  const [name, setName] = useState(storedName);
  const [saved, setSaved] = useState(storedName !== "");

  const completedModules = progress?.completedModules?.length || 0;
  const totalModules = trailModulesCount[currentTrailId] || 0;
  const isCourseComplete =
    totalModules > 0 && completedModules === totalModules;

  const hours = trailHours[currentTrailId] || "—";

  // ------ FORM PARA INSERIR NOME ------
  if (isCourseComplete && !saved) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-16 max-w-xl text-center">
            <h1 className="text-3xl font-bold mb-4">
              Introduz o teu nome
            </h1>
            <p className="text-muted-foreground mb-6">
              O nome será usado para gerar o certificado.
            </p>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="O teu nome completo"
              className="w-full p-3 border rounded-lg mb-4 text-center"
            />

            <Button
              className="w-full bg-academy hover:bg-academy/80 text-academy-foreground"
              disabled={name.trim().length < 3}
              onClick={() => {
                window.localStorage.setItem("studentName", name.trim());
                setSaved(true);
              }}
            >
              Guardar Nome
            </Button>

            <Button variant="ghost" className="mt-4" asChild>
              <Link to={`/academy/trail/${trailId}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao curso
              </Link>
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // ------ CERTIFICADO NORMAL ------
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {!isCourseComplete ? (
            <div className="max-w-xl mx-auto text-center mt-16">
              <h1 className="text-2xl font-bold mb-4">
                Certificado ainda bloqueado
              </h1>
              <p className="text-muted-foreground mb-6">
                Para desbloquear o certificado tens de concluir todas as aulas.
              </p>
              <Button asChild variant="default">
                <Link to={`/academy/trail/${trailId}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao curso
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <Button variant="ghost" asChild>
                  <Link to={`/academy/trail/${trailId}`}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar ao curso
                  </Link>
                </Button>

                <Button
                  className="bg-academy hover:bg-academy/80 text-academy-foreground"
                  onClick={() => window.print()}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Imprimir / Guardar em PDF
                </Button>
              </div>

              <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl border border-border p-10 certificate-print">
                <div className="flex justify-center mb-6">
                  <Award className="h-12 w-12 text-academy" />
                </div>

                <p className="text-center text-sm tracking-[0.25em] uppercase text-muted-foreground mb-4">
                  Certificado de Conclusão
                </p>

                <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
                  {courseTitle}
                </h1>

                <p className="text-center text-muted-foreground mb-2">
                  Este certificado comprova que
                </p>

                <p className="text-2xl font-semibold text-center mb-6">
                  {name}
                </p>

                <p className="text-center text-muted-foreground mb-8">
                  concluiu com sucesso o curso{" "}
                  <span className="font-semibold">{courseTitle}</span> na
                  plataforma <span className="font-semibold">MLOps Explorer</span>,  
                  completando {totalModules} módulos e todas as aulas
                  obrigatórias.
                </p>

                <div className="flex justify-between items-center mt-10 text-sm text-muted-foreground">
                  <div>
                    <p className="font-semibold">Data</p>
                    <p>
                      {new Date().toLocaleDateString("pt-PT", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="h-px w-40 bg-border mx-auto mb-2" />
                    <p className="font-semibold">MLOps Explorer</p>
                    <p>Formação Online em MLOps & LLMOps</p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">Carga horária</p>
                    <p>{hours}</p>
                  </div>
                </div>
              </div>

              <style>
                {`
                  @media print {
                    body {
                      background: white;
                    }
                    nav, footer {
                      display: none !important;
                    }
                    .certificate-print {
                      box-shadow: none !important;
                      border: none !important;
                    }
                    button {
                      display: none !important;
                    }
                  }
                `}
              </style>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
