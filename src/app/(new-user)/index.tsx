import AppText from "@/src/components/AppText";
import Button from "@/src/components/Button";
import GradientButton from "@/src/components/GradientButton";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import { appColors } from "@/src/constant/colors";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function NewUser() {
   const router = useRouter();
   return (
      <ScreenWrapper>
         <View className="gap-6">
            <AppText size="xxxl" weight="bold">
               Join Linuty
            </AppText>
            <Image
               source={require("@/assets/images/lin.png")}
               contentFit="contain"
               style={{
                  width: "100%",
                  height: "40%",
                  alignSelf: "center",
                  zIndex: 0,
                  backgroundColor: appColors.extralightOlive,
                  borderRadius: 20,
               }}
            />
            <AppText size="xxl" weight="bold">
               🚀 Let’s Get You Set Up!
            </AppText>
            <AppText size="lg" weight="med">
               To connect, share, and explore — we need a little more info from you.
            </AppText>
            <View className="gap-4 my-6">
               <GradientButton onPress={() => router.push("/PartOne/step-1")} text="Get started" size="lg" />
               <Button onPress={() => router.back()} text="Already have an account" size="lg" />
            </View>
         </View>
      </ScreenWrapper>
   );
}
