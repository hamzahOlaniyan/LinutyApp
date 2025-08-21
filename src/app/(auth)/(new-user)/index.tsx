import AppText from "@/src/components/AppText";
import Button from "@/src/components/Button";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function NewUser() {
   const router = useRouter();
   return (
      <ScreenWrapper>
         <View className="gap-4">
            <AppText size="xxxl" weight="bold">
               Join Linuty
            </AppText>
            <Image
               source={require("@/assets/images/tree.svg")}
               style={{
                  width: "100%",
                  height: "40%",
                  alignSelf: "center",
                  zIndex: 0,
                  backgroundColor: "#f1f5fe",
                  borderRadius: 20,
               }}
            />
            <AppText size="xl" weight="bold">
               🚀 Let’s Get You Set Up!
            </AppText>
            <AppText size="xl" weight="med">
               To connect, share, and explore — we need a little more info from you.
            </AppText>
            <View className="gap-2 my-6">
               <Button onPress={() => router.push("/PartOne/step-1")} title="Get started" size="lg" />
               <Button onPress={() => router.back()} title="Already have an account" size="lg" variant="outline" />
            </View>
         </View>
      </ScreenWrapper>
   );
}
