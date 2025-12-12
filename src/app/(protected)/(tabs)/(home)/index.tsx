import PostCard from "@/components/PostCard";
import EmptyFeed from "@/components/PostCard/EmptyFeed";
import { FeedPost } from "@/components/PostCard/type";
import AppText from "@/components/ui/AppText";
import HomeHeaderAction from "@/components/ui/HomeHeaderAction";
import { appColors } from "@/constant/colors";
import { useFeedQuery } from "@/hooks/useFeedQuery";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeFeed() {
  const { isLoading, data, isFetching, refetch } = useFeedQuery();

  const { top } = useSafeAreaInsets();

  const router = useRouter();
  const post: FeedPost[] = data?.data ?? [];

  const END_REACHED_THRESHOLD = 0.5;

  const renderItem: ListRenderItem<FeedPost> = useCallback(
    ({ item }) => (
      <PostCard
        post={item}
        onOpenPost={postId => router.push(`/post/${postId}`)}
        onOpenAuthor={authorId => router.push(`/profile/${authorId}`)}
        onOpenComments={postId => router.push(`/post/${postId}?focus=comments`)}
        onOpenMedia={(postId, startIndex = 0) =>
          router.push(`/post/${postId}/media?start=${startIndex}`)
        }
        // onLike={(postId) => likeMutation.mutate({ postId })}
        // onMore={(postId) => openPostActionSheet(postId)}
      />
    ),
    []
  );

  return (
    <View className="flex-1 bg-white">
      <View style={{ flex: 1, paddingTop: top }}>
        <StatusBar style="auto" />
        <FlatList
          ListHeaderComponent={<HomeHeaderAction />}
          data={post}
          keyExtractor={item => item.id}
          onRefresh={refetch}
          refreshing={isFetching}
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
            backgroundColor: appColors.background
          }}
          ListFooterComponent={
            isLoading ? (
              <AppText className="py-4 text-center">Loading…</AppText>
            ) : null
          }
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}
