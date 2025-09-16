import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Calculator, 
  TrendingUp, 
  Award, 
  Star, 
  PlayCircle,
  CheckCircle,
  Lock,
  Target,
  Timer,
  Trophy,
  Brain,
  Zap,
  Gamepad2,
  Medal,
  Crown,
  Sparkles,
  Bell
} from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  description: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  points: number;
  completed: boolean;
  locked: boolean;
  subtopics: string[];
}

interface Grade {
  grade: number;
  title: string;
  description: string;
  totalTopics: number;
  completedTopics: number;
  totalPoints: number;
  earnedPoints: number;
  unlocked: boolean;
  topics: Topic[];
}

const MathematicsLearning = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(6);
  const [gameMode, setGameMode] = useState<'story' | 'challenge' | 'practice'>('story');

  // Comprehensive grade-wise Mathematics curriculum
  const mathematicsCurriculum: Grade[] = [
    {
      grade: 6,
      title: 'Class 6 Mathematics',
      description: 'Foundation concepts in Numbers, Algebra, and Geometry',
      totalTopics: 14,
      completedTopics: 8,
      totalPoints: 1400,
      earnedPoints: 650,
      unlocked: true,
      topics: [
        {
          id: '6-1',
          name: 'Knowing Our Numbers',
          description: 'Place values, comparing numbers, and large numbers',
          difficulty: 'Basic',
          estimatedTime: '3-4 hours',
          points: 100,
          completed: true,
          locked: false,
          subtopics: ['Place Value', 'Comparing Numbers', 'Ascending/Descending Order', 'Number Line']
        },
        {
          id: '6-2',
          name: 'Whole Numbers',
          description: 'Properties and operations on whole numbers',
          difficulty: 'Basic',
          estimatedTime: '4-5 hours',
          points: 120,
          completed: true,
          locked: false,
          subtopics: ['Properties of Whole Numbers', 'Addition & Subtraction', 'Multiplication & Division', 'Patterns']
        },
        {
          id: '6-3',
          name: 'Playing with Numbers',
          description: 'Factors, multiples, prime and composite numbers',
          difficulty: 'Intermediate',
          estimatedTime: '5-6 hours',
          points: 150,
          completed: true,
          locked: false,
          subtopics: ['Factors and Multiples', 'Prime Numbers', 'Composite Numbers', 'HCF and LCM']
        },
        {
          id: '6-4',
          name: 'Basic Geometrical Ideas',
          description: 'Points, lines, rays, curves and angles',
          difficulty: 'Basic',
          estimatedTime: '4-5 hours',
          points: 110,
          completed: true,
          locked: false,
          subtopics: ['Points and Lines', 'Line Segments', 'Rays', 'Curves', 'Polygons']
        },
        {
          id: '6-5',
          name: 'Understanding Elementary Shapes',
          description: 'Triangles, quadrilaterals, circles and 3D shapes',
          difficulty: 'Intermediate',
          estimatedTime: '6-7 hours',
          points: 140,
          completed: true,
          locked: false,
          subtopics: ['Triangles', 'Quadrilaterals', 'Circles', '3D Shapes', 'Nets']
        },
        {
          id: '6-6',
          name: 'Integers',
          description: 'Introduction to negative numbers and operations',
          difficulty: 'Intermediate',
          estimatedTime: '5-6 hours',
          points: 130,
          completed: false,
          locked: false,
          subtopics: ['Negative Numbers', 'Number Line', 'Addition & Subtraction', 'Applications']
        },
        {
          id: '6-7',
          name: 'Fractions',
          description: 'Understanding and operations on fractions',
          difficulty: 'Intermediate',
          estimatedTime: '6-8 hours',
          points: 160,
          completed: false,
          locked: false,
          subtopics: ['Types of Fractions', 'Equivalent Fractions', 'Operations', 'Word Problems']
        },
        {
          id: '6-8',
          name: 'Decimals',
          description: 'Decimal representation and operations',
          difficulty: 'Intermediate',
          estimatedTime: '5-6 hours',
          points: 140,
          completed: false,
          locked: false,
          subtopics: ['Decimal Numbers', 'Place Value', 'Operations', 'Applications']
        }
      ]
    },
    {
      grade: 7,
      title: 'Class 7 Mathematics',
      description: 'Advanced concepts in Algebra, Geometry, and Data Handling',
      totalTopics: 15,
      completedTopics: 3,
      totalPoints: 1800,
      earnedPoints: 270,
      unlocked: true,
      topics: [
        {
          id: '7-1',
          name: 'Integers',
          description: 'Advanced operations with integers',
          difficulty: 'Intermediate',
          estimatedTime: '6-7 hours',
          points: 150,
          completed: true,
          locked: false,
          subtopics: ['Properties of Integers', 'Multiplication & Division', 'Word Problems']
        },
        {
          id: '7-2',
          name: 'Fractions and Decimals',
          description: 'Complex operations and applications',
          difficulty: 'Intermediate',
          estimatedTime: '7-8 hours',
          points: 170,
          completed: true,
          locked: false,
          subtopics: ['Mixed Operations', 'Converting Forms', 'Real-life Applications']
        },
        {
          id: '7-3',
          name: 'Data Handling',
          description: 'Collection, organization and interpretation of data',
          difficulty: 'Basic',
          estimatedTime: '5-6 hours',
          points: 120,
          completed: false,
          locked: false,
          subtopics: ['Data Collection', 'Bar Graphs', 'Pie Charts', 'Mean, Median, Mode']
        }
      ]
    },
    {
      grade: 8,
      title: 'Class 8 Mathematics',
      description: 'Introduction to Algebra, Geometry proofs, and Mensuration',
      totalTopics: 16,
      completedTopics: 0,
      totalPoints: 2000,
      earnedPoints: 0,
      unlocked: false,
      topics: []
    },
    {
      grade: 9,
      title: 'Class 9 Mathematics',
      description: 'Coordinate Geometry, Polynomials, and Statistics',
      totalTopics: 15,
      completedTopics: 0,
      totalPoints: 2200,
      earnedPoints: 0,
      unlocked: false,
      topics: []
    },
    {
      grade: 10,
      title: 'Class 10 Mathematics',
      description: 'Board exam preparation with Real Numbers, Quadratic Equations',
      totalTopics: 15,
      completedTopics: 0,
      totalPoints: 2500,
      earnedPoints: 0,
      unlocked: false,
      topics: []
    },
    {
      grade: 11,
      title: 'Class 11 Mathematics',
      description: 'Advanced topics: Trigonometry, Calculus, and Permutations',
      totalTopics: 16,
      completedTopics: 0,
      totalPoints: 3000,
      earnedPoints: 0,
      unlocked: false,
      topics: []
    },
    {
      grade: 12,
      title: 'Class 12 Mathematics',
      description: 'Higher Mathematics: Calculus, Vectors, and Probability',
      totalTopics: 13,
      completedTopics: 0,
      totalPoints: 3500,
      earnedPoints: 0,
      unlocked: false,
      topics: []
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Basic': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const selectedGradeData = mathematicsCurriculum.find(g => g.grade === selectedGrade);
  const progressPercentage = selectedGradeData ? (selectedGradeData.completedTopics / selectedGradeData.totalTopics) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Grade Selection Header */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <Calculator className="w-8 h-8 text-blue-400" />
            Mathematics Learning Journey
            <Sparkles className="w-6 h-6 text-golden" />
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Master Mathematics with gamified learning • NCERT & CBSE Aligned
          </p>
        </CardHeader>
      </Card>

      {/* Grade Selection Pills */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {mathematicsCurriculum.map((grade) => (
              <Button
                key={grade.grade}
                onClick={() => setSelectedGrade(grade.grade)}
                variant={selectedGrade === grade.grade ? "default" : "outline"}
                size="sm"
                disabled={!grade.unlocked}
                className={`flex items-center gap-2 ${
                  !grade.unlocked ? 'opacity-50' : ''
                } ${selectedGrade === grade.grade ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
              >
                {!grade.unlocked && <Lock className="w-4 h-4" />}
                Class {grade.grade}
                {grade.completedTopics > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {Math.round((grade.completedTopics / grade.totalTopics) * 100)}%
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedGradeData && (
        <>
          {/* Grade Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                  {selectedGradeData.title}
                </CardTitle>
                <p className="text-muted-foreground">{selectedGradeData.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{selectedGradeData.completedTopics}/{selectedGradeData.totalTopics} topics completed</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-400">{selectedGradeData.earnedPoints}</div>
                    <div className="text-sm text-muted-foreground">Points Earned</div>
                  </div>
                  <div className="text-center p-3 bg-golden/10 rounded-lg border border-golden/20">
                    <div className="text-2xl font-bold text-golden">{Math.round(progressPercentage)}%</div>
                    <div className="text-sm text-muted-foreground">Completion</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="w-5 h-5 text-golden" />
                  Your Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Study Streak</span>
                    <div className="flex items-center gap-1 text-orange-400">
                      <Zap className="w-4 h-4" />
                      <span className="font-semibold">7 days</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Rank</span>
                    <div className="flex items-center gap-1 text-golden">
                      <Crown className="w-4 h-4" />
                      <span className="font-semibold">#15</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Problems Solved</span>
                    <div className="flex items-center gap-1 text-emerald-400">
                      <Target className="w-4 h-4" />
                      <span className="font-semibold">142</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Accuracy Rate</span>
                    <div className="flex items-center gap-1 text-blue-400">
                      <Medal className="w-4 h-4" />
                      <span className="font-semibold">89%</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  <Award className="w-4 h-4 mr-2" />
                  View All Achievements
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Learning Mode Selection */}
          <Tabs value={gameMode} onValueChange={(value) => setGameMode(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="story" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Story Mode
              </TabsTrigger>
              <TabsTrigger value="challenge" className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                Challenge Mode
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Practice Mode
              </TabsTrigger>
            </TabsList>

            <TabsContent value="story" className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                    Story-based Learning
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Learn mathematics through engaging narratives and interactive stories
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {selectedGradeData.topics.map((topic) => (
                      <div 
                        key={topic.id}
                        className={`p-4 rounded-lg border transition-all hover:border-accent/40 ${
                          topic.completed 
                            ? 'bg-emerald-500/5 border-emerald-500/20' 
                            : topic.locked
                            ? 'bg-gray-500/5 border-gray-500/20 opacity-60'
                            : 'bg-accent/5 border-accent/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{topic.name}</h3>
                              {topic.completed && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                              {topic.locked && <Lock className="w-4 h-4 text-gray-400" />}
                            </div>
                            
                            <p className="text-sm text-muted-foreground">{topic.description}</p>
                            
                            <div className="flex items-center gap-4 flex-wrap">
                              <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                                {topic.difficulty}
                              </Badge>
                              
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Timer className="w-4 h-4" />
                                <span>{topic.estimatedTime}</span>
                              </div>
                              
                              <div className="flex items-center gap-1 text-sm text-golden">
                                <Star className="w-4 h-4" />
                                <span>{topic.points} points</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1">
                              {topic.subtopics.map((subtopic, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {subtopic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex-shrink-0 ml-4">
                            {topic.completed ? (
                              <Button variant="outline" size="sm">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Review
                              </Button>
                            ) : topic.locked ? (
                              <Button variant="outline" size="sm" disabled>
                                <Lock className="w-4 h-4 mr-2" />
                                Locked
                              </Button>
                            ) : (
                              <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                                <PlayCircle className="w-4 h-4 mr-2" />
                                Start Learning
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="challenge" className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-purple-400" />
                    Mathematical Challenges
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Test your skills with time-based challenges and competitions
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Gamepad2 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Challenge Mode Coming Soon!</h3>
                    <p className="text-muted-foreground mb-4">
                      Exciting mathematical challenges and competitive learning experiences are in development.
                    </p>
                    <Button variant="outline">
                      <Bell className="w-4 h-4 mr-2" />
                      Notify Me When Ready
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practice" className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-green-400" />
                    Practice Problems
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Reinforce your learning with additional practice problems
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Brain className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Practice Mode Coming Soon!</h3>
                    <p className="text-muted-foreground mb-4">
                      Comprehensive practice sessions with instant feedback and detailed solutions.
                    </p>
                    <Button variant="outline">
                      <Timer className="w-4 h-4 mr-2" />
                      Start Practice Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default MathematicsLearning;