import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Languages from "./pages/Languages";
import CreateRoadmap from "./pages/CreateRoadmap";
import Pricing from "./pages/Pricing";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showMainApp, setShowMainApp] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowMainApp(true), 300);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (!showMainApp) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={
              <>
                <Navbar />
                <Dashboard />
              </>
            } />
            <Route path="/languages" element={
              <>
                <Navbar />
                <Languages />
              </>
            } />
            <Route path="/roadmaps/create" element={
              <>
                <Navbar />
                <CreateRoadmap />
              </>
            } />
            <Route path="/pricing" element={
              <>
                <Navbar />
                <Pricing />
              </>
            } />
            <Route path="/leaderboard" element={
              <>
                <Navbar />
                <Leaderboard />
              </>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
