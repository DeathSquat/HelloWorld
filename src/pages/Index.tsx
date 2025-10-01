import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StarField from '@/components/StarField';
import { Code, BookOpen, MapPin, Users, ArrowRight, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear guest session when on landing page
    localStorage.removeItem('guestSessionStart');
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated Star Background */}
      <StarField />
      
      {/* Main Landing Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center space-y-8 animate-float max-w-4xl mx-auto">
          {/* Logo and Title */}
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Code className="w-16 h-16 text-golden animate-pulse" />
              {/* <div className="text-6xl md:text-8xl text-golden font-bold animate-glow">
                ॐ
              </div> */}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-golden devanagari mb-4">
              Hello World
            </h1>
            
            <h2 className="text-2xl md:text-4xl font-semibold text-golden/90 mb-4">
              Your Coding Journey Starts Here
            </h2>
            
            <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto leading-relaxed">
              Master programming through personalized roadmaps, interactive lessons, and a vibrant community of Indian developers.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg p-6 hover:border-golden/30 transition-colors">
              <BookOpen className="w-8 h-8 text-golden mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Interactive Lessons</h3>
              <p className="text-sm text-muted-foreground">Learn Python, Java, C++, and more with hands-on coding exercises</p>
            </div>
            
            <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg p-6 hover:border-golden/30 transition-colors">
              <MapPin className="w-8 h-8 text-golden mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">AI Roadmaps</h3>
              <p className="text-sm text-muted-foreground">Personalized learning paths with YouTube videos and Coursera courses</p>
            </div>
            
            <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg p-6 hover:border-golden/30 transition-colors">
              <Users className="w-8 h-8 text-golden mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Indian Community</h3>
              <p className="text-sm text-muted-foreground">Join thousands of Indian developers on their coding journey</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-golden hover:bg-golden/90 text-primary-foreground px-8 py-4 text-lg">
                      Continue Learning
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  
                  <Link to="/languages">
                    <Button size="lg" variant="outline" className="border-golden text-golden hover:bg-golden/10 px-8 py-4 text-lg">
                      Browse Languages
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/division-selection">
                    <Button size="lg" className="bg-golden hover:bg-golden/90 text-primary-foreground px-8 py-4 text-lg">
                      Start Learning as Guest
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  
                  <Link to="/auth">
                    <Button size="lg" variant="outline" className="border-golden text-golden hover:bg-golden/10 px-8 py-4 text-lg">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In / Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground">
              Free to start • Premium features available • Made for Indians 🇮🇳
            </p>
          </div>

          {/* Footer */}
          <div className="mt-20 pt-8 border-t border-border/30">
            <p className="text-sm text-muted-foreground">
              Crafted with{' '}
              <span className="text-red-400 animate-pulse">♥</span>{' '}
              for Indian developers
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
