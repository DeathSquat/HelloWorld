import { useEffect, useState } from 'react';

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

const ProgressBar = ({ percentage, className = '' }: ProgressBarProps) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 500);

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="relative h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-golden rounded-full transition-all duration-2000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="flex justify-end mt-2">
        <span className="text-sm text-muted-foreground font-medium">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;