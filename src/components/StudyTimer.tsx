import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Coffee,
  BookOpen,
  Settings
} from 'lucide-react';

const StudyTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [mode, setMode] = useState<'study' | 'short' | 'long'>('study');

  const modes = {
    study: { duration: 25 * 60, label: 'Study Time', icon: BookOpen },
    short: { duration: 5 * 60, label: 'Short Break', icon: Coffee },
    long: { duration: 15 * 60, label: 'Long Break', icon: Coffee }
  };

  const requestFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen && document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer completed
      if (!isBreak) {
        setSessions(prev => prev + 1);
        setIsBreak(true);
        setMode(sessions % 4 === 3 ? 'long' : 'short');
      } else {
        setIsBreak(false);
        setMode('study');
      }
      setTimeLeft(modes[isBreak ? 'study' : (sessions % 4 === 3 ? 'long' : 'short')].duration);
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isBreak, sessions]);

  useEffect(() => {
    if (isActive) {
      requestFullScreen();
    } else {
      exitFullScreen();
    }
  }, [isActive]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isActive) {
        setIsActive(false); // Pause timer if user exits fullscreen
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(modes[mode].duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((modes[mode].duration - timeLeft) / modes[mode].duration) * 100;
  const ModeIcon = modes[mode].icon;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-lg text-foreground flex items-center gap-2">
          <Clock className="w-5 h-5 text-golden" />
          Pomodoro Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ModeIcon className="w-5 h-5 text-golden" />
            <Badge variant={isBreak ? "secondary" : "default"} className="text-sm">
              {modes[mode].label}
            </Badge>
          </div>
          
          <div className="text-6xl font-mono font-bold text-golden">
            {formatTime(timeLeft)}
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="flex justify-center gap-2">
            <Button
              onClick={toggleTimer}
              size="sm"
              className={isActive ? "bg-orange-600 hover:bg-orange-700" : ""}
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isActive ? 'Pause' : 'Start'}
            </Button>
            
            <Button onClick={resetTimer} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
          
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-golden"></div>
              Sessions: {sessions}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyTimer;