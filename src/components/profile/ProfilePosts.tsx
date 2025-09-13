import React from "react";
import { View } from "react-native";
import PostCard from "../post/PostCard";
import AppText from "../ui/AppText";

export default function ProfilePosts({ item }: any) {
   return (
      <View className="flex-1">
         {item && item.length === 0 ? (
            <View className="p-4">
               <AppText>You have no posts</AppText>
            </View>
         ) : (
            <View className="bg-red-700">
               {item?.map((item: any) => (
                  <PostCard key={item?.id} post={item} comments={undefined} />
               ))}
            </View>
            // <FlatList
            //    data={item || []}
            //    renderItem={({ item }) => <PostCard post={item} comments={undefined} />}
            //    scrollEnabled
            //    showsVerticalScrollIndicator={false}
            //    decelerationRate={0.5}
            //    contentContainerStyle={{
            //       rowGap: 10,
            //       paddingBottom: 50,
            //       backgroundColor: appColors.extralightOlive,
            //       paddingTop: 1,
            //    }}
            // />
         )}
      </View>
   );
}
