import { TiktokFont } from "@/assets/fonts/FontFamily";
import { Stack } from "expo-router";

export default function CommunityLayout() {
   return (
      <Stack>
         <Stack.Screen
            name="index"
            options={{
               headerShown: false,
               title: "comunity page",
               headerTitleAlign: "left",
               headerShadowVisible: false,
               headerTitleStyle: { fontSize: 20, fontFamily: TiktokFont.TiktokSemiBold },
               animation: "slide_from_bottom",
            }}
         />
      </Stack>
   );
}
