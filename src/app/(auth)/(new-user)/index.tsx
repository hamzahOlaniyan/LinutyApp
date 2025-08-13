import AppText from "@/src/components/AppText";
import Button from "@/src/components/Button";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import { Link, useRouter } from "expo-router";
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
            <AppText size="lg" weight="semi">
               Create an account too connect with friends, family and communicaties of people who share you interests
            </AppText>
         </View>
         <View className="gap-2 my-6">
            <Link href={"/(auth)/(new-user)/step-1"} asChild>
               <Button title="Get started" size="lg" />
            </Link>
            <Button onPress={() => router.back()} title="Already have an account" size="lg" variant="outline" />
         </View>
      </ScreenWrapper>
   );
}
