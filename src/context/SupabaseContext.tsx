import { createContext, useContext, useState, useEffect } from 'react';
import { createClient, type AuthSession, type AuthChangeEvent, type User, type SupabaseClient, type Subscription } from '@supabase/supabase-js';

const supabaseUrl = 'https://fcvvcdiwgtijzcozanlk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjdnZjZGl3Z3Rpanpjb3phbmxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxMTcyNTgsImV4cCI6MjA1MDY5MzI1OH0.WYabCaeGzzN28llSbEoGrsVazInH699_PLpGbVQ4ECY';
//const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjdnZjZGl3Z3Rpanpjb3phbmxrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTExNzI1OCwiZXhwIjoyMDUwNjkzMjU4fQ.V6BaU8CwLPOO7qTKvlVo14sHR5eW1saCFDVk782aweA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SupabaseContextType {
  session: AuthSession | null;
  setSession: (session: AuthSession | null) => void;
  supabase: SupabaseClient<any, 'public', any>;
  user: User | null;
  setUser: (user: User | null) => void;
}

const SupaContext = createContext<SupabaseContextType | null>(null);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
    };

    getSession();

    const { subscription } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: AuthSession | null) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SupaContext.Provider value={{ session, setSession, supabase, user, setUser }}>
      {children}
    </SupaContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupaContext);
  if (context === null) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
