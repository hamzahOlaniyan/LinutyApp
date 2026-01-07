import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import Icon from "@/icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
export default function CoverImage({
  coverImage
}: {
  coverImage: string | null | undefined;
}) {
  return (
    <View style={s.coverContainer}>
      {coverImage ? (
        <Image
          source={{ uri: coverImage }}
          contentFit="fill"
          style={{
            width: "100%",
            height: "100%"
          }}
        />
      ) : (
        <Icon name="add_image" size={48} color={appColors.grey} />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  coverContainer: {
    height: hp(23),
    flexDirection: "row",
    backgroundColor: appColors.dark_whitesmoke,
    justifyContent: "center",
    alignItems: "center"
  }
});
