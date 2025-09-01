import AppText from "@/src/components/AppText";
import Button from "@/src/components/Button";
import HomeHeaderMenu from "@/src/components/HomeHeaderMenu";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import { useAuthStore } from "@/src/store/authStore";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
   const { signOut } = useAuthStore();
   return (
      <ScreenWrapper>
         <SafeAreaView className="flex-1">
            <HomeHeaderMenu />
            <View className="self-center top-1/2 relative ">
               <AppText size="xxxxxl" weight="bold">
                  Home
               </AppText>
               <Button text="sign out" onPress={signOut} size="lg" />
            </View>
         </SafeAreaView>
      </ScreenWrapper>
   );
}
