import React from "react";
import { FlatList, View } from "react-native";
import PostCard from "../post/PostCard";
import AppText from "../ui/AppText";

export default function ProfilePosts({ item }: any) {
   return (
      <View className="flex-1">
         {item && item.length === 0 ? (
            <View className="p-8">
               <AppText>You have no postes</AppText>
            </View>
         ) : (
            <FlatList
               data={item || []}
               renderItem={({ item }) => <PostCard post={item} comments={undefined} />}
               contentContainerStyle={{
                  rowGap: 10,
                  flex: 1,
                  paddingHorizontal: 10,
                  //   backgroundColor:
                  //   currentTheme === "light" ? colors.light.foreground : colors.dark.foreground,
               }}
            />
         )}
      </View>
   );
}
