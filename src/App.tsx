import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import AcademicNavbar from "./sections/academic/components/AcademicNavbar";
import CodingNavbar from "./sections/coding/components/CodingNavbar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Languages from "./pages/Languages";
import CreateRoadmap from "./pages/CreateRoadmap";
import Pricing from "./pages/Pricing";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import DivisionSelection from "./pages/DivisionSelection";
// Academic Section Imports
import AcademicDashboard from "./sections/academic/pages/AcademicDashboard";
import AcademicLearning from "./sections/academic/pages/AcademicLearning";
import AcademicChallenges from "./sections/academic/pages/AcademicChallenges";
// Coding Section Imports
import CodingDashboard from "./sections/coding/pages/CodingDashboard";
import CodingLanguages from "./sections/coding/pages/CodingLanguages";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, requireDivision = true }: { children: React.ReactNode; requireDivision?: boolean }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen onComplete={() => {}} />;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // If we require division selection and user hasn't selected one, redirect to division selection
  // For now, we'll assume all authenticated users need to go through division selection
  // You can add logic here to check if user has already selected a division
  
  return <>{children}</>;
};

const AppContent = () => {
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/division-selection" element={
          <ProtectedRoute requireDivision={false}>
            <DivisionSelection />
          </ProtectedRoute>
        } />
        
        {/* Academic Section Routes */}
        <Route path="/academic/dashboard" element={
          <ProtectedRoute>
            <AcademicNavbar />
            <AcademicDashboard />
          </ProtectedRoute>
        } />
        <Route path="/academic/learning" element={
          <ProtectedRoute>
            <AcademicNavbar />
            <AcademicLearning />
          </ProtectedRoute>
        } />
        <Route path="/academic/challenges" element={
          <ProtectedRoute>
            <AcademicNavbar />
            <AcademicChallenges />
          </ProtectedRoute>
        } />
        <Route path="/academic/games" element={
          <ProtectedRoute>
            <AcademicNavbar />
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-4">Math Games Coming Soon!</h1>
                <p className="text-muted-foreground">Interactive math games are being developed.</p>
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/academic/progress" element={
          <ProtectedRoute>
            <AcademicNavbar />
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-4">Progress Tracking Coming Soon!</h1>
                <p className="text-muted-foreground">Detailed progress analytics are being developed.</p>
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/academic/achievements" element={
          <ProtectedRoute>
            <AcademicNavbar />
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-4">Achievements Coming Soon!</h1>
                <p className="text-muted-foreground">Achievement system is being developed.</p>
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/academic/social" element={
          <ProtectedRoute>
            <AcademicNavbar />
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-4">Social Learning Coming Soon!</h1>
                <p className="text-muted-foreground">Social learning features are being developed.</p>
              </div>
            </div>
          </ProtectedRoute>
        } />
        
        {/* Coding Section Routes */}
        <Route path="/coding/dashboard" element={
          <ProtectedRoute>
            <CodingNavbar />
            <CodingDashboard />
          </ProtectedRoute>
        } />
        <Route path="/coding/languages" element={
          <ProtectedRoute>
            <CodingNavbar />
            <CodingLanguages />
          </ProtectedRoute>
        } />
        <Route path="/coding/roadmaps" element={
          <ProtectedRoute>
            <CodingNavbar />
            <CreateRoadmap />
          </ProtectedRoute>
        } />
        <Route path="/coding/leaderboard" element={
          <ProtectedRoute>
            <CodingNavbar />
            <Leaderboard />
          </ProtectedRoute>
        } />
        <Route path="/coding/pricing" element={
          <ProtectedRoute>
            <CodingNavbar />
            <Pricing />
          </ProtectedRoute>
        } />
        
        {/* Legacy Routes for Backward Compatibility */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Navbar />
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/languages" element={
          <ProtectedRoute>
            <Navbar />
            <Languages />
          </ProtectedRoute>
        } />
        <Route path="/create-roadmap" element={
          <ProtectedRoute>
            <Navbar />
            <CreateRoadmap />
          </ProtectedRoute>
        } />
        <Route path="/roadmaps/create" element={
          <ProtectedRoute>
            <Navbar />
            <CreateRoadmap />
          </ProtectedRoute>
        } />
        <Route path="/pricing" element={
          <ProtectedRoute>
            <Navbar />
            <Pricing />
          </ProtectedRoute>
        } />
        <Route path="/leaderboard" element={
          <ProtectedRoute>
            <Navbar />
            <Leaderboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
