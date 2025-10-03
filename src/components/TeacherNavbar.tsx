import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, LogOut, BarChart3 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/ThemeToggle';

const TeacherNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out.",
    });
    navigate('/auth');
  };

  return (
    <nav className="bg-gradient-to-r from-golden/10 to-orange-500/10 backdrop-blur-md border-b border-golden/20 fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/teacher/dashboard" className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-golden" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-golden">Hello World</span>
                <span className="text-xs text-golden/80">Teacher Portal</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <Link
              to="/teacher/dashboard"
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/teacher/dashboard'
                  ? 'bg-golden/20 text-golden border border-golden/30'
                  : 'text-muted-foreground hover:text-golden hover:bg-golden/10'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">{user?.user_metadata?.full_name || user?.email}</span>
            </div>

            <Button 
              onClick={handleSignOut} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2 border-golden/30 hover:bg-golden/10"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TeacherNavbar;
