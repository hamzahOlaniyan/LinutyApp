// import { useThemeStore } from "@/src/context/themeStore";
import { BackIcon } from "@/icons/ico/backIcon";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function BackButton() {
   const router = useRouter();
   // const { currentTheme } = useThemeStore();

   return (
      <Pressable onPress={() => router.back()}>
         <BackIcon />
      </Pressable>
   );
}
