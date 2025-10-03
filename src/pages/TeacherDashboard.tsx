import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, TrendingUp, Award, BookOpen, UserPlus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import TeacherNavbar from '@/components/TeacherNavbar';

interface StudentProgress {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  experience_points: number;
  learning_streak: number;
  total_study_hours: number;
  problems_solved: number;
  current_level: string;
  last_activity_at: string;
}

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [allStudents, setAllStudents] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTeacher, setIsTeacher] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    const checkTeacherStatus = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: userRole } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (userRole?.role !== 'teacher') {
        navigate('/division-selection');
        return;
      }

      setIsTeacher(true);
      fetchStudents();
    };

    checkTeacherStatus();
  }, [user, navigate]);

  const fetchStudents = async () => {
    try {
      // Fetch students assigned to this teacher
      const { data: assignedStudentIds, error: assignError } = await supabase
        .from('teacher_students')
        .select('student_id')
        .eq('teacher_id', user?.id);

      if (assignError) throw assignError;

      const studentIds = assignedStudentIds?.map(s => s.student_id) || [];

      if (studentIds.length > 0) {
        const { data, error } = await supabase
          .from('Hello-World Login')
          .select('*')
          .in('user_id', studentIds)
          .order('experience_points', { ascending: false });

        if (error) throw error;
        setStudents(data || []);
      }

      // Fetch all learners for assignment dialog
      const { data: allLearners, error: learnersError } = await supabase
        .from('Hello-World Login')
        .select('*')
        .eq('role', 'learner')
        .order('full_name');

      if (learnersError) throw learnersError;
      setAllStudents(allLearners || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast({
        title: "Error",
        description: "Failed to load student data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const assignStudent = async (studentId: string) => {
    try {
      const { error } = await supabase
        .from('teacher_students')
        .insert({
          teacher_id: user?.id,
          student_id: studentId,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Student assigned successfully",
      });
      
      fetchStudents();
      setShowAddDialog(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to assign student",
        variant: "destructive",
      });
    }
  };

  const removeStudent = async (studentId: string) => {
    try {
      const { error } = await supabase
        .from('teacher_students')
        .delete()
        .eq('teacher_id', user?.id)
        .eq('student_id', studentId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Student removed from your class",
      });
      
      fetchStudents();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to remove student",
        variant: "destructive",
      });
    }
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      beginner: 'bg-blue-500/20 text-blue-400',
      intermediate: 'bg-green-500/20 text-green-400',
      advanced: 'bg-purple-500/20 text-purple-400',
      expert: 'bg-golden/20 text-golden',
    };
    return colors[level] || colors.beginner;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading student data...</p>
        </div>
      </div>
    );
  }

  if (!isTeacher) {
    return null;
  }

  const totalStudents = students.length;
  const avgExperience = Math.round(students.reduce((sum, s) => sum + (s.experience_points || 0), 0) / totalStudents);
  const totalProblemsolved = students.reduce((sum, s) => sum + (s.problems_solved || 0), 0);
  const avgStreak = Math.round(students.reduce((sum, s) => sum + (s.learning_streak || 0), 0) / totalStudents);

  return (
    <>
      <TeacherNavbar />
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Student Progress Overview</h1>
            <p className="text-muted-foreground">Monitor and track student progress across all courses</p>
          </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-golden">{totalStudents}</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Avg Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-golden">{avgExperience}</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Award className="w-4 h-4" />
                Problems Solved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-golden">{totalProblemsolved}</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Avg Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-golden">{avgStreak} days</div>
            </CardContent>
          </Card>
        </div>

        {/* Students Table */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Students</CardTitle>
                <CardDescription>Students assigned to your class</CardDescription>
              </div>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Assign Student
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Assign Students to Your Class</DialogTitle>
                    <DialogDescription>
                      Select students to add to your class roster
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    {allStudents
                      .filter(s => !students.find(assigned => assigned.user_id === s.user_id))
                      .map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex-1">
                            <p className="font-medium">{student.full_name || 'Anonymous'}</p>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => assignStudent(student.user_id)}
                          >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Assign
                          </Button>
                        </div>
                      ))}
                    {allStudents.filter(s => !students.find(assigned => assigned.user_id === s.user_id)).length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        All students are already assigned to your class
                      </p>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {students.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No students assigned yet</p>
                <Button onClick={() => setShowAddDialog(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Assign Your First Student
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead className="text-right">XP</TableHead>
                      <TableHead className="text-right">Streak</TableHead>
                      <TableHead className="text-right">Problems</TableHead>
                      <TableHead className="text-right">Study Hours</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.full_name || 'Anonymous'}</TableCell>
                        <TableCell className="text-muted-foreground">{student.email}</TableCell>
                        <TableCell>
                          <Badge className={getLevelColor(student.current_level || 'beginner')}>
                            {student.current_level || 'beginner'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-golden">
                          {student.experience_points || 0}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="flex items-center justify-end gap-1">
                            🔥 {student.learning_streak || 0}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{student.problems_solved || 0}</TableCell>
                        <TableCell className="text-right">{student.total_study_hours || 0}h</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {student.last_activity_at ? formatDate(student.last_activity_at) : 'Never'}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeStudent(student.user_id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
};

export default TeacherDashboard;
