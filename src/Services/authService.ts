import { useAuthStore } from "@/store/useAuthStore";
import { Session, SupabaseClient, User } from "@supabase/supabase-js";

export interface SignInParams {
   values:{email: string;
   password: string;}
   setSession: (session: Session | null) => void;
   fetchProfile: (userId: string) => Promise<void>;
   supabase: SupabaseClient;
}

// export type SignInResult = { error: string } | { profile: true; userId: string };

export async function signInFlow({
   values,
   setSession,
   fetchProfile,
   supabase,
}: SignInParams) {
   if (!values.email.trim() || !values.password.trim()) {
      return null
   }

   try {
      const { data, error } = await supabase.auth.signInWithPassword({
         email: values.email,
         password: values.password,
      });

      if (error) {
         return { error: error.message };
      }

      const session: Session | null = data?.session ?? null;
      const user: User | null = data?.user ?? null;

      setSession(session);

      if (user?.id) {
         await fetchProfile(user.id);
         return { profile: true, userId: user.id };
      }

      return { error: "NO_USER_FOUND" };
   } catch (e: any) {
      return { error: e?.message || "UNKNOWN_ERROR" };
   }
}

export async function SignUpFlow() {}

export async function LogOutFlow() {
   useAuthStore.getState().signOut();
   useAuthStore.getState().resetSession();

}
