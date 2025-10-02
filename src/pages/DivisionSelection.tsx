import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Code, 
  Users, 
  Trophy, 
  Target, 
  Sparkles,
  ArrowRight,
  Clock,
  Star,
  Zap
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const DivisionSelection = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'Developer';

  useEffect(() => {
    // Check if user is a teacher and redirect accordingly
    const checkUserRole = async () => {
      if (user) {
        const { data: userRole } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();

        if (userRole?.role === 'teacher') {
          navigate('/teacher/dashboard');
        }
      }
    };

    checkUserRole();
  }, [user, navigate]);

  const divisions = [
    {
      id: '6-12',
      title: '6-12 Academic Section',
      description: 'Comprehensive academic learning for middle and high school students',
      ageRange: '6-12 Grade',
      features: [
        'NCERT & CBSE curriculum aligned',
        'Interactive Mathematics learning',
        'Gamified problem solving',
        'Grade-wise progression system',
        'Academic achievement tracking',
        'Board exam preparation'
      ],
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/50',
      textColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      difficulty: 'Academic Standards',
      estimatedTime: '45-60 min/day',
      coursesCount: '7 Grades • Mathematics Focus',
      projectsCount: '500+ Practice Problems'
    },
    {
      id: 'coding-era',
      title: 'Coding Era',
      description: 'Advanced programming for teens and adults',
      ageRange: '13+ years',
      features: [
        'Professional programming languages',
        'Real-world projects',
        'Industry best practices',
        'Career-focused learning',
        'Advanced algorithms & data structures'
      ],
      icon: Code,
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/50',
      textColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      difficulty: 'Intermediate to Advanced',
      estimatedTime: '1-2 hours/day',
      coursesCount: '25+ Courses',
      projectsCount: '100+ Projects'
    }
  ];

  const handleDivisionSelect = async (divisionId: string) => {
    setLoading(true);
    setSelectedDivision(divisionId);

    try {
      // Here you could save the division preference to the user's profile
      // For now, we'll just navigate to the dashboard with the division context
      
      toast({
        title: "Division Selected!",
        description: `Welcome to ${divisions.find(d => d.id === divisionId)?.title}! Let's start learning.`,
      });

      // Navigate to dashboard with division context
      setTimeout(() => {
        if (divisionId === '6-12') {
          navigate('/academic/dashboard');
        } else {
          navigate('/coding/dashboard');
        }
      }, 1000);
    } catch (error) {
      console.error('Error selecting division:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
      setSelectedDivision(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-golden" />
            <span className="text-2xl font-bold text-foreground">Hello World</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome, <span className="text-golden">{userName}!</span> 🎉
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your learning path to get started with a personalized coding experience
          </p>
        </div>

        {/* Division Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {divisions.map((division) => {
            const Icon = division.icon;
            const isSelected = selectedDivision === division.id;
            const isLoading = loading && isSelected;
            
            return (
              <Card 
                key={division.id}
                className={`relative overflow-hidden transition-all duration-300 hover-scale cursor-pointer ${
                  isSelected 
                    ? `${division.borderColor} border-2 shadow-lg` 
                    : 'border-border/50 hover:border-accent/50'
                } ${isLoading ? 'opacity-75' : ''}`}
                onClick={() => !loading && handleDivisionSelect(division.id)}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${division.color} opacity-5`} />
                
                <CardHeader className="relative">
                  <div className="flex items-start justify-between">
                    <div className={`w-16 h-16 rounded-full ${division.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className={`w-8 h-8 ${division.textColor}`} />
                    </div>
                    <Badge variant="outline" className={`${division.borderColor} ${division.textColor}`}>
                      {division.ageRange}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-2xl text-foreground mb-2">
                    {division.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {division.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className={`text-lg font-bold ${division.textColor}`}>
                        {division.coursesCount}
                      </div>
                      <div className="text-xs text-muted-foreground">Courses</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${division.textColor}`}>
                        {division.projectsCount}
                      </div>
                      <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${division.textColor}`}>
                        {division.estimatedTime}
                      </div>
                      <div className="text-xs text-muted-foreground">Per Day</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Star className="w-4 h-4 text-golden" />
                      What you'll learn:
                    </h4>
                    <ul className="space-y-2">
                      {division.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Zap className="w-3 h-3 text-golden flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Difficulty & Time */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Difficulty:</span>
                      <span className={`font-medium ${division.textColor}`}>
                        {division.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{division.estimatedTime}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className={`w-full ${isSelected ? 'bg-golden hover:bg-golden/90' : ''}`}
                    disabled={loading}
                    variant={isSelected ? 'default' : 'outline'}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Setting up your journey...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {isSelected ? 'Selected!' : 'Choose This Path'}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Join 50,000+ learners</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>Earn certificates</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Interactive learning</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Don't worry, you can switch between divisions anytime from your dashboard settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default DivisionSelection;