import { CommentIcon } from "@/assets/icons/comment";
import { ShareIcon } from "@/assets/icons/shareIcon";
import { Thumbsup } from "@/assets/icons/thumbsup";
import { ThumbsupSolid } from "@/assets/icons/thumbsup-solid";
import { appColors } from "@/src/constant/colors";
import { hp, wp } from "@/src/constant/common";
import { usePostLikes } from "@/src/hooks/usePostLikes";
import { useAuthStore } from "@/src/store/authStore";
import { TouchableOpacity, View } from "react-native";
import AppText from "../ui/AppText";
import ActionDetails from "./ActionDetails";
import ActionInfo from "./ActionInfo";

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
      <View style={{ paddingHorizontal: wp(4), paddingVertical: hp(1.7), gap: 14 }}>
         <View className="flex-row justify-between items-center">
            <ActionDetails />
            <ActionInfo likeCount={likeCount} commentCount={commentCount} />
         </View>
         <View style={{ width: "100%", backgroundColor: appColors.border, height: 0.5 }}></View>
         <View className="flex-row justify-between items-center">
            <View className="flex-row w-full">
               <View className="flex-row flex-1 items-center gap-3">
                  <TouchableOpacity
                     onPress={() => handleLike.mutate()}
                     className="flex-row justify-center items-center gap-2"
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

                  <TouchableOpacity onPress={showComment} className="flex-row justify-center items-center gap-2">
                     <View className="top-[1px]">
                        <CommentIcon size={22} color={appColors.icons} />
                     </View>
                     <AppText weight="med" color={appColors.icons}>
                        Comments
                     </AppText>
                  </TouchableOpacity>
               </View>

               <TouchableOpacity onPress={showComment} className="flex-row justify-center items-center gap-2">
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
