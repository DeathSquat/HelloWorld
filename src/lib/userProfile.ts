import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  user_id: string;
  username: string | null;
  full_name: string | null;
  email: string | null;
  bio: string | null;
  avatar_url: string | null;
  role: string | null;
  experience_points: number | null;
  learning_streak: number | null;
  joined_at: string | null;
  updated_at: string | null;
}

/**
 * Creates a user profile in the Hello-World Login table
 * This serves as a fallback when the trigger fails
 */
export const createUserProfile = async (user: User): Promise<UserProfile> => {
  const profileData = {
    user_id: user.id,
    email: user.email,
    full_name: user.user_metadata?.full_name || 'New User',
    username: user.user_metadata?.username || user.email?.split('@')[0] || `user_${user.id.slice(0, 8)}`,
    role: 'learner',
    experience_points: 0,
    learning_streak: 0,
    joined_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('Hello-World Login')
    .insert(profileData)
    .select()
    .single();
    
  if (error) {
    console.error('Profile creation failed:', error);
    throw new Error(`Profile creation failed: ${error.message}`);
  }

  return data;
};

/**
 * Retrieves a user profile by user_id
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('Hello-World Login')
    .select('*')
    .eq('user_id', userId)
    .single();
    
  if (error) {
    if (error.code === 'PGRST116') {
      return null; // No profile found
    }
    console.error('Error fetching user profile:', error);
    throw error;
  }

  return data;
};

/**
 * Logs registration errors for debugging
 */
export const logRegistrationError = (error: any, userEmail: string, context?: string) => {
  console.error('Registration Error:', {
    error: error.message,
    email: userEmail,
    context: context || 'registration',
    timestamp: new Date().toISOString(),
    errorCode: error.code,
  });
};