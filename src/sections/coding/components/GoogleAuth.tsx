import React from "react";
import { supabase } from "@/integrations/supabase/client";
import { signInWithOAuth } from "@/lib/utils";


const GoogleAuth: React.FC = () => {
  const signInWithGoogle = async (): Promise<void> => {
    const { data, error } = await signInWithOAuth('google');

    if (error) {
      console.error("Error signing in:", error.message);
    } else {
      console.log("Redirecting to Google Auth:", data);
    }
  };

  const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("User signed out successfully");
    }
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

export default GoogleAuth;