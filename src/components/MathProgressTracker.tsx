import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Target, 
  Star, 
  Calculator, 
  BookOpen,
  Award,
  Trophy,
  CheckCircle,
  Calendar,
  Clock,
  BarChart,
  LineChart,
  PieChart,
  Users,
  Crown,
  Medal,
  Flame,
  Zap,
  Brain,
  Sparkles,
  Timer,
  PlayCircle
} from 'lucide-react';

interface SubjectProgress {
  subject: string;
  icon: string;
  totalTopics: number;
  completedTopics: number;
  totalPoints: number;
  earnedPoints: number;
  averageScore: number;
  timeSpent: number; // in minutes
  lastActivity: string;
  nextMilestone: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
}

interface WeeklyProgress {
  week: string;
  problemsSolved: number;
  timeSpent: number;
  averageScore: number;
  streak: number;
}

interface LearningStats {
  totalStudyTime: number;
  problemsSolved: number;
  averageAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  rank: number;
  totalStudents: number;
  pointsEarned: number;
  achievementsUnlocked: number;
}

const MathProgressTracker = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(6);
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'year'>('week');

  // Student's overall learning statistics
  const learningStats: LearningStats = {
    totalStudyTime: 4320, // minutes
    problemsSolved: 287,
    averageAccuracy: 87.5,
    currentStreak: 12,
    longestStreak: 28,
    rank: 7,
    totalStudents: 1250,
    pointsEarned: 4860,
    achievementsUnlocked: 23
  };

  // Subject-wise progress for the selected grade
  const subjectProgress: SubjectProgress[] = [
    {
      subject: 'Arithmetic',
      icon: '🧮',
      totalTopics: 15,
      completedTopics: 12,
      totalPoints: 1500,
      earnedPoints: 1180,
      averageScore: 85.3,
      timeSpent: 1200,
      lastActivity: '2 hours ago',
      nextMilestone: 'Complete Decimal Operations',
      difficulty: 'Intermediate'
    },
    {
      subject: 'Algebra',
      icon: '📐',
      totalTopics: 10,
      completedTopics: 6,
      totalPoints: 1200,
      earnedPoints: 720,
      averageScore: 78.5,
      timeSpent: 800,
      lastActivity: '1 day ago',
      nextMilestone: 'Solve Linear Equations',
      difficulty: 'Advanced'
    },
    {
      subject: 'Geometry',
      icon: '📏',
      totalTopics: 12,
      completedTopics: 8,
      totalPoints: 1400,
      earnedPoints: 950,
      averageScore: 92.1,
      timeSpent: 960,
      lastActivity: '4 hours ago',
      nextMilestone: 'Master Area Calculations',
      difficulty: 'Basic'
    },
    {
      subject: 'Statistics',
      icon: '📊',
      totalTopics: 8,
      completedTopics: 3,
      totalPoints: 800,
      earnedPoints: 300,
      averageScore: 75.0,
      timeSpent: 400,
      lastActivity: '3 days ago',
      nextMilestone: 'Understand Data Representation',
      difficulty: 'Intermediate'
    }
  ];

  // Weekly progress data
  const weeklyProgress: WeeklyProgress[] = [
    { week: 'Week 1', problemsSolved: 45, timeSpent: 180, averageScore: 82.3, streak: 7 },
    { week: 'Week 2', problemsSolved: 52, timeSpent: 200, averageScore: 85.7, streak: 8 },
    { week: 'Week 3', problemsSolved: 38, timeSpent: 150, averageScore: 79.2, streak: 5 },
    { week: 'Week 4', problemsSolved: 61, timeSpent: 240, averageScore: 91.5, streak: 12 }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Basic': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getPercentile = () => {
    const rank = learningStats.rank;
    const total = learningStats.totalStudents;
    return Math.round(((total - rank) / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <TrendingUp className="w-8 h-8 text-blue-400" />
            Mathematics Progress Tracker
            <Sparkles className="w-6 h-6 text-golden animate-pulse" />
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Monitor your mathematical journey and celebrate your achievements
          </p>
        </CardHeader>
      </Card>

      {/* Grade Selection */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Viewing Progress for:</span>
            <div className="flex gap-2">
              {[6, 7, 8, 9, 10, 11, 12].map(grade => (
                <Button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  variant={selectedGrade === grade ? "default" : "outline"}
                  size="sm"
                >
                  Class {grade}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-golden/10 to-golden/5 border-golden/20">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-golden mx-auto mb-2" />
            <div className="text-2xl font-bold text-golden">{formatTime(learningStats.totalStudyTime)}</div>
            <div className="text-sm text-muted-foreground">Study Time</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{learningStats.problemsSolved}</div>
            <div className="text-sm text-muted-foreground">Problems Solved</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{learningStats.averageAccuracy}%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Crown className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">#{learningStats.rank}</div>
            <div className="text-sm text-muted-foreground">{getPercentile()}th Percentile</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Progress Tabs */}
      <Tabs defaultValue="subjects" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subjects" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Subjects
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Weekly
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Subject Progress Tab */}
        <TabsContent value="subjects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {subjectProgress.map((subject) => (
              <Card key={subject.subject} className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{subject.icon}</span>
                      {subject.subject}
                    </CardTitle>
                    <Badge variant="outline" className={getDifficultyColor(subject.difficulty)}>
                      {subject.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Topics Completed</span>
                      <span>{subject.completedTopics}/{subject.totalTopics}</span>
                    </div>
                    <Progress 
                      value={(subject.completedTopics / subject.totalTopics) * 100} 
                      className="h-3" 
                    />
                  </div>

                  {/* Points Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Points Earned</span>
                      <span>{subject.earnedPoints}/{subject.totalPoints}</span>
                    </div>
                    <Progress 
                      value={(subject.earnedPoints / subject.totalPoints) * 100} 
                      className="h-2" 
                    />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Average Score</div>
                      <div className="font-semibold text-lg">{subject.averageScore}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Time Spent</div>
                      <div className="font-semibold text-lg">{formatTime(subject.timeSpent)}</div>
                    </div>
                  </div>

                  {/* Next Milestone */}
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Next Milestone:</div>
                    <div className="font-medium text-blue-400">{subject.nextMilestone}</div>
                  </div>

                  {/* Last Activity */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last Activity:</span>
                    <span className="text-foreground">{subject.lastActivity}</span>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Weekly Progress Tab */}
        <TabsContent value="weekly" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-400" />
                Weekly Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyProgress.map((week, index) => (
                  <div key={week.week} className="p-4 border border-border/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground">{week.week}</h3>
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-400" />
                        <span className="text-sm text-orange-400">{week.streak} day streak</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-3 bg-green-500/10 rounded-lg">
                        <div className="text-lg font-bold text-green-400">{week.problemsSolved}</div>
                        <div className="text-muted-foreground">Problems Solved</div>
                      </div>
                      <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                        <div className="text-lg font-bold text-blue-400">{formatTime(week.timeSpent)}</div>
                        <div className="text-muted-foreground">Study Time</div>
                      </div>
                      <div className="text-center p-3 bg-purple-500/10 rounded-lg">
                        <div className="text-lg font-bold text-purple-400">{week.averageScore}%</div>
                        <div className="text-muted-foreground">Average Score</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Goals */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-golden" />
                This Week's Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Solve 50 problems</span>
                  <span className="text-sm text-golden">42/50</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Study for 3 hours</span>
                  <span className="text-sm text-golden">2h 24m/3h</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Maintain 7-day streak</span>
                  <span className="text-sm text-golden">5/7 days</span>
                </div>
                <Progress value={71} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Recent Achievement */}
            <Card className="bg-gradient-to-br from-golden/10 to-golden/5 border-golden/20">
              <CardContent className="p-4 text-center">
                <Trophy className="w-12 h-12 text-golden mx-auto mb-3" />
                <h3 className="font-bold text-golden mb-1">Week Warrior</h3>
                <p className="text-sm text-muted-foreground mb-2">Completed 7-day streak</p>
                <Badge className="bg-golden text-primary">+150 XP</Badge>
              </CardContent>
            </Card>

            {/* Progress Achievement */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-4 text-center">
                <Medal className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">Algebra Pioneer</h3>
                <p className="text-sm text-muted-foreground mb-2">Solve first equation</p>
                <div className="text-xs text-muted-foreground">80% Complete</div>
                <Progress value={80} className="h-1 mt-2" />
              </CardContent>
            </Card>

            {/* Locked Achievement */}
            <Card className="bg-card/30 backdrop-blur-sm border-border/30 opacity-70">
              <CardContent className="p-4 text-center">
                <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-bold text-muted-foreground mb-1">Speed Calculator</h3>
                <p className="text-sm text-muted-foreground mb-2">Solve 20 problems in 2 min</p>
                <Badge variant="outline">Locked</Badge>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Achievement Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3">
                  <div className="text-2xl font-bold text-golden">{learningStats.achievementsUnlocked}</div>
                  <div className="text-sm text-muted-foreground">Unlocked</div>
                </div>
                <div className="text-center p-3">
                  <div className="text-2xl font-bold text-foreground">{learningStats.pointsEarned}</div>
                  <div className="text-sm text-muted-foreground">Total XP</div>
                </div>
                <div className="text-center p-3">
                  <div className="text-2xl font-bold text-orange-400">{learningStats.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">Current Streak</div>
                </div>
                <div className="text-center p-3">
                  <div className="text-2xl font-bold text-blue-400">{learningStats.longestStreak}</div>
                  <div className="text-sm text-muted-foreground">Best Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Analytics */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-6 h-6 text-blue-400" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">This Week vs Last Week</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400">+12% Improvement</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Accuracy Trend</span>
                      <span className="text-emerald-400">↗ +5.2%</span>
                    </div>
                    <Progress value={87.5} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Speed Improvement</span>
                      <span className="text-emerald-400">↗ +8.1%</span>
                    </div>
                    <Progress value={73} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Insights */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-purple-400" />
                  Learning Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">Strength</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You excel at geometry problems, especially area calculations.
                  </p>
                </div>

                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-400">Focus Area</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Consider spending more time on algebraic expressions.
                  </p>
                </div>

                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">Recommendation</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Try the speed challenge to improve calculation skills.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-6 h-6 text-golden" />
                Study Time Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 border border-border/50 rounded-lg">
                  <div className="text-xl font-bold text-green-400">35%</div>
                  <div className="text-sm text-muted-foreground">Arithmetic</div>
                </div>
                <div className="text-center p-4 border border-border/50 rounded-lg">
                  <div className="text-xl font-bold text-blue-400">28%</div>
                  <div className="text-sm text-muted-foreground">Geometry</div>
                </div>
                <div className="text-center p-4 border border-border/50 rounded-lg">
                  <div className="text-xl font-bold text-purple-400">23%</div>
                  <div className="text-sm text-muted-foreground">Algebra</div>
                </div>
                <div className="text-center p-4 border border-border/50 rounded-lg">
                  <div className="text-xl font-bold text-yellow-400">14%</div>
                  <div className="text-sm text-muted-foreground">Statistics</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MathProgressTracker;