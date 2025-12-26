import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import AppText from "../AppText";
import Button from "../Button";

export default function StepContainer({
  children,
  heading,
  paragraph,
  footer = false
}: {
  children: React.ReactNode;
  heading: string;
  paragraph?: string;
  footer?: boolean;
}) {
  const router = useRouter();

  return (
    <View className="relative flex-1 justify-between gap-4">
      <View className="gap-4">
        <View className="gap-4">
          {heading && <AppText variant="header">{heading}</AppText>}
          {paragraph && <AppText>{paragraph}</AppText>}
        </View>
        <View className="">{children}</View>
      </View>
      {footer && (
        <Button
          onPress={() => router.replace("/auth/sign-in")}
          text="Already have an account"
          variant="outline"
        />
      )}
    </View>
  );
}
