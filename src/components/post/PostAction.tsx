import { CommentIcon } from "@/assets/icons/comment";
import { FavoriteIcon } from "@/assets/icons/FavoriteIcon";
import { ShareIcon } from "@/assets/icons/shareIcon";
import { Thumbsup } from "@/assets/icons/thumbsup";
import { ThumbsupSolid } from "@/assets/icons/thumbsup-solid";
import { appColors } from "@/src/constant/colors";
import { usePostLikes } from "@/src/hooks/usePostLikes";
import { useAuthStore } from "@/src/store/authStore";
import { Octicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import AppText from "../ui/AppText";

type PostAction = {
   authorId: string;
   post_id: string;
   showComment: () => any;
   commentCount: any;
};

export default function PostAction({ post_id, showComment, commentCount, authorId }: PostAction) {
   const { profile } = useAuthStore();

   const { isLiked, handleLike, likeCount } = usePostLikes(post_id, profile?.id, authorId);

   return (
      <View className="">
         <View className="flex-row justify-between items-center px-4 py-2">
            <View className="flex-row items-center">
               <View className="flex-row">
                  <View className="w-6 h-6 rounded-full bg-green-300  bg-sky-220 justify-center items-center border-2 border-white">
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
            {likeCount > 0 || commentCount ? (
               <View className="flex-row gap-1 p-2 items-center ">
                  {likeCount && (
                     <AppText color={appColors.lightGrey}>{`${likeCount} ${likeCount > 1 ? "likes" : "like"}`}</AppText>
                  )}
                  {commentCount < 0 && (
                     <Octicons name="dot-fill" size={8} color={appColors.lightGrey} className="relative top-[1px]" />
                  )}
                  {commentCount && (
                     <AppText color={appColors.lightGrey}>{`${commentCount} ${
                        commentCount > 1 ? "comments" : "comment"
                     }`}</AppText>
                  )}
               </View>
            ) : null}
         </View>

         <View style={{ borderTopColor: appColors.border, borderTopWidth: 0.5 }} className="flex-row justify-between">
            <View className="flex-row w-full">
               <View className="flex-row flex-1 items-center">
                  <TouchableOpacity
                     onPress={() => handleLike.mutate()}
                     className="flex-row justify-center items-center gap-2 p-3 px-4"
                  >
                     {isLiked ? (
                        <ThumbsupSolid size={22} color={appColors.primary} />
                     ) : (
                        <Thumbsup size={22} color={appColors.icons} />
                     )}
                     <AppText weight="med" color={appColors.icons}>
                        Like
                     </AppText>
                  </TouchableOpacity>

                  <TouchableOpacity
                     onPress={showComment}
                     className="flex-row justify-center items-center gap-2 p-3 px-2"
                  >
                     <View className="top-[1px]">
                        <CommentIcon size={22} color={appColors.icons} />
                     </View>
                     <AppText weight="med" color={appColors.icons}>
                        Comments
                     </AppText>
                  </TouchableOpacity>
               </View>

               <TouchableOpacity onPress={showComment} className="flex-row justify-center items-center gap-2 p-3 px-2">
                  <View className="top-[1px]">
                     <ShareIcon size={22} color={appColors.icons} />
                  </View>
                  <AppText weight="med" color={appColors.icons}>
                     Share
                  </AppText>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
}
