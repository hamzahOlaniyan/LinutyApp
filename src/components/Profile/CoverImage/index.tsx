import Avatar from "@/components/ui/Avatar";
import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import Icon from "@/icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
export default function CoverImage({
  coverImage,
  path
}: {
  coverImage: string | null | undefined;
  path: string | null | undefined;
}) {
  return (
    <View style={s.root}>
      <View style={s.coverContainer}>
        {coverImage ? (
          <Image
            source={{ uri: coverImage }}
            contentFit="fill"
            style={s.coverImage}
          />
        ) : (
          <Icon name="add_image" size={48} color={appColors.grey} />
        )}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(protected)/profile/profile-pic",
              params: { avatarUrl: path }
            })
          }
        >
          <Avatar path={path} size={120} style={s.avatar} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    height: hp(33)
  },
  coverContainer: {
    height: hp(23),
    backgroundColor: appColors.primary,
    justifyContent: "center",
    alignItems: "center"
  },
  coverImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "lime"
  },
  avatar: {
    borderWidth: 6,
    borderColor: appColors.white,
    position: "absolute",
    alignSelf: "center",
    top: 72
  }
});
