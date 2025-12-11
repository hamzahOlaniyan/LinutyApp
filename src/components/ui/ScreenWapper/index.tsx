import { appColors } from "@/constant/colors";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets
} from "react-native-safe-area-context";

export default function ScreenWapper({
  children
}: {
  children: React.ReactNode;
}) {
  const { bottom } = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{ marginBottom: bottom, backgroundColor: appColors.white }}
      className="flex-1"
    >
      {children}
    </SafeAreaView>
  );
}
