import { Comment } from "@/assets/icons/comment";
import { ShareIcon } from "@/assets/icons/shareIcon";
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
      <View className="">
         {likes || commentCount ? (
            <View className="flex-row gap-6 p-2 px-4 ">
               {likes && (
                  <AppText size="sm" color={appColors.grey}>
                     {likes} likes
                  </AppText>
               )}
               {commentCount && (
                  <AppText size="sm" color={appColors.grey}>
                     {commentCount} comments
                  </AppText>
               )}
            </View>
         ) : null}

         <View
            style={{ borderTopColor: appColors.bordersLight, borderTopWidth: 0.5 }}
            className="flex-row justify-between"
         >
            <View className="flex-row w-full">
               <View className="flex-row flex-1 items-center">
                  <TouchableOpacity
                     onPress={like}
                     style={{ borderRightColor: appColors.bordersLight, borderRightWidth: 0.5 }}
                     className="flex-row justify-center items-center gap-2 p-3 px-4"
                  >
                     <View className="top-[1px]">
                        <Thumbsup size={18} color={liked ? appColors.primary : ""} />
                     </View>
                     <AppText>Like</AppText>
                  </TouchableOpacity>

                  <TouchableOpacity
                     onPress={showComment}
                     style={{ borderRightColor: appColors.bordersLight, borderRightWidth: 0.5 }}
                     className="flex-row justify-center items-center gap-2 p-3 px-2"
                  >
                     <View className="top-[1px]">
                        <Comment size={18} />
                     </View>
                     <AppText className="relative">Comments</AppText>
                  </TouchableOpacity>
               </View>

               <TouchableOpacity
                  onPress={showComment}
                  style={{ borderLeftColor: appColors.bordersLight, borderLeftWidth: 0.5 }}
                  className="flex-row justify-center items-center gap-2 p-3 px-2"
               >
                  <View className="top-[1px]">
                     <ShareIcon size={18} />
                  </View>
                  <AppText className="relative">Share</AppText>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
}
