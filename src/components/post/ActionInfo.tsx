import { Octicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import AppText from "../ui/AppText";

export default function ActionInfo({ likeCount, commentCount }: { likeCount: number; commentCount: number }) {
   return (
      <View className="flex-row gap-1 items-center ">
         {(likeCount > 0 || commentCount > 0) && (
            <>
               {likeCount > 0 && (
                  <AppText weight="light" size="sm">
                     {`${likeCount} ${likeCount > 1 ? "likes" : "like"}`}
                  </AppText>
               )}
               {commentCount > 0 && likeCount > 0 && (
                  <Octicons name="dot-fill" size={6} className="relative top-[1px]" />
               )}
               {commentCount > 0 && (
                  <AppText weight="light" size="sm">
                     {`${commentCount} ${commentCount > 1 ? "comments" : "comment"}`}
                  </AppText>
               )}
            </>
         )}
      </View>
   );
}
