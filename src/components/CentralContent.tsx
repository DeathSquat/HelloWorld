import ProgressBar from './ProgressBar';

const CentralContent = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
      <div className="text-center space-y-8 animate-float">
        {/* OM Symbol */}
        <div className="text-6xl md:text-8xl text-golden font-bold mb-8 animate-glow">
          ॐ
        </div>

        {/* Sanskrit Text */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-golden devanagari">
            अभ्यास
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-golden">
            Practice
          </h2>
          
          <p className="text-lg md:text-xl text-foreground max-w-md mx-auto leading-relaxed">
            Mastering skills through dedication
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-12">
          <ProgressBar percentage={75} />
        </div>

        {/* Footer Text */}
        <div className="mt-16 pt-8">
          <p className="text-sm text-muted-foreground">
            Crafted with{' '}
            <span className="text-red-400 animate-pulse">♥</span>{' '}
            for Indian developers
          </p>
        </div>
      </div>
    </div>
  );
};

export default CentralContent;