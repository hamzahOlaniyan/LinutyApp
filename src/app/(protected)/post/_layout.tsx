import { appColors } from "@/constant/colors";
import Icon from "@/icons";
import { router, Stack } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function _PostLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[postId]"
        options={{
          title: "Edit post",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Icon name="close" />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name="[postId]/media"
        options={{
          animation: "none",
          presentation: "fullScreenModal",
          headerShadowVisible: false,
          headerTitle: "",
          headerStyle: { backgroundColor: appColors.text },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Icon name="close" color={appColors.white} />
            </TouchableOpacity>
          )
        }}
      />
    </Stack>
  );
}
