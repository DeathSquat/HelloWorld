import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  CheckCircle, 
  Clock, 
  Target, 
  ArrowRight,
  PlayCircle,
  Lock,
  Star,
  Trophy,
  BookOpen,
  Code,
  Zap
} from 'lucide-react';

const LearningPath = () => {
  const learningPaths = [
    {
      id: 1,
      title: "Full Stack Web Developer",
      description: "Complete journey from frontend to backend development",
      totalModules: 8,
      completedModules: 3,
      estimatedTime: "6 months",
      difficulty: "Intermediate",
      progress: 37.5,
      status: "active",
      modules: [
        { name: "HTML & CSS Fundamentals", status: "completed", duration: "2 weeks" },
        { name: "JavaScript Essentials", status: "completed", duration: "3 weeks" },
        { name: "React Framework", status: "completed", duration: "4 weeks" },
        { name: "Node.js & Express", status: "in-progress", duration: "3 weeks" },
        { name: "Database Design", status: "locked", duration: "2 weeks" },
        { name: "Authentication & Security", status: "locked", duration: "2 weeks" },
        { name: "Deployment & DevOps", status: "locked", duration: "2 weeks" },
        { name: "Advanced Topics", status: "locked", duration: "3 weeks" }
      ]
    },
    {
      id: 2,
      title: "Data Science with Python",
      description: "Master data analysis, machine learning, and visualization",
      totalModules: 6,
      completedModules: 2,
      estimatedTime: "4 months",
      difficulty: "Advanced",
      progress: 33.3,
      status: "active",
      modules: [
        { name: "Python for Data Science", status: "completed", duration: "3 weeks" },
        { name: "NumPy & Pandas", status: "completed", duration: "2 weeks" },
        { name: "Data Visualization", status: "in-progress", duration: "2 weeks" },
        { name: "Machine Learning Basics", status: "locked", duration: "4 weeks" },
        { name: "Deep Learning", status: "locked", duration: "4 weeks" },
        { name: "Real-world Projects", status: "locked", duration: "3 weeks" }
      ]
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "Build cross-platform mobile applications",
      totalModules: 5,
      completedModules: 0,
      estimatedTime: "3 months",
      difficulty: "Intermediate",
      progress: 0,
      status: "planned",
      modules: [
        { name: "Mobile Development Basics", status: "locked", duration: "2 weeks" },
        { name: "React Native Fundamentals", status: "locked", duration: "3 weeks" },
        { name: "Navigation & State Management", status: "locked", duration: "2 weeks" },
        { name: "Native Features & APIs", status: "locked", duration: "3 weeks" },
        { name: "Publishing & Distribution", status: "locked", duration: "1 week" }
      ]
    }
  ];

  const milestones = [
    {
      title: "Frontend Foundation",
      description: "Master HTML, CSS, and JavaScript basics",
      progress: 100,
      status: "completed",
      reward: "Frontend Developer Badge",
      date: "Completed 2 weeks ago"
    },
    {
      title: "React Mastery",
      description: "Build dynamic web applications with React",
      progress: 85,
      status: "in-progress",
      reward: "React Expert Badge",
      date: "Expected completion: Next week"
    },
    {
      title: "Full Stack Project",
      description: "Deploy a complete web application",
      progress: 0,
      status: "upcoming",
      reward: "Full Stack Badge + Certificate",
      date: "Starting in 3 weeks"
    }
  ];

  const recommendations = [
    {
      title: "Advanced React Patterns",
      type: "Course",
      reason: "Based on your React progress",
      duration: "2 weeks",
      difficulty: "Advanced"
    },
    {
      title: "Node.js API Development",
      type: "Project",
      reason: "Next in your learning path",
      duration: "1 week",
      difficulty: "Intermediate"
    },
    {
      title: "JavaScript Algorithms",
      type: "Practice",
      reason: "Strengthen problem-solving",
      duration: "Ongoing",
      difficulty: "Mixed"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'in-progress':
        return <PlayCircle className="w-4 h-4 text-golden" />;
      case 'locked':
        return <Lock className="w-4 h-4 text-muted-foreground" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Learning Paths Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {learningPaths.map((path) => (
          <Card key={path.id} className={`bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 hover-scale ${
            path.status === 'active' ? 'border-golden/50' : ''
          }`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{path.title}</CardTitle>
                  <CardDescription className="text-sm">{path.description}</CardDescription>
                </div>
                {path.status === 'active' && (
                  <Badge className="bg-golden/20 text-golden border-golden/30">
                    Active
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Progress</p>
                  <p className="font-semibold">{path.completedModules}/{path.totalModules} modules</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-semibold">{path.estimatedTime}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Overall Progress</span>
                  <span className="text-sm font-medium">{Math.round(path.progress)}%</span>
                </div>
                <Progress value={path.progress} className="h-2" />
              </div>

              <div className="space-y-2">
                {path.modules.slice(0, 4).map((module, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(module.status)}
                      <span className={module.status === 'completed' ? 'line-through text-muted-foreground' : ''}>{module.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{module.duration}</span>
                  </div>
                ))}
                {path.modules.length > 4 && (
                  <p className="text-xs text-muted-foreground">+{path.modules.length - 4} more modules</p>
                )}
              </div>

              <Button 
                className="w-full" 
                variant={path.status === 'active' ? 'default' : 'outline'}
                disabled={path.status === 'planned'}
              >
                {path.status === 'active' ? 'Continue Learning' : path.status === 'planned' ? 'Coming Soon' : 'View Path'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Milestones */}
        <div className="xl:col-span-2">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-golden" />
                Learning Milestones
              </CardTitle>
              <CardDescription>Track your major achievements and upcoming goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  <div className={`p-4 rounded-lg border transition-all duration-300 ${
                    milestone.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/30' :
                    milestone.status === 'in-progress' ? 'bg-golden/10 border-golden/30' :
                    'bg-accent/5 border-accent/20'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          {milestone.status === 'completed' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                          {milestone.status === 'in-progress' && <PlayCircle className="w-5 h-5 text-golden" />}
                          {milestone.status === 'upcoming' && <Clock className="w-5 h-5 text-muted-foreground" />}
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                      </div>
                      <Badge variant="outline" className={`${
                        milestone.status === 'completed' ? 'border-emerald-500/50 text-emerald-400' :
                        milestone.status === 'in-progress' ? 'border-golden/50 text-golden' :
                        'border-muted text-muted-foreground'
                      }`}>
                        {milestone.status === 'completed' ? 'Completed' :
                         milestone.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                      </Badge>
                    </div>
                    
                    {milestone.progress > 0 && (
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{milestone.progress}%</span>
                        </div>
                        <Progress value={milestone.progress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Trophy className="w-4 h-4" />
                        <span>{milestone.reward}</span>
                      </div>
                      <span className="text-muted-foreground">{milestone.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <div>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Star className="w-5 h-5 text-golden" />
                Recommended for You
              </CardTitle>
              <CardDescription>Personalized suggestions based on your progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-3 rounded-lg bg-accent/10 border border-accent/20 hover:border-accent/40 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{rec.title}</h4>
                    <Badge variant="outline">
                      {rec.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{rec.reason}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{rec.duration}</span>
                    <Badge variant="outline" className={`${
                      rec.difficulty === 'Beginner' ? 'border-emerald-500/50 text-emerald-400' :
                      rec.difficulty === 'Intermediate' ? 'border-yellow-500/50 text-yellow-400' :
                      rec.difficulty === 'Advanced' ? 'border-red-500/50 text-red-400' :
                      'border-purple-500/50 text-purple-400'
                    }`}>
                      {rec.difficulty}
                    </Badge>
                  </div>
                </div>
              ))}
              
              <Button className="w-full mt-4" variant="outline">
                <Zap className="w-4 h-4 mr-2" />
                Get More Recommendations
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;