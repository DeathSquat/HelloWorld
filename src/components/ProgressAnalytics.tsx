import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target,
  BarChart3,
  Trophy,
  Zap,
  BookOpen
} from 'lucide-react';

const ProgressAnalytics = () => {
  const weeklyData = [
    { day: 'Mon', hours: 2.5, completed: 3 },
    { day: 'Tue', hours: 3.2, completed: 4 },
    { day: 'Wed', hours: 1.8, completed: 2 },
    { day: 'Thu', hours: 4.1, completed: 5 },
    { day: 'Fri', hours: 2.9, completed: 3 },
    { day: 'Sat', hours: 5.2, completed: 6 },
    { day: 'Sun', hours: 3.8, completed: 4 }
  ];

  const languageProgress = [
    { name: 'Python', progress: 75, hours: 24.5, color: 'bg-blue-500' },
    { name: 'JavaScript', progress: 60, hours: 18.2, color: 'bg-yellow-500' },
    { name: 'Java', progress: 45, hours: 12.8, color: 'bg-orange-500' },
    { name: 'C++', progress: 30, hours: 8.5, color: 'bg-purple-500' }
  ];

  const achievements = [
    { title: 'Week Warrior', description: '7 day streak', icon: '🔥', date: '2 days ago' },
    { title: 'Python Master', description: 'Completed Python basics', icon: '🐍', date: '1 week ago' },
    { title: 'Code Explorer', description: 'Tried 3 languages', icon: '🗺️', date: '2 weeks ago' }
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-golden">23.5h</p>
                <p className="text-xs text-emerald-400">+2.3h from last week</p>
              </div>
              <Clock className="w-8 h-8 text-golden" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lessons Done</p>
                <p className="text-2xl font-bold text-golden">27</p>
                <p className="text-xs text-emerald-400">+5 this week</p>
              </div>
              <BookOpen className="w-8 h-8 text-golden" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold text-golden">7 days</p>
                <p className="text-xs text-emerald-400">Personal best!</p>
              </div>
              <Zap className="w-8 h-8 text-golden" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weekly Goal</p>
                <p className="text-2xl font-bold text-golden">94%</p>
                <p className="text-xs text-yellow-400">1.5h remaining</p>
              </div>
              <Target className="w-8 h-8 text-golden" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-golden" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={day.day} className="flex items-center gap-4">
                  <div className="w-8 text-sm text-muted-foreground">{day.day}</div>
                  <div className="flex-1 relative">
                    <div className="h-8 bg-muted rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-golden to-golden-bright rounded-lg transition-all duration-700 ease-out"
                        style={{ 
                          width: `${(day.hours / maxHours) * 100}%`,
                          animationDelay: `${index * 0.1}s`
                        }}
                      />
                    </div>
                    <div className="absolute inset-y-0 left-2 flex items-center">
                      <span className="text-xs font-medium text-background-deep">
                        {day.hours}h
                      </span>
                    </div>
                  </div>
                  <div className="w-16 text-sm text-muted-foreground text-right">
                    {day.completed} tasks
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Language Progress */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-golden" />
              Language Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {languageProgress.map((lang, index) => (
                <div key={lang.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${lang.color}`} />
                      <span className="font-medium text-foreground">{lang.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {lang.hours}h • {lang.progress}%
                    </div>
                  </div>
                  <Progress 
                    value={lang.progress} 
                    className="h-2"
                    style={{
                      animationDelay: `${index * 0.2}s`
                    }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-golden" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.title} 
                className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10 hover:border-accent/20 transition-colors"
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground text-sm">{achievement.title}</h3>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  <p className="text-xs text-golden mt-1">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressAnalytics;