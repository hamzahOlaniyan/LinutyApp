import { CommentIcon } from "@/assets/icons/comment";
import { ShareIcon } from "@/assets/icons/shareIcon";
import { Thumbsup } from "@/assets/icons/thumbsup";
import { ThumbsupSolid } from "@/assets/icons/thumbsup-solid";
import { appColors } from "@/src/constant/colors";
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
                  <AppText size="sm" color={appColors.lightGrey}>
                     {` ${likes} ${likes.length > 1 ? "likes" : "like"}`}
                  </AppText>
               )}
               {commentCount && (
                  <AppText size="sm" color={appColors.lightGrey}>
                     {commentCount} comments
                  </AppText>
               )}
            </View>
         ) : null}

         <View style={{ borderTopColor: appColors.border, borderTopWidth: 0.5 }} className="flex-row justify-between">
            <View className="flex-row w-full">
               <View className="flex-row flex-1 items-center">
                  <TouchableOpacity onPress={like} className="flex-row justify-center items-center gap-2 p-3 px-4">
                     {liked ? (
                        <ThumbsupSolid size={18} color={appColors.primary} />
                     ) : (
                        <Thumbsup size={18} color={appColors.grey} />
                     )}
                     <AppText size="sm" weight="med" color={appColors.grey}>
                        Like
                     </AppText>
                  </TouchableOpacity>

                  <TouchableOpacity
                     onPress={showComment}
                     className="flex-row justify-center items-center gap-2 p-3 px-2"
                  >
                     <View className="top-[1px]">
                        <CommentIcon size={18} color={appColors.grey} />
                     </View>
                     <AppText size="sm" weight="med" color={appColors.grey}>
                        Comments
                     </AppText>
                  </TouchableOpacity>
               </View>

               <TouchableOpacity
                  onPress={showComment}
                  style={{ borderLeftColor: appColors.bordersLight, borderLeftWidth: 0.5 }}
                  className="flex-row justify-center items-center gap-2 p-3 px-2"
               >
                  <View className="top-[1px]">
                     <ShareIcon size={18} color={appColors.grey} />
                  </View>
                  <AppText size="sm" weight="med" color={appColors.grey}>
                     Share
                  </AppText>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
}
