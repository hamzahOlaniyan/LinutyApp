import { Stack } from "expo-router";

export default function AppLayout() {
   return (
      <Stack
         screenOptions={{
            headerShadowVisible: false,
         }}
      >
         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

         <Stack.Screen name="post-edit" options={{ headerShown: false }} />

         <Stack.Screen name="user" />

         <Stack.Screen
            name="user-profile"
            options={{
               title: "Profile",
               headerShown: false,
            }}
         />

         <Stack.Screen
            name="new-post"
            options={{
               title: "New post",
               headerTitleAlign: "left",
               headerShadowVisible: false,
               animation: "none",
            }}
         />

         <Stack.Screen
            name="notification"
            options={{
               title: "Notification",
               headerTitleAlign: "left",
               headerShadowVisible: false,
               animation: "none",
            }}
         />

         <Stack.Screen
            name="+not-found"
            options={{
               title: "page not found!",
               headerTitleAlign: "left",
               headerShadowVisible: false,
               animation: "none",
            }}
         />
      </Stack>
   );
}
