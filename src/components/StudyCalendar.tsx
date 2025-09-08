import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  BookOpen,
  Code,
  Trophy
} from 'lucide-react';

const StudyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const studyData = {
    '2024-01-15': { hours: 2.5, tasks: 3, type: 'python' },
    '2024-01-16': { hours: 3.2, tasks: 4, type: 'javascript' },
    '2024-01-17': { hours: 1.8, tasks: 2, type: 'java' },
    '2024-01-18': { hours: 4.1, tasks: 5, type: 'python' },
    '2024-01-19': { hours: 2.9, tasks: 3, type: 'cpp' },
    '2024-01-20': { hours: 5.2, tasks: 6, type: 'python' },
    '2024-01-21': { hours: 3.8, tasks: 4, type: 'javascript' }
  };

  const upcomingEvents = [
    {
      date: '2024-01-22',
      time: '10:00 AM',
      title: 'Python Advanced Concepts',
      type: 'lesson',
      duration: '2 hours'
    },
    {
      date: '2024-01-23',
      time: '2:00 PM',
      title: 'JavaScript Practice Session',
      type: 'practice',
      duration: '1.5 hours'
    },
    {
      date: '2024-01-24',
      time: '4:00 PM',
      title: 'Java Quiz Challenge',
      type: 'quiz',
      duration: '45 mins'
    },
    {
      date: '2024-01-25',
      time: '11:00 AM',
      title: 'Weekly Code Review',
      type: 'review',
      duration: '1 hour'
    }
  ];

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayData = studyData[dateKey];
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
      const isSelected = selectedDate.toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
          className={`h-12 p-1 rounded-lg cursor-pointer transition-colors relative ${
            isToday ? 'bg-golden/20 border border-golden' :
            isSelected ? 'bg-accent/50 border border-accent' :
            'hover:bg-accent/20'
          }`}
        >
          <div className="text-sm font-medium text-foreground">{day}</div>
          {dayData && (
            <div className="absolute bottom-1 left-1 right-1">
              <div className={`h-1 rounded-full ${
                dayData.type === 'python' ? 'bg-blue-500' :
                dayData.type === 'javascript' ? 'bg-yellow-500' :
                dayData.type === 'java' ? 'bg-orange-500' :
                'bg-purple-500'
              }`} />
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <BookOpen className="w-4 h-4" />;
      case 'practice': return <Code className="w-4 h-4" />;
      case 'quiz': return <Trophy className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'practice': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'quiz': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-2">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5 text-golden" />
                Study Calendar
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button onClick={() => navigateMonth('prev')} variant="outline" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="text-lg font-semibold text-foreground min-w-[160px] text-center">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </div>
                <Button onClick={() => navigateMonth('next')} variant="outline" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 text-center text-sm text-muted-foreground">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="py-2 font-medium">{day}</div>
                ))}
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {renderCalendarDays()}
              </div>
              
              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-3 h-1 rounded-full bg-blue-500"></div>
                  <span>Python</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-3 h-1 rounded-full bg-yellow-500"></div>
                  <span>JavaScript</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-3 h-1 rounded-full bg-orange-500"></div>
                  <span>Java</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-3 h-1 rounded-full bg-purple-500"></div>
                  <span>C++</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Events */}
      <div className="space-y-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-foreground">Upcoming</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 rounded-lg bg-accent/5 border border-accent/10 hover:border-accent/20 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(event.type)}`}>
                      {getTypeIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground text-sm truncate">{event.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{event.time}</span>
                        <span>•</span>
                        <span>{event.duration}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs mt-2">
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Today's Summary */}
        <Card className="bg-gradient-to-br from-golden/10 to-golden/5 border-golden/20">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Today's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Study Time</span>
                <span className="font-medium text-golden">2.5h / 3h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tasks Done</span>
                <span className="font-medium text-golden">3 / 5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Streak</span>
                <span className="font-medium text-golden">7 days 🔥</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyCalendar;