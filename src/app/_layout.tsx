import { TiktokFont } from "@/assets/fonts/FontFamily";
import { PortalHost, PortalProvider } from "@gorhom/portal";
import { QueryClient } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import { QueryProvider } from "../provider/QueryProvider";
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
      [TiktokFont.TiktokBlack]: require("@/assets/fonts/Roboto-Black.ttf"),
      [TiktokFont.TiktokExtraBold]: require("@/assets/fonts/Roboto-ExtraBold.ttf"),
      [TiktokFont.TiktokBold]: require("@/assets/fonts/Roboto-SemiBold.ttf"),
      [TiktokFont.TiktokSemiBold]: require("@/assets/fonts/Roboto-SemiBold.ttf"),
      [TiktokFont.TiktokMedium]: require("@/assets/fonts/Roboto-Medium.ttf"),
      [TiktokFont.TiktokRegular]: require("@/assets/fonts/Roboto-Regular.ttf"),
      [TiktokFont.TiktokLight]: require("@/assets/fonts/Roboto-Light.ttf"),
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

   // useEffect(() => {
   //    const unsub = useAuthStore.persist.onFinishHydration(() => {
   //       useAuthStore.setState({ hasHydrated: true, loading: false });
   //    });
   //    return unsub;
   // }, []);

   // useEffect(() => {
   //    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
   //       setSession(session);
   //       if (session?.user) {
   //          fetchProfile(session?.user?.id);
   //       }
   //       // else {
   //       //    await AsyncStorage.removeItem("auth-store");
   //       // }
   //    });

   //    return () => {
   //       authListener.subscription.unsubscribe();
   //    };
   // }, []);

   // useEffect(() => {
   //    const subscription = Linking.addEventListener("url", async ({ url }: { url: string }) => {
   //       const { data } = await supabase.auth.exchangeCodeForSession(url);
   //       if (data.session) {
   //          console.log("Password reset session started!");
   //          router.replace("/(auth)/reset-password");
   //       }
   //    });

   //    return () => subscription.remove();
   // }, []);

   const queryClient = new QueryClient();

   return (
      <QueryProvider>
         {/* <QueryClientProvider client={queryClient}> */}
         <GestureHandlerRootView className="flex-1">
            <PortalProvider>
               <PortalHost name="root" />
               <SafeAreaProvider>
                  <GluestackUIProvider>
                     <StatusBar style="auto" />
                     <Stack screenOptions={{ headerShown: false }} />
                  </GluestackUIProvider>
               </SafeAreaProvider>
            </PortalProvider>
         </GestureHandlerRootView>
         {/* </QueryClientProvider> */}
      </QueryProvider>
   );
}
