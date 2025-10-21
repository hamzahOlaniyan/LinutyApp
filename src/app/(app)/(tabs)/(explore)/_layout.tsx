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
         <Stack.Screen name="clans" />
         <Stack.Screen name="clanTree" />
         <Stack.Screen name="discover" />
         <Stack.Screen
            name="(stories)"
            options={{
               headerShown: false,
            }}
         />
      </Stack>
   );
}
