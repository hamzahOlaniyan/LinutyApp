import AppText from "@/components/ui/AppText";
import React, { memo } from "react";
import { View } from "react-native";

export const EmptyFeed = memo(() => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <AppText variant="titleLarge" className="font-SemiBold">
        No posts yet!
      </AppText>
      <AppText>Be the first to share something!</AppText>
    </View>
  );
});

export default EmptyFeed;
