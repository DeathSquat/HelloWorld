import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target,
  Trophy,
  Clock,
  Star,
  Zap,
  CheckCircle,
  PlayCircle,
  Calculator,
  Brain,
  Award,
  Flame
} from 'lucide-react';

const AcademicChallenges = () => {
  const [selectedCategory, setSelectedCategory] = useState('daily');

  const categories = [
    { id: 'daily', name: 'Daily Challenges', icon: Flame },
    { id: 'weekly', name: 'Weekly Quests', icon: Trophy },
    { id: 'monthly', name: 'Monthly Goals', icon: Star },
    { id: 'practice', name: 'Practice Sets', icon: Brain }
  ];

  const dailyChallenges = [
    {
      id: 1,
      title: 'Fraction Frenzy',
      description: 'Solve 10 fraction problems in under 5 minutes',
      difficulty: 'Medium',
      points: 150,
      timeLimit: '5 min',
      progress: 7,
      total: 10,
      status: 'in-progress',
      subject: 'Mathematics',
      grade: 'Class 6'
    },
    {
      id: 2,
      title: 'Geometry Quick Quiz',
      description: 'Answer 5 geometry questions correctly',
      difficulty: 'Basic',
      points: 100,
      timeLimit: '3 min',
      progress: 5,
      total: 5,
      status: 'completed',
      subject: 'Mathematics',
      grade: 'Class 6'
    },
    {
      id: 3,
      title: 'Integer Operations',
      description: 'Complete 15 integer calculation problems',
      difficulty: 'Advanced',
      points: 200,
      timeLimit: '8 min',
      progress: 0,
      total: 15,
      status: 'locked',
      subject: 'Mathematics',
      grade: 'Class 7'
    }
  ];

  const weeklyQuests = [
    {
      id: 1,
      title: 'Mathematics Master',
      description: 'Complete all daily challenges for 5 days this week',
      difficulty: 'Medium',
      points: 500,
      timeLimit: '7 days',
      progress: 3,
      total: 5,
      status: 'in-progress',
      subject: 'Mathematics',
      grade: 'All Classes'
    },
    {
      id: 2,
      title: 'Problem Solver',
      description: 'Solve 50 practice problems across different topics',
      difficulty: 'Advanced',
      points: 750,
      timeLimit: '7 days',
      progress: 23,
      total: 50,
      status: 'in-progress',
      subject: 'Mathematics',
      grade: 'All Classes'
    }
  ];

  const monthlyGoals = [
    {
      id: 1,
      title: 'Grade Level Champion',
      description: 'Complete 80% of your grade level curriculum',
      difficulty: 'Advanced',
      points: 2000,
      timeLimit: '30 days',
      progress: 65,
      total: 80,
      status: 'in-progress',
      subject: 'Mathematics',
      grade: 'Class 6'
    }
  ];

  const practiceSets = [
    {
      id: 1,
      title: 'Fractions Practice Set A',
      description: '20 problems covering basic fraction operations',
      difficulty: 'Basic',
      points: 120,
      timeLimit: '15 min',
      progress: 0,
      total: 20,
      status: 'available',
      subject: 'Mathematics',
      grade: 'Class 6'
    },
    {
      id: 2,
      title: 'Geometry Practice Set B',
      description: '15 problems on angles and triangles',
      difficulty: 'Medium',
      points: 180,
      timeLimit: '12 min',
      progress: 0,
      total: 15,
      status: 'available',
      subject: 'Mathematics',
      grade: 'Class 6'
    }
  ];

  const getChallenges = () => {
    switch (selectedCategory) {
      case 'weekly': return weeklyQuests;
      case 'monthly': return monthlyGoals;
      case 'practice': return practiceSets;
      default: return dailyChallenges;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'in-progress': return 'text-golden bg-golden/10 border-golden/30';
      case 'locked': return 'text-muted-foreground bg-muted/10 border-muted/30';
      default: return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    }
  };

  const getButtonText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed ✓';
      case 'in-progress': return 'Continue';
      case 'locked': return 'Locked';
      default: return 'Start Challenge';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Academic Challenges</h1>
            <p className="text-muted-foreground">Test your knowledge and earn rewards</p>
          </div>
        </div>

        {/* Category Selection */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 ${
                  selectedCategory === category.id ? 'bg-blue-500 hover:bg-blue-600' : 'hover:bg-blue-500/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {getChallenges().map((challenge) => (
          <Card 
            key={challenge.id} 
            className={`relative overflow-hidden transition-all duration-300 hover-scale bg-card/50 backdrop-blur-sm border-border/50 ${
              challenge.status === 'locked' ? 'opacity-60' : 'hover:border-blue-500/30'
            }`}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-lg text-foreground mb-2 flex items-center gap-2">
                    {challenge.status === 'completed' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                    {challenge.title}
                  </CardTitle>
                  <div className="flex gap-2 mb-3">
                    <Badge variant="outline" className={`text-xs w-fit ${
                      challenge.difficulty === 'Basic' ? 'border-emerald-500/50 text-emerald-400' :
                      challenge.difficulty === 'Medium' ? 'border-yellow-500/50 text-yellow-400' :
                      'border-red-500/50 text-red-400'
                    }`}>
                      {challenge.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-blue-500/50 text-blue-400">
                      {challenge.grade}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress */}
              {challenge.status !== 'available' && challenge.status !== 'locked' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">{challenge.progress}/{challenge.total}</span>
                  </div>
                  <Progress 
                    value={(challenge.progress / challenge.total) * 100} 
                    className="h-2"
                  />
                </div>
              )}

              {/* Challenge Info */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{challenge.timeLimit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-golden" />
                  <span className="text-golden font-medium">{challenge.points} pts</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-center">
                <Badge 
                  variant="outline" 
                  className={`text-xs px-3 py-1 ${getStatusColor(challenge.status)}`}
                >
                  {challenge.status.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>

              {/* Action Button */}
              <Button 
                className={`w-full ${
                  challenge.status === 'completed' 
                    ? 'bg-emerald-500 hover:bg-emerald-600' 
                    : challenge.status === 'in-progress'
                      ? 'bg-golden hover:bg-golden/90'
                      : challenge.status === 'locked'
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                }`}
                disabled={challenge.status === 'locked'}
              >
                {challenge.status === 'completed' ? (
                  <>
                    <Trophy className="w-4 h-4 mr-2" />
                    View Results
                  </>
                ) : challenge.status === 'in-progress' ? (
                  <>
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Continue
                  </>
                ) : challenge.status === 'locked' ? (
                  <>
                    🔒 Locked
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Start Challenge
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Challenge Stats */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/5 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-400" />
            Your Challenge Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">47</div>
              <div className="text-sm text-muted-foreground">Challenges Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-golden">4,860</div>
              <div className="text-sm text-muted-foreground">Total Points Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">12</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">#7</div>
              <div className="text-sm text-muted-foreground">Class Ranking</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicChallenges;