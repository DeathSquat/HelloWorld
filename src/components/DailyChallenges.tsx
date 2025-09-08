import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Trophy, 
  Timer, 
  Code, 
  CheckCircle,
  Star,
  Flame,
  Target
} from 'lucide-react';

const DailyChallenges = () => {
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: 'String Reversal Master',
      description: 'Write a function to reverse a string without using built-in methods',
      difficulty: 'Easy',
      language: 'Python',
      points: 50,
      timeLimit: 15,
      completed: false,
      attempts: 0
    },
    {
      id: 2,
      title: 'Array Sum Challenge',
      description: 'Find two numbers in an array that add up to a target sum',
      difficulty: 'Medium',
      language: 'JavaScript',
      points: 100,
      timeLimit: 30,
      completed: true,
      attempts: 2
    },
    {
      id: 3,
      title: 'Binary Search Tree',
      description: 'Implement insertion and search operations in a BST',
      difficulty: 'Hard',
      language: 'Java',
      points: 200,
      timeLimit: 45,
      completed: false,
      attempts: 1
    }
  ]);

  const [streak, setStreak] = useState(7);
  const [dailyProgress, setDailyProgress] = useState(2);
  const dailyTarget = 3;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'Python': return 'text-blue-400';
      case 'JavaScript': return 'text-yellow-400';
      case 'Java': return 'text-orange-400';
      case 'C++': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const handleStartChallenge = (challengeId: number) => {
    console.log('Starting challenge:', challengeId);
    // Navigate to challenge page
  };

  const completedChallenges = challenges.filter(c => c.completed).length;
  const progressPercentage = (dailyProgress / dailyTarget) * 100;

  return (
    <div className="space-y-6">
      {/* Daily Progress Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-golden/10 to-golden/5 border-golden/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily Streak</p>
                <p className="text-2xl font-bold text-golden flex items-center gap-1">
                  {streak} <Flame className="w-5 h-5" />
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-golden/20 flex items-center justify-center">
                <Flame className="w-6 h-6 text-golden" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Goal</p>
                <p className="text-2xl font-bold text-foreground">{dailyProgress}/{dailyTarget}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Points Today</p>
                <p className="text-2xl font-bold text-foreground">150</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rank Today</p>
                <p className="text-2xl font-bold text-foreground">#12</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Daily Progress</h3>
              <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{dailyProgress} challenges completed</span>
              <span>{dailyTarget - dailyProgress} remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Challenge List */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <Zap className="w-6 h-6 text-golden" />
            Daily Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div 
                key={challenge.id} 
                className={`p-4 rounded-lg border transition-all hover:border-accent/40 ${
                  challenge.completed 
                    ? 'bg-emerald-500/5 border-emerald-500/20' 
                    : 'bg-accent/5 border-accent/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                      {challenge.completed && (
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {challenge.description}
                    </p>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                      
                      <Badge variant="outline" className={`border-border ${getLanguageColor(challenge.language)}`}>
                        <Code className="w-3 h-3 mr-1" />
                        {challenge.language}
                      </Badge>
                      
                      <div className="flex items-center gap-1 text-sm text-golden">
                        <Star className="w-4 h-4" />
                        <span>{challenge.points} pts</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Timer className="w-4 h-4" />
                        <span>{challenge.timeLimit} min</span>
                      </div>
                    </div>
                    
                    {challenge.attempts > 0 && (
                      <div className="text-xs text-muted-foreground">
                        Attempts: {challenge.attempts}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-shrink-0">
                    {challenge.completed ? (
                      <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => handleStartChallenge(challenge.id)}
                        className="w-full sm:w-auto"
                      >
                        Start Challenge
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Challenge Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-golden mb-1">87%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-golden mb-1">23 min</div>
            <div className="text-sm text-muted-foreground">Avg. Solve Time</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-golden mb-1">42</div>
            <div className="text-sm text-muted-foreground">Total Solved</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailyChallenges;