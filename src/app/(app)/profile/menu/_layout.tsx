// import { TiktokFont } from "@/assets/fonts/FontFamily";
import { TiktokFont } from "@/assets/fonts/FontFamily";
// import { useThemeStore } from "@/context/themeStore";
import { Stack } from "expo-router";

export default function ProfileMenuLayout() {
   // const { currentTheme } = useThemeStore();

   return (
      <Stack
         screenOptions={{
            headerShown: true,
            headerTitleAlign: "left",
            headerShadowVisible: false,
            headerTitleStyle: {
               fontSize: 20,
               fontFamily: TiktokFont.TiktokSemiBold,
            },
         }}
      >
         <Stack.Screen name="index" options={{ title: "Settings and activity" }} />
         <Stack.Screen name="appearance" options={{ title: "Appearance" }} />
      </Stack>
   );
}
