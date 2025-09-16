import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Gamepad2,
  Trophy,
  Star,
  Zap,
  Target,
  Crown,
  Sparkles,
  Timer,
  Brain,
  TrendingUp,
  Award,
  Medal,
  Flame,
  Users,
  CheckCircle,
  PlayCircle,
  RotateCcw
} from 'lucide-react';

interface MathGame {
  id: string;
  title: string;
  description: string;
  category: 'arithmetic' | 'algebra' | 'geometry' | 'logic';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  estimatedTime: string;
  playerCount: number;
  rating: number;
  unlocked: boolean;
  completed: boolean;
  bestScore: number | null;
}

interface GameSession {
  gameId: string;
  score: number;
  timeSpent: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: Date;
}

const MathGamificationHub = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [gameSession, setGameSession] = useState<GameSession | null>(null);

  const mathGames: MathGame[] = [
    // Elementary Games (Grades 6-8)
    {
      id: 'number-ninja',
      title: 'Number Ninja',
      description: 'Slice through arithmetic problems with lightning speed!',
      category: 'arithmetic',
      difficulty: 'Easy',
      points: 50,
      estimatedTime: '5-10 min',
      playerCount: 12543,
      rating: 4.8,
      unlocked: true,
      completed: true,
      bestScore: 850
    },
    {
      id: 'fraction-quest',
      title: 'Fraction Quest',
      description: 'Embark on an epic journey through the land of fractions',
      category: 'arithmetic',
      difficulty: 'Medium',
      points: 100,
      estimatedTime: '10-15 min',
      playerCount: 8765,
      rating: 4.6,
      unlocked: true,
      completed: false,
      bestScore: null
    },
    {
      id: 'times-table-tornado',
      title: 'Times Table Tornado',
      description: 'Survive the multiplication storm and become a math hero!',
      category: 'arithmetic',
      difficulty: 'Easy',
      points: 75,
      estimatedTime: '8-12 min',
      playerCount: 15678,
      rating: 4.5,
      unlocked: true,
      completed: true,
      bestScore: 650
    },
    {
      id: 'decimal-defender',
      title: 'Decimal Defender',
      description: 'Protect your castle by solving decimal operations!',
      category: 'arithmetic',
      difficulty: 'Medium',
      points: 90,
      estimatedTime: '12-15 min',
      playerCount: 9876,
      rating: 4.7,
      unlocked: true,
      completed: false,
      bestScore: null
    },
    {
      id: 'percentage-pirate',
      title: 'Percentage Pirate',
      description: 'Hunt for treasure by calculating percentages correctly!',
      category: 'arithmetic',
      difficulty: 'Medium',
      points: 110,
      estimatedTime: '15-20 min',
      playerCount: 7432,
      rating: 4.4,
      unlocked: true,
      completed: false,
      bestScore: null
    },

    // Middle School Games (Grades 7-9)
    {
      id: 'algebra-adventure',
      title: 'Algebra Adventure',
      description: 'Solve mysterious equations to unlock ancient treasures',
      category: 'algebra',
      difficulty: 'Medium',
      points: 150,
      estimatedTime: '15-20 min',
      playerCount: 6234,
      rating: 4.7,
      unlocked: true,
      completed: false,
      bestScore: null
    },
    {
      id: 'equation-explorer',
      title: 'Equation Explorer',
      description: 'Navigate through mathematical landscapes solving linear equations',
      category: 'algebra',
      difficulty: 'Medium',
      points: 130,
      estimatedTime: '12-18 min',
      playerCount: 5667,
      rating: 4.6,
      unlocked: true,
      completed: false,
      bestScore: null
    },
    {
      id: 'geometry-wars',
      title: 'Geometry Wars',
      description: 'Defend your space station using the power of shapes!',
      category: 'geometry',
      difficulty: 'Hard',
      points: 200,
      estimatedTime: '20-25 min',
      playerCount: 4567,
      rating: 4.9,
      unlocked: false,
      completed: false,
      bestScore: null
    },
    {
      id: 'angle-assassin',
      title: 'Angle Assassin',
      description: 'Use precise angle calculations to defeat enemies!',
      category: 'geometry',
      difficulty: 'Medium',
      points: 120,
      estimatedTime: '10-15 min',
      playerCount: 6789,
      rating: 4.5,
      unlocked: true,
      completed: false,
      bestScore: null
    },
    {
      id: 'area-architect',
      title: 'Area Architect',
      description: 'Build amazing structures by calculating areas perfectly!',
      category: 'geometry',
      difficulty: 'Medium',
      points: 140,
      estimatedTime: '15-20 min',
      playerCount: 5432,
      rating: 4.8,
      unlocked: true,
      completed: false,
      bestScore: null
    },

    // Advanced Games (Grades 9-12)
    {
      id: 'trigonometry-titan',
      title: 'Trigonometry Titan',
      description: 'Master sine, cosine, and tangent in epic battles!',
      category: 'geometry',
      difficulty: 'Hard',
      points: 250,
      estimatedTime: '25-30 min',
      playerCount: 3210,
      rating: 4.9,
      unlocked: false,
      completed: false,
      bestScore: null
    },
    {
      id: 'calculus-champion',
      title: 'Calculus Champion',
      description: 'Conquer limits, derivatives, and integrals!',
      category: 'algebra',
      difficulty: 'Hard',
      points: 300,
      estimatedTime: '30-40 min',
      playerCount: 2345,
      rating: 4.7,
      unlocked: false,
      completed: false,
      bestScore: null
    },
    {
      id: 'probability-prophet',
      title: 'Probability Prophet',
      description: 'Predict the future using probability and statistics!',
      category: 'logic',
      difficulty: 'Hard',
      points: 220,
      estimatedTime: '20-25 min',
      playerCount: 4123,
      rating: 4.6,
      unlocked: false,
      completed: false,
      bestScore: null
    },
    {
      id: 'logic-labyrinth',
      title: 'Logic Labyrinth',
      description: 'Navigate through mind-bending mathematical puzzles',
      category: 'logic',
      difficulty: 'Hard',
      points: 250,
      estimatedTime: '25-30 min',
      playerCount: 3456,
      rating: 4.8,
      unlocked: false,
      completed: false,
      bestScore: null
    },

    // NCERT Curriculum Games
    {
      id: 'ncert-number-system',
      title: 'NCERT Number System Master',
      description: 'Master the complete NCERT number system curriculum through games',
      category: 'arithmetic',
      difficulty: 'Medium',
      points: 180,
      estimatedTime: '20-25 min',
      playerCount: 8901,
      rating: 4.7,
      unlocked: true,
      completed: false,
      bestScore: null
    },
    {
      id: 'cbse-board-prep',
      title: 'CBSE Board Exam Simulator',
      description: 'Practice with real CBSE board exam style questions in a game format',
      category: 'logic',
      difficulty: 'Hard',
      points: 400,
      estimatedTime: '40-50 min',
      playerCount: 12340,
      rating: 4.9,
      unlocked: true,
      completed: false,
      bestScore: null
    },

    // Competitive Games
    {
      id: 'math-olympics',
      title: 'Mathematical Olympiad Training',
      description: 'Train for Mathematical Olympiad with challenging problems',
      category: 'logic',
      difficulty: 'Hard',
      points: 500,
      estimatedTime: '45-60 min',
      playerCount: 2109,
      rating: 4.8,
      unlocked: false,
      completed: false,
      bestScore: null
    },
    {
      id: 'speed-math-challenge',
      title: 'Speed Math Championship',
      description: 'Compete in real-time speed math competitions!',
      category: 'arithmetic',
      difficulty: 'Medium',
      points: 160,
      estimatedTime: '5-10 min',
      playerCount: 15670,
      rating: 4.6,
      unlocked: true,
      completed: false,
      bestScore: null
    }
  ];

  const categories = [
    { id: 'all', name: 'All Games', icon: Gamepad2, color: 'text-purple-400' },
    { id: 'arithmetic', name: 'Arithmetic', icon: Target, color: 'text-green-400' },
    { id: 'algebra', name: 'Algebra', icon: Brain, color: 'text-blue-400' },
    { id: 'geometry', name: 'Geometry', icon: Trophy, color: 'text-yellow-400' },
    { id: 'logic', name: 'Logic', icon: Sparkles, color: 'text-pink-400' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'arithmetic': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'algebra': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'geometry': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'logic': return 'bg-pink-500/20 text-pink-400 border-pink-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const filteredGames = selectedCategory === 'all' 
    ? mathGames 
    : mathGames.filter(game => game.category === selectedCategory);

  const totalGamesCompleted = mathGames.filter(game => game.completed).length;
  const totalPointsEarned = mathGames
    .filter(game => game.completed)
    .reduce((sum, game) => sum + game.points, 0);

  const handlePlayGame = (gameId: string) => {
    setActiveGame(gameId);
    // Here you would navigate to the actual game component
    console.log('Starting game:', gameId);
  };

  return (
    <div className="space-y-6">
      {/* Gamification Header */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <Gamepad2 className="w-8 h-8 text-purple-400" />
            Math Gaming Arena
            <Sparkles className="w-6 h-6 text-golden animate-pulse" />
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Level up your math skills through exciting games and challenges
          </p>
        </CardHeader>
      </Card>

      {/* Player Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-golden/10 to-golden/5 border-golden/20">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-golden mx-auto mb-2" />
            <div className="text-2xl font-bold text-golden">{totalPointsEarned}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{totalGamesCompleted}</div>
            <div className="text-sm text-muted-foreground">Games Won</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">15</div>
            <div className="text-sm text-muted-foreground">Win Streak</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Crown className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">#23</div>
            <div className="text-sm text-muted-foreground">Leaderboard</div>
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
                  <Icon className={`w-4 h-4 ${category.color}`} />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Featured Game of the Day */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-6 h-6 text-golden" />
            Featured Game of the Day
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-bold text-foreground">Fraction Quest</h3>
              <p className="text-muted-foreground">
                Today's featured game offers double XP! Master fractions while exploring 
                mysterious lands and collecting magical artifacts.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                  Medium
                </Badge>
                <div className="flex items-center gap-1 text-golden">
                  <Star className="w-4 h-4" />
                  <span className="font-semibold">200 XP (2x Bonus)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Timer className="w-4 h-4" />
                  <span>10-15 min</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>8.7k players</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Button size="lg" className="bg-golden hover:bg-golden/90">
                <PlayCircle className="w-5 h-5 mr-2" />
                Play Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <Card
            key={game.id}
            className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              game.unlocked 
                ? 'bg-card/50 backdrop-blur-sm border-border/50 cursor-pointer' 
                : 'bg-card/30 backdrop-blur-sm border-border/30 opacity-60'
            }`}
            onClick={() => game.unlocked && handlePlayGame(game.id)}
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Game Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-foreground">{game.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                      <Badge variant="outline" className={getCategoryColor(game.category)}>
                        {game.category}
                      </Badge>
                    </div>
                  </div>
                  {game.completed && <CheckCircle className="w-6 h-6 text-emerald-400" />}
                </div>

                {/* Game Description */}
                <p className="text-sm text-muted-foreground">{game.description}</p>

                {/* Game Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-golden">
                      <Star className="w-4 h-4" />
                      <span className="font-semibold">{game.points} XP</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Timer className="w-4 h-4" />
                      <span>{game.estimatedTime}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{(game.playerCount / 1000).toFixed(1)}k players</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4" />
                      <span>{game.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Best Score */}
                {game.bestScore && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Your Best Score:</span>
                      <span className="font-bold text-emerald-400">{game.bestScore}</span>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="pt-2">
                  {!game.unlocked ? (
                    <Button variant="outline" disabled className="w-full">
                      <Target className="w-4 h-4 mr-2" />
                      Unlock Required
                    </Button>
                  ) : game.completed ? (
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Play Again
                      </Button>
                      <Button className="flex-1">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Beat Score
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full bg-blue-500 hover:bg-blue-600">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Start Game
                    </Button>
                  )}
                </div>
              </div>

              {/* Completion Glow Effect */}
              {game.completed && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 animate-pulse pointer-events-none" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-golden" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Users className="w-6 h-6 text-blue-400" />
              <div className="text-left">
                <div className="font-semibold">Multiplayer</div>
                <div className="text-sm text-muted-foreground">Challenge friends</div>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Trophy className="w-6 h-6 text-golden" />
              <div className="text-left">
                <div className="font-semibold">Tournaments</div>
                <div className="text-sm text-muted-foreground">Compete globally</div>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Target className="w-6 h-6 text-green-400" />
              <div className="text-left">
                <div className="font-semibold">Daily Quest</div>
                <div className="text-sm text-muted-foreground">Earn bonus XP</div>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Award className="w-6 h-6 text-purple-400" />
              <div className="text-left">
                <div className="font-semibold">Achievements</div>
                <div className="text-sm text-muted-foreground">View progress</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MathGamificationHub;