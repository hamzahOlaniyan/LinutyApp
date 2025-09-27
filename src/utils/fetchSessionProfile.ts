import { supabase } from "../lib/supabase";

// Isolate Supabase logic
export async function fetchSessionProfile(setSession: Function, fetchProfile: Function) {
   const {
      data: { session },
   } = await supabase.auth.getSession();
   setSession(session);
   if (session?.user) await fetchProfile(session.user.id);
   return session;
}
