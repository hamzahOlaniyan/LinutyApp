import { TiktokFont } from "@/assets/fonts/FontFamily";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
   duration: 400,
   fade: true,
});

export default function RootLayout() {
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
