import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  Calendar,
  Flame,
  Star,
  Target,
  Users,
  Clock
} from 'lucide-react';

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState('weekly');

  // Mock leaderboard data
  const leaderboardData = {
    weekly: [
      { rank: 1, name: 'Nishchay Chaurasia', points: 2450, streak: 7, avatar: 'NC', country: '🇮🇳', change: '+5', courses: 12, hours: 45 },
      { rank: 2, name: 'Arjun Kumar', points: 2380, streak: 12, avatar: 'AK', country: '🇮🇳', change: '-1', courses: 15, hours: 52 },
      { rank: 3, name: 'Priya Sharma', points: 2290, streak: 8, avatar: 'PS', country: '🇮🇳', change: '+2', courses: 10, hours: 38 },
      { rank: 4, name: 'Rohit Singh', points: 2180, streak: 5, avatar: 'RS', country: '🇮🇳', change: '0', courses: 9, hours: 34 },
      { rank: 5, name: 'Ananya Gupta', points: 2150, streak: 15, avatar: 'AG', country: '🇮🇳', change: '+3', courses: 14, hours: 48 },
      { rank: 6, name: 'Vikram Patel', points: 2090, streak: 3, avatar: 'VP', country: '🇮🇳', change: '-2', courses: 8, hours: 29 },
      { rank: 7, name: 'Kavya Reddy', points: 2020, streak: 9, avatar: 'KR', country: '🇮🇳', change: '+1', courses: 11, hours: 41 },
      { rank: 8, name: 'Amit Joshi', points: 1980, streak: 6, avatar: 'AJ', country: '🇮🇳', change: '+4', courses: 7, hours: 25 },
      { rank: 9, name: 'Sneha Iyer', points: 1920, streak: 11, avatar: 'SI', country: '🇮🇳', change: '-1', courses: 13, hours: 43 },
      { rank: 10, name: 'Karan Mehta', points: 1890, streak: 4, avatar: 'KM', country: '🇮🇳', change: '+2', courses: 6, hours: 22 }
    ]
  };

  const achievements = [
    {
      title: 'Python Master',
      description: 'Completed all Python courses',
      icon: '🐍',
      rarity: 'Legendary',
      holders: 234
    },
    {
      title: 'Week Warrior',
      description: '7-day learning streak',
      icon: '🔥',
      rarity: 'Epic',
      holders: 1250
    },
    {
      title: 'First Steps',
      description: 'Completed first lesson',
      icon: '👶',
      rarity: 'Common',
      holders: 45000
    },
    {
      title: 'Night Owl',
      description: 'Studied after midnight',
      icon: '🦉',
      rarity: 'Rare',
      holders: 890
    }
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-golden" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-muted-foreground">{rank}</span>;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-golden to-yellow-400 text-primary-foreground';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-primary-foreground';
    if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600 text-primary-foreground';
    return 'bg-muted text-muted-foreground';
  };

  const getChangeIcon = (change: string) => {
    if (change.startsWith('+')) return <TrendingUp className="w-4 h-4 text-emerald-400" />;
    if (change.startsWith('-')) return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
    return <span className="w-4 h-4 text-muted-foreground">—</span>;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary': return 'border-golden/50 bg-golden/10 text-golden';
      case 'epic': return 'border-purple-500/50 bg-purple-500/10 text-purple-400';
      case 'rare': return 'border-blue-500/50 bg-blue-500/10 text-blue-400';
      default: return 'border-gray-500/50 bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex flex-wrap items-center gap-2">
            <Trophy className="w-8 h-8 text-golden" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground">
            Compete with fellow developers and climb the ranks!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-3">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl text-foreground">Global Rankings</CardTitle>
                    <CardDescription>Top performers this week</CardDescription>
                  </div>
                  <Tabs defaultValue="weekly" className="w-full sm:w-auto">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="all-time">All Time</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {leaderboardData.weekly.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg transition-all duration-200 hover:bg-accent/20 gap-4 sm:gap-0 ${
                        user.name === 'Nishchay Chaurasia'
                          ? 'bg-golden/5 border border-golden/20'
                          : 'border border-transparent hover:border-accent/30'
                      }`}
                    >
                      <div className="flex items-center gap-4 w-full">
                        {/* Rank */}
                        <div className="flex items-center justify-center min-w-[40px]">
                          {getRankIcon(user.rank)}
                        </div>

                        {/* User Info */}
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className={`text-sm font-bold ${getRankBadgeColor(user.rank)}`}>
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground">
                                {user.name}
                              </span>
                              <span className="text-lg">{user.country}</span>
                              {user.name === 'Nishchay Chaurasia' && (
                                <Badge variant="secondary" className="bg-golden/20 text-golden border-golden/30 text-xs">
                                  You
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Flame className="w-3 h-3 text-orange-400" />
                                <span>{user.streak} day streak</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Award className="w-3 h-3 text-blue-400" />
                                <span>{user.courses} courses</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-purple-400" />
                                <span>{user.hours}h</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Points and Change */}
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <div className="flex items-center gap-2 justify-start sm:justify-end">
                          <span className="text-lg font-bold text-golden">
                            {user.points.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">pts</span>
                        </div>
                        <div className="flex items-center gap-1 justify-start sm:justify-end">
                          {getChangeIcon(user.change)}
                          <span className={`text-xs ${
                            user.change.startsWith('+') ? 'text-emerald-400' :
                            user.change.startsWith('-') ? 'text-red-400' : 'text-muted-foreground'
                          }`}>
                            {user.change !== '0' && user.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Stats */}
            <Card className="bg-gradient-to-br from-golden/10 to-golden/5 border-golden/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-foreground flex items-center gap-2">
                  <Target className="w-5 h-5 text-golden" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-golden mb-1">#1</div>
                  <p className="text-sm text-muted-foreground">Current Rank</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Points</span>
                    <span className="font-semibold text-foreground">2,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Streak</span>
                    <span className="font-semibold text-foreground">7 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Courses</span>
                    <span className="font-semibold text-foreground">12</span>
                  </div>
                </div>

                <Button className="w-full" size="sm">
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-foreground flex items-center gap-2">
                  <Star className="w-5 h-5 text-golden" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${getRarityColor(achievement.rarity)}`}>
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground text-sm truncate">
                            {achievement.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-1">
                            {achievement.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {achievement.rarity}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              <Users className="w-3 h-3 inline mr-1" />
                              {achievement.holders.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Competition Info */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-golden" />
                  This Week's Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🏆</div>
                    <h3 className="font-semibold text-foreground">Python Sprint</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete 5 Python lessons this week
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground">3/5</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-golden h-2 rounded-full" style={{ width: '60%' }} />
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-xs text-muted-foreground">
                      Reward: <span className="text-golden font-medium">500 bonus points</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;