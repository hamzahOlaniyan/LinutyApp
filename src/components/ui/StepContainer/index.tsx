import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={{ marginBottom: bottom }}
      className="relative flex-1 justify-between gap-4"
    >
      <View className="gap-4">
        <View className="gap-4">
          {heading && <AppText variant="header">{heading}</AppText>}
          {paragraph && <AppText>{paragraph}</AppText>}
        </View>
        <View className="">{children}</View>
      </View>
      {footer && (
        <View className="bottom-6">
          <Button
            onPress={() => router.replace("/auth/sign-in")}
            text="Already have an account"
            variant="outline"
          />
        </View>
      )}
    </View>
  );
}
