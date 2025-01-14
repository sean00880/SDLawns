import { NextResponse } from 'next/server';
import { createClient, type AuthSession } from '@supabase/supabase-js';

const supabaseUrl = 'https://fcvvcdiwgtijzcozanlk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjdnZjZGl3Z3Rpanpjb3phbmxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxMTcyNTgsImV4cCI6MjA1MDY5MzI1OH0.WYabCaeGzzN28llSbEoGrsVazInH699_PLpGbVQ4ECY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function middleware(req: Request) {
  const { data: { session } } = await supabase.auth.getSession();

  if (req.url.startsWith('/admin') && !session) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
