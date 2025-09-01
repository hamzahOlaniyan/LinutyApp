import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { View } from "react-native";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";

SplashScreen.setOptions({
   duration: 500,
   fade: true,
});
SplashScreen.preventAutoHideAsync();

export default function AnimatedSplash() {
   const setSession = useAuthStore((s) => s.setSession);
   const fetchProfile = useAuthStore((s) => s.fetchProfile);
   const { session, profile } = useAuthStore();
   const router = useRouter();

   useEffect(() => {
      const checkAuth = async () => {
         await supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session?.user) fetchProfile(session.user.id);
         });

         setTimeout(() => {
            if (!session) {
               router.replace("/(auth)");
            } else if (profile?.isComplete === false) {
               router.replace("/(new-user)/PartTwo/step-4.0");
            } else {
               router.replace("/(app)/(tabs)");
            }
         }, 2000);
      };

      checkAuth();
      SplashScreen.hideAsync();
   }, []);

   return (
      <View className="flex-1 justify-center items-center bg-white">
         <Image
            source={require("@/assets/images/tree-icon.png")}
            style={{ width: "100%", height: 100, alignSelf: "center", justifyContent: "center", borderRadius: 100 }}
            contentFit="contain"
         />
      </View>
   );
}
