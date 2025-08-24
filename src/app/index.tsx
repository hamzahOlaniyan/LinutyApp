import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

// SplashScreen.setOptions({
//    duration: 1000,
//    fade: true,
// });
// SplashScreen.preventAutoHideAsync();

export default function AnimatedSplash() {
   const router = useRouter();

   // useEffect(() => {
   //    SplashScreen.hideAsync();
   // }, []);

   useEffect(() => {
      const timer = setTimeout(() => {
         router.replace("/(auth)");
      }, 2000);
      return () => clearTimeout(timer);
   }, []);

   return (
      <View className="flex-1 justify-center items-center bg-white">
         <Image
            source={require("@/assets/images/linuty_logo-1.png")}
            style={{ width: "100%", height: 120, alignSelf: "center", justifyContent: "center", borderRadius: 100 }}
            contentFit="contain"
         />
      </View>
   );
}
