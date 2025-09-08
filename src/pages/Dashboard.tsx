import { useState } from 'react';
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
  Code, 
  PlayCircle,
  Star,
  TrendingUp,
  Calendar,
  Award,
  Zap,
  Users,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StudyTimer from '@/components/StudyTimer';
import CodePlayground from '@/components/CodePlayground';
import ProgressAnalytics from '@/components/ProgressAnalytics';
import StudyCalendar from '@/components/StudyCalendar';
import QuickSearch from '@/components/QuickSearch';
import DailyChallenges from '@/components/DailyChallenges';
import AchievementSystem from '@/components/AchievementSystem';
import SocialFeatures from '@/components/SocialFeatures';

const Dashboard = () => {
  const [currentStreak, setCurrentStreak] = useState(7);

  const learningStats = [
    {
      title: 'Total Points',
      value: '2,450',
      icon: Trophy,
      color: 'text-golden',
      change: '+180 this week'
    },
    {
      title: 'Current Streak',
      value: `${currentStreak} days`,
      icon: Target,
      color: 'text-emerald-400',
      change: 'Keep it up!'
    },
    {
      title: 'Courses Completed',
      value: '12',
      icon: BookOpen,
      color: 'text-blue-400',
      change: '3 this month'
    },
    {
      title: 'Study Time',
      value: '45h',
      icon: Clock,
      color: 'text-purple-400',
      change: 'This month'
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
        {/* Welcome Header with Search */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Welcome back, <span className="text-golden">Nishchay! 👋</span>
              </h1>
              <p className="text-muted-foreground">
                Ready to continue your coding journey? You're doing amazing! 
              </p>
            </div>
            <div className="flex-shrink-0">
              <QuickSearch />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          {learningStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-colors">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">{stat.title}</p>
                      <p className={`text-lg sm:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1 hidden sm:block">{stat.change}</p>
                    </div>
                    <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color} self-end sm:self-auto`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Dashboard with Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 lg:w-fit mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
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
                      <Link to="/languages">
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
              </div>
            </div>
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

export default Dashboard;