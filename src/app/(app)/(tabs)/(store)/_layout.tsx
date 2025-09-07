import { TiktokFont } from "@/assets/fonts/FontFamily";
import BackButton from "@/src/components/ui/BackButton";
import { Stack } from "expo-router";

export default function StoreLayout() {
   return (
      <Stack
         screenOptions={{
            headerShadowVisible: false,
            headerTitleStyle: { fontSize: 20, fontFamily: TiktokFont.TiktokSemiBold },
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
            name="productDetail/[id]"
            options={{
               headerTitle: () => "",
               headerLeft: () => <BackButton />,
            }}
         />
         <Stack.Screen
            name="seller/[id]"
            options={{
               headerTitle: () => "",
               headerLeft: () => <BackButton />,
            }}
         />
         <Stack.Screen
            name="new-product"
            options={{
               title: "New listing",
            }}
         />
      </Stack>
   );
}
