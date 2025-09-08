import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Award, 
  Star, 
  Flame, 
  Code, 
  BookOpen,
  Users,
  Calendar,
  Target,
  Zap,
  Lock,
  CheckCircle
} from 'lucide-react';

const AchievementSystem = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first coding lesson',
      icon: '👶',
      category: 'beginner',
      points: 25,
      progress: 100,
      total: 1,
      unlocked: true,
      rarity: 'common',
      earnedDate: '2024-01-10'
    },
    {
      id: 2,
      title: 'Week Warrior',
      description: 'Maintain a 7-day coding streak',
      icon: '🔥',
      category: 'streak',
      points: 100,
      progress: 100,
      total: 7,
      unlocked: true,
      rarity: 'uncommon',
      earnedDate: '2024-01-15'
    },
    {
      id: 3,
      title: 'Python Enthusiast',
      description: 'Complete 10 Python exercises',
      icon: '🐍',
      category: 'language',
      points: 150,
      progress: 75,
      total: 10,
      unlocked: false,
      rarity: 'rare'
    },
    {
      id: 4,
      title: 'Code Reviewer',
      description: 'Review 5 community code submissions',
      icon: '👀',
      category: 'community',
      points: 75,
      progress: 40,
      total: 5,
      unlocked: false,
      rarity: 'uncommon'
    },
    {
      id: 5,
      title: 'Speed Demon',
      description: 'Solve a challenge in under 5 minutes',
      icon: '⚡',
      category: 'performance',
      points: 200,
      progress: 0,
      total: 1,
      unlocked: false,
      rarity: 'epic'
    },
    {
      id: 6,
      title: 'Algorithm Master',
      description: 'Complete all data structure courses',
      icon: '🧠',
      category: 'advanced',
      points: 500,
      progress: 30,
      total: 15,
      unlocked: false,
      rarity: 'legendary'
    },
    {
      id: 7,
      title: 'Mentor',
      description: 'Help 10 other students in forums',
      icon: '🎓',
      category: 'community',
      points: 300,
      progress: 20,
      total: 10,
      unlocked: false,
      rarity: 'epic'
    },
    {
      id: 8,
      title: 'Night Owl',
      description: 'Code after midnight for 5 days',
      icon: '🦉',
      category: 'special',
      points: 150,
      progress: 60,
      total: 5,
      unlocked: false,
      rarity: 'rare'
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: Trophy },
    { id: 'beginner', name: 'Beginner', icon: BookOpen },
    { id: 'streak', name: 'Streaks', icon: Flame },
    { id: 'language', name: 'Languages', icon: Code },
    { id: 'community', name: 'Community', icon: Users },
    { id: 'performance', name: 'Performance', icon: Zap },
    { id: 'advanced', name: 'Advanced', icon: Target },
    { id: 'special', name: 'Special', icon: Star }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-500/50 bg-gray-500/10';
      case 'uncommon': return 'border-green-500/50 bg-green-500/10';
      case 'rare': return 'border-blue-500/50 bg-blue-500/10';
      case 'epic': return 'border-purple-500/50 bg-purple-500/10';
      case 'legendary': return 'border-golden/50 bg-golden/10';
      default: return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'uncommon': return 'text-green-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-golden';
      default: return 'text-gray-400';
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-6">
      {/* Achievement Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-golden/10 to-golden/5 border-golden/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Points</p>
                <p className="text-2xl font-bold text-golden">{totalPoints.toLocaleString()}</p>
              </div>
              <Star className="w-8 h-8 text-golden" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unlocked</p>
                <p className="text-2xl font-bold text-foreground">{unlockedCount}/{achievements.length}</p>
              </div>
              <Trophy className="w-8 h-8 text-golden" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rare+</p>
                <p className="text-2xl font-bold text-foreground">
                  {achievements.filter(a => a.unlocked && ['rare', 'epic', 'legendary'].includes(a.rarity)).length}
                </p>
              </div>
              <Award className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-2xl font-bold text-foreground">{Math.round((unlockedCount / achievements.length) * 100)}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAchievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`relative overflow-hidden transition-all hover:scale-105 ${
              achievement.unlocked 
                ? getRarityColor(achievement.rarity)
                : 'bg-card/30 backdrop-blur-sm border-border/30'
            } ${achievement.unlocked ? 'shadow-lg' : ''}`}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Achievement Icon & Status */}
                <div className="flex items-center justify-between">
                  <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                    {achievement.unlocked ? achievement.icon : '🔒'}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getRarityText(achievement.rarity)} border-current`}
                    >
                      {achievement.rarity}
                    </Badge>
                    {achievement.unlocked && (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                </div>

                {/* Achievement Info */}
                <div className="space-y-2">
                  <h3 className={`font-semibold ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm ${achievement.unlocked ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                    {achievement.description}
                  </p>
                </div>

                {/* Progress */}
                {!achievement.unlocked && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground">
                        {Math.floor((achievement.progress / 100) * achievement.total)}/{achievement.total}
                      </span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                )}

                {/* Points & Date */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-1 text-golden">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-medium">{achievement.points} pts</span>
                  </div>
                  {achievement.earnedDate && (
                    <span className="text-xs text-muted-foreground">
                      {new Date(achievement.earnedDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Legendary Glow Effect */}
              {achievement.unlocked && achievement.rarity === 'legendary' && (
                <div className="absolute inset-0 bg-gradient-to-r from-golden/20 via-transparent to-golden/20 animate-pulse pointer-events-none" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AchievementSystem;