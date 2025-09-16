import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code,
  Trophy, 
  Target, 
  Clock, 
  PlayCircle,
  Star,
  TrendingUp,
  Calendar,
  Award,
  Zap,
  Users,
  BarChart3,
  Brain,
  Activity,
  CheckCircle,
  Flame,
  Settings,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import StudyTimer from '@/components/StudyTimer';
import CodePlayground from '@/components/CodePlayground';
import ProgressAnalytics from '@/components/ProgressAnalytics';
import StudyCalendar from '@/components/StudyCalendar';
import QuickSearch from '@/components/QuickSearch';
import DailyChallenges from '@/components/DailyChallenges';
import AchievementSystem from '@/components/AchievementSystem';
import SocialFeatures from '@/components/SocialFeatures';
import DetailedProgress from '@/components/DetailedProgress';
import LearningPath from '@/components/LearningPath';

const CodingDashboard = () => {
  const { user } = useAuth();
  const [currentStreak, setCurrentStreak] = useState(7);
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'Developer';

  const learningStats = [
    {
      title: 'Total XP',
      value: '3,750',
      icon: Trophy,
      color: 'text-golden',
      change: '+285 this week',
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
      title: 'Skills Mastered',
      value: '23',
      icon: Brain,
      color: 'text-purple-400',
      change: '+4 this month',
      bg: 'bg-purple-400/10'
    },
    {
      title: 'Hours Coded',
      value: '127h',
      icon: Clock,
      color: 'text-blue-400',
      change: '+12h this week',
      bg: 'bg-blue-400/10'
    },
    {
      title: 'Problems Solved',
      value: '342',
      icon: CheckCircle,
      color: 'text-emerald-400',
      change: '+28 this week',
      bg: 'bg-emerald-400/10'
    },
    {
      title: 'Code Reviews',
      value: '89',
      icon: Code,
      color: 'text-cyan-400',
      change: '+7 this week',
      bg: 'bg-cyan-400/10'
    }
  ];

  const currentCourses = [
    {
      id: 1,
      title: 'Python for Beginners',
      language: 'Python',
      progress: 75,
      nextLesson: 'Functions and Methods',
      difficulty: 'Beginner',
      estimatedTime: '2 hours left'
    },
    {
      id: 2,
      title: 'Java Object-Oriented Programming',
      language: 'Java',
      progress: 45,
      nextLesson: 'Inheritance Concepts',
      difficulty: 'Intermediate',
      estimatedTime: '5 hours left'
    },
    {
      id: 3,
      title: 'C Programming Fundamentals',
      language: 'C',
      progress: 30,
      nextLesson: 'Pointers and Memory',
      difficulty: 'Beginner',
      estimatedTime: '8 hours left'
    }
  ];

  const recentAchievements = [
    { title: 'First Python Program', icon: '🐍', earned: '2 days ago' },
    { title: 'Week Warrior', icon: '🔥', earned: '1 week ago' },
    { title: 'Code Explorer', icon: '🗺️', earned: '2 weeks ago' }
  ];

  const todaySchedule = [
    { time: '10:00 AM', task: 'Python - Functions Deep Dive', type: 'lesson' },
    { time: '2:00 PM', task: 'Java Practice Problems', type: 'practice' },
    { time: '4:00 PM', task: 'C Programming Quiz', type: 'quiz' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Welcome Header with Coding Theme */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-4">
            <Badge 
              variant="outline" 
              className="text-sm px-4 py-2 border-purple-500/50 text-purple-400"
            >
              <Code className="w-4 h-4 mr-2" />
              Coding Era • Professional Development
            </Badge>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Welcome back, <span className="text-golden">{userName}! 👋</span>
              </h1>
              <p className="text-muted-foreground">
                Ready to code something amazing today? You're doing great! 
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
          {learningStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
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

        {/* Enhanced Dashboard with More Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 sm:grid-cols-8 lg:w-fit mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
            <TabsTrigger value="path" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Learning Path</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Challenges</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Code</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Social</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3 space-y-6">
                {/* Current Courses - Responsive */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl text-foreground">Continue Learning</CardTitle>
                        <CardDescription>Pick up where you left off</CardDescription>
                      </div>
                      <Link to="/coding/languages">
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          View All
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentCourses.map((course) => (
                      <div key={course.id} className="p-4 rounded-lg bg-accent/10 border border-accent/20 hover:border-accent/40 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <h3 className="font-semibold text-foreground">{course.title}</h3>
                              <Badge variant="outline" className={`text-xs w-fit ${
                                course.difficulty === 'Beginner' ? 'border-emerald-500/50 text-emerald-400' :
                                course.difficulty === 'Intermediate' ? 'border-yellow-500/50 text-yellow-400' :
                                'border-red-500/50 text-red-400'
                              }`}>
                                {course.difficulty}
                              </Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                              <p className="text-muted-foreground">Next: {course.nextLesson}</p>
                              <p className="text-xs text-muted-foreground">{course.estimatedTime}</p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="text-foreground font-medium">{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                            </div>
                          </div>
                          <Button size="sm" className="w-full sm:w-auto">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Continue
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <StudyTimer />
                
                {/* Weekly Goal - Responsive */}
                <Card className="bg-gradient-to-br from-golden/10 to-golden/5 border-golden/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground flex items-center gap-2">
                      <Target className="w-5 h-5 text-golden" />
                      Weekly Goal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-3">
                      <div className="text-3xl font-bold text-golden">4/7</div>
                      <p className="text-sm text-muted-foreground">Days completed this week</p>
                      <Progress value={57} className="h-2" />
                      <p className="text-xs text-muted-foreground">3 more days to reach your goal! 🎯</p>
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
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <DetailedProgress />
          </TabsContent>

          <TabsContent value="path">
            <LearningPath />
          </TabsContent>

          <TabsContent value="challenges">
            <DailyChallenges />
          </TabsContent>

          <TabsContent value="code">
            <CodePlayground />
          </TabsContent>

          <TabsContent value="analytics">
            <ProgressAnalytics />
          </TabsContent>

          <TabsContent value="calendar">
            <StudyCalendar />
          </TabsContent>

          <TabsContent value="social">
            <SocialFeatures />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CodingDashboard;