import { useAuthStore } from "@/store/authStore";
import { Session, SupabaseClient, User } from "@supabase/supabase-js";

export interface SignInParams {
   email: string;
   password: string;
   setSession: (session: Session | null) => void;
   fetchProfile: (userId: string) => Promise<void>;
   supabase: SupabaseClient;
}

export type SignInResult = { error: string } | { profile: true; userId: string };

export async function signInFlow({
   email,
   password,
   setSession,
   fetchProfile,
   supabase,
}: SignInParams): Promise<SignInResult> {
   if (!email || !password) {
      return { error: "MISSING_FIELDS" };
   }

   try {
      const { data, error } = await supabase.auth.signInWithPassword({
         email,
         password,
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

   //RESET DEV

   // try {
   //    // 1️⃣ Clear async storage
   //    await AsyncStorage.clear();
   //    queryClient.clear();

   //    // 2️⃣ Clear persisted Zustand stores
   //    await useAuthStore.persist.clearStorage();

   //    console.log("✅ All local data cleared!");
   // } catch (error) {
   //    console.error("❌ Failed to clear local data:", error);
   // }
}
