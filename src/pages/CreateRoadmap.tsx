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
import { ProjectDetailDialog } from '@/components/ProjectDetailDialog';

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
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  const skills = [
    'Frontend Development', 'Python', 'JavaScript', 'Java', 'C++', 'C Programming', 'React', 
    'Node.js', 'Machine Learning', 'Data Science', 'Web Development', 'Backend Development',
    'Mobile Development', 'DevOps', 'Cybersecurity', 'UI/UX Design', 'Flutter', 'Android Development',
    'iOS Development', 'Game Development', 'Blockchain', 'Cloud Computing'
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
    
    // Generate skill-specific roadmap
    const mockRoadmap = generateSkillSpecificRoadmap(formData.skill);
    
    setGeneratedRoadmap(mockRoadmap);
    setIsGenerating(false);
    setStep(3);
  };

  const generateSkillSpecificRoadmap = (skill: string) => {
    const baseInfo = {
      title: `${skill} Learning Path`,
      description: `Complete ${skill} roadmap from ${formData.currentLevel} to ${formData.targetLevel} in ${formData.days} days`,
      totalDuration: `${formData.days} days`,
      estimatedHours: Math.floor(parseInt(formData.days) * parseFloat(formData.timePerDay)),
    };

    switch (skill.toLowerCase()) {
      case 'frontend development':
        return {
          ...baseInfo,
          phases: [
            {
              id: 1,
              title: 'HTML & CSS Fundamentals',
              duration: '14 days',
              description: 'Master the building blocks of web development',
              resources: [
                {
                  type: 'youtube',
                  title: 'HTML Full Course - Build a Website Tutorial',
                  author: 'freeCodeCamp',
                  duration: '4h 32m',
                  url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg',
                  completed: false
                },
                {
                  type: 'youtube',
                  title: 'CSS Full Course for Beginners',
                  author: 'Dave Gray',
                  duration: '11h 24m',
                  url: 'https://www.youtube.com/watch?v=n4R2E7O-Ngo',
                  completed: false
                },
                {
                  type: 'coursera',
                  title: 'Introduction to Web Development with HTML, CSS, JavaScript',
                  author: 'Johns Hopkins University',
                  duration: '5 weeks',
                  url: 'https://www.coursera.org/learn/html-css-javascript-for-web-developers',
                  completed: false
                },
                {
                  type: 'practice',
                  title: 'Build 5 Responsive Landing Pages',
                  description: 'Create portfolio-worthy static websites',
                  duration: '8 hours',
                  completed: false
                },
                {
                  type: 'project',
                  title: 'Personal Portfolio Website',
                  description: 'Showcase your skills with a custom portfolio',
                  duration: '12 hours',
                  completed: false
                }
              ]
            },
            {
              id: 2,
              title: 'JavaScript & DOM Manipulation',
              duration: '21 days',
              description: 'Learn interactive web development',
              resources: [
                {
                  type: 'youtube',
                  title: 'JavaScript Tutorial Full Course - Beginner to Pro',
                  author: 'Programming with Mosh',
                  duration: '6h 14m',
                  url: 'https://www.youtube.com/watch?v=2qDywOS7VAc',
                  completed: false
                },
                {
                  type: 'youtube',
                  title: 'Learn DOM Manipulation In 18 Minutes',
                  author: 'Web Dev Simplified',
                  duration: '18m',
                  url: 'https://www.youtube.com/watch?v=y17RuWkWdn8',
                  completed: false
                },
                {
                  type: 'coursera',
                  title: 'JavaScript for Beginners Specialization',
                  author: 'University of California, Davis',
                  duration: '4 courses',
                  url: 'https://www.coursera.org/specializations/javascript-beginner',
                  completed: false
                },
                {
                  type: 'practice',
                  title: '30 JavaScript Projects in 30 Days',
                  description: 'Build interactive components and mini-apps',
                  duration: '45 hours',
                  completed: false
                },
                {
                  type: 'project',
                  title: 'Interactive Todo App with Local Storage',
                  description: 'Build a feature-rich task management app',
                  duration: '8 hours',
                  completed: false
                },
                {
                  type: 'project',
                  title: 'Weather Dashboard with API Integration',
                  description: 'Fetch and display real-time weather data',
                  duration: '10 hours',
                  completed: false
                }
              ]
            },
            {
              id: 3,
              title: 'Modern Frontend Frameworks',
              duration: '28 days',
              description: 'Master React and modern tooling',
              resources: [
                {
                  type: 'youtube',
                  title: 'React Course - Beginner\'s Tutorial for React JavaScript Library',
                  author: 'freeCodeCamp',
                  duration: '12h',
                  url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
                  completed: false
                },
                {
                  type: 'youtube',
                  title: 'Next.js 13 Full Course 2023',
                  author: 'JavaScript Mastery',
                  duration: '4h 13m',
                  url: 'https://www.youtube.com/watch?v=wm5gMKuwSYk',
                  completed: false
                },
                {
                  type: 'coursera',
                  title: 'Front-End Web Development with React',
                  author: 'The Hong Kong University of Science and Technology',
                  duration: '4 weeks',
                  url: 'https://www.coursera.org/learn/front-end-react',
                  completed: false
                },
                {
                  type: 'practice',
                  title: 'Build 10 React Components from Scratch',
                  description: 'Create reusable UI components',
                  duration: '20 hours',
                  completed: false
                },
                {
                  type: 'project',
                  title: 'E-commerce Store with React & Context API',
                  description: 'Full-featured shopping cart application',
                  duration: '25 hours',
                  completed: false
                },
                {
                  type: 'project',
                  title: 'Social Media Dashboard',
                  description: 'React app with authentication and real-time updates',
                  duration: '30 hours',
                  completed: false
                }
              ]
            },
            {
              id: 4,
              title: 'Advanced Frontend & Deployment',
              duration: `${Math.max(7, parseInt(formData.days) - 63)} days`,
              description: 'Optimize performance and deploy to production',
              resources: [
                {
                  type: 'youtube',
                  title: 'Advanced React Patterns and Performance',
                  author: 'Jack Herrington',
                  duration: '2h 45m',
                  url: 'https://www.youtube.com/watch?v=HQfCjJnf8MI',
                  completed: false
                },
                {
                  type: 'coursera',
                  title: 'Advanced React',
                  author: 'Meta',
                  duration: '7 weeks',
                  url: 'https://www.coursera.org/learn/advanced-react',
                  completed: false
                },
                {
                  type: 'project',
                  title: 'Full-Stack MERN Application',
                  description: 'Complete web application with MongoDB, Express, React, Node.js',
                  duration: '40 hours',
                  completed: false
                },
                {
                  type: 'project',
                  title: 'Progressive Web App (PWA)',
                  description: 'Mobile-first web app with offline capabilities',
                  duration: '20 hours',
                  completed: false
                }
              ]
            }
          ]
        };

      case 'python':
        return {
          ...baseInfo,
          phases: [
            {
              id: 1,
              title: 'Python Fundamentals',
              duration: '10 days',
              description: 'Learn Python syntax and core concepts',
              resources: [
                {
                  type: 'youtube',
                  title: 'Python Tutorial - Python Full Course for Beginners',
                  author: 'Programming with Mosh',
                  duration: '6h 14m',
                  url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
                  completed: false
                },
                {
                  type: 'coursera',
                  title: 'Python for Everybody Specialization',
                  author: 'University of Michigan',
                  duration: '5 courses',
                  url: 'https://www.coursera.org/specializations/python',
                  completed: false
                },
                {
                  type: 'practice',
                  title: '100 Python Beginner Exercises',
                  description: 'Master basic Python concepts',
                  duration: '15 hours',
                  completed: false
                }
              ]
            },
            {
              id: 2,
              title: 'Data Structures & Algorithms',
              duration: '14 days',
              description: 'Master Python data structures and problem solving',
              resources: [
                {
                  type: 'youtube',
                  title: 'Data Structures and Algorithms in Python',
                  author: 'Tech With Tim',
                  duration: '13h 35m',
                  url: 'https://www.youtube.com/watch?v=pkYVOmU3MgA',
                  completed: false
                },
                {
                  type: 'coursera',
                  title: 'Algorithms Specialization',
                  author: 'Stanford University',
                  duration: '4 courses',
                  url: 'https://www.coursera.org/specializations/algorithms',
                  completed: false
                },
                {
                  type: 'practice',
                  title: 'LeetCode Python Problems',
                  description: 'Solve 50 coding interview questions',
                  duration: '25 hours',
                  completed: false
                }
              ]
            },
            {
              id: 3,
              title: 'Web Development with Python',
              duration: '18 days',
              description: 'Build web applications with Django/Flask',
              resources: [
                {
                  type: 'youtube',
                  title: 'Django Tutorial for Beginners',
                  author: 'Programming with Mosh',
                  duration: '8h 38m',
                  url: 'https://www.youtube.com/watch?v=rHux0gMZ3Eg',
                  completed: false
                },
                {
                  type: 'coursera',
                  title: 'Django for Everybody Specialization',
                  author: 'University of Michigan',
                  duration: '4 courses',
                  url: 'https://www.coursera.org/specializations/django',
                  completed: false
                },
                {
                  type: 'project',
                  title: 'Blog Application with Django',
                  description: 'Full-featured blog with user authentication',
                  duration: '20 hours',
                  completed: false
                }
              ]
            },
            {
              id: 4,
              title: 'Advanced Python & Deployment',
              duration: `${Math.max(8, parseInt(formData.days) - 42)} days`,
              description: 'Master advanced concepts and deployment',
              resources: [
                {
                  type: 'project',
                  title: 'RESTful API with FastAPI',
                  description: 'Build scalable APIs with modern Python',
                  duration: '15 hours',
                  completed: false
                },
                {
                  type: 'project',
                  title: 'Machine Learning Web App',
                  description: 'Deploy ML models with Streamlit',
                  duration: '12 hours',
                  completed: false
                }
              ]
            }
          ]
        };

      case 'javascript':
        return {
          ...baseInfo,
          phases: [
            {
              id: 1,
              title: 'JavaScript Fundamentals',
              duration: '12 days',
              description: 'Master core JavaScript concepts',
              resources: [
                {
                  type: 'youtube',
                  title: 'JavaScript Crash Course for Beginners',
                  author: 'Brad Traversy',
                  duration: '1h 40m',
                  url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c',
                  completed: false
                },
                {
                  type: 'coursera',
                  title: 'JavaScript, jQuery, and JSON',
                  author: 'University of Michigan',
                  duration: '4 weeks',
                  url: 'https://www.coursera.org/learn/javascript-jquery-json',
                  completed: false
                },
                {
                  type: 'practice',
                  title: 'JavaScript30 Challenge',
                  description: '30 vanilla JavaScript projects in 30 days',
                  duration: '30 hours',
                  completed: false
                }
              ]
            },
            {
              id: 2,
              title: 'Modern JavaScript (ES6+)',
              duration: '15 days',
              description: 'Learn modern JavaScript features and async programming',
              resources: [
                {
                  type: 'youtube',
                  title: 'Modern JavaScript ES6, ES7 & ES8',
                  author: 'Brad Traversy',
                  duration: '2h 17m',
                  url: 'https://www.youtube.com/watch?v=nZ1DMMsyVyI',
                  completed: false
                },
                {
                  type: 'practice',
                  title: 'Async JavaScript Projects',
                  description: 'Master Promises, async/await, and fetch API',
                  duration: '20 hours',
                  completed: false
                },
                {
                  type: 'project',
                  title: 'Movie Database App',
                  description: 'Build an app using external APIs',
                  duration: '15 hours',
                  completed: false
                }
              ]
            }
          ]
        };

      case 'java':
        return {
          ...baseInfo,
          phases: [
            {
              id: 1,
              title: 'Java Fundamentals',
              duration: '14 days',
              description: 'Learn Java syntax and OOP concepts',
              resources: [
                {
                  type: 'youtube',
                  title: 'Java Tutorial for Beginners',
                  author: 'Programming with Mosh',
                  duration: '2h 18m',
                  url: 'https://www.youtube.com/watch?v=eIrMbAQSU34',
                  completed: false
                },
                {
                  type: 'coursera',
                  title: 'Java Programming: Solving Problems with Software',
                  author: 'Duke University',
                  duration: '4 weeks',
                  url: 'https://www.coursera.org/learn/java-programming',
                  completed: false
                },
                {
                  type: 'practice',
                  title: 'Java Coding Exercises',
                  description: 'Practice OOP and data structures',
                  duration: '25 hours',
                  completed: false
                }
              ]
            },
            {
              id: 2,
              title: 'Spring Framework',
              duration: '20 days',
              description: 'Build enterprise Java applications',
              resources: [
                {
                  type: 'youtube',
                  title: 'Spring Boot Tutorial for Beginners',
                  author: 'Java Brains',
                  duration: '6h 30m',
                  url: 'https://www.youtube.com/watch?v=vtPkZShrvXQ',
                  completed: false
                },
                {
                  type: 'project',
                  title: 'REST API with Spring Boot',
                  description: 'Build scalable backend services',
                  duration: '25 hours',
                  completed: false
                }
              ]
            }
          ]
        };

      case 'machine learning':
        return {
          ...baseInfo,
          phases: [
            {
              id: 1,
              title: 'ML Fundamentals & Mathematics',
              duration: '21 days',
              description: 'Statistics, linear algebra, and ML basics',
              resources: [
                {
                  type: 'coursera',
                  title: 'Machine Learning Specialization',
                  author: 'Stanford University & DeepLearning.AI',
                  duration: '3 courses',
                  url: 'https://www.coursera.org/specializations/machine-learning-introduction',
                  completed: false
                },
                {
                  type: 'youtube',
                  title: 'StatQuest: Machine Learning',
                  author: 'Josh Starmer',
                  duration: '10h+',
                  url: 'https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF',
                  completed: false
                },
                {
                  type: 'practice',
                  title: 'Kaggle Learn Micro-Courses',
                  description: 'Complete Python, Pandas, and ML courses',
                  duration: '20 hours',
                  completed: false
                }
              ]
            },
            {
              id: 2,
              title: 'Practical ML Projects',
              duration: '28 days',
              description: 'Build and deploy ML models',
              resources: [
                {
                  type: 'project',
                  title: 'House Price Prediction',
                  description: 'Regression project with scikit-learn',
                  duration: '15 hours',
                  completed: false
                },
                {
                  type: 'project',
                  title: 'Customer Segmentation',
                  description: 'Unsupervised learning with clustering',
                  duration: '12 hours',
                  completed: false
                },
                {
                  type: 'project',
                  title: 'Image Classification with Deep Learning',
                  description: 'CNN project with TensorFlow',
                  duration: '20 hours',
                  completed: false
                }
              ]
            }
          ]
        };

      default:
        // Generic roadmap for other skills
        return {
          ...baseInfo,
          phases: [
            {
              id: 1,
              title: 'Foundation',
              duration: '7 days',
              description: 'Build strong fundamentals',
              resources: [
                {
                  type: 'youtube',
                  title: `${skill} Crash Course for Beginners`,
                  author: 'Programming with Mosh',
                  duration: '2h 30m',
                  url: '#',
                  completed: false
                },
                {
                  type: 'coursera',
                  title: `Introduction to ${skill}`,
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
                  title: `${skill} OOP Concepts`,
                  author: 'Derek Banas',
                  duration: '3h 15m',
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
            }
          ]
        };
    }
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
          <Button 
            variant="outline"
            onClick={() => setStep(1)}
          >
            ← Back to Selection
          </Button>
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
                  <div 
                    key={resourceIndex} 
                    className="flex items-center justify-between p-4 rounded-lg bg-accent/5 border border-accent/10 hover:border-accent/20 transition-colors cursor-pointer"
                    onClick={() => {
                      if (resource.type === 'project' || resource.type === 'practice') {
                        setSelectedProject(resource);
                        setProjectDialogOpen(true);
                      }
                    }}
                  >
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
                      ) : (resource.type === 'project' || resource.type === 'practice') ? (
                        <Button size="sm" variant="outline">
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Start
                        </Button>
                      ) : resource.url ? (
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Start
                          </Button>
                        </a>
                      ) : (
                        <Button size="sm" variant="outline">
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Practice
                        </Button>
                      )}
                     </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Detail Dialog */}
        <ProjectDetailDialog
          open={projectDialogOpen}
          onOpenChange={setProjectDialogOpen}
          resource={selectedProject}
        />
      </div>
    </div>
  );
};

export default CreateRoadmap;