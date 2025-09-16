-- Fix Hello World registration database error
-- This migration addresses the RLS policy and trigger function issues

-- Drop existing restrictive RLS policy that prevents trigger-based insertions
DROP POLICY IF EXISTS "Users can create their own profile" ON public."Hello-World Login";

-- Create new policy allowing both user insertions and service role/trigger insertions
CREATE POLICY "Allow profile creation and management"
ON public."Hello-World Login"
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id OR 
  auth.role() = 'service_role' OR
  current_setting('request.jwt.claims', true)::json->>'role' = 'service_role' OR
  auth.uid() IS NULL  -- Allow trigger-based insertions when auth.uid() is not set
);

-- Create enhanced trigger function with better error handling and logging
CREATE OR REPLACE FUNCTION public.handle_hello_world_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
  profile_exists boolean;
  generated_username text;
BEGIN
  -- Check if profile already exists to prevent duplicates
  SELECT EXISTS(
    SELECT 1 FROM public."Hello-World Login" WHERE user_id = NEW.id
  ) INTO profile_exists;
  
  -- Only create profile if it doesn't exist
  IF NOT profile_exists THEN
    -- Generate username from email if not provided
    generated_username := COALESCE(
      NEW.raw_user_meta_data ->> 'username',
      split_part(NEW.email, '@', 1)
    );
    
    -- Ensure username is unique by appending random suffix if needed
    WHILE EXISTS(SELECT 1 FROM public."Hello-World Login" WHERE username = generated_username) LOOP
      generated_username := split_part(NEW.email, '@', 1) || '_' || substr(md5(random()::text), 1, 6);
    END LOOP;
    
    INSERT INTO public."Hello-World Login" (
      user_id,
      username,
      full_name,
      email,
      joined_at,
      updated_at
    ) VALUES (
      NEW.id,
      generated_username,
      COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'New User'),
      NEW.email,
      NOW(),
      NOW()
    );
    
    -- Log successful profile creation
    RAISE LOG 'Profile created successfully for user % with username %', NEW.id, generated_username;
  ELSE
    -- Log that profile already exists
    RAISE LOG 'Profile already exists for user %', NEW.id;
  END IF;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error details but don't prevent user creation
    RAISE LOG 'Profile creation failed for user %: % (SQLSTATE: %)', NEW.id, SQLERRM, SQLSTATE;
    -- Return NEW to allow auth.users creation to continue
    RETURN NEW;
END;
$$;

-- Add policy for service role to bypass RLS for administrative operations
CREATE POLICY "Service role can manage all profiles"
ON public."Hello-World Login"
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Add policy to allow authenticated users to view public profiles
CREATE POLICY "Allow viewing public profiles"
ON public."Hello-World Login"
FOR SELECT
TO authenticated
USING (is_active = true);