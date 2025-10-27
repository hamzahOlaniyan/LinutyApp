import { appColors } from "@/src/constant/colors";
import { Stack } from "expo-router";

export default function CommunityLayout() {
   return (
      <Stack screenOptions={{ headerShadowVisible: false }}>
         <Stack.Screen
            name="index"
            options={{
               headerShown: false,
            }}
         />
         <Stack.Screen
            name="clans"
            options={{
               headerStyle: { backgroundColor: "#18746c" },
               headerTitleStyle: { color: appColors.white },
            }}
         />
         <Stack.Screen
            name="lineage-map"
            options={{ headerStyle: { backgroundColor: "#18746c" }, headerTitleStyle: { color: appColors.white } }}
         />
         <Stack.Screen name="discover" />
         <Stack.Screen name="clan-members" />
         <Stack.Screen name="gathering" />
         <Stack.Screen
            name="(stories)"
            options={{
               headerShown: false,
            }}
         />
      </Stack>
   );
}
