import { appColors } from "@/src/constant/colors";
import React from "react";
import { View } from "react-native";
import PostCard from "../post/PostCard";
import AppText from "../ui/AppText";

export default function ProfilePosts({ item }: any) {
   return (
      <View style={{ backgroundColor: appColors.extralightOlive }} className="flex-1">
         {item && item.length === 0 ? (
            <View className="p-4">
               <AppText>You have no posts</AppText>
            </View>
         ) : (
            <View className="gap-3">
               {item?.map((item: any) => (
                  <PostCard key={item?.id} post={item} comments={undefined} loading={false} />
               ))}
            </View>
         )}
      </View>
   );
}
