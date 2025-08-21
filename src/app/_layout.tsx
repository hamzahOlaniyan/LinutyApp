import { TiktokFont } from "@/assets/fonts/FontFamily";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
   duration: 400,
   fade: true,
});

const logoutAndClearSession = async () => {
   await supabase.auth.signOut(); // clear Supabase session
   await AsyncStorage.removeItem("auth-store"); // clear Zustand persist
   // useAuthStore.getState().reset(); // clear in-memory state
};

export default function RootLayout() {
   const setSession = useAuthStore((s) => s.setSession);
   const fetchProfile = useAuthStore((s) => s.fetchProfile);
   const user = useAuthStore((s) => s.user);

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

   useEffect(() => {
      if (loaded) {
         SplashScreen.hide();
      }
   }, [loaded]);

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
      // load initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
         setSession(session);
         if (session?.user) fetchProfile(session.user.id);
      });

      // listen for changes
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
         setSession(session);
         if (session?.user) {
            fetchProfile(session.user.id);
            router.replace("/(protected)");
         }
         if (!session) {
            AsyncStorage.removeItem("auth-store");
            router.replace("/(auth)");
         }
      });

      return () => {
         authListener.subscription.unsubscribe();
      };
   }, []);

   if (!loaded) {
      return null;
   }

   return (
      <SafeAreaProvider>
         <GluestackUIProvider>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }} />
         </GluestackUIProvider>
      </SafeAreaProvider>
   );
}
