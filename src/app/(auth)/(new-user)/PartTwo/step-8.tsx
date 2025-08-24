import AppText from "@/src/components/AppText";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import { useAuthStore } from "@/src/store/authStore";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

export default function Step8() {
   const { form, reset } = useRegistrationStore();
   const { session } = useAuthStore();

   const router = useRouter();

   useEffect(() => {
      // if (session) {
      reset();
      const timer = setTimeout(() => {
         router.replace("/(protected)");
      }, 2000);
      return () => clearTimeout(timer);
      // }
      // router.replace("/(protected)");
   }, []);

   return (
      <ScreenWrapper>
         <Image
            source={require("@/assets/images/logo_full.png")}
            accessibilityLabel="Avatar"
            contentFit="contain"
            style={{ width: "100%", height: 30, alignSelf: "center" }}
         />
         <View className="justify-around flex-1">
            <View className="self-center gap-12 relative bottom-12">
               <Image
                  source={{ uri: form.profilePic }}
                  accessibilityLabel="Avatar"
                  style={{ width: 150, height: 150, borderRadius: 300, alignSelf: "center" }}
               />
               <AppText size="xxxl" align="center">
                  {`Welcome to Linuty, ${form.firstName}`}
               </AppText>
            </View>
         </View>
      </ScreenWrapper>
   );
}
