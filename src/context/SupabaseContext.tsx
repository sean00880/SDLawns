import { createContext, useContext, useState, useEffect } from 'react';
import { createClient, type AuthSession, type AuthChangeEvent, type User, type SupabaseClient, type Subscription } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_SUPABASE_ANON_KEY || '';

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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: AuthSession | null) => {
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
