import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Star, 
  Clock, 
  Users, 
  PlayCircle,
  BookOpen,
  TrendingUp,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Languages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const languages = [
    {
      id: 1,
      name: 'Python',
      icon: '🐍',
      description: 'Perfect for beginners. Learn data science, web development, and automation.',
      difficulty: 'Beginner',
      totalCourses: 15,
      completedCourses: 8,
      duration: '6-8 weeks',
      rating: 4.9,
      students: 125000,
      popular: true,
      categories: ['Web Development', 'Data Science', 'Automation'],
      nextLesson: 'Advanced Functions',
      progress: 65
    },
    {
      id: 2,
      name: 'JavaScript',
      icon: '⚡',
      description: 'The language of the web. Build interactive websites and modern applications.',
      difficulty: 'Beginner',
      totalCourses: 20,
      completedCourses: 3,
      duration: '8-10 weeks',
      rating: 4.8,
      students: 200000,
      popular: true,
      categories: ['Web Development', 'Frontend', 'Backend'],
      nextLesson: 'DOM Manipulation',
      progress: 15
    },
    {
      id: 3,
      name: 'Java',
      icon: '☕',
      description: 'Enterprise-grade programming. Build robust applications and Android apps.',
      difficulty: 'Intermediate',
      totalCourses: 18,
      completedCourses: 5,
      duration: '10-12 weeks',
      rating: 4.7,
      students: 180000,
      popular: true,
      categories: ['Enterprise', 'Android', 'Backend'],
      nextLesson: 'Object-Oriented Concepts',
      progress: 28
    },
    {
      id: 4,
      name: 'C Programming',
      icon: '⚙️',
      description: 'Foundation of programming. Understand how computers work at a low level.',
      difficulty: 'Intermediate',
      totalCourses: 12,
      completedCourses: 2,
      duration: '8-10 weeks',
      rating: 4.6,
      students: 95000,
      popular: false,
      categories: ['Systems', 'Embedded', 'Foundation'],
      nextLesson: 'Memory Management',
      progress: 17
    },
    {
      id: 5,
      name: 'C++',
      icon: '🚀',
      description: 'High-performance programming. Game development and system programming.',
      difficulty: 'Advanced',
      totalCourses: 16,
      completedCourses: 0,
      duration: '12-14 weeks',
      rating: 4.5,
      students: 87000,
      popular: false,
      categories: ['Game Development', 'Systems', 'Performance'],
      nextLesson: 'Getting Started',
      progress: 0
    },
    {
      id: 6,
      name: 'React',
      icon: '⚛️',
      description: 'Modern frontend framework. Build interactive user interfaces.',
      difficulty: 'Intermediate',
      totalCourses: 14,
      completedCourses: 0,
      duration: '6-8 weeks',
      rating: 4.8,
      students: 156000,
      popular: true,
      categories: ['Frontend', 'Web Development', 'UI/UX'],
      nextLesson: 'Components Basics',
      progress: 0
    }
  ];

  const filters = [
    { key: 'all', label: 'All Languages' },
    { key: 'beginner', label: 'Beginner' },
    { key: 'intermediate', label: 'Intermediate' },
    { key: 'advanced', label: 'Advanced' },
    { key: 'popular', label: 'Popular' }
  ];

  const filteredLanguages = languages.filter(lang => {
    const matchesSearch = lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lang.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         lang.difficulty.toLowerCase() === selectedFilter ||
                         (selectedFilter === 'popular' && lang.popular);
    
    return matchesSearch && matchesFilter;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'border-emerald-500/50 text-emerald-400';
      case 'intermediate': return 'border-yellow-500/50 text-yellow-400';
      case 'advanced': return 'border-red-500/50 text-red-400';
      default: return 'border-gray-500/50 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Programming Languages
          </h1>
          <p className="text-muted-foreground">
            Choose your programming language and start your coding journey
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search programming languages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 sm:w-auto">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.key}
                variant={selectedFilter === filter.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.key)}
                className="text-sm"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLanguages.map((language) => (
            <Card key={language.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{language.icon}</div>
                    <div>
                      <CardTitle className="text-xl text-foreground group-hover:text-golden transition-colors">
                        {language.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={`text-xs ${getDifficultyColor(language.difficulty)}`}>
                          {language.difficulty}
                        </Badge>
                        {language.popular && (
                          <Badge variant="secondary" className="text-xs bg-golden/20 text-golden border-golden/30">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-golden text-golden" />
                    <span>{language.rating}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {language.description}
                </CardDescription>

                {/* Categories */}
                <div className="flex flex-wrap gap-1">
                  {language.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>

                {/* Progress */}
                {language.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground font-medium">{language.progress}%</span>
                    </div>
                    <Progress value={language.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Next: {language.nextLesson}
                    </p>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{language.totalCourses} courses</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{language.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{(language.students / 1000).toFixed(0)}k</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  {language.progress > 0 ? (
                    <Button className="flex-1">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Continue
                    </Button>
                  ) : (
                    <Button className="flex-1">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Start Learning
                    </Button>
                  )}
                  <Link to={`/roadmaps/create?language=${language.name.toLowerCase()}`}>
                    <Button variant="outline" size="sm">
                      <TrendingUp className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredLanguages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No languages found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Languages;