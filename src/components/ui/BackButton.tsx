// import { hp, wp } from "@/src/common";
// import { colors } from "@/src/constant/colors";
// import { useThemeStore } from "@/src/context/themeStore";
import { BackIcon } from "@/assets/icons/backIcon";
import { hp, wp } from "@/src/constant/common";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function BackButton() {
   const router = useRouter();
   // const { currentTheme } = useThemeStore();

   return (
      <Pressable
         onPress={() => router.back()}
         style={{
            width: wp(8),
            height: hp(3.5),
         }}
         className="rounded-lg p-1 justify-center items-center mr-12"
      >
         <BackIcon />
      </Pressable>
   );
}
