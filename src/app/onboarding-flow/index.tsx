import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import GradientButton from "@/components/ui/GradientButton";
import ScreenView from "@/components/ui/Layout/ScreenView";
import { appColors } from "@/constant/colors";
import Icon, { IconName } from "@/icons";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OnboardingStart() {
  const signOut = useAuthStore(s => s.signOut);
  const router = useRouter();

  async function handleLogout() {
    await signOut();
  }

  const { bottom } = useSafeAreaInsets();
  return (
    <ScreenView>
      <View style={{ marginBottom: bottom }} className="flex-1 justify-between">
        <View className="gap-10">
          <View className="gap-8">
            <View className="items-center">
              <View className="items-center justify-center rounded-2xl bg-neutral-100 p-2">
                <AppText style={{ fontSize: 56 }}>📋</AppText>
              </View>
              <View className="items-center justify-center gap-1">
                <AppText variant={"header"}>Complete your profile</AppText>
                <AppText className="text-center">
                  Please fill out the form to continue using the app.
                </AppText>
              </View>
            </View>

            <View className="mt-4 gap-4">
              <AppText variant={"title"} className="font-Medium text-sm">
                What to expect
              </AppText>
              <View className="gap-y-3 pl-3">
                <Row icon="accountSolid" text="Add your basic details" />
                <Row icon="locationSolid" text="Set your location (optional)" />
                <Row icon="verifySolid" text="Review and confirm" />
              </View>
            </View>

            <View
              style={{ backgroundColor: appColors.border }}
              className="h-[1px] w-full"
            ></View>

            <View>
              <AppText>
                Takes about 2–3 minutes. You can come back later, but some
                features will be locked until it’s done.
              </AppText>
            </View>
          </View>
          <GradientButton
            text="Get started"
            onPress={() => router.push("/onboarding-flow/1-date-of-birth")} // adjust route
          />
        </View>

        <View className="bottom-4">
          <Button variant="plain" text="sign out" onPress={handleLogout} />
          <AppText variant={"xs"} className="text-center">
            By continuing, you agree to provide accurate information.
          </AppText>
        </View>
      </View>
    </ScreenView>
  );
}

function Row({ icon, text }: { icon: IconName; text: string }) {
  return (
    <View className="flex-row items-center">
      <View className="mr-3">
        <Icon name={icon} size={24} />
      </View>
      <AppText className="text-sm text-neutral-700">{text}</AppText>
    </View>
  );
}
