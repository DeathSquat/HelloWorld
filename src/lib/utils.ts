import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { supabase } from "@/integrations/supabase/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface OAuthSignInResult {
  data: any;
  error: Error | null;
}

export async function signInWithOAuth(provider: 'google' | 'github', redirectPath: string = ''): Promise<OAuthSignInResult> {
  const redirectUrl: string = window.location.origin + redirectPath;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: redirectUrl },
  });
  
  return { data, error };
}