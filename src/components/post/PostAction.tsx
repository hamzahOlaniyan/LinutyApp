import { Comment } from "@/assets/icons/comment";
import { Thumbsup } from "@/assets/icons/thumbsup";
import React from "react";
import { Pressable, View } from "react-native";
import AppText from "../ui/AppText";

type PostAction = {
   like: () => any;
};

export default function PostAction({ like }: PostAction) {
   return (
      <View className="flex-row justify-between p-3 px-4">
         <View className="flex-row flex-1 items-center gap-3">
            <Pressable className="flex-row justify-center items-center gap-2" onPress={like}>
               <Thumbsup size={24} />

               {/* {post.images.length > 0 ? (
                  <Feather name="thumbs-up" size={20} />
               ) : (
                  <Feather
                     name="thumbs-up"
                     size={20}
                     // color={`${
                     //    liked ? "red" : currentTheme === "light" ? colors.light.text : colors.dark.text
                     // }`}
                  />
               )} */}

               <AppText>{/* {likes?.length || null} */}0</AppText>
            </Pressable>
            <Pressable
               onPress={() => {
                  //  if (!showMoreIcon) return null;
                  //  setPostID(post?.id), setShowComments(true);
               }}
               className="flex-row items-center relative top-[3px] gap-2"
            >
               <Comment size={24} />
               {/* {post.images.length > 0 && <FontAwesome6 name="comment-alt" size={17} color={appColors.text} />} */}
               <AppText
                  // textColor={post.images.length > 0 ? "white" : "#262626"}
                  className="relative -top-[2.5px]"
               >
                  0{/* {count || null} */}
               </AppText>
            </Pressable>
         </View>
      </View>
   );
}
