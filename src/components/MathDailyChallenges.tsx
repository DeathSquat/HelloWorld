import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Zap, 
  Trophy, 
  Timer, 
  Calculator, 
  CheckCircle,
  Star,
  Flame,
  Target,
  Brain,
  Award,
  Users,
  Crown,
  Sparkles,
  RotateCcw,
  PlayCircle,
  BookOpen,
  TrendingUp,
  Medal
} from 'lucide-react';

interface MathChallenge {
  id: string;
  title: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  grade: number[];
  subject: 'arithmetic' | 'algebra' | 'geometry' | 'statistics';
  points: number;
  timeLimit: number;
  completed: boolean;
  attempts: number;
  type: 'mcq' | 'numerical' | 'word-problem';
  hint?: string;
}

interface DailyProgress {
  streak: number;
  todayCompleted: number;
  todayTarget: number;
  weeklyCompleted: number;
  weeklyTarget: number;
  totalPoints: number;
  rank: number;
}

const MathDailyChallenges = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(6);
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [challengeResults, setChallengeResults] = useState<{ [key: string]: boolean }>({});

  // Daily progress tracking
  const dailyProgress: DailyProgress = {
    streak: 12,
    todayCompleted: 3,
    todayTarget: 5,
    weeklyCompleted: 18,
    weeklyTarget: 30,
    totalPoints: 2840,
    rank: 7
  };

  // Grade-appropriate daily challenges
  const dailyChallenges: MathChallenge[] = [
    // Grade 6 Challenges
    {
      id: 'grade6-arithmetic-1',
      title: 'Fraction Addition Challenge',
      question: 'Solve: 2/3 + 1/4 = ?',
      options: ['11/12', '3/7', '6/12', '5/6'],
      correctAnswer: '11/12',
      explanation: 'To add fractions, find a common denominator. LCM of 3 and 4 is 12. So 2/3 = 8/12 and 1/4 = 3/12. Therefore, 8/12 + 3/12 = 11/12.',
      difficulty: 'Medium',
      grade: [6],
      subject: 'arithmetic',
      points: 75,
      timeLimit: 180,
      completed: true,
      attempts: 1,
      type: 'mcq',
      hint: 'Find the LCM of the denominators first'
    },
    {
      id: 'grade6-geometry-1',
      title: 'Area of Rectangle',
      question: 'A rectangular garden has length 15 meters and width 8 meters. What is its area?',
      correctAnswer: '120',
      explanation: 'Area of rectangle = length × width = 15 × 8 = 120 square meters',
      difficulty: 'Easy',
      grade: [6],
      subject: 'geometry',
      points: 50,
      timeLimit: 120,
      completed: true,
      attempts: 1,
      type: 'numerical',
      hint: 'Area = length × width'
    },
    {
      id: 'grade6-word-problem-1',
      title: 'Shopping Math',
      question: 'Priya buys 3 notebooks for ₹25 each and 2 pens for ₹15 each. How much money does she spend in total?',
      correctAnswer: '105',
      explanation: 'Cost of notebooks = 3 × ₹25 = ₹75. Cost of pens = 2 × ₹15 = ₹30. Total = ₹75 + ₹30 = ₹105',
      difficulty: 'Easy',
      grade: [6],
      subject: 'arithmetic',
      points: 60,
      timeLimit: 150,
      completed: false,
      attempts: 0,
      type: 'word-problem',
      hint: 'Calculate the cost of each item type separately, then add them'
    },

    // Grade 7 Challenges
    {
      id: 'grade7-algebra-1',
      title: 'Simple Equation',
      question: 'Solve for x: 3x + 7 = 22',
      correctAnswer: '5',
      explanation: '3x + 7 = 22\n3x = 22 - 7\n3x = 15\nx = 15 ÷ 3\nx = 5',
      difficulty: 'Medium',
      grade: [7],
      subject: 'algebra',
      points: 100,
      timeLimit: 200,
      completed: false,
      attempts: 1,
      type: 'numerical',
      hint: 'Isolate x by moving constants to one side'
    },
    {
      id: 'grade7-arithmetic-1',
      title: 'Integer Operations',
      question: 'Calculate: (-15) + 8 - (-12) = ?',
      options: ['5', '-5', '11', '-19'],
      correctAnswer: '5',
      explanation: '(-15) + 8 - (-12) = -15 + 8 + 12 = -15 + 20 = 5',
      difficulty: 'Medium',
      grade: [7],
      subject: 'arithmetic',
      points: 80,
      timeLimit: 120,
      completed: false,
      attempts: 0,
      type: 'mcq',
      hint: 'Remember that subtracting a negative number is the same as adding'
    },

    // Grade 8 Challenges
    {
      id: 'grade8-algebra-1',
      title: 'Quadratic Expression',
      question: 'Expand: (x + 3)(x - 2)',
      correctAnswer: 'x² + x - 6',
      explanation: '(x + 3)(x - 2) = x² - 2x + 3x - 6 = x² + x - 6',
      difficulty: 'Hard',
      grade: [8],
      subject: 'algebra',
      points: 150,
      timeLimit: 300,
      completed: false,
      attempts: 0,
      type: 'numerical',
      hint: 'Use FOIL method: First, Outer, Inner, Last'
    },

    // Higher Grade Challenges
    {
      id: 'grade9-geometry-1',
      title: 'Pythagoras Theorem',
      question: 'In a right triangle, if two sides are 3 cm and 4 cm, what is the length of the hypotenuse?',
      correctAnswer: '5',
      explanation: 'Using Pythagoras theorem: c² = a² + b²\nc² = 3² + 4² = 9 + 16 = 25\nc = √25 = 5 cm',
      difficulty: 'Medium',
      grade: [9, 10],
      subject: 'geometry',
      points: 120,
      timeLimit: 180,
      completed: false,
      attempts: 0,
      type: 'numerical',
      hint: 'Use a² + b² = c² where c is the hypotenuse'
    }
  ];

  // Filter challenges by selected grade
  const gradeSpecificChallenges = dailyChallenges.filter(challenge => 
    challenge.grade.includes(selectedGrade)
  );

  const todaysChallenges = gradeSpecificChallenges.slice(0, 5); // Show 5 challenges per day

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'arithmetic': return 'text-green-400';
      case 'algebra': return 'text-blue-400';
      case 'geometry': return 'text-yellow-400';
      case 'statistics': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const handleStartChallenge = (challengeId: string) => {
    const challenge = todaysChallenges.find(c => c.id === challengeId);
    if (challenge) {
      setActiveChallenge(challengeId);
      setTimeRemaining(challenge.timeLimit);
      setUserAnswer('');
      setShowHint(false);
    }
  };

  const handleSubmitAnswer = () => {
    if (!activeChallenge) return;
    
    const challenge = todaysChallenges.find(c => c.id === activeChallenge);
    if (challenge) {
      const isCorrect = userAnswer.toLowerCase().trim() === challenge.correctAnswer.toLowerCase().trim();
      setChallengeResults(prev => ({ ...prev, [activeChallenge]: isCorrect }));
      
      // Update challenge completion status
      challenge.completed = isCorrect;
      challenge.attempts += 1;
      
      setActiveChallenge(null);
      setUserAnswer('');
    }
  };

  const completedToday = todaysChallenges.filter(c => c.completed).length;
  const progressPercentage = (dailyProgress.todayCompleted / dailyProgress.todayTarget) * 100;

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && activeChallenge) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && activeChallenge) {
      handleSubmitAnswer();
    }
  }, [timeRemaining, activeChallenge]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <Zap className="w-8 h-8 text-golden" />
            Daily Math Challenges
            <Sparkles className="w-6 h-6 text-golden animate-pulse" />
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Sharpen your math skills with daily practice problems
          </p>
        </CardHeader>
      </Card>

      {/* Grade Selection */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Select Grade:</span>
            <div className="flex gap-2">
              {[6, 7, 8, 9, 10, 11, 12].map(grade => (
                <Button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  variant={selectedGrade === grade ? "default" : "outline"}
                  size="sm"
                >
                  Class {grade}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-golden/10 to-golden/5 border-golden/20">
          <CardContent className="p-4 text-center">
            <Flame className="w-8 h-8 text-golden mx-auto mb-2" />
            <div className="text-2xl font-bold text-golden">{dailyProgress.streak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{dailyProgress.todayCompleted}/{dailyProgress.todayTarget}</div>
            <div className="text-sm text-muted-foreground">Today's Goal</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{dailyProgress.totalPoints}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Crown className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">#{dailyProgress.rank}</div>
            <div className="text-sm text-muted-foreground">Rank</div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Progress Bar */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Daily Progress</h3>
              <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{dailyProgress.todayCompleted} challenges completed</span>
              <span>{dailyProgress.todayTarget - dailyProgress.todayCompleted} remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Challenge Modal */}
      {activeChallenge && (
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 sticky top-4 z-10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-blue-400" />
                Active Challenge
              </CardTitle>
              <div className="flex items-center gap-2 text-orange-400">
                <Timer className="w-5 h-5" />
                <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {(() => {
              const challenge = todaysChallenges.find(c => c.id === activeChallenge);
              if (!challenge) return null;

              return (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground">{challenge.title}</h3>
                    <p className="text-foreground">{challenge.question}</p>
                  </div>

                  {challenge.type === 'mcq' && challenge.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {challenge.options.map((option, index) => (
                        <Button
                          key={index}
                          onClick={() => setUserAnswer(option)}
                          variant={userAnswer === option ? "default" : "outline"}
                          className="justify-start"
                        >
                          {String.fromCharCode(65 + index)}. {option}
                        </Button>
                      ))}
                    </div>
                  )}

                  {(challenge.type === 'numerical' || challenge.type === 'word-problem') && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Your Answer:</label>
                      <Input
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Enter your answer here..."
                        className="text-lg"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-golden">
                      <Star className="w-4 h-4" />
                      <span>{challenge.points} points</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSubmitAnswer} className="flex-1" disabled={!userAnswer}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Submit Answer
                    </Button>
                    {challenge.hint && (
                      <Button 
                        onClick={() => setShowHint(!showHint)} 
                        variant="outline"
                      >
                        💡 Hint
                      </Button>
                    )}
                  </div>

                  {showHint && challenge.hint && (
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">💡 {challenge.hint}</p>
                    </div>
                  )}
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* Challenge List */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <Calculator className="w-6 h-6 text-blue-400" />
            Today's Challenges - Class {selectedGrade}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaysChallenges.map((challenge, index) => (
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
                      <span className="font-bold text-lg text-muted-foreground">#{index + 1}</span>
                      <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                      {challenge.completed && (
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      )}
                      {challengeResults[challenge.id] !== undefined && (
                        <Badge variant={challengeResults[challenge.id] ? "default" : "destructive"}>
                          {challengeResults[challenge.id] ? "Correct!" : "Try Again"}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {challenge.question.length > 100 
                        ? challenge.question.substring(0, 100) + "..." 
                        : challenge.question}
                    </p>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                      
                      <Badge variant="outline" className={`border-border ${getSubjectColor(challenge.subject)}`}>
                        {challenge.subject}
                      </Badge>
                      
                      <div className="flex items-center gap-1 text-sm text-golden">
                        <Star className="w-4 h-4" />
                        <span>{challenge.points} pts</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Timer className="w-4 h-4" />
                        <span>{Math.ceil(challenge.timeLimit / 60)} min</span>
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
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">Completed</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStartChallenge(challenge.id)}
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => handleStartChallenge(challenge.id)}
                        className="w-full sm:w-auto"
                        disabled={activeChallenge !== null}
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-golden mb-1">92%</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-golden mb-1">4.2 min</div>
            <div className="text-sm text-muted-foreground">Avg. Solve Time</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-golden mb-1">156</div>
            <div className="text-sm text-muted-foreground">Total Solved</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MathDailyChallenges;