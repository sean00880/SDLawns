import { NextResponse } from "next/server";
import { supabase } from "@/components/lib/supaBaseClient";

export async function middleware(req: Request) {
  const supabaseAuthCookie = req.cookies.get("sb-access-token")?.value;

  // Redirect unauthenticated users to the sign-in page
  if (!supabaseAuthCookie && req.url.includes("/admin")) {
    return NextResponse.redirect(new URL("/admin/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
