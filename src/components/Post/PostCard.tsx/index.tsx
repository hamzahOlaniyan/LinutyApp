import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { memo, useRef, useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewabilityConfig,
  ViewToken
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import PostAction from "../PostAction";
import PostHeader from "../PostHeader";
import { PostCardProps } from "../type";

const PostCard = memo(function PostCard({ post }: PostCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [readmore, setReadMore] = useState(false);

  const media = post?.mediaFiles ?? [];

  const router = useRouter();
  const { width: screenWidth } = Dimensions.get("window");

  const viewabilityConfig = useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: 60
  }).current;

  const onViewableItemsChanged = useRef(
    ({
      viewableItems
    }: {
      viewableItems: ViewToken[];
      changed: ViewToken[];
    }) => {
      const idx = (viewableItems?.[0]?.index ?? 0) as number | null;
      setCurrentIndex(idx ?? 0);
    }
  ).current;

  return (
    <View style={s.container}>
      {/* HEADER: author tap */}
      <PostHeader
        author={post?.author}
        createdAt={post.createdAt}
        visibility={post.visibility}
        postId={post.id}
      />

      {/* BODY: open post */}
      <Pressable
        onPress={() => router.push(`/post/${post.id}/${post.id}`)}
        style={s.content}
      >
        {Number(post?.content?.length) > 100 && !readmore ? (
          <>
            <AppText>
              {post?.content?.substring(0, 100)}...{" "}
              <AppText
                onPress={() => setReadMore(!readmore)}
                color={appColors.secondary}
              >
                more
              </AppText>
            </AppText>
          </>
        ) : (
          <AppText>{post?.content} </AppText>
        )}
      </Pressable>

      {/* MEDIA: open media viewer */}

      <View className="mt-2">
        {media.length <= 1 &&
          media.map(m => {
            const aspectRatio =
              m?.height && m?.width ? m?.width / m?.height : 4.3;
            return (
              <TouchableOpacity
                key={m.id}
                onPress={() =>
                  router.push(`/(protected)/post/${post.id}/media`)
                }
              >
                <Image
                  source={{ uri: m.url }}
                  contentFit="cover"
                  contentPosition={"center"}
                  style={{
                    aspectRatio: aspectRatio
                  }}
                />
              </TouchableOpacity>
            );
          })}
        {post?.mediaFiles?.length > 1 && (
          <View>
            <FlatList
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              data={media}
              keyExtractor={(item, index) => item.url || index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    router.push(`/(protected)/post/${post.id}/media`)
                  }
                >
                  <Image
                    source={{ uri: item.url }}
                    style={{
                      width: screenWidth,
                      height: screenWidth,
                      aspectRatio: 1 / 1
                    }}
                    contentPosition="center"
                  />
                </TouchableOpacity>
              )}
            />
            <View style={s.mediaCounter}>
              <AppText variant={"xs"} color={appColors.white}>
                {currentIndex + 1} / {media.length}
              </AppText>
            </View>
            <View style={s.dotsRow}>
              {post?.mediaFiles?.map((_, i) => (
                <View
                  key={i}
                  style={[s.dot, i === currentIndex && s.dotActive]}
                />
              ))}
            </View>
          </View>
        )}
      </View>
      {/* ACTIONS */}
      <PostAction post={post} />
    </View>
  );
});

export default PostCard;

const s = StyleSheet.create({
  container: {
    backgroundColor: appColors.white,
    paddingTop: 12,
    paddingBottom: 6,
    marginBottom: 12
  },
  content: {
    paddingHorizontal: wp(3),
    marginTop: 12
  },
  image: {
    backgroundColor: "red"
  },
  mediaContainer: { position: "relative" },
  mediaCounter: {
    position: "absolute",
    right: 12,
    top: 12,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10
  },
  dotsRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
    paddingTop: 12
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 12,
    backgroundColor: appColors.grey
  },
  dotActive: { width: 6, height: 6, backgroundColor: appColors.text }
});
