import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/login";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Glossary from "./pages/Glossary";
import Academy from "./pages/Academy";
import AcademyTrail from "./pages/AcademyTrail";
import AcademyModule from "./pages/AcademyModule";
import AcademyProgress from "./pages/AcademyProgress";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/academy" element={<ProtectedRoute><Academy /></ProtectedRoute>} />
            <Route path="/academy/trail/:trailId" element={<ProtectedRoute><AcademyTrail /></ProtectedRoute>} />
            <Route path="/academy/trail/:trailId/module/:moduleId" element={<ProtectedRoute><AcademyModule /></ProtectedRoute>} />
            <Route path="/academy/progress" element={<ProtectedRoute><AcademyProgress /></ProtectedRoute>} />
            <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
            <Route path="/glossary" element={<ProtectedRoute><Glossary /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Chatbot removido do global; renderizado só na Home */}
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
