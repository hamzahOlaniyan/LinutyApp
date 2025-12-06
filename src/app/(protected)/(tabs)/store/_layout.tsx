import { Font } from "@/assets/fonts/FontFamily";
import { Stack } from "expo-router";

export default function StoreLayout() {
   return (
      <Stack
         screenOptions={{
            headerShadowVisible: false,
            headerTitleStyle: { fontSize: 20, fontFamily: Font.Bold },
            headerTitleAlign: "left",
         }}
      >
         <Stack.Screen
            name="index"
            options={{
               headerShown: false,
            }}
         />

         <Stack.Screen
            name="product"
            options={{
               headerShown: false,
               // headerTitle: () => "",
               // headerLeft: () => <BackButton />,
            }}
         />

         {/* <Stack.Screen
            name="seller"
            options={{
               headerTitle: () => "",
               headerLeft: () => <BackButton />,
            }}
         /> */}
         <Stack.Screen
            name="new-product"
            options={{
               title: "New listing",
            }}
         />
      </Stack>
   );
}
