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
   const fetchProfile = useAuthStore((s) => s.fetchProfile);

   const router = useRouter();
   const userId = session?.user?.id;

   const clanName = "Darood";
   const name = "Hamzah";

   useEffect(() => {
      const timer = setTimeout(() => {
         fetchProfile(userId);
         router.replace("/(app)");
         reset();
      }, 6000);
      return () => clearTimeout(timer);
   }, []);

   return (
      <ScreenWrapper paddingHorizontal={6}>
         <View className="flex-1 gap-12">
            <Image
               source={require("@/assets/images/logo_full.png")}
               accessibilityLabel="Avatar"
               contentFit="contain"
               style={{ width: "100%", height: 100, alignSelf: "center" }}
            />
            <View className="flex-1">
               <View className="self-center gap-8">
                  <View className="w-60 h-60 bg-red-300 rounded-full self-center"></View>
                  {/* <Image
                  source={{ uri: form.avatarUrl }}
                  accessibilityLabel="Avatar"
                  style={{ width: 150, height: 150, borderRadius: 300, alignSelf: "center" }}
                   /> */}
                  <View className="gap-12">
                     <View>
                        <AppText size="xxxl" align="center" weight="med">
                           Welcome to Linuty
                        </AppText>
                        <AppText size="xxxl" align="center" weight="semi">
                           {/* {form.firstName} */}
                           {name}!
                        </AppText>
                     </View>
                     <View className="gap-4">
                        <AppText weight="semi" size="lg" align="center">
                           We’re proud to have you join us as part of the{" "}
                           <AppText size="xl" weight="bold">
                              Darood
                           </AppText>{" "}
                           community.
                        </AppText>
                        <AppText size="lg" align="center">
                           This space is built for connecting with family, relatives, and clan members across the world
                           — preserving heritage, strengthening unity, and supporting one another.
                        </AppText>
                     </View>
                  </View>
               </View>
            </View>
         </View>
      </ScreenWrapper>
   );
}
