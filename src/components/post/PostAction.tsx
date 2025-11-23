import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { usePostLikes } from "@/hooks/usePostLikes";
import { CommentIcon } from "@/icons/ico/comment";
import { ShareIcon } from "@/icons/ico/shareIcon";
import { Thumbsup } from "@/icons/ico/thumbsup";
import { ThumbsupSolid } from "@/icons/ico/thumbsup-solid";
import { useAuthStore } from "@/store/authStore";
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
      <View style={{ paddingHorizontal: wp(4) }}>
         <View className="flex-row justify-between items-center py-2">
            <ActionDetails />
            <ActionInfo likeCount={likeCount} commentCount={commentCount} />
         </View>
         <View style={{ width: "100%", backgroundColor: appColors.border, height: 1 }}></View>
         <View className="flex-row justify-between items-center py-4">
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
