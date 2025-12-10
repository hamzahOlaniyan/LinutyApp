import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import LASafeAreaView from "@/components/ui/LASafeAreaView";
import { useRouter } from "expo-router";
import React from "react";

export default function OnboardingFlow() {
  const router = useRouter();
  return (
    <LASafeAreaView>
      <AppText variant="header">Please complete the following</AppText>
      <Button
        text="continue"
        variant="outline"
        onPress={() => router.push("/onboarding-flow/1-date-of-birth")}
      />
    </LASafeAreaView>
  );
}
