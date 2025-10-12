import { CommentIcon } from "@/assets/icons/comment";
import { FavoriteIcon } from "@/assets/icons/FavoriteIcon";
import { ShareIcon } from "@/assets/icons/shareIcon";
import { Thumbsup } from "@/assets/icons/thumbsup";
import { ThumbsupSolid } from "@/assets/icons/thumbsup-solid";
import { appColors } from "@/src/constant/colors";
import { Octicons } from "@expo/vector-icons";
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
         <View className="flex-row justify-between items-center px-4 py-2">
            <View className="flex-row items-center">
               <View className="flex-row">
                  <View className="w-6 h-6 rounded-full bg-sky-200 justify-center items-center border-2 border-white">
                     <Thumbsup size={12} />
                  </View>
                  <View className="w-6 h-6 rounded-full bg-red-300 justify-center items-center relative right-2 border-2 border-white">
                     <FavoriteIcon size={12} />
                  </View>
                  <View className="w-6 h-6 rounded-full bg-slate-400 justify-center items-center relative right-4 border-2 border-white ">
                     <ShareIcon size={12} />
                  </View>
               </View>
               <AppText>129</AppText>
            </View>
            {likes || commentCount ? (
               <View className="flex-row gap-1 p-2 items-center ">
                  {likes && (
                     <AppText color={appColors.lightGrey}>{` ${likes} ${likes.length > 1 ? "likes" : "like"}`}</AppText>
                  )}
                  <Octicons name="dot-fill" size={8} color={appColors.lightGrey} className="relative top-[1px]" />
                  {commentCount && <AppText color={appColors.lightGrey}>{commentCount} comments</AppText>}
               </View>
            ) : null}
         </View>

         <View style={{ borderTopColor: appColors.border, borderTopWidth: 0.5 }} className="flex-row justify-between">
            <View className="flex-row w-full">
               <View className="flex-row flex-1 items-center">
                  <TouchableOpacity onPress={like} className="flex-row justify-center items-center gap-2 p-3 px-4">
                     {liked ? (
                        <ThumbsupSolid size={18} color={appColors.primary} />
                     ) : (
                        <Thumbsup size={18} color={appColors.grey} />
                     )}
                     <AppText weight="med" color={appColors.grey}>
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
                     <AppText weight="med" color={appColors.grey}>
                        Comments
                     </AppText>
                  </TouchableOpacity>
               </View>

               <TouchableOpacity onPress={showComment} className="flex-row justify-center items-center gap-2 p-3 px-2">
                  <View className="top-[1px]">
                     <ShareIcon size={18} color={appColors.grey} />
                  </View>
                  <AppText weight="med" color={appColors.grey}>
                     Share
                  </AppText>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
}
