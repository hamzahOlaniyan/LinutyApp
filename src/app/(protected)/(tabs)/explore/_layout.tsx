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
            options={
               {
                  // headerShown: false,
               }
            }
         />
         <Stack.Screen name="lineage-map" />
         <Stack.Screen name="discover" />
         <Stack.Screen name="clan-members" />
         <Stack.Screen name="gathering" />
      </Stack>
   );
}
