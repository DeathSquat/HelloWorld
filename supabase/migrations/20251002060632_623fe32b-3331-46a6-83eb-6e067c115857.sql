-- Update RLS policies to allow teachers to view all student data
CREATE POLICY "Teachers can view all student profiles"
ON public."Hello-World Login"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public."Hello-World Login" teacher
    WHERE teacher.user_id = auth.uid()
    AND teacher.role = 'teacher'
  )
  OR auth.uid() = user_id
);

-- Drop the old restrictive policy
DROP POLICY IF EXISTS "Users can view their own profile" ON public."Hello-World Login";