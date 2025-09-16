import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Clock, 
  Calculator,
  PlayCircle,
  Star,
  TrendingUp,
  Calendar,
  Award,
  Zap,
  Users,
  BarChart3,
  Brain,
  CheckCircle,
  Flame,
  Settings,
  Crown,
  Sparkles,
  Gamepad2
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import MathematicsDashboard from '@/components/MathematicsDashboard';
import MathematicsLearning from '@/components/MathematicsLearning';
import MathGamificationHub from '@/components/MathGamificationHub';
import MathAchievements from '@/components/MathAchievements';
import MathDailyChallenges from '@/components/MathDailyChallenges';
import MathProgressTracker from '@/components/MathProgressTracker';
import MathEducationalResources from '@/components/MathEducationalResources';
import MathSocialLearning from '@/components/MathSocialLearning';
import StudyTimer from '@/components/StudyTimer';
import StudyCalendar from '@/components/StudyCalendar';
import QuickSearch from '@/components/QuickSearch';

const AcademicDashboard = () => {
  const { user } = useAuth();
  const [currentStreak, setCurrentStreak] = useState(12);
  const [activeTab, setActiveTab] = useState('overview');
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'Student';

  // Academic-specific stats
  const academicStats = [
    {
      title: 'Total Points',
      value: '4,860',
      icon: Star,
      color: 'text-golden',
      change: '+420 this week',
      bg: 'bg-golden/10'
    },
    {
      title: 'Current Streak',
      value: `${currentStreak} days`,
      icon: Flame,
      color: 'text-orange-400',
      change: 'Keep it up!',
      bg: 'bg-orange-400/10'
    },
    {
      title: 'Topics Mastered',
      value: '28',
      icon: Brain,
      color: 'text-purple-400',
      change: '+6 this month',
      bg: 'bg-purple-400/10'
    },
    {
      title: 'Study Hours',
      value: '72h',
      icon: Clock,
      color: 'text-blue-400',
      change: '+8h this week',
      bg: 'bg-blue-400/10'
    },
    {
      title: 'Problems Solved',
      value: '287',
      icon: CheckCircle,
      color: 'text-emerald-400',
      change: '+42 this week',
      bg: 'bg-emerald-400/10'
    },
    {
      title: 'Class Rank',
      value: '#7',
      icon: Crown,
      color: 'text-cyan-400',
      change: '+2 positions',
      bg: 'bg-cyan-400/10'
    }
  ];

  const currentTopics = [
    {
      id: 1,
      title: 'Fractions and Decimals',
      subject: 'Mathematics',
      grade: 'Class 6',
      progress: 85,
      nextLesson: 'Converting Fractions to Decimals',
      difficulty: 'Medium',
      estimatedTime: '30 minutes left'
    },
    {
      id: 2,
      title: 'Basic Geometry',
      subject: 'Mathematics',
      grade: 'Class 6',
      progress: 60,
      nextLesson: 'Properties of Triangles',
      difficulty: 'Basic',
      estimatedTime: '45 minutes left'
    },
    {
      id: 3,
      title: 'Algebra Foundations',
      subject: 'Mathematics',
      grade: 'Class 7',
      progress: 25,
      nextLesson: 'Introduction to Variables',
      difficulty: 'Advanced',
      estimatedTime: '1.5 hours left'
    }
  ];

  const recentAchievements = [
    { title: 'Fraction Master', icon: '🔢', earned: '2 hours ago', points: 200 },
    { title: 'Week Warrior', icon: '🔥', earned: '1 day ago', points: 150 },
    { title: 'Geometry Explorer', icon: '📏', earned: '3 days ago', points: 180 }
  ];

  const todaySchedule = [
    { time: '9:00 AM', task: 'Fractions - Practice Problems', type: 'practice' },
    { time: '11:00 AM', task: 'Geometry - Interactive Lesson', type: 'lesson' },
    { time: '2:00 PM', task: 'Daily Math Challenge', type: 'challenge' },
    { time: '4:00 PM', task: 'Number Games Session', type: 'game' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Welcome Header with Academic Theme */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-4">
            <Badge 
              variant="outline" 
              className="text-sm px-4 py-2 border-blue-500/50 text-blue-400"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              6-12 Academic Section • Mathematics Focus
            </Badge>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Welcome back, <span className="text-blue-400">{userName}! 🎓</span>
              </h1>
              <p className="text-muted-foreground">
                Ready to master mathematics today? You're doing amazing! 
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link to="/division-selection">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Switch Division
                </Button>
              </Link>
              <QuickSearch />
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {academicStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-blue-500/30 transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-3 sm:p-4">
                  <div className="text-center space-y-2">
                    <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mx-auto`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.title}</p>
                      <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-xs text-emerald-400 hidden sm:block">{stat.change}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Academic Dashboard with Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 sm:grid-cols-8 lg:w-fit mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Learning</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Challenges</span>
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              <span className="hidden sm:inline">Games</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Achievements</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Social</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3 space-y-6">
                {/* Current Topics - Academic Focus */}
                <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-blue-500/20">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl text-foreground flex items-center gap-2">
                          <Calculator className="w-6 h-6 text-blue-400" />
                          Continue Learning Mathematics
                        </CardTitle>
                        <CardDescription>Pick up where you left off in your academic journey</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto border-blue-500/30 hover:bg-blue-500/10">
                        View All Topics
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentTopics.map((topic) => (
                      <div key={topic.id} className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <h3 className="font-semibold text-foreground">{topic.title}</h3>
                              <div className="flex gap-2">
                                <Badge variant="outline" className="text-xs w-fit border-blue-500/50 text-blue-400">
                                  {topic.grade}
                                </Badge>
                                <Badge variant="outline" className={`text-xs w-fit ${
                                  topic.difficulty === 'Basic' ? 'border-emerald-500/50 text-emerald-400' :
                                  topic.difficulty === 'Medium' ? 'border-yellow-500/50 text-yellow-400' :
                                  'border-red-500/50 text-red-400'
                                }`}>
                                  {topic.difficulty}
                                </Badge>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <p className="text-muted-foreground">Next: {topic.nextLesson}</p>
                              <p className="text-xs text-muted-foreground">{topic.estimatedTime}</p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="text-foreground font-medium">{topic.progress}%</span>
                              </div>
                              <Progress value={topic.progress} className="h-2" />
                            </div>
                          </div>
                          <Button size="sm" className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Continue
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Today's Schedule */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-green-400" />
                      Today's Study Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {todaySchedule.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                          <div className="text-sm font-medium text-blue-400 min-w-20">{item.time}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.task}</h4>
                            <Badge variant="outline" className="text-xs mt-1">
                              {item.type}
                            </Badge>
                          </div>
                          <Button size="sm" variant="outline">Start</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <StudyTimer />
                
                {/* Academic Goal */}
                <Card className="bg-gradient-to-br from-golden/10 to-golden/5 border-golden/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground flex items-center gap-2">
                      <Target className="w-5 h-5 text-golden" />
                      Weekly Goal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-3">
                      <div className="text-3xl font-bold text-golden">5/7</div>
                      <p className="text-sm text-muted-foreground">Days completed this week</p>
                      <Progress value={71} className="h-2" />
                      <p className="text-xs text-muted-foreground">2 more days to reach your goal! 🎯</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Achievements */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-golden" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentAchievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-accent/10 rounded-lg">
                        <div className="text-xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-xs">{achievement.title}</h4>
                          <p className="text-xs text-muted-foreground">{achievement.earned}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-semibold text-golden">+{achievement.points}</div>
                          <div className="text-xs text-muted-foreground">XP</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="learning">
            <MathematicsLearning />
          </TabsContent>

          <TabsContent value="challenges">
            <MathDailyChallenges />
          </TabsContent>

          <TabsContent value="games">
            <MathGamificationHub />
          </TabsContent>

          <TabsContent value="progress">
            <MathProgressTracker />
          </TabsContent>

          <TabsContent value="achievements">
            <MathAchievements />
          </TabsContent>

          <TabsContent value="resources">
            <MathEducationalResources />
          </TabsContent>

          <TabsContent value="social">
            <MathSocialLearning />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AcademicDashboard;