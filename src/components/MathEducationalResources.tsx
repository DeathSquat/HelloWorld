import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Download, 
  ExternalLink,
  Star,
  Clock,
  Users,
  PlayCircle,
  Bookmark,
  Search,
  Filter,
  Globe,
  Headphones,
  PenTool,
  Calculator,
  Brain,
  Target,
  Award
} from 'lucide-react';

interface EducationalResource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'document' | 'interactive' | 'audio' | 'worksheet' | 'simulation';
  subject: 'arithmetic' | 'algebra' | 'geometry' | 'statistics' | 'general';
  grade: number[];
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  duration: string;
  provider: string;
  rating: number;
  downloads: number;
  language: 'English' | 'Hindi' | 'Both';
  curriculum: 'NCERT' | 'CBSE' | 'ICSE' | 'State Board' | 'Universal';
  tags: string[];
  url?: string;
  isBookmarked: boolean;
  isCompleted: boolean;
}

const MathEducationalResources = () => {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('all');

  const educationalResources: EducationalResource[] = [
    // NCERT Resources
    {
      id: 'ncert-class6-ch1',
      title: 'NCERT Class 6 - Knowing Our Numbers',
      description: 'Complete chapter explanation with examples and practice problems',
      type: 'video',
      subject: 'arithmetic',
      grade: [6],
      difficulty: 'Basic',
      duration: '45 min',
      provider: 'NCERT Official',
      rating: 4.8,
      downloads: 15670,
      language: 'Both',
      curriculum: 'NCERT',
      tags: ['Numbers', 'Place Value', 'Comparison'],
      url: '#',
      isBookmarked: true,
      isCompleted: true
    },
    {
      id: 'ncert-class6-worksheet-1',
      title: 'Class 6 Whole Numbers Practice Worksheet',
      description: 'Comprehensive worksheet with 50+ problems on whole numbers',
      type: 'worksheet',
      subject: 'arithmetic',
      grade: [6],
      difficulty: 'Basic',
      duration: '30 min',
      provider: 'NCERT Solutions',
      rating: 4.6,
      downloads: 12340,
      language: 'English',
      curriculum: 'NCERT',
      tags: ['Whole Numbers', 'Practice', 'Worksheet'],
      isBookmarked: false,
      isCompleted: false
    },
    {
      id: 'interactive-fraction-tool',
      title: 'Interactive Fraction Learning Tool',
      description: 'Visual fraction manipulator with real-time feedback',
      type: 'interactive',
      subject: 'arithmetic',
      grade: [6, 7],
      difficulty: 'Intermediate',
      duration: '20 min',
      provider: 'MathTools India',
      rating: 4.9,
      downloads: 8901,
      language: 'Both',
      curriculum: 'Universal',
      tags: ['Fractions', 'Visual Learning', 'Interactive'],
      url: '#',
      isBookmarked: true,
      isCompleted: false
    },

    // Grade 7 Resources
    {
      id: 'algebra-basics-hindi',
      title: 'बीजगणित की मूल बातें (Algebra Basics)',
      description: 'Introduction to algebra concepts in Hindi with examples',
      type: 'video',
      subject: 'algebra',
      grade: [7, 8],
      difficulty: 'Basic',
      duration: '60 min',
      provider: 'Khan Academy Hindi',
      rating: 4.7,
      downloads: 11230,
      language: 'Hindi',
      curriculum: 'CBSE',
      tags: ['Algebra', 'Hindi', 'Variables', 'Equations'],
      url: '#',
      isBookmarked: false,
      isCompleted: false
    },
    {
      id: 'geometry-simulation',
      title: 'Interactive Geometry Simulator',
      description: '3D geometry visualization tool for understanding shapes and angles',
      type: 'simulation',
      subject: 'geometry',
      grade: [6, 7, 8, 9],
      difficulty: 'Intermediate',
      duration: '40 min',
      provider: 'GeoGebra',
      rating: 4.8,
      downloads: 9876,
      language: 'Both',
      curriculum: 'Universal',
      tags: ['3D Geometry', 'Visualization', 'Angles', 'Shapes'],
      url: '#',
      isBookmarked: true,
      isCompleted: false
    },

    // Grade 8-9 Resources
    {
      id: 'linear-equations-masterclass',
      title: 'Linear Equations Masterclass',
      description: 'Complete guide to solving linear equations with step-by-step solutions',
      type: 'video',
      subject: 'algebra',
      grade: [8, 9],
      difficulty: 'Intermediate',
      duration: '90 min',
      provider: 'Vedantu',
      rating: 4.9,
      downloads: 13450,
      language: 'English',
      curriculum: 'CBSE',
      tags: ['Linear Equations', 'Problem Solving', 'Algebra'],
      url: '#',
      isBookmarked: false,
      isCompleted: false
    },
    {
      id: 'mensuration-audio-course',
      title: 'Mensuration Audio Course',
      description: 'Audio-based learning for area and volume calculations',
      type: 'audio',
      subject: 'geometry',
      grade: [8, 9],
      difficulty: 'Intermediate',
      duration: '120 min',
      provider: 'AudioMath',
      rating: 4.5,
      downloads: 7654,
      language: 'Both',
      curriculum: 'ICSE',
      tags: ['Mensuration', 'Area', 'Volume', 'Audio Learning'],
      isBookmarked: false,
      isCompleted: false
    },

    // Grade 10-12 Resources
    {
      id: 'trigonometry-complete-guide',
      title: 'Complete Trigonometry Guide',
      description: 'Comprehensive trigonometry resource covering all ratios and identities',
      type: 'document',
      subject: 'geometry',
      grade: [10, 11, 12],
      difficulty: 'Advanced',
      duration: '180 min',
      provider: 'FIITJEE',
      rating: 4.8,
      downloads: 16780,
      language: 'English',
      curriculum: 'CBSE',
      tags: ['Trigonometry', 'Ratios', 'Identities', 'Advanced'],
      isBookmarked: true,
      isCompleted: false
    },
    {
      id: 'calculus-interactive-course',
      title: 'Interactive Calculus Course',
      description: 'Learn calculus through interactive graphs and real-time calculations',
      type: 'interactive',
      subject: 'algebra',
      grade: [11, 12],
      difficulty: 'Advanced',
      duration: '240 min',
      provider: 'Desmos Classroom',
      rating: 4.9,
      downloads: 8765,
      language: 'English',
      curriculum: 'CBSE',
      tags: ['Calculus', 'Derivatives', 'Integrals', 'Interactive'],
      url: '#',
      isBookmarked: true,
      isCompleted: false
    },
    {
      id: 'statistics-data-analysis',
      title: 'Statistics and Data Analysis',
      description: 'Practical statistics with real-world data analysis examples',
      type: 'video',
      subject: 'statistics',
      grade: [9, 10, 11, 12],
      difficulty: 'Intermediate',
      duration: '150 min',
      provider: 'StatMaster',
      rating: 4.7,
      downloads: 11234,
      language: 'Both',
      curriculum: 'Universal',
      tags: ['Statistics', 'Data Analysis', 'Probability', 'Real World'],
      url: '#',
      isBookmarked: false,
      isCompleted: false
    },

    // Exam Preparation Resources
    {
      id: 'cbse-board-prep-math',
      title: 'CBSE Board Exam Mathematics Preparation',
      description: 'Complete preparation guide for CBSE Class 10 & 12 Math',
      type: 'document',
      subject: 'general',
      grade: [10, 12],
      difficulty: 'Advanced',
      duration: '300 min',
      provider: 'Aakash Institute',
      rating: 4.9,
      downloads: 25670,
      language: 'Both',
      curriculum: 'CBSE',
      tags: ['Board Exam', 'Preparation', 'CBSE', 'Sample Papers'],
      isBookmarked: true,
      isCompleted: false
    },
    {
      id: 'jee-math-foundation',
      title: 'JEE Mathematics Foundation',
      description: 'Foundation course for JEE Main & Advanced Mathematics',
      type: 'video',
      subject: 'general',
      grade: [11, 12],
      difficulty: 'Advanced',
      duration: '400 min',
      provider: 'Allen Career Institute',
      rating: 4.8,
      downloads: 18940,
      language: 'English',
      curriculum: 'CBSE',
      tags: ['JEE', 'Competitive Exam', 'Advanced Math', 'Foundation'],
      url: '#',
      isBookmarked: false,
      isCompleted: false
    }
  ];

  const resourceTypes = [
    { id: 'all', name: 'All Types', icon: Globe },
    { id: 'video', name: 'Videos', icon: Video },
    { id: 'document', name: 'Documents', icon: FileText },
    { id: 'interactive', name: 'Interactive', icon: PenTool },
    { id: 'audio', name: 'Audio', icon: Headphones },
    { id: 'worksheet', name: 'Worksheets', icon: Calculator },
    { id: 'simulation', name: 'Simulations', icon: Brain }
  ];

  const curriculums = [
    { id: 'all', name: 'All Curricula' },
    { id: 'NCERT', name: 'NCERT' },
    { id: 'CBSE', name: 'CBSE' },
    { id: 'ICSE', name: 'ICSE' },
    { id: 'State Board', name: 'State Board' },
    { id: 'Universal', name: 'Universal' }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-red-400" />;
      case 'document': return <FileText className="w-4 h-4 text-blue-400" />;
      case 'interactive': return <PenTool className="w-4 h-4 text-green-400" />;
      case 'audio': return <Headphones className="w-4 h-4 text-purple-400" />;
      case 'worksheet': return <Calculator className="w-4 h-4 text-yellow-400" />;
      case 'simulation': return <Brain className="w-4 h-4 text-pink-400" />;
      default: return <BookOpen className="w-4 h-4 text-gray-400" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Basic': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const filteredResources = educationalResources.filter(resource => {
    const gradeMatch = selectedGrade === 'all' || resource.grade.includes(selectedGrade as number);
    const typeMatch = selectedType === 'all' || resource.type === selectedType;
    const curriculumMatch = selectedCurriculum === 'all' || resource.curriculum === selectedCurriculum;
    const searchMatch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return gradeMatch && typeMatch && curriculumMatch && searchMatch;
  });

  const totalResources = filteredResources.length;
  const completedResources = filteredResources.filter(r => r.isCompleted).length;
  const bookmarkedResources = filteredResources.filter(r => r.isBookmarked).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <BookOpen className="w-8 h-8 text-green-400" />
            Educational Resources Library
            <Award className="w-6 h-6 text-golden animate-pulse" />
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Comprehensive learning materials for NCERT, CBSE & competitive exams
          </p>
        </CardHeader>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{totalResources}</div>
            <div className="text-sm text-muted-foreground">Total Resources</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{completedResources}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Bookmark className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{bookmarkedResources}</div>
            <div className="text-sm text-muted-foreground">Bookmarked</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">4.7</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Search and Grade Filter */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search & Grade Filter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Select Grade:</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setSelectedGrade('all')}
                  variant={selectedGrade === 'all' ? "default" : "outline"}
                  size="sm"
                >
                  All Grades
                </Button>
                {[6, 7, 8, 9, 10, 11, 12].map(grade => (
                  <Button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    variant={selectedGrade === grade ? "default" : "outline"}
                    size="sm"
                  >
                    Class {grade}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Type and Curriculum Filter */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Type & Curriculum Filter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Resource Type:</label>
              <div className="flex flex-wrap gap-2">
                {resourceTypes.map(type => {
                  const Icon = type.icon;
                  return (
                    <Button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      variant={selectedType === type.id ? "default" : "outline"}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {type.name}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Curriculum:</label>
              <div className="flex flex-wrap gap-2">
                {curriculums.map(curriculum => (
                  <Button
                    key={curriculum.id}
                    onClick={() => setSelectedCurriculum(curriculum.id)}
                    variant={selectedCurriculum === curriculum.id ? "default" : "outline"}
                    size="sm"
                  >
                    {curriculum.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card
            key={resource.id}
            className="bg-card/50 backdrop-blur-sm border-border/50 hover:scale-105 transition-transform duration-200"
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Resource Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(resource.type)}
                    <Badge variant="outline" className="text-xs">
                      {resource.curriculum}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    {resource.isBookmarked && (
                      <Bookmark className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    )}
                    {resource.isCompleted && (
                      <Target className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                </div>

                {/* Resource Info */}
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-foreground line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {resource.description}
                  </p>
                </div>

                {/* Resource Details */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{resource.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4" />
                    <span>{resource.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Download className="w-4 h-4" />
                    <span>{(resource.downloads / 1000).toFixed(1)}k</span>
                  </div>
                </div>

                {/* Tags and Difficulty */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getDifficultyColor(resource.difficulty)}>
                      {resource.difficulty}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Grade {resource.grade.join(', ')}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {resource.language}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {resource.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Provider */}
                <div className="text-xs text-muted-foreground">
                  By {resource.provider}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    {resource.type === 'video' ? 'Watch' : 
                     resource.type === 'audio' ? 'Listen' :
                     resource.type === 'interactive' ? 'Launch' : 'Open'}
                  </Button>
                  {resource.url && (
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Bookmark className={`w-4 h-4 ${resource.isBookmarked ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredResources.length === 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query to find more resources.
            </p>
            <Button onClick={() => {
              setSelectedGrade('all');
              setSelectedType('all');
              setSelectedCurriculum('all');
              setSearchQuery('');
            }}>
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MathEducationalResources;
