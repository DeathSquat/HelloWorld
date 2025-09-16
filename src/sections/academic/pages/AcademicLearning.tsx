import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calculator,
  BookOpen,
  PlayCircle,
  Clock,
  Star,
  Target,
  Trophy,
  Lock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const AcademicLearning = () => {
  const [selectedGrade, setSelectedGrade] = useState('6');

  const grades = ['6', '7', '8', '9', '10', '11', '12'];
  
  const mathTopics = {
    '6': [
      { 
        id: 1, 
        title: 'Number System', 
        progress: 100, 
        lessons: 12, 
        completed: 12, 
        difficulty: 'Basic',
        unlocked: true,
        description: 'Understanding whole numbers, natural numbers, and their properties'
      },
      { 
        id: 2, 
        title: 'Fractions and Decimals', 
        progress: 85, 
        lessons: 15, 
        completed: 13, 
        difficulty: 'Medium',
        unlocked: true,
        description: 'Converting between fractions and decimals, operations'
      },
      { 
        id: 3, 
        title: 'Basic Geometry', 
        progress: 60, 
        lessons: 18, 
        completed: 11, 
        difficulty: 'Medium',
        unlocked: true,
        description: 'Lines, angles, triangles, and basic geometric shapes'
      },
      { 
        id: 4, 
        title: 'Integers', 
        progress: 25, 
        lessons: 10, 
        completed: 3, 
        difficulty: 'Basic',
        unlocked: true,
        description: 'Positive and negative numbers, operations with integers'
      },
      { 
        id: 5, 
        title: 'Mensuration', 
        progress: 0, 
        lessons: 14, 
        completed: 0, 
        difficulty: 'Advanced',
        unlocked: false,
        description: 'Area and perimeter of basic geometric shapes'
      }
    ],
    '7': [
      { 
        id: 1, 
        title: 'Integers', 
        progress: 90, 
        lessons: 12, 
        completed: 11, 
        difficulty: 'Basic',
        unlocked: true,
        description: 'Advanced operations with integers and number line'
      },
      { 
        id: 2, 
        title: 'Fractions and Rational Numbers', 
        progress: 70, 
        lessons: 16, 
        completed: 11, 
        difficulty: 'Medium',
        unlocked: true,
        description: 'Understanding rational numbers and their operations'
      },
      { 
        id: 3, 
        title: 'Simple Equations', 
        progress: 45, 
        lessons: 14, 
        completed: 6, 
        difficulty: 'Medium',
        unlocked: true,
        description: 'Introduction to algebra and solving linear equations'
      }
    ]
  };

  const currentTopics = mathTopics[selectedGrade as keyof typeof mathTopics] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mathematics Learning</h1>
            <p className="text-muted-foreground">NCERT & CBSE Aligned Curriculum</p>
          </div>
        </div>

        {/* Grade Selection */}
        <div className="flex flex-wrap gap-2 mb-6">
          {grades.map((grade) => (
            <Button
              key={grade}
              variant={selectedGrade === grade ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedGrade(grade)}
              className={selectedGrade === grade ? 'bg-blue-500 hover:bg-blue-600' : 'hover:bg-blue-500/10'}
            >
              Class {grade}
            </Button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTopics.map((topic) => (
          <Card 
            key={topic.id} 
            className={`relative overflow-hidden transition-all duration-300 hover-scale ${
              topic.unlocked 
                ? 'bg-card/50 backdrop-blur-sm border-border/50 hover:border-blue-500/30' 
                : 'bg-card/20 border-border/30 opacity-75'
            }`}
          >
            {!topic.unlocked && (
              <div className="absolute top-4 right-4">
                <Lock className="w-5 h-5 text-muted-foreground" />
              </div>
            )}
            
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-lg text-foreground mb-2 flex items-center gap-2">
                    {topic.progress === 100 && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                    {topic.title}
                  </CardTitle>
                  <Badge variant="outline" className={`text-xs w-fit mb-3 ${
                    topic.difficulty === 'Basic' ? 'border-emerald-500/50 text-emerald-400' :
                    topic.difficulty === 'Medium' ? 'border-yellow-500/50 text-yellow-400' :
                    'border-red-500/50 text-red-400'
                  }`}>
                    {topic.difficulty}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground font-medium">{topic.progress}%</span>
                </div>
                <Progress 
                  value={topic.progress} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{topic.completed}/{topic.lessons} lessons completed</span>
                  {topic.progress === 100 && <Star className="w-4 h-4 text-golden" />}
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className={`w-full ${
                  topic.unlocked 
                    ? topic.progress === 0 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : topic.progress === 100
                        ? 'bg-emerald-500 hover:bg-emerald-600'
                        : 'bg-golden hover:bg-golden/90'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
                disabled={!topic.unlocked}
              >
                {topic.unlocked ? (
                  <>
                    {topic.progress === 0 ? (
                      <>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Start Learning
                      </>
                    ) : topic.progress === 100 ? (
                      <>
                        <Trophy className="w-4 h-4 mr-2" />
                        Review Topic
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Continue
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Locked
                  </>
                )}
              </Button>

              {/* Estimated Time */}
              {topic.unlocked && topic.progress < 100 && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                  <Clock className="w-3 h-3" />
                  <span>{Math.ceil((topic.lessons - topic.completed) * 25)} min remaining</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Class Progress Summary */}
      <Card className="mt-8 bg-gradient-to-r from-blue-500/10 to-cyan-500/5 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-400" />
            Class {selectedGrade} Progress Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {currentTopics.filter(t => t.progress === 100).length}
              </div>
              <div className="text-sm text-muted-foreground">Topics Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-golden">
                {Math.round(currentTopics.reduce((acc, t) => acc + t.progress, 0) / currentTopics.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">
                {currentTopics.reduce((acc, t) => acc + t.completed, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Lessons Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {Math.ceil(currentTopics.reduce((acc, t) => acc + (t.lessons - t.completed), 0) * 25)}
              </div>
              <div className="text-sm text-muted-foreground">Minutes Remaining</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicLearning;