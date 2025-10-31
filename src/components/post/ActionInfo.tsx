import { appColors } from "@/src/constant/colors";
import { Octicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import AppText from "../ui/AppText";

export default function ActionInfo({ likeCount, commentCount }: { likeCount: number; commentCount: number }) {
   return (
      <View className="flex-row gap-1 p-2 items-center ">
         {likeCount > 0 || commentCount ? (
            <>
               {likeCount && (
                  <AppText color={appColors.lightGrey}>{`${likeCount} ${likeCount > 1 ? "likes" : "like"}`}</AppText>
               )}
               {commentCount > 1 && (
                  <Octicons name="dot-fill" size={8} color={appColors.lightGrey} className="relative top-[1px]" />
               )}
               {commentCount && (
                  <AppText color={appColors.lightGrey}>{`${commentCount} ${
                     commentCount > 1 ? "comments" : "comment"
                  }`}</AppText>
               )}
            </>
         ) : null}
      </View>
   );
}
