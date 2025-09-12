-- Create Hello-World Login table for coding platform users
CREATE TABLE public."Hello-World Login" (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username TEXT UNIQUE,
  full_name TEXT,
  email TEXT,
  bio TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'learner' CHECK (role IN ('learner', 'mentor', 'admin')),
  experience_points INTEGER DEFAULT 0,
  learning_streak INTEGER DEFAULT 0,
  total_study_hours INTEGER DEFAULT 0,
  problems_solved INTEGER DEFAULT 0,
  current_level TEXT DEFAULT 'beginner' CHECK (current_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  preferred_languages TEXT[] DEFAULT '{}',
  learning_goals TEXT[],
  timezone TEXT DEFAULT 'UTC',
  daily_goal_hours INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on Hello-World Login table
ALTER TABLE public."Hello-World Login" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for Hello-World Login table
CREATE POLICY "Users can view their own profile"
ON public."Hello-World Login"
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile"
ON public."Hello-World Login"
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public."Hello-World Login"
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Public profiles are viewable by authenticated users"
ON public."Hello-World Login"
FOR SELECT 
TO authenticated
USING (is_active = true);

CREATE POLICY "Admins can view all profiles"
ON public."Hello-World Login"
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public."Hello-World Login" 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_hello_world_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_hello_world_updated_at
BEFORE UPDATE ON public."Hello-World Login"
FOR EACH ROW
EXECUTE FUNCTION public.update_hello_world_updated_at();

-- Create function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_hello_world_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public."Hello-World Login" (
    user_id,
    username,
    full_name,
    email
  ) VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'username',
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-create profile on user signup
CREATE TRIGGER on_hello_world_user_created
AFTER INSERT ON auth.users
FOR EACH ROW 
EXECUTE FUNCTION public.handle_hello_world_user();

-- Add indexes for better performance
CREATE INDEX idx_hello_world_user_id ON public."Hello-World Login"(user_id);
CREATE INDEX idx_hello_world_username ON public."Hello-World Login"(username);
CREATE INDEX idx_hello_world_experience ON public."Hello-World Login"(experience_points DESC);
CREATE INDEX idx_hello_world_active ON public."Hello-World Login"(is_active);
CREATE INDEX idx_hello_world_last_activity ON public."Hello-World Login"(last_activity_at DESC);