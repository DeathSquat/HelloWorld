import StarField from '@/components/StarField';
import CentralContent from '@/components/CentralContent';

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated Star Background */}
      <StarField />
      
      {/* Main Content */}
      <CentralContent />
    </main>
  );
};

export default Index;
