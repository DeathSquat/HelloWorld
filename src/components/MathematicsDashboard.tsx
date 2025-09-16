import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  BookOpen, 
  Trophy, 
  Gamepad2, 
  TrendingUp,
  Target,
  Star,
  Clock,
  Flame,
  Crown,
  Sparkles,
  Award,
  PlayCircle,
  Brain,
  Users,
  Calendar
} from 'lucide-react';
import MathematicsLearning from '@/components/MathematicsLearning';
import MathGamificationHub from '@/components/MathGamificationHub';
import MathAchievements from '@/components/MathAchievements';
import MathDailyChallenges from '@/components/MathDailyChallenges';
import MathProgressTracker from '@/components/MathProgressTracker';
import MathEducationalResources from '@/components/MathEducationalResources';
import MathSocialLearning from '@/components/MathSocialLearning';

const MathematicsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Quick stats for the overview
  const mathStats = {
    totalPoints: 4860,
    currentStreak: 12,
    problemsSolved: 287,
    averageScore: 87.5,
    timeSpent: 4320, // minutes
    currentGrade: 6,
    topicsCompleted: 28,
    totalTopics: 45,
    rank: 7,
    achievementsUnlocked: 23
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const quickActions = [
    {
      title: 'Continue Learning',
      subtitle: 'Resume Class 6 Fractions',
      icon: BookOpen,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      action: () => setActiveTab('learning')
    },
    {
      title: 'Daily Challenge',
      subtitle: '3/5 completed today',
      icon: Target,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      action: () => setActiveTab('challenges')
    },
    {
      title: 'Math Games',
      subtitle: 'Play Number Ninja',
      icon: Gamepad2,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      action: () => setActiveTab('games')
    },
    {
      title: 'Progress Report',
      subtitle: 'View detailed analytics',
      icon: TrendingUp,
      color: 'text-golden',
      bgColor: 'bg-golden/10',
      action: () => setActiveTab('progress')
    }
  ];

  const recentAchievements = [
    { title: 'Week Warrior', icon: '🔥', points: 150, earned: '2 hours ago' },
    { title: 'Fraction Master', icon: '🔢', points: 200, earned: '1 day ago' },
    { title: 'Geometry Explorer', icon: '📏', points: 180, earned: '3 days ago' }
  ];

  const upcomingTopics = [
    { subject: 'Arithmetic', topic: 'Decimal Operations', difficulty: 'Medium', eta: '2 days' },
    { subject: 'Geometry', topic: 'Area of Triangles', difficulty: 'Basic', eta: '1 week' },
    { subject: 'Algebra', topic: 'Simple Equations', difficulty: 'Advanced', eta: '2 weeks' }
  ];

  return (
    <div className="space-y-6">
      {/* Mathematics Dashboard Header */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <Calculator className="w-8 h-8 text-blue-400" />
            Mathematics Learning Hub
            <Sparkles className="w-6 h-6 text-golden animate-pulse" />
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Your personalized mathematics learning experience • NCERT & CBSE Aligned
          </p>
        </CardHeader>
      </Card>

      {/* Main Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Learning
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Challenges
          </TabsTrigger>
          <TabsTrigger value="games" className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4" />
            Games
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Social
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-golden/10 to-golden/5 border-golden/20">
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-golden mx-auto mb-2" />
                <div className="text-2xl font-bold text-golden">{mathStats.totalPoints.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-4 text-center">
                <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{mathStats.currentStreak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{mathStats.problemsSolved}</div>
                <div className="text-sm text-muted-foreground">Problems Solved</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-4 text-center">
                <Crown className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">#{mathStats.rank}</div>
                <div className="text-sm text-muted-foreground">Class Rank</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="w-6 h-6 text-blue-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={action.action}
                    variant="outline"
                    className="flex flex-col items-center gap-3 h-auto p-6 hover:scale-105 transition-transform"
                  >
                    <div className={`w-12 h-12 rounded-full ${action.bgColor} flex items-center justify-center`}>
                      <action.icon className={`w-6 h-6 ${action.color}`} />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{action.title}</div>
                      <div className="text-sm text-muted-foreground">{action.subtitle}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress Overview and Recent Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Progress */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                  Current Progress - Class {mathStats.currentGrade}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Topics Completed</span>
                    <span>{mathStats.topicsCompleted}/{mathStats.totalTopics}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(mathStats.topicsCompleted / mathStats.totalTopics) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Average Score</div>
                    <div className="font-semibold text-lg text-purple-400">{mathStats.averageScore}%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Time Spent</div>
                    <div className="font-semibold text-lg text-blue-400">{formatTime(mathStats.timeSpent)}</div>
                  </div>
                </div>

                <Button className="w-full">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Continue Learning
                </Button>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-golden" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">Earned {achievement.earned}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-golden">+{achievement.points}</div>
                      <div className="text-xs text-muted-foreground">XP</div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4">
                  <Award className="w-4 h-4 mr-2" />
                  View All Achievements
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Topics */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-green-400" />
                Upcoming Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{topic.topic}</h4>
                      <p className="text-xs text-muted-foreground">{topic.subject}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-xs ${
                        topic.difficulty === 'Basic' ? 'border-green-500/50 text-green-400' :
                        topic.difficulty === 'Medium' ? 'border-yellow-500/50 text-yellow-400' :
                        'border-red-500/50 text-red-400'
                      }`}>
                        {topic.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground">ETA: {topic.eta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Learning Tab */}
        <TabsContent value="learning">
          <MathematicsLearning />
        </TabsContent>

        {/* Challenges Tab */}
        <TabsContent value="challenges">
          <MathDailyChallenges />
        </TabsContent>

        {/* Games Tab */}
        <TabsContent value="games">
          <MathGamificationHub />
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <MathAchievements />
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress">
          <MathProgressTracker />
        </TabsContent>

        {/* Educational Resources Tab */}
        <TabsContent value="resources">
          <MathEducationalResources />
        </TabsContent>

        {/* Social Learning Tab */}
        <TabsContent value="social">
          <MathSocialLearning />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MathematicsDashboard;