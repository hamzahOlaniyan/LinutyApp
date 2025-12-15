import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import PostAction from "../PostAction";
import PostHeader from "../PostHeader";
import { PostCardProps } from "../type";

const PostCard = memo(function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const { width: screenWidth } = Dimensions.get("window");

  const media = post?.mediaFiles ?? [];
  const firstImage = media.find(m => m.type === "IMAGE")?.url;

  console.log(JSON.stringify(post, null, 2));

  return (
    <View style={s.container}>
      {/* HEADER: author tap */}
      <PostHeader
        author={post.author}
        createdAt={post.createdAt}
        visibility={post.visibility}
      />

      {/* BODY: open post */}
      <Pressable
        onPress={() => router.push(`/post/${post.id}`)}
        style={s.content}
      >
        {post.content ? (
          <AppText className="leading-6">{post.content}</AppText>
        ) : null}
      </Pressable>

      {/* MEDIA: open media viewer */}
      {firstImage ? (
        <Pressable
          onPress={() =>
            router.push(`/(protected)/post/${post.id}/media?start=${0}`)
          }
          className="mt-3 overflow-hidden"
        >
          <Image
            source={{ uri: firstImage }}
            style={{ width: screenWidth, height: screenWidth }}
            contentFit="contain"
          />
        </Pressable>
      ) : null}

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
  }
});
