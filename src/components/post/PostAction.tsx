import { Comment } from "@/assets/icons/comment";
import { Thumbsup } from "@/assets/icons/thumbsup";
import { appColors } from "@/src/constant/colors";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import AppText from "../ui/AppText";

type PostAction = {
   like: () => any;
   liked: boolean;
   likes: any;
   showComment: () => any;
   commentCount: any;
};

export default function PostAction({ like, liked, likes, showComment, commentCount }: PostAction) {
   return (
      <View className="flex-row justify-between p-3 px-4">
         <View className="flex-row flex-1 items-center gap-3">
            <View className="flex-row justify-center items-center gap-2">
               <TouchableOpacity onPress={like}>
                  <Thumbsup size={24} color={liked ? appColors.primary : ""} />
               </TouchableOpacity>
               <AppText>{likes}</AppText>
            </View>
            <View className="flex-row justify-center items-center gap-2">
               <TouchableOpacity onPress={showComment} className="flex-row items-center relative top-[3px] gap-2">
                  <Comment size={24} />
               </TouchableOpacity>
               <AppText className="relative">{commentCount}</AppText>
            </View>
         </View>
      </View>
   );
}
