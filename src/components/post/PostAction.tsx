import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { usePostLikes } from "@/hooks/usePostLikes";
import { CommentIcon } from "@/icons/ico/comment";
import { ShareIcon } from "@/icons/ico/shareIcon";
import { Thumbsup } from "@/icons/ico/thumbsup";
import { ThumbsupSolid } from "@/icons/ico/thumbsup-solid";
import { useAuthStore } from "@/store/useAuthStore";
import { TouchableOpacity, View } from "react-native";
import AppText from "../ui/AppText";
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
         <View className="flex-row justify-end items-center py-3">
            {/* <ActionDetails /> */}
            <ActionInfo likeCount={likeCount} commentCount={commentCount} />
         </View>
         <View style={{ width: "100%", backgroundColor: appColors.bordersLight, height: 0.9 }}></View>
         <View className="flex-row justify-between items-center py-4">
            <View className="flex-row justify-between w-full">
               <TouchableOpacity
                  onPress={() => handleLike.mutate()}
                  className="flex-row justify-center items-center gap-1"
               >
                  {isLiked ? <ThumbsupSolid size={18} color={appColors.primary} /> : <Thumbsup size={18} />}
                  <AppText size="sm" weight="med">
                     Like
                  </AppText>
               </TouchableOpacity>

               <TouchableOpacity onPress={showComment} className="flex-row justify-center items-center gap-1">
                  <View className="top-[1px]">
                     <CommentIcon size={18} />
                  </View>
                  <AppText size="sm" weight="med">
                     Comments
                  </AppText>
               </TouchableOpacity>

               <TouchableOpacity onPress={showComment} className="flex-row justify-center items-center gap-1">
                  <View className="top-[1px]">
                     <ShareIcon size={18} />
                  </View>
                  <AppText size="sm" weight="med">
                     Share
                  </AppText>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
}
