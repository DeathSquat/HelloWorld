import { useEffect, useState } from 'react';
import { Code, Terminal, Cpu, Zap } from 'lucide-react';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const messages = [
    "नमस्ते! Welcome to Hello World",
    "Initializing coding environment...",
    "Loading Python modules...",
    "Configuring Java runtime...", 
    "Setting up C compiler...",
    "Ready to code! 🚀"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const messageTimer = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background-deep flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        {/* Logo Area */}
        <div className="relative">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="relative">
              <Terminal className="w-16 h-16 text-golden animate-pulse" />
              <div className="absolute -top-2 -right-2">
                <Code className="w-8 h-8 text-golden-bright animate-bounce" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-golden mb-2">
            Hello World
          </h1>
          <p className="text-golden/80 text-lg">
            Your Coding Journey Starts Here
          </p>
        </div>

        {/* Animated Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <div className="relative">
            <Cpu className="w-8 h-8 text-golden/60 animate-spin" style={{animationDuration: '3s'}} />
            <div className="absolute inset-0 animate-ping">
              <Cpu className="w-8 h-8 text-golden/20" />
            </div>
          </div>
          
          <div className="relative">
            <Zap className="w-8 h-8 text-golden/60 animate-pulse" />
          </div>
          
          <div className="relative">
            <Code className="w-8 h-8 text-golden/60 animate-bounce" />
          </div>
        </div>

        {/* Loading Message */}
        <div className="h-6 mb-4">
          <p className="text-foreground/80 animate-pulse">
            {messages[currentMessage]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-golden rounded-full transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-golden to-golden-bright animate-pulse" />
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Loading...</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Code Animation */}
        <div className="mt-8 font-mono text-sm text-muted-foreground">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-golden">{'>'}</span>
            <span className="animate-pulse">console.log("Welcome to Hello World!");</span>
            <span className="animate-blink">|</span>
          </div>
        </div>
      </div>

      {/* Background Code Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 font-mono text-xs text-golden">
          {`function helloWorld() {
  return "Welcome to coding!";
}`}
        </div>
        <div className="absolute bottom-10 right-10 font-mono text-xs text-golden">
          {`#include <stdio.h>
int main() {
  printf("Hello World!");
  return 0;
}`}
        </div>
        <div className="absolute top-1/2 left-10 font-mono text-xs text-golden">
          {`print("Hello World!")
def learn_coding():
    return "Success"`}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;