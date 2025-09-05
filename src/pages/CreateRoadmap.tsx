import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Target, 
  Calendar, 
  Clock, 
  BookOpen, 
  Youtube, 
  GraduationCap,
  CheckCircle,
  PlayCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const CreateRoadmap = () => {
  const [searchParams] = useSearchParams();
  const preSelectedLanguage = searchParams.get('language') || '';
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    skill: preSelectedLanguage,
    currentLevel: '',
    targetLevel: '',
    days: '',
    purpose: '',
    timePerDay: '',
    preferredFormat: 'mixed'
  });
  
  const [generatedRoadmap, setGeneratedRoadmap] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const skills = [
    'Python', 'JavaScript', 'Java', 'C++', 'C Programming', 'React', 
    'Node.js', 'Machine Learning', 'Data Science', 'Web Development',
    'Mobile Development', 'DevOps', 'Cybersecurity', 'UI/UX Design'
  ];

  const levels = ['Absolute Beginner', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const purposes = [
    'Career Change', 'Job Interview Prep', 'Personal Project', 
    'Academic Study', 'Freelancing', 'Startup Idea', 'Skill Enhancement'
  ];

  const generateRoadmap = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock generated roadmap
    const mockRoadmap = {
      title: `${formData.skill} Learning Path`,
      description: `Complete ${formData.skill} roadmap from ${formData.currentLevel} to ${formData.targetLevel} in ${formData.days} days`,
      totalDuration: `${formData.days} days`,
      estimatedHours: Math.floor(parseInt(formData.days) * parseFloat(formData.timePerDay)),
      phases: [
        {
          id: 1,
          title: 'Foundation',
          duration: '7 days',
          description: 'Build strong fundamentals',
          resources: [
            {
              type: 'youtube',
              title: `${formData.skill} Crash Course for Beginners`,
              author: 'Programming with Mosh',
              duration: '2h 30m',
              url: '#',
              completed: false
            },
            {
              type: 'coursera',
              title: `Introduction to ${formData.skill}`,
              author: 'University of Michigan',
              duration: '4 weeks',
              url: '#',
              completed: false
            },
            {
              type: 'practice',
              title: 'Basic Syntax Practice',
              description: '50 beginner problems',
              duration: '3 hours',
              completed: false
            }
          ]
        },
        {
          id: 2,
          title: 'Core Concepts',
          duration: '14 days',
          description: 'Master intermediate concepts',
          resources: [
            {
              type: 'youtube',
              title: `${formData.skill} OOP Concepts`,
              author: 'Derek Banas',
              duration: '3h 15m',
              url: '#',
              completed: false
            },
            {
              type: 'coursera',
              title: `${formData.skill} Data Structures`,
              author: 'Stanford University',
              duration: '6 weeks',
              url: '#',
              completed: false
            },
            {
              type: 'project',
              title: 'Build a Calculator App',
              description: 'Apply core concepts in a real project',
              duration: '5 hours',
              completed: false
            }
          ]
        },
        {
          id: 3,
          title: 'Advanced Topics',
          duration: '10 days',
          description: 'Advanced concepts and best practices',
          resources: [
            {
              type: 'youtube',
              title: `Advanced ${formData.skill} Patterns`,
              author: 'Tech With Tim',
              duration: '4h 45m',
              url: '#',
              completed: false
            },
            {
              type: 'coursera',
              title: `${formData.skill} for Software Engineering`,
              author: 'Google',
              duration: '8 weeks',
              url: '#',
              completed: false
            }
          ]
        },
        {
          id: 4,
          title: 'Real-World Projects',
          duration: `${Math.max(7, parseInt(formData.days) - 31)} days`,
          description: 'Build portfolio projects',
          resources: [
            {
              type: 'project',
              title: 'Full-Stack Web Application',
              description: 'Build a complete application with backend and frontend',
              duration: '20 hours',
              completed: false
            },
            {
              type: 'project',
              title: 'API Integration Project',
              description: 'Work with external APIs and databases',
              duration: '10 hours',
              completed: false
            }
          ]
        }
      ]
    };
    
    setGeneratedRoadmap(mockRoadmap);
    setIsGenerating(false);
    setStep(3);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'youtube': return <Youtube className="w-4 h-4 text-red-500" />;
      case 'coursera': return <GraduationCap className="w-4 h-4 text-blue-500" />;
      case 'practice': return <Target className="w-4 h-4 text-green-500" />;
      case 'project': return <BookOpen className="w-4 h-4 text-purple-500" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-golden" />
              Create Your Learning Roadmap
            </h1>
            <p className="text-muted-foreground">
              Tell us about your goals and we'll create a personalized learning path
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Learning Preferences</CardTitle>
              <CardDescription>Help us understand your learning goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="skill">What skill do you want to learn?</Label>
                <Select value={formData.skill} onValueChange={(value) => setFormData({...formData, skill: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                  <SelectContent>
                    {skills.map((skill) => (
                      <SelectItem key={skill} value={skill.toLowerCase()}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentLevel">Current Level</Label>
                  <Select value={formData.currentLevel} onValueChange={(value) => setFormData({...formData, currentLevel: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Your current level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level.toLowerCase().replace(' ', '-')}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetLevel">Target Level</Label>
                  <Select value={formData.targetLevel} onValueChange={(value) => setFormData({...formData, targetLevel: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Your target level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level.toLowerCase().replace(' ', '-')}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="days">How many days? (30-365)</Label>
                  <Input
                    id="days"
                    type="number"
                    min="30"
                    max="365"
                    placeholder="e.g., 90"
                    value={formData.days}
                    onChange={(e) => setFormData({...formData, days: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timePerDay">Hours per day?</Label>
                  <Select value={formData.timePerDay} onValueChange={(value) => setFormData({...formData, timePerDay: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">30 minutes</SelectItem>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="3">3 hours</SelectItem>
                      <SelectItem value="4">4+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">What's your purpose?</Label>
                <Select value={formData.purpose} onValueChange={(value) => setFormData({...formData, purpose: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {purposes.map((purpose) => (
                      <SelectItem key={purpose} value={purpose.toLowerCase().replace(' ', '-')}>
                        {purpose}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  className="flex-1" 
                  onClick={() => setStep(2)}
                  disabled={!formData.skill || !formData.currentLevel || !formData.days}
                >
                  Generate Roadmap
                  <MapPin className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🔮</div>
          <h2 className="text-2xl font-bold text-foreground">Creating Your Personalized Roadmap</h2>
          <div className="max-w-md mx-auto space-y-4">
            <p className="text-muted-foreground">
              Analyzing your preferences and curating the best resources...
            </p>
            <Progress value={isGenerating ? 75 : 100} className="h-2" />
            <div className="text-sm text-muted-foreground space-y-1">
              <div>✓ Finding YouTube tutorials</div>
              <div>✓ Selecting Coursera courses</div>
              <div>✓ Planning practice projects</div>
              <div className="animate-pulse">⚡ Optimizing learning sequence...</div>
            </div>
          </div>
          <Button onClick={generateRoadmap} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Continue'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <MapPin className="w-4 h-4" />
            <span>Personal Learning Roadmap</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {generatedRoadmap?.title}
          </h1>
          <p className="text-muted-foreground">{generatedRoadmap?.description}</p>
        </div>

        {/* Roadmap Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 text-golden mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-semibold text-foreground">{generatedRoadmap?.totalDuration}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Est. Hours</p>
              <p className="font-semibold text-foreground">{generatedRoadmap?.estimatedHours}h</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Phases</p>
              <p className="font-semibold text-foreground">{generatedRoadmap?.phases?.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <BookOpen className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Resources</p>
              <p className="font-semibold text-foreground">
                {generatedRoadmap?.phases?.reduce((acc: number, phase: any) => acc + phase.resources.length, 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button className="bg-golden hover:bg-golden/90 text-primary-foreground">
            <PlayCircle className="w-4 h-4 mr-2" />
            Start Learning
          </Button>
          <Button variant="outline">
            <BookOpen className="w-4 h-4 mr-2" />
            Save Roadmap
          </Button>
        </div>

        {/* Roadmap Phases */}
        <div className="space-y-8">
          {generatedRoadmap?.phases?.map((phase: any, phaseIndex: number) => (
            <Card key={phase.id} className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-foreground flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-golden/20 text-golden flex items-center justify-center text-sm font-bold">
                        {phaseIndex + 1}
                      </div>
                      {phase.title}
                    </CardTitle>
                    <CardDescription>{phase.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-golden border-golden/30">
                    {phase.duration}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {phase.resources.map((resource: any, resourceIndex: number) => (
                  <div key={resourceIndex} className="flex items-center justify-between p-4 rounded-lg bg-accent/5 border border-accent/10 hover:border-accent/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getResourceIcon(resource.type)}
                        <div>
                          <h4 className="font-medium text-foreground">{resource.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {resource.author && <span>by {resource.author}</span>}
                            {resource.duration && (
                              <>
                                <span>•</span>
                                <span>{resource.duration}</span>
                              </>
                            )}
                          </div>
                          {resource.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {resource.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {resource.completed ? (
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      ) : (
                        <Button size="sm" variant="outline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Start
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateRoadmap;