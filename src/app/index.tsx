import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { colors } from "../constant/colors";

SplashScreen.setOptions({
   duration: 1000,
   fade: true,
});
SplashScreen.preventAutoHideAsync();

export default function AnimatedSplash() {
   const router = useRouter();

   useEffect(() => {
      SplashScreen.hideAsync();
   }, []);

   useEffect(() => {
      const timer = setTimeout(() => {
         router.replace("/(auth)");
      }, 2000);
      return () => clearTimeout(timer);
   }, []);

   return (
      <ImageBackground
         source={require("@/assets/images/splash-icon-dark.png")}
         style={{ flex: 1, justifyContent: "center" }}
      />
   );
}

const styles = StyleSheet.create({
   animationContainer: {
      flex: 1,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
   },
});
