import { TiktokFont } from "@/assets/fonts/FontFamily";
import { useAuthStore } from "@/src/store/authStore";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { Stack, usePathname, useRouter } from "expo-router";
import React, { useEffect } from "react";

export default function NewUserLayout() {
   const { profile } = useAuthStore();
   const { reset } = useRegistrationStore();

   const router = useRouter();
   const pathname = usePathname();

   useEffect(() => {
      if (profile?.isComplete) {
         router.replace("/(app)/(tabs)");
      }
   }, [profile]);

   useEffect(() => {
      if (!pathname.includes("/Part")) {
         reset();
      }
   }, [pathname]);

   return (
      <Stack
         screenOptions={{
            headerTitle: "",
            headerTitleAlign: "left",
            headerShadowVisible: false,
            headerLargeTitle: false,
            headerTitleStyle: {
               fontSize: 20,
               fontFamily: TiktokFont.TiktokSemiBold,
               // color: currentTheme === "light" ? colors.light.text : colors.dark.text,
            },
            headerStyle: {
               // backgroundColor: currentTheme === "light" ? colors.light.background : colors.dark.background,
            },
         }}
      />
   );
}
