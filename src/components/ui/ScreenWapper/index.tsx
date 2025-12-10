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
      style={{ marginBottom: bottom }}
      className="flex-1 justify-center bg-pink-400"
    >
      {children}
    </SafeAreaView>
  );
}
