import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pipeline from "./pages/Pipeline";
import Simulation from "./pages/Simulation";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Glossary from "./pages/Glossary";
import Academy from "./pages/Academy";
import AcademyTrail from "./pages/AcademyTrail";
import AcademyModule from "./pages/AcademyModule";
import AcademyCourse from "./pages/AcademyCourse";
import AcademyProgress from "./pages/AcademyProgress";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/academy/trail/:trailId" element={<AcademyTrail />} />
          <Route path="/academy/trail/:trailId/module/:moduleId" element={<AcademyModule />} />
          <Route path="/academy/course/:courseId" element={<AcademyCourse />} />
          <Route path="/academy/progress" element={<AcademyProgress />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
