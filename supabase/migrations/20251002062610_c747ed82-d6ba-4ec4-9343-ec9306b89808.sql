-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('learner', 'teacher', 'admin');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'learner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

-- Update the handle_hello_world_user function to also create role entry
CREATE OR REPLACE FUNCTION public.handle_hello_world_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  user_role app_role;
BEGIN
  -- Get role from metadata, default to 'learner'
  user_role := COALESCE((NEW.raw_user_meta_data ->> 'role')::app_role, 'learner');
  
  -- Insert into user_roles table
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, user_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  -- Insert into Hello-World Login table
  INSERT INTO public."Hello-World Login" (
    user_id,
    username,
    full_name,
    email,
    role,
    experience_points,
    learning_streak,
    is_active,
    joined_at,
    updated_at
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'New User'),
    NEW.email,
    user_role::text,
    0,
    0,
    true,
    now(),
    now()
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    RETURN NEW;
  WHEN OTHERS THEN
    RAISE WARNING 'Error in handle_hello_world_user: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Migrate existing roles from Hello-World Login to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT 
  user_id, 
  CASE 
    WHEN role = 'teacher' THEN 'teacher'::app_role
    WHEN role = 'admin' THEN 'admin'::app_role
    ELSE 'learner'::app_role
  END as role
FROM public."Hello-World Login"
WHERE user_id IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;