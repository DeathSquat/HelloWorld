import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Calculator,
  User, 
  Menu, 
  X, 
  BookOpen, 
  Target, 
  Award, 
  Settings,
  LogOut,
  Home,
  TrendingUp,
  Trophy,
  Users,
  Calendar,
  Gamepad2
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ThemeToggle';

const AcademicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/academic/dashboard', icon: BookOpen },
    { name: 'Learning', path: '/academic/learning', icon: Calculator },
    { name: 'Challenges', path: '/academic/challenges', icon: Target },
    { name: 'Games', path: '/academic/games', icon: Gamepad2 },
    { name: 'Progress', path: '/academic/progress', icon: TrendingUp },
    { name: 'Achievements', path: '/academic/achievements', icon: Trophy },
    { name: 'Social', path: '/academic/social', icon: Users },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-md border-b border-blue-500/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/academic/dashboard" className="flex items-center space-x-2">
              <Calculator className="w-8 h-8 text-blue-400" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-blue-400">Hello World</span>
                <span className="text-xs text-blue-300">Academic Learning</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'text-muted-foreground hover:text-blue-300 hover:bg-blue-500/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30">
              <Award className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">4,860 pts</span>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-blue-500/10">
                  <User className="w-4 h-4" />
                  <span className="max-w-24 truncate">{user?.user_metadata?.full_name || user?.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/academic/dashboard')}>
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/division-selection')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Switch Division
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:bg-blue-500/10"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/95 backdrop-blur-sm rounded-lg mt-2 border border-blue-500/20">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === item.path
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'text-muted-foreground hover:text-blue-300 hover:bg-blue-500/10'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="border-t border-blue-500/20 pt-3 mt-3">
                <div className="flex items-center justify-center px-3 py-2 mb-2">
                  <ThemeToggle />
                </div>
                
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-8 h-8 p-1 rounded-full bg-blue-500/20 text-blue-300" />
                    <span className="font-medium truncate max-w-32">{user?.user_metadata?.full_name || user?.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-400 text-sm">
                    <Award className="w-4 h-4" />
                    <span>4,860 pts</span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/division-selection');
                  }}
                  className="w-full justify-start text-blue-300 hover:text-blue-200 hover:bg-blue-500/10 mt-2"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Switch Division
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10 mt-1"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AcademicNavbar;