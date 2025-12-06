import { Font } from "@/assets/fonts/FontFamily";
import { Stack } from "expo-router";

export default function CommunityLayout() {
   return (
      <Stack screenOptions={{ headerShadowVisible: false }}>
         <Stack.Screen
            name="index"
            options={{
               headerShown: false,
               title: "comunity page",
               headerTitleAlign: "left",
               headerShadowVisible: false,
               headerTitleStyle: { fontSize: 20, fontFamily: Font.SemiBold },
               animation: "slide_from_bottom",
            }}
         />
         <Stack.Screen
            name="[id]"
            options={{
               headerTitle: () => "",
            }}
         />
      </Stack>
   );
}
