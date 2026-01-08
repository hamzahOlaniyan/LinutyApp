import Avatar from "@/components/ui/Avatar";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function ProfilePic() {
  const { avatarUrl, name } = useLocalSearchParams<{
    avatarUrl: string;
    name: string;
  }>();
  return (
    <>
      <Stack.Screen
        options={{
          title: name
        }}
      />
      <View className="flex-1 items-center bg-white pt-36">
        <Avatar path={avatarUrl} size={250} />
      </View>
    </>
  );
}
