import AppText from "@/components/ui/AppText";
import Avatar from "@/components/ui/Avatar";
import {
  ModalBottomSheet,
  ModalBottomSheetRef
} from "@/components/ui/ModalBottomSheet";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import Icon from "@/icons";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import moment from "moment";
import React, { useRef } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import PostOptions from "../PostOptions/Index";
import { Author, PostVisibility } from "../type";

export type PostHeaderProps = {
  author: Author;
  createdAt: string;
  visibility: PostVisibility;
  postId: string;
};

export default function PostHeader({
  author,
  createdAt,
  visibility,
  postId
}: PostHeaderProps) {
  const router = useRouter();
  const { me } = useAuthStore();

  const bottomSheetRef = useRef<ModalBottomSheetRef | null>(null);
  const handleOpenSheet = () => bottomSheetRef.current?.expand();

  const isUserOwner = me?.id === author.id;

  const avatarUri = author.avatarUrl?.replace("/svg?", "/png?");

  const displayName =
    `${author.firstName ?? ""} ${author.lastName ?? ""}`.trim() ||
    (author.username ? `@${author.username}` : "Unknown");

  return (
    <View
      style={{ paddingHorizontal: wp(2), paddingVertical: 2 }}
      className="flex-row items-start"
    >
      <View className="flex-1 flex-row items-end gap-2">
        <TouchableOpacity
          onPress={() => router.push(`/(protected)/user/${author.id}`)}
          hitSlop={10}
        >
          {avatarUri ? <Avatar path={avatarUri} size={45} /> : null}
        </TouchableOpacity>
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => router.push(`/(protected)/user/${author.id}`)}
              hitSlop={10}
            >
              <AppText variant="post_name">{displayName}</AppText>
            </TouchableOpacity>
            <AppText variant="post_date">
              · {moment(createdAt).fromNow()}
            </AppText>
            <AppText variant="post_visability">· {visibility}</AppText>
          </View>
          <TouchableOpacity
            onPress={() => router.push(`/(protected)/user/${author.id}`)}
            hitSlop={10}
          >
            <AppText variant="post_username">@ {author.username}</AppText>
          </TouchableOpacity>
        </View>
      </View>
      {/* MORE menu */}

      <Pressable onPress={handleOpenSheet} hitSlop={10} className="px-2 py-2">
        <Icon name="threeDots" color={appColors.icon} />
      </Pressable>
      <ModalBottomSheet
        ref={bottomSheetRef}
        snapPoints={["45%"]}
        children={
          <PostOptions
            isUserOwner={isUserOwner}
            postId={postId}
            bottomSheetRef={bottomSheetRef}
          />
        }
      />
    </View>
  );
}
