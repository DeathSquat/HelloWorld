import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Code,
  BookOpen,
  PlayCircle,
  Clock,
  Star,
  Target,
  Trophy,
  Lock,
  CheckCircle,
  ArrowRight,
  Download,
  ExternalLink
} from 'lucide-react';

const CodingLanguages = () => {
  const [selectedCategory, setSelectedCategory] = useState('popular');

  const categories = [
    { id: 'popular', name: 'Popular Languages' },
    { id: 'beginner', name: 'Beginner Friendly' },
    { id: 'advanced', name: 'Advanced' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Development' }
  ];

  const languages = {
    popular: [
      {
        id: 1,
        name: 'Python',
        icon: '🐍',
        description: 'Easy to learn, powerful programming language',
        difficulty: 'Beginner',
        progress: 75,
        lessons: 50,
        completed: 38,
        projects: 12,
        unlocked: true,
        features: ['Data Science', 'Web Development', 'Automation', 'AI/ML'],
        estimatedTime: '8-12 weeks'
      },
      {
        id: 2,
        name: 'JavaScript',
        icon: '🌐',
        description: 'The language of the web - frontend and backend',
        difficulty: 'Beginner',
        progress: 45,
        lessons: 60,
        completed: 27,
        projects: 8,
        unlocked: true,
        features: ['Web Development', 'Node.js', 'React', 'Vue.js'],
        estimatedTime: '10-14 weeks'
      },
      {
        id: 3,
        name: 'Java',
        icon: '☕',
        description: 'Object-oriented programming for enterprise applications',
        difficulty: 'Intermediate',
        progress: 30,
        lessons: 55,
        completed: 17,
        projects: 5,
        unlocked: true,
        features: ['Enterprise Apps', 'Android', 'Spring Framework', 'Microservices'],
        estimatedTime: '12-16 weeks'
      },
      {
        id: 4,
        name: 'C++',
        icon: '⚡',
        description: 'High-performance programming language',
        difficulty: 'Advanced',
        progress: 0,
        lessons: 65,
        completed: 0,
        projects: 0,
        unlocked: false,
        features: ['System Programming', 'Game Development', 'Performance Critical'],
        estimatedTime: '16-20 weeks'
      }
    ],
    beginner: [
      {
        id: 1,
        name: 'Python',
        icon: '🐍',
        description: 'Perfect first programming language',
        difficulty: 'Beginner',
        progress: 75,
        lessons: 50,
        completed: 38,
        projects: 12,
        unlocked: true,
        features: ['Simple Syntax', 'Great Community', 'Versatile'],
        estimatedTime: '8-12 weeks'
      },
      {
        id: 2,
        name: 'Scratch',
        icon: '🎨',
        description: 'Visual programming for beginners',
        difficulty: 'Beginner',
        progress: 100,
        lessons: 25,
        completed: 25,
        projects: 10,
        unlocked: true,
        features: ['Visual Programming', 'No Syntax', 'Game Creation'],
        estimatedTime: '4-6 weeks'
      }
    ]
  };

  const currentLanguages = languages[selectedCategory as keyof typeof languages] || languages.popular;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Code className="w-8 h-8 text-purple-400" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Programming Languages</h1>
            <p className="text-muted-foreground">Master the languages that power the digital world</p>
          </div>
        </div>

        {/* Category Selection */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? 'bg-purple-500 hover:bg-purple-600' : 'hover:bg-purple-500/10'}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Languages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentLanguages.map((language) => (
          <Card 
            key={language.id} 
            className={`relative overflow-hidden transition-all duration-300 hover-scale ${
              language.unlocked 
                ? 'bg-card/50 backdrop-blur-sm border-border/50 hover:border-purple-500/30' 
                : 'bg-card/20 border-border/30 opacity-75'
            }`}
          >
            {!language.unlocked && (
              <div className="absolute top-4 right-4">
                <Lock className="w-5 h-5 text-muted-foreground" />
              </div>
            )}
            
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-xl text-foreground mb-2 flex items-center gap-3">
                    <span className="text-2xl">{language.icon}</span>
                    <div>
                      {language.name}
                      {language.progress === 100 && <CheckCircle className="w-5 h-5 text-emerald-400 inline ml-2" />}
                    </div>
                  </CardTitle>
                  <Badge variant="outline" className={`text-xs w-fit mb-3 ${
                    language.difficulty === 'Beginner' ? 'border-emerald-500/50 text-emerald-400' :
                    language.difficulty === 'Intermediate' ? 'border-yellow-500/50 text-yellow-400' :
                    'border-red-500/50 text-red-400'
                  }`}>
                    {language.difficulty}
                  </Badge>
                  <p className="text-sm text-muted-foreground mb-3">{language.description}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {language.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress */}
              {language.unlocked && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">{language.progress}%</span>
                  </div>
                  <Progress 
                    value={language.progress} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{language.completed}/{language.lessons} lessons completed</span>
                    <span>{language.projects} projects</span>
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Estimated Time</div>
                  <div className="font-semibold text-purple-400">{language.estimatedTime}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Total Lessons</div>
                  <div className="font-semibold text-blue-400">{language.lessons}</div>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className={`w-full ${
                  language.unlocked 
                    ? language.progress === 0 
                      ? 'bg-purple-500 hover:bg-purple-600' 
                      : language.progress === 100
                        ? 'bg-emerald-500 hover:bg-emerald-600'
                        : 'bg-golden hover:bg-golden/90'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
                disabled={!language.unlocked}
              >
                {language.unlocked ? (
                  <>
                    {language.progress === 0 ? (
                      <>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Start Learning
                      </>
                    ) : language.progress === 100 ? (
                      <>
                        <Trophy className="w-4 h-4 mr-2" />
                        View Certificate
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Continue Learning
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Complete Prerequisites
                  </>
                )}
              </Button>

              {/* Additional Actions */}
              {language.unlocked && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Docs
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Examples
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Path Recommendation */}
      <Card className="mt-8 bg-gradient-to-r from-purple-500/10 to-pink-500/5 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-400" />
            Recommended Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Based on your progress and goals, here's your personalized learning path:
            </p>
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <div className="flex items-center gap-2 min-w-fit bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium">1. Python Basics</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 min-w-fit bg-golden/10 border border-golden/20 rounded-lg p-3">
                <Clock className="w-5 h-5 text-golden" />
                <span className="text-sm font-medium">2. JavaScript Fundamentals</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 min-w-fit bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <Target className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">3. Web Development</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 min-w-fit bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                <Lock className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">4. Advanced Topics</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodingLanguages;