import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  BookOpen, 
  Code, 
  PlayCircle, 
  Users,
  FileText,
  Award,
  Clock
} from 'lucide-react';

const QuickSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const searchData = [
    // Courses
    { id: 1, title: 'Python for Beginners', type: 'course', category: 'Python', icon: BookOpen, description: 'Learn Python programming from scratch' },
    { id: 2, title: 'JavaScript Fundamentals', type: 'course', category: 'JavaScript', icon: BookOpen, description: 'Master the basics of JavaScript' },
    { id: 3, title: 'Java Object-Oriented Programming', type: 'course', category: 'Java', icon: BookOpen, description: 'Deep dive into OOP concepts' },
    
    // Tutorials
    { id: 4, title: 'Building Your First Web App', type: 'tutorial', category: 'Web Development', icon: Code, description: 'Step-by-step web app creation' },
    { id: 5, title: 'Data Structures in Python', type: 'tutorial', category: 'Python', icon: Code, description: 'Learn lists, dictionaries, sets' },
    { id: 6, title: 'React Components Guide', type: 'tutorial', category: 'React', icon: Code, description: 'Master React component patterns' },
    
    // Videos
    { id: 7, title: 'Python Variables Explained', type: 'video', category: 'Python', icon: PlayCircle, description: '15 min introduction to variables' },
    { id: 8, title: 'JavaScript Functions Deep Dive', type: 'video', category: 'JavaScript', icon: PlayCircle, description: '25 min comprehensive guide' },
    
    // Challenges
    { id: 9, title: 'Daily Coding Challenge', type: 'challenge', category: 'Practice', icon: Award, description: 'Solve today\'s coding problem' },
    { id: 10, title: 'Algorithm Practice', type: 'challenge', category: 'Algorithms', icon: Award, description: 'Test your problem-solving skills' },
    
    // Resources
    { id: 11, title: 'Python Cheat Sheet', type: 'resource', category: 'Python', icon: FileText, description: 'Quick reference guide' },
    { id: 12, title: 'Git Commands Guide', type: 'resource', category: 'Tools', icon: FileText, description: 'Essential Git commands' },
    
    // Study Groups
    { id: 13, title: 'Python Study Group', type: 'group', category: 'Community', icon: Users, description: 'Join fellow Python learners' },
    { id: 14, title: 'Web Development Circle', type: 'group', category: 'Community', icon: Users, description: 'Collaborate on web projects' }
  ];

  useEffect(() => {
    if (query.length > 1) {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 8)); // Limit to 8 results
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'tutorial': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'video': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'challenge': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'resource': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'group': return 'bg-pink-500/20 text-pink-400 border-pink-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const handleResultClick = (item: any) => {
    setQuery('');
    setIsOpen(false);
    // Navigate to the selected item
    console.log('Navigate to:', item);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search courses, tutorials, resources..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="pl-10 pr-4 py-2 w-full bg-background/50 backdrop-blur-sm border-border"
        />
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 bg-card/95 backdrop-blur-md border-border shadow-lg">
          <CardContent className="p-2">
            <div className="space-y-1">
              {results.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleResultClick(item)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <Icon className="w-5 h-5 text-golden" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground text-sm truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <Badge variant="outline" className={`text-xs ${getTypeColor(item.type)}`}>
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                );
              })}
              
              {query.length > 1 && (
                <div className="p-2 border-t border-border">
                  <div className="text-xs text-muted-foreground text-center">
                    Press Enter to see all {searchData.filter(item =>
                      item.title.toLowerCase().includes(query.toLowerCase()) ||
                      item.category.toLowerCase().includes(query.toLowerCase()) ||
                      item.description.toLowerCase().includes(query.toLowerCase())
                    ).length} results
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Popular Searches */}
      {!isOpen && query.length === 0 && (
        <div className="mt-4">
          <div className="text-sm text-muted-foreground mb-2">Popular searches:</div>
          <div className="flex flex-wrap gap-2">
            {['Python', 'JavaScript', 'React', 'Data Structures', 'Web Development'].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3 py-1 text-xs bg-accent/20 hover:bg-accent/40 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickSearch;