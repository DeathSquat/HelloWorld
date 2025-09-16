import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Award, 
  Star, 
  Calculator, 
  BookOpen,
  Target,
  Zap,
  Lock,
  CheckCircle,
  Crown,
  Medal,
  Sparkles,
  TrendingUp,
  Brain,
  Timer,
  Users,
  Flame,
  RotateCcw,
  PlayCircle
} from 'lucide-react';

interface MathAchievement {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'skill' | 'streak' | 'social' | 'special';
  subject: 'arithmetic' | 'algebra' | 'geometry' | 'statistics' | 'general';
  grade: number[];
  points: number;
  progress: number;
  total: number;
  unlocked: boolean;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  earnedDate?: string;
  icon: string;
  requirements: string[];
}

const MathAchievements = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');

  const mathAchievements: MathAchievement[] = [
    // Academic Achievements
    {
      id: 'first-sum',
      title: 'First Steps in Numbers',
      description: 'Complete your first addition problem correctly',
      category: 'academic',
      subject: 'arithmetic',
      grade: [6],
      points: 25,
      progress: 100,
      total: 1,
      unlocked: true,
      rarity: 'common',
      earnedDate: '2024-01-10',
      icon: '➕',
      requirements: ['Solve 1 addition problem correctly']
    },
    {
      id: 'fraction-master',
      title: 'Fraction Master',
      description: 'Successfully solve 50 fraction problems',
      category: 'academic',
      subject: 'arithmetic',
      grade: [6, 7],
      points: 200,
      progress: 76,
      total: 50,
      unlocked: false,
      rarity: 'rare',
      icon: '🔢',
      requirements: ['Solve 50 fraction problems', 'Maintain 80% accuracy']
    },
    {
      id: 'algebra-pioneer',
      title: 'Algebra Pioneer',
      description: 'Solve your first algebraic equation',
      category: 'academic',
      subject: 'algebra',
      grade: [7, 8],
      points: 150,
      progress: 100,
      total: 1,
      unlocked: true,
      rarity: 'uncommon',
      earnedDate: '2024-01-15',
      icon: '📐',
      requirements: ['Complete Introduction to Algebra chapter']
    },
    {
      id: 'geometry-explorer',
      title: 'Geometry Explorer',
      description: 'Calculate areas of 10 different shapes',
      category: 'academic',
      subject: 'geometry',
      grade: [6, 7, 8],
      points: 180,
      progress: 30,
      total: 10,
      unlocked: false,
      rarity: 'rare',
      icon: '📏',
      requirements: ['Calculate areas of triangles, rectangles, circles, etc.']
    },
    {
      id: 'perfect-scorer',
      title: 'Perfect Scorer',
      description: 'Score 100% on any chapter test',
      category: 'academic',
      subject: 'general',
      grade: [6, 7, 8, 9, 10, 11, 12],
      points: 300,
      progress: 0,
      total: 1,
      unlocked: false,
      rarity: 'epic',
      icon: '💯',
      requirements: ['Score 100% on any chapter test', 'Complete test within time limit']
    },

    // Skill-based Achievements
    {
      id: 'speed-calculator',
      title: 'Speed Calculator',
      description: 'Solve 20 arithmetic problems in under 2 minutes',
      category: 'skill',
      subject: 'arithmetic',
      grade: [6, 7, 8],
      points: 250,
      progress: 65,
      total: 20,
      unlocked: false,
      rarity: 'epic',
      icon: '⚡',
      requirements: ['Solve 20 problems in under 2 minutes', 'Maintain 90% accuracy']
    },
    {
      id: 'mental-math-wizard',
      title: 'Mental Math Wizard',
      description: 'Solve 100 problems without using calculator',
      category: 'skill',
      subject: 'arithmetic',
      grade: [6, 7, 8, 9],
      points: 400,
      progress: 45,
      total: 100,
      unlocked: false,
      rarity: 'legendary',
      icon: '🧙‍♂️',
      requirements: ['Solve 100 problems mentally', 'No calculator usage', '85% accuracy minimum']
    },
    {
      id: 'pattern-finder',
      title: 'Pattern Finder',
      description: 'Identify 25 number patterns correctly',
      category: 'skill',
      subject: 'general',
      grade: [6, 7, 8],
      points: 180,
      progress: 88,
      total: 25,
      unlocked: false,
      rarity: 'rare',
      icon: '🔍',
      requirements: ['Identify arithmetic, geometric, and custom patterns']
    },

    // Streak Achievements
    {
      id: 'week-warrior',
      title: 'Week Warrior',
      description: 'Study mathematics for 7 consecutive days',
      category: 'streak',
      subject: 'general',
      grade: [6, 7, 8, 9, 10, 11, 12],
      points: 150,
      progress: 100,
      total: 7,
      unlocked: true,
      rarity: 'uncommon',
      earnedDate: '2024-01-20',
      icon: '🔥',
      requirements: ['Study for at least 15 minutes daily', 'Complete daily challenges']
    },
    {
      id: 'month-champion',
      title: 'Month Champion',
      description: 'Maintain a 30-day learning streak',
      category: 'streak',
      subject: 'general',
      grade: [6, 7, 8, 9, 10, 11, 12],
      points: 500,
      progress: 67,
      total: 30,
      unlocked: false,
      rarity: 'legendary',
      icon: '👑',
      requirements: ['Study daily for 30 days', 'Complete weekly assessments']
    },

    // Social Achievements
    {
      id: 'helpful-peer',
      title: 'Helpful Peer',
      description: 'Help 10 classmates solve math problems',
      category: 'social',
      subject: 'general',
      grade: [6, 7, 8, 9, 10, 11, 12],
      points: 200,
      progress: 40,
      total: 10,
      unlocked: false,
      rarity: 'rare',
      icon: '🤝',
      requirements: ['Provide correct explanations', 'Receive positive feedback']
    },
    {
      id: 'study-group-leader',
      title: 'Study Group Leader',
      description: 'Lead 5 successful study group sessions',
      category: 'social',
      subject: 'general',
      grade: [8, 9, 10, 11, 12],
      points: 350,
      progress: 20,
      total: 5,
      unlocked: false,
      rarity: 'epic',
      icon: '📚',
      requirements: ['Create study groups', 'Improve group average scores']
    },

    // Special Achievements
    {
      id: 'board-exam-ready',
      title: 'Board Exam Ready',
      description: 'Complete all practice tests for your grade',
      category: 'special',
      subject: 'general',
      grade: [10, 12],
      points: 1000,
      progress: 25,
      total: 1,
      unlocked: false,
      rarity: 'legendary',
      icon: '🎓',
      requirements: ['Complete all mock tests', 'Score above 85% average']
    },
    {
      id: 'olympiad-qualifier',
      title: 'Olympiad Qualifier',
      description: 'Qualify for Mathematical Olympiad',
      category: 'special',
      subject: 'general',
      grade: [8, 9, 10, 11, 12],
      points: 1500,
      progress: 0,
      total: 1,
      unlocked: false,
      rarity: 'legendary',
      icon: '🏆',
      requirements: ['Score in top 10% of grade', 'Complete advanced problem sets']
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: Trophy, color: 'text-golden' },
    { id: 'academic', name: 'Academic', icon: BookOpen, color: 'text-blue-400' },
    { id: 'skill', name: 'Skills', icon: Brain, color: 'text-purple-400' },
    { id: 'streak', name: 'Streaks', icon: Flame, color: 'text-orange-400' },
    { id: 'social', name: 'Social', icon: Users, color: 'text-green-400' },
    { id: 'special', name: 'Special', icon: Crown, color: 'text-pink-400' }
  ];

  const grades = [
    { value: 'all', label: 'All Grades' },
    { value: 6, label: 'Class 6' },
    { value: 7, label: 'Class 7' },
    { value: 8, label: 'Class 8' },
    { value: 9, label: 'Class 9' },
    { value: 10, label: 'Class 10' },
    { value: 11, label: 'Class 11' },
    { value: 12, label: 'Class 12' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-500/50 bg-gray-500/10 text-gray-400';
      case 'uncommon': return 'border-green-500/50 bg-green-500/10 text-green-400';
      case 'rare': return 'border-blue-500/50 bg-blue-500/10 text-blue-400';
      case 'epic': return 'border-purple-500/50 bg-purple-500/10 text-purple-400';
      case 'legendary': return 'border-golden/50 bg-golden/10 text-golden';
      default: return 'border-gray-500/50 bg-gray-500/10 text-gray-400';
    }
  };

  const filteredAchievements = mathAchievements.filter(achievement => {
    const categoryMatch = selectedCategory === 'all' || achievement.category === selectedCategory;
    const gradeMatch = selectedGrade === 'all' || achievement.grade.includes(selectedGrade as number);
    return categoryMatch && gradeMatch;
  });

  const totalPoints = mathAchievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const unlockedCount = mathAchievements.filter(a => a.unlocked).length;
  const completionRate = Math.round((unlockedCount / mathAchievements.length) * 100);

  return (
    <div className="space-y-6">
      {/* Achievement Overview */}
      <Card className="bg-gradient-to-r from-golden/10 to-purple-500/10 border-golden/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <Trophy className="w-8 h-8 text-golden" />
            Mathematics Achievements
            <Sparkles className="w-6 h-6 text-golden animate-pulse" />
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Track your mathematical journey and celebrate every milestone
          </p>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-golden/10 to-golden/5 border-golden/20">
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-golden mx-auto mb-2" />
            <div className="text-2xl font-bold text-golden">{totalPoints.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{unlockedCount}/{mathAchievements.length}</div>
            <div className="text-sm text-muted-foreground">Unlocked</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{completionRate}%</div>
            <div className="text-sm text-muted-foreground">Complete</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Crown className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {mathAchievements.filter(a => a.unlocked && a.rarity === 'legendary').length}
            </div>
            <div className="text-sm text-muted-foreground">Legendary</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Category Filter */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Filter by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Icon className={`w-4 h-4 ${category.color}`} />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Grade Filter */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Filter by Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {grades.map((grade) => (
                <Button
                  key={grade.value}
                  // onClick={() => setSelectedGrade(grade.value)}
                  variant={selectedGrade === grade.value ? "default" : "outline"}
                  size="sm"
                >
                  {grade.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`relative overflow-hidden transition-all hover:scale-105 ${
              achievement.unlocked 
                ? getRarityColor(achievement.rarity)
                : 'bg-card/30 backdrop-blur-sm border-border/30 opacity-70'
            } ${achievement.unlocked ? 'shadow-lg' : ''}`}
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Achievement Header */}
                <div className="flex items-center justify-between">
                  <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                    {achievement.unlocked ? achievement.icon : '🔒'}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="outline" className={`text-xs border-current ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity}
                    </Badge>
                    {achievement.unlocked && (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                </div>

                {/* Achievement Info */}
                <div className="space-y-2">
                  <h3 className={`font-semibold text-lg ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm ${achievement.unlocked ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                    {achievement.description}
                  </p>
                  
                  {/* Grade and Subject Tags */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {achievement.subject}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Grade {achievement.grade.join(', ')}
                    </Badge>
                  </div>
                </div>

                {/* Progress */}
                {!achievement.unlocked && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground">
                        {Math.floor((achievement.progress / 100) * achievement.total)}/{achievement.total}
                      </span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                )}

                {/* Requirements */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Requirements:</h4>
                  <ul className="space-y-1">
                    {achievement.requirements.map((req, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-golden">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Points & Date */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-1 text-golden">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-medium">{achievement.points} pts</span>
                  </div>
                  {achievement.earnedDate && (
                    <span className="text-xs text-muted-foreground">
                      Earned: {new Date(achievement.earnedDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Legendary Glow Effect */}
              {achievement.unlocked && achievement.rarity === 'legendary' && (
                <div className="absolute inset-0 bg-gradient-to-r from-golden/20 via-transparent to-golden/20 animate-pulse pointer-events-none" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Achievements */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-golden" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mathAchievements
              .filter(a => a.unlocked && a.earnedDate)
              .sort((a, b) => new Date(b.earnedDate!).getTime() - new Date(a.earnedDate!).getTime())
              .slice(0, 3)
              .map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-golden">+{achievement.points}</div>
                    <div className="text-xs text-muted-foreground">
                      {achievement.earnedDate && new Date(achievement.earnedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MathAchievements;