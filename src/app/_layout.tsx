import { TiktokFont } from "@/assets/fonts/FontFamily";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Linking } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";

// const logoutAndClearSession = async () => {
//    await supabase.auth.signOut(); // clear Supabase session
//    await AsyncStorage.removeItem("auth-store"); // clear Zustand persist
//    useAuthStore.getState().resetSession(); // clear in-memory state
// };

export default function RootLayout() {
   const setSession = useAuthStore((s) => s.setSession);
   const fetchProfile = useAuthStore((s) => s.fetchProfile);

   const router = useRouter();

   const [loaded] = useFonts({
      [TiktokFont.TiktokBlack]: require("@/assets/fonts/TikTokSans-Black.ttf"),
      [TiktokFont.TiktokExtraBold]: require("@/assets/fonts/TikTokSans-ExtraBold.ttf"),
      [TiktokFont.TiktokBold]: require("@/assets/fonts/TikTokSans-Bold.ttf"),
      [TiktokFont.TiktokSemiBold]: require("@/assets/fonts/TikTokSans-SemiBold.ttf"),
      [TiktokFont.TiktokMedium]: require("@/assets/fonts/TikTokSans-Medium.ttf"),
      [TiktokFont.TiktokRegular]: require("@/assets/fonts/TikTokSans-Regular.ttf"),
      [TiktokFont.TiktokLight]: require("@/assets/fonts/TikTokSans-Light.ttf"),
   });

   // useEffect(() => {
   //    const checkGhostSession = async () => {
   //       const { data } = await supabase.auth.getSession();

   //       if (data.session?.user) {
   //          const { data: profile } = await supabase
   //             .from("profiles")
   //             .select("*")
   //             .eq("id", data.session.user.id)
   //             .single();

   //          if (!profile) {
   //             await logoutAndClearSession();
   //          }
   //       }
   //    };
   //    checkGhostSession();
   // }, []);

   useEffect(() => {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
         setSession(session);
         if (session?.user) {
            fetchProfile(session?.user?.id);
         } else {
            await AsyncStorage.removeItem("auth-store");
         }
      });

      return () => {
         authListener.subscription.unsubscribe();
      };
   }, []);

   useEffect(() => {
      const subscription = Linking.addEventListener("url", async ({ url }: { url: string }) => {
         const { data } = await supabase.auth.exchangeCodeForSession(url);
         if (data.session) {
            console.log("Password reset session started!");
            router.replace("/(auth)/reset-password");
         }
      });

      return () => subscription.remove();
   }, []);

   const queryClient = new QueryClient();

   return (
      <GestureHandlerRootView className="flex-1 bg-yellow-500">
         <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
               <GluestackUIProvider>
                  <StatusBar style="auto" />
                  <Stack screenOptions={{ headerShown: false }} />
               </GluestackUIProvider>
            </QueryClientProvider>
         </SafeAreaProvider>
      </GestureHandlerRootView>
   );
}
