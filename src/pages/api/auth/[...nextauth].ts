import NextAuth from 'next-auth';
import SupabaseAdapter from '@next-auth/adapter-supabase';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fcvvcdiwgtijzcozanlk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjdnZjZGl3Z3Rpanpjb3phbmxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxMTcyNTgsImV4cCI6MjA1MDY5MzI1OH0.WYabCaeGzzN28llSbEoGrsVazInH699_PLpGbVQ4ECY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const authOptions = {
  adapter: SupabaseAdapter(supabase),
  providers: [], // Add providers as needed (e.g., Email, Google, etc.)
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
