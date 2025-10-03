-- Create teacher_students table for tracking which students belong to which teachers
CREATE TABLE public.teacher_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL,
  student_id UUID NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(teacher_id, student_id)
);

-- Enable RLS
ALTER TABLE public.teacher_students ENABLE ROW LEVEL SECURITY;

-- Teachers can view their own students
CREATE POLICY "Teachers can view their assigned students"
ON public.teacher_students
FOR SELECT
TO authenticated
USING (
  auth.uid() = teacher_id 
  OR public.has_role(auth.uid(), 'admin')
);

-- Teachers can assign students to themselves
CREATE POLICY "Teachers can assign students"
ON public.teacher_students
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = teacher_id 
  AND public.has_role(auth.uid(), 'teacher')
);

-- Teachers can remove student assignments
CREATE POLICY "Teachers can remove assigned students"
ON public.teacher_students
FOR DELETE
TO authenticated
USING (
  auth.uid() = teacher_id 
  OR public.has_role(auth.uid(), 'admin')
);

-- Add index for better performance
CREATE INDEX idx_teacher_students_teacher ON public.teacher_students(teacher_id);
CREATE INDEX idx_teacher_students_student ON public.teacher_students(student_id);