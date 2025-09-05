import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
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
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, <span className="text-golden">Nishchay! 👋</span>
          </h1>
          <p className="text-muted-foreground">
            Ready to continue your coding journey? You're doing amazing! 
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {learningStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-foreground">Continue Learning</CardTitle>
                    <CardDescription>Pick up where you left off</CardDescription>
                  </div>
                  <Link to="/languages">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentCourses.map((course) => (
                  <div key={course.id} className="p-4 rounded-lg bg-accent/10 border border-accent/20 hover:border-accent/40 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{course.title}</h3>
                          <Badge variant="outline" className={`text-xs ${
                            course.difficulty === 'Beginner' ? 'border-emerald-500/50 text-emerald-400' :
                            course.difficulty === 'Intermediate' ? 'border-yellow-500/50 text-yellow-400' :
                            'border-red-500/50 text-red-400'
                          }`}>
                            {course.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Next: {course.nextLesson}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {course.estimatedTime}
                        </p>
                      </div>
                      <Button size="sm" className="ml-4">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Continue
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>Your learning plan for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-accent/5 border border-accent/10">
                      <div className="text-sm font-medium text-golden min-w-[80px]">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.task}</p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {item.type}
                        </Badge>
                      </div>
                      <Button size="sm" variant="ghost">
                        Start
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-lg text-foreground flex items-center gap-2">
                  <Award className="w-5 h-5 text-golden" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.earned}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/roadmaps/create" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Create Roadmap
                  </Button>
                </Link>
                
                <Link to="/languages" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <Code className="w-4 h-4 mr-2" />
                    Browse Languages
                  </Button>
                </Link>
                
                <Link to="/leaderboard" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <Trophy className="w-4 h-4 mr-2" />
                    View Leaderboard
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Weekly Goal */}
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
                  <p className="text-xs text-muted-foreground">
                    3 more days to reach your goal! 🎯
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;