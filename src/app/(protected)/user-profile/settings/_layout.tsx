import { Font } from "@/assets/fonts/FontFamily";
import { Stack } from "expo-router";

export default function ProfileMenuLayout() {
   return (
      <Stack
         screenOptions={{
            headerShown: true,
            headerTitleAlign: "left",
            headerShadowVisible: false,
            headerTitleStyle: {
               fontSize: 20,
               fontFamily: Font.SemiBold,
            },
         }}
      >
         <Stack.Screen name="index" options={{ title: "Settings and activity" }} />
         <Stack.Screen name="appearance" options={{ title: "Appearance" }} />
      </Stack>
   );
}
