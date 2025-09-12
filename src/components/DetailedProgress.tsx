import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  Clock, 
  Star, 
  Award,
  Calendar,
  Zap,
  Brain,
  Code2,
  CheckCircle,
  ArrowRight,
  Trophy,
  Flame
} from 'lucide-react';

const DetailedProgress = () => {
  const skillProgress = [
    {
      skill: 'Python',
      level: 'Intermediate',
      progress: 75,
      totalProjects: 8,
      completedProjects: 6,
      currentTopic: 'Object-Oriented Programming',
      nextMilestone: 'Advanced Python Concepts',
      xpGained: 1250,
      color: 'bg-blue-500'
    },
    {
      skill: 'JavaScript',
      level: 'Beginner',
      progress: 45,
      totalProjects: 6,
      completedProjects: 3,
      currentTopic: 'DOM Manipulation',
      nextMilestone: 'Async JavaScript',
      xpGained: 680,
      color: 'bg-yellow-500'
    },
    {
      skill: 'Java',
      level: 'Intermediate',
      progress: 60,
      totalProjects: 10,
      completedProjects: 6,
      currentTopic: 'Collections Framework',
      nextMilestone: 'Spring Framework',
      xpGained: 980,
      color: 'bg-red-500'
    },
    {
      skill: 'C++',
      level: 'Beginner',
      progress: 25,
      totalProjects: 4,
      completedProjects: 1,
      currentTopic: 'Pointers & Memory',
      nextMilestone: 'Data Structures',
      xpGained: 320,
      color: 'bg-purple-500'
    }
  ];

  const learningMetrics = [
    { label: 'Total Study Hours', value: '127h', icon: Clock, trend: '+12h this week' },
    { label: 'Problems Solved', value: '342', icon: CheckCircle, trend: '+28 this week' },
    { label: 'Concepts Mastered', value: '89', icon: Brain, trend: '+7 this week' },
    { label: 'Code Reviews', value: '23', icon: Code2, trend: '+3 this week' }
  ];

  const achievements = [
    { title: 'Speed Demon', description: 'Solved 10 problems in under 2 hours', icon: '⚡', rarity: 'rare', date: 'Today' },
    { title: 'Python Master', description: 'Completed advanced Python course', icon: '🐍', rarity: 'epic', date: '2 days ago' },
    { title: 'Bug Hunter', description: 'Found and fixed 5 bugs in community code', icon: '🐛', rarity: 'common', date: '1 week ago' },
    { title: 'Streak Warrior', description: '30 days learning streak', icon: '🔥', rarity: 'legendary', date: '3 days ago' }
  ];

  const recentActivities = [
    { action: 'Completed', item: 'Python Functions Challenge', time: '2 hours ago', xp: '+50 XP' },
    { action: 'Started', item: 'JavaScript DOM Project', time: '5 hours ago', xp: '' },
    { action: 'Achieved', item: 'Speed Demon Badge', time: '1 day ago', xp: '+100 XP' },
    { action: 'Submitted', item: 'Java Calculator Project', time: '2 days ago', xp: '+75 XP' },
    { action: 'Completed', item: 'C++ Pointers Quiz', time: '3 days ago', xp: '+25 XP' }
  ];

  const weeklyGoals = [
    { goal: 'Complete 3 coding challenges', progress: 100, current: 3, target: 3, status: 'completed' },
    { goal: 'Study for 10 hours', progress: 80, current: 8, target: 10, status: 'in-progress' },
    { goal: 'Finish Python OOP module', progress: 75, current: 3, target: 4, status: 'in-progress' },
    { goal: 'Get 5 code reviews', progress: 40, current: 2, target: 5, status: 'behind' }
  ];

  return (
    <div className="space-y-8">
      {/* Learning Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {learningMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 hover-scale">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-xs text-emerald-400">{metric.trend}</p>
                  </div>
                  <Icon className="w-8 h-8 text-golden" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Skill Progress */}
        <div className="xl:col-span-2">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-golden" />
                Skill Development Progress
              </CardTitle>
              <CardDescription>Track your mastery across different programming languages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {skillProgress.map((skill, index) => (
                <div key={index} className="space-y-4 p-4 rounded-lg bg-accent/5 border border-accent/10 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${skill.color}`} />
                      <h3 className="font-semibold text-lg">{skill.skill}</h3>
                      <Badge variant="outline" className={`${
                        skill.level === 'Beginner' ? 'border-emerald-500/50 text-emerald-400' :
                        skill.level === 'Intermediate' ? 'border-yellow-500/50 text-yellow-400' :
                        'border-red-500/50 text-red-400'
                      }`}>
                        {skill.level}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{skill.progress}%</p>
                      <p className="text-xs text-muted-foreground">{skill.xpGained} XP</p>
                    </div>
                  </div>
                  
                  <Progress value={skill.progress} className="h-3" />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current Topic</p>
                      <p className="font-medium">{skill.currentTopic}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Milestone</p>
                      <p className="font-medium">{skill.nextMilestone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-accent/20">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        Projects: {skill.completedProjects}/{skill.totalProjects}
                      </span>
                      <Progress value={(skill.completedProjects / skill.totalProjects) * 100} className="h-2 w-20" />
                    </div>
                    <Button size="sm" variant="outline">
                      Continue <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Weekly Goals */}
          <Card className="bg-gradient-to-br from-golden/10 to-golden/5 border-golden/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="w-5 h-5 text-golden" />
                Weekly Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weeklyGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{goal.goal}</p>
                    <div className="flex items-center gap-1">
                      {goal.status === 'completed' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                      {goal.status === 'in-progress' && <Clock className="w-4 h-4 text-yellow-400" />}
                      {goal.status === 'behind' && <Zap className="w-4 h-4 text-red-400" />}
                      <span className="text-xs">{goal.current}/{goal.target}</span>
                    </div>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5 text-blue-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.slice(0, 5).map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/10 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-golden" />
                  <div className="flex-1 text-sm">
                    <span className="text-golden font-medium">{activity.action}</span> {activity.item}
                    {activity.xp && <span className="text-emerald-400 ml-2">{activity.xp}</span>}
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Achievements Section */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-golden" />
            Recent Achievements
          </CardTitle>
          <CardDescription>Your latest accomplishments and badges earned</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className={`p-4 rounded-lg border transition-all duration-300 hover-scale ${
                achievement.rarity === 'legendary' ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30' :
                achievement.rarity === 'epic' ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30' :
                achievement.rarity === 'rare' ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30' :
                'bg-accent/10 border-accent/20'
              }`}>
                <div className="text-center space-y-2">
                  <div className="text-3xl">{achievement.icon}</div>
                  <h4 className="font-semibold text-sm">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  <Badge variant="outline" className={`${
                    achievement.rarity === 'legendary' ? 'border-purple-500/50 text-purple-400' :
                    achievement.rarity === 'epic' ? 'border-blue-500/50 text-blue-400' :
                    achievement.rarity === 'rare' ? 'border-green-500/50 text-green-400' :
                    'border-gray-500/50 text-gray-400'
                  }`}>
                    {achievement.rarity}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedProgress;