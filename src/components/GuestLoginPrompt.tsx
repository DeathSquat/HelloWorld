import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, Clock } from 'lucide-react';

interface GuestLoginPromptProps {
  delayMinutes?: number;
}

export const GuestLoginPrompt = ({ delayMinutes = 5 }: GuestLoginPromptProps) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [timeLeft, setTimeLeft] = useState(delayMinutes * 60);
  const navigate = useNavigate();

  useEffect(() => {
    const startTime = Date.now();
    const guestStarted = localStorage.getItem('guestSessionStart');
    
    if (!guestStarted) {
      localStorage.setItem('guestSessionStart', startTime.toString());
    }

    const timer = setInterval(() => {
      const sessionStart = parseInt(localStorage.getItem('guestSessionStart') || startTime.toString());
      const elapsed = Math.floor((Date.now() - sessionStart) / 1000);
      const remaining = (delayMinutes * 60) - elapsed;
      
      setTimeLeft(Math.max(0, remaining));
      
      if (remaining <= 0) {
        setShowPrompt(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [delayMinutes]);

  const handleSignUp = () => {
    navigate('/auth');
  };

  const handleContinueGuest = () => {
    setShowPrompt(false);
    localStorage.setItem('guestSessionStart', Date.now().toString());
    setTimeLeft(delayMinutes * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {!showPrompt && timeLeft > 0 && (
        <div className="fixed bottom-4 right-4 z-50 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-golden" />
            <span className="text-muted-foreground">Guest time remaining:</span>
            <span className="font-semibold text-golden">{formatTime(timeLeft)}</span>
          </div>
        </div>
      )}

      <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <UserPlus className="w-6 h-6 text-golden" />
              Ready to Level Up?
            </DialogTitle>
            <DialogDescription className="space-y-4 pt-4">
              <p className="text-base">
                You've been exploring as a guest. Create a free account to:
              </p>
              <ul className="space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-golden">✓</span>
                  <span>Save your progress and learning history</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-golden">✓</span>
                  <span>Access personalized AI roadmaps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-golden">✓</span>
                  <span>Join the community leaderboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-golden">✓</span>
                  <span>Track achievements and earn rewards</span>
                </li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button 
              onClick={handleSignUp}
              className="w-full bg-golden hover:bg-golden/90"
              size="lg"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Create Free Account
            </Button>
            <Button 
              onClick={handleSignUp}
              variant="outline"
              className="w-full border-golden text-golden hover:bg-golden/10"
              size="lg"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button 
              onClick={handleContinueGuest}
              variant="ghost"
              className="w-full text-muted-foreground hover:text-foreground"
            >
              Continue as Guest ({delayMinutes} more minutes)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
