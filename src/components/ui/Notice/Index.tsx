import React from "react";
import { View } from "react-native";
import AppText from "../AppText";

export default function Notice({ message }: { message: string }) {
  return (
    <View className="w-full rounded-md border border-neutral-100 bg-neutral-50 p-1">
      <AppText className="text-center">{message}</AppText>
    </View>
  );
}
