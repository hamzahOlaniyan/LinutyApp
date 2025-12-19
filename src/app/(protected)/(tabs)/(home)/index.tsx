import PostCard from "@/components/Post/PostCard.tsx";
import { FeedPost } from "@/components/Post/type";
import AppText from "@/components/ui/AppText";
import EmptyFeed from "@/components/ui/EmptyFeed";
import HomeHeaderAction from "@/components/ui/HomeHeaderAction";
import { appColors } from "@/constant/colors";
import { useFeedQuery } from "@/hooks/useFeedQuery";
import React, { useCallback } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeFeed() {
  const { isLoading, data, refetch } = useFeedQuery();

  const { top } = useSafeAreaInsets();

  const post: FeedPost[] = data?.data ?? [];

  const END_REACHED_THRESHOLD = 0.5;

  const renderItem: ListRenderItem<FeedPost> = useCallback(
    ({ item }) => <PostCard post={item} />,
    []
  );

  return (
    // <View className="flex-1 bg-white">
    <View style={{ flex: 1, paddingTop: top, backgroundColor: "white" }}>
      <FlatList
        ListHeaderComponent={<HomeHeaderAction />}
        data={post}
        keyExtractor={item => item.id}
        onRefresh={refetch}
        refreshing={isLoading}
        bounces
        scrollEnabled
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical
        overScrollMode="always"
        removeClippedSubviews
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={7}
        onEndReachedThreshold={END_REACHED_THRESHOLD}
        ListEmptyComponent={<EmptyFeed />}
        contentContainerStyle={{
          backgroundColor: appColors.background,
          flex: 1
        }}
        ListFooterComponent={
          isLoading ? (
            <AppText className="py-4 text-center">Loading…</AppText>
          ) : null
        }
        renderItem={renderItem}
      />
      {/* </View> */}
    </View>
  );
}
