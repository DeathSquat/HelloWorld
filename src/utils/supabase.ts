import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://oxwgmgngnsjfmeuiaorn.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94d2dtZ25nbnNqZm1ldWlhb3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNTU0MTcsImV4cCI6MjA3MjgzMTQxN30.dRJvQq0qLU9e5pN7GeIY63PeNDyuSMWUdwhaKO1s0Rk'
// Add some debugging
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key exists:', !!supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
})

// Simple test function to add to your existing file
export const testConnection = async () => {
  try {
    console.log('🔄 Testing Supabase connection...')
    
    // Test basic connection
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('❌ Connection failed:', error)
      return false
    }
    
    console.log('✅ Connection successful!')
    return true
  } catch (err) {
    console.error('❌ Connection test error:', err)
    return false
  }
}

// Simple signup function
export const simpleSignUp = async (email: string, password: string, fullName?: string) => {
  try {
    console.log('🔄 Attempting signup for:', email)
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: fullName ? {
        data: {
          full_name: fullName
        }
      } : undefined
    })
    
    if (error) {
      console.error('❌ Signup error:', error.message)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Signup successful:', data)
    return { success: true, data }
    
  } catch (err: any) {
    console.error('❌ Signup exception:', err)
    return { success: false, error: err.message || 'Unknown error' }
  }
}