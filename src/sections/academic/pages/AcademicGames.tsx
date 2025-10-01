import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  Shapes, 
  TrendingUp, 
  Brain,
  Target,
  Zap,
  Trophy,
  Play,
  RotateCcw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Math Speed Challenge Game
const SpeedMathGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProblem, setCurrentProblem] = useState({ num1: 0, num2: 0, op: '+', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const { toast } = useToast();

  const generateProblem = () => {
    const operations = ['+', '-', '×', '÷'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    let num1 = Math.floor(Math.random() * 50) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;
    let answer = 0;

    switch (op) {
      case '+': answer = num1 + num2; break;
      case '-': answer = num1 - num2; break;
      case '×': answer = num1 * num2; break;
      case '÷': 
        num1 = num1 * num2;
        answer = num1 / num2;
        break;
    }

    setCurrentProblem({ num1, num2, op, answer });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    generateProblem();
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          toast({
            title: "Time's Up!",
            description: `Final Score: ${score}`,
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const checkAnswer = () => {
    if (parseInt(userAnswer) === currentProblem.answer) {
      setScore(score + 10);
      toast({ title: "Correct! +10 points" });
    } else {
      toast({ title: "Incorrect", variant: "destructive" });
    }
    setUserAnswer('');
    generateProblem();
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-golden" />
          Speed Math Challenge
        </CardTitle>
        <CardDescription>Solve as many problems as you can in 60 seconds!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isPlaying ? (
          <Button onClick={startGame} className="w-full bg-golden hover:bg-golden/90" size="lg">
            <Play className="w-4 h-4 mr-2" />
            Start Game
          </Button>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="text-lg px-4 py-2">
                Score: {score}
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2 text-golden">
                Time: {timeLeft}s
              </Badge>
            </div>
            
            <div className="text-center p-8 bg-background/50 rounded-lg">
              <div className="text-4xl font-bold mb-4">
                {currentProblem.num1} {currentProblem.op} {currentProblem.num2} = ?
              </div>
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                className="w-32 text-center text-2xl p-2 bg-card border border-border rounded-lg"
                autoFocus
              />
            </div>
            
            <Button onClick={checkAnswer} className="w-full" size="lg">
              Submit Answer
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

// Fraction Pizza Game
const FractionPizzaGame = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const checkFraction = (selected: number, total: number, correct: string) => {
    const userFraction = `${selected}/${total}`;
    if (userFraction === correct) {
      setScore(score + 15);
      setLevel(level + 1);
      toast({ title: "Correct! +15 points" });
    } else {
      toast({ title: "Try again!", variant: "destructive" });
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-golden" />
          Fraction Pizza Challenge
        </CardTitle>
        <CardDescription>Click the slices to match the fraction!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <Badge variant="outline" className="px-4 py-2">Level: {level}</Badge>
            <Badge variant="outline" className="px-4 py-2 text-golden">Score: {score}</Badge>
          </div>
          
          <div className="text-center p-6 bg-background/50 rounded-lg">
            <div className="text-3xl font-bold mb-4">Show: 3/8</div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-golden/20 hover:bg-golden/40 rounded-lg cursor-pointer border-2 border-golden/30 flex items-center justify-center transition-colors"
                >
                  🍕
                </div>
              ))}
            </div>
          </div>
          
          <Button className="w-full" onClick={() => checkFraction(3, 8, '3/8')}>
            Check Answer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Pattern Recognition Game
const PatternGame = () => {
  const [sequence] = useState([2, 4, 6, 8, '?']);
  const [userAnswer, setUserAnswer] = useState('');
  const { toast } = useToast();

  const checkPattern = () => {
    if (userAnswer === '10') {
      toast({ title: "Correct! Pattern identified!", description: "+20 points" });
    } else {
      toast({ title: "Incorrect", variant: "destructive" });
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-golden" />
          Pattern Detective
        </CardTitle>
        <CardDescription>Find the missing number in the sequence</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center gap-4 text-3xl font-bold p-6 bg-background/50 rounded-lg">
          {sequence.map((num, i) => (
            <span key={i} className={num === '?' ? 'text-golden' : ''}>
              {num}
            </span>
          ))}
        </div>
        
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="?"
          className="w-full text-center text-2xl p-3 bg-card border border-border rounded-lg"
        />
        
        <Button onClick={checkPattern} className="w-full" size="lg">
          Submit Answer
        </Button>
      </CardContent>
    </Card>
  );
};

// Geometry Shape Builder
const GeometryGame = () => {
  const [selectedShape, setSelectedShape] = useState('triangle');
  
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shapes className="w-5 h-5 text-golden" />
          Shape Builder
        </CardTitle>
        <CardDescription>Learn geometry by building shapes!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {['triangle', 'square', 'circle'].map((shape) => (
            <Button
              key={shape}
              variant={selectedShape === shape ? 'default' : 'outline'}
              onClick={() => setSelectedShape(shape)}
              className="h-20"
            >
              {shape === 'triangle' && '△'}
              {shape === 'square' && '□'}
              {shape === 'circle' && '○'}
              <br />
              {shape}
            </Button>
          ))}
        </div>
        
        <div className="p-8 bg-background/50 rounded-lg min-h-[200px] flex items-center justify-center">
          <div className="text-6xl">
            {selectedShape === 'triangle' && '△'}
            {selectedShape === 'square' && '□'}
            {selectedShape === 'circle' && '○'}
          </div>
        </div>
        
        <div className="p-4 bg-golden/10 rounded-lg">
          <p className="text-sm">
            <strong>Properties:</strong>
            {selectedShape === 'triangle' && ' 3 sides, 3 angles, sum of angles = 180°'}
            {selectedShape === 'square' && ' 4 equal sides, 4 right angles, all angles = 90°'}
            {selectedShape === 'circle' && ' No sides, infinite points equidistant from center'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const AcademicGames = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Trophy className="w-10 h-10 text-golden" />
            Math Games Arena
          </h1>
          <p className="text-muted-foreground">Learn mathematics through interactive games and challenges!</p>
        </div>

        <Tabs defaultValue="speed" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="speed">Speed Math</TabsTrigger>
            <TabsTrigger value="fractions">Fractions</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="geometry">Geometry</TabsTrigger>
          </TabsList>

          <TabsContent value="speed">
            <SpeedMathGame />
          </TabsContent>

          <TabsContent value="fractions">
            <FractionPizzaGame />
          </TabsContent>

          <TabsContent value="patterns">
            <PatternGame />
          </TabsContent>

          <TabsContent value="geometry">
            <GeometryGame />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AcademicGames;
