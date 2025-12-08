import React from "react";
import { Pressable, View } from "react-native";
import AppText from "../AppText";

export default function index() {
  return (
    <View className="w-2/3 flex-row flex-wrap items-center justify-center self-center">
      <AppText variant="small">By signing in, you agree to our </AppText>
      <Pressable>
        <AppText variant="small" color="blue">
          Terms & Conditions,
        </AppText>
      </Pressable>
      <AppText variant="small">and </AppText>
      <Pressable>
        <AppText variant="small" color="blue">
          Privacy policy
        </AppText>
      </Pressable>
    </View>
  );
}
