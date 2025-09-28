// src/app/index.tsx
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";
import { useAuthStore } from "../store/authStore";
import { fetchSessionProfile } from "../utils/fetchSessionProfile";
import { getNextRoute } from "../utils/getNextRoute";

export default function AnimatedSplash() {
   const setSession = useAuthStore((s) => s.setSession);
   const fetchProfile = useAuthStore((s) => s.fetchProfile);
   const { profile } = useAuthStore();
   const router = useRouter();

   useEffect(() => {
      // Move all native calls inside useEffect
      SplashScreen.setOptions({ duration: 500, fade: true });
      SplashScreen.hideAsync();

      const checkAuth = async () => {
         const currentSession = await fetchSessionProfile(setSession, fetchProfile);
         const route = getNextRoute(currentSession, profile);
         router.replace(route);
      };

      checkAuth();
   }, []);

   return (
      <View className="flex-1 justify-center items-center bg-white">
         <Image
            source={require("@/assets/images/tree-icon.png")}
            style={{ width: 100, height: 100 }}
            contentFit="contain"
            accessibilityRole="image"
         />
      </View>
   );
}
