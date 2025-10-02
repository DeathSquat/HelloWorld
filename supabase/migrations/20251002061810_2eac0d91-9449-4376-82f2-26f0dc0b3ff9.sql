-- Update the handle_hello_world_user function to capture the role from signup metadata
CREATE OR REPLACE FUNCTION public.handle_hello_world_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
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
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'learner'),  -- Capture role from signup
    0,
    0,
    true,
    now(),
    now()
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- If user already exists, just return NEW without error
    RETURN NEW;
  WHEN OTHERS THEN
    -- Log error but don't block user creation
    RAISE WARNING 'Error in handle_hello_world_user: %', SQLERRM;
    RETURN NEW;
END;
$$;