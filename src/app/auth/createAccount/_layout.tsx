import { Font } from "@/assets/fonts/FontFamily";
import { useAuthStore } from "@/store/useAuthStore";
import { useRegistrationStore } from "@/store/useRegistrationState";
import { Stack, usePathname, useRouter } from "expo-router";
import React, { useEffect } from "react";

export default function NewUserLayout() {
   const { profile } = useAuthStore();
   const { reset } = useRegistrationStore();

   const router = useRouter();
   const pathname = usePathname();

   useEffect(() => {
      if (profile?.isComplete) {
         router.replace("/(app)/(tabs)/(home)");
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
               fontFamily: Font.Bold,
            },
         }}
      ></Stack>
   );
}
