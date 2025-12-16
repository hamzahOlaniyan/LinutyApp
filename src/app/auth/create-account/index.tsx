import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import GradientButton from "@/components/ui/GradientButton";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateAccount() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: wp(3),
        backgroundColor: appColors.white,
        flex: 1
      }}
    >
      <View className="mt-8 gap-4">
        <AppText variant="header">Join Linuty</AppText>
        <Image
          source={require("@/assets/images/lin.png")}
          contentFit="contain"
          style={{
            width: "100%",
            height: "40%",
            alignSelf: "center",
            zIndex: 0,
            backgroundColor: appColors.extralightOlive,
            borderRadius: 20
          }}
        />
        <AppText variant="title">🚀 Let’s Get You Set Up!</AppText>
        <AppText>
          To connect, share, and explore — we need a little more info from you.
        </AppText>
        <View className="my-6 gap-4">
          <GradientButton
            onPress={() => router.push("/auth/create-account/1.email")}
            text="Get started"
            size="lg"
          />
          <Button
            onPress={() => router.back()}
            text="Already have an account"
            size="lg"
            variant="outline"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
