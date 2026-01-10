import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { RelativePathString, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Dimensions,
  Linking,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";

export default function NewDetail() {
  const params = useLocalSearchParams<{
    article_id: RelativePathString;
    item?: string;
  }>();

  const { width: screenWidth } = Dimensions.get("screen");

  const item = params.item ? JSON.parse(params.item) : null;

  const handlePress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn("Don't know how to open this URL:", url);
    }
  };

  return (
    <ScrollView
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: appColors.white }}
    >
      <View style={{ paddingHorizontal: wp(3), gap: 4 }}>
        <View className="flex-row justify-between">
          <AppText color={appColors.placeholder}>{item?.category}</AppText>
          <AppText color={appColors.placeholder}>
            {dayjs(item?.pubDate).format("ddd DD MMM YYYY")}
          </AppText>
        </View>
        <AppText>{item.title}</AppText>
        <AppText color={appColors.placeholder}>
          {item?.source_url.replace(/^https?:\/\//, "")}
        </AppText>
      </View>

      <Image
        source={{ uri: item?.image_url }}
        style={{
          marginVertical: 10,
          width: screenWidth,
          height: screenWidth
        }}
        contentFit="cover"
      />
      <View style={{ paddingHorizontal: wp(3), gap: 8, paddingBottom: 100 }}>
        <View className=" flex-1 justify-between">
          <View className="flex-row gap-1">
            <AppText>Written by:</AppText>
            <AppText color={appColors.placeholder}>{item?.creator}</AppText>
          </View>
          <View className="flex-row gap-1">
            <AppText>Source:</AppText>
            <AppText color={appColors.placeholder}>{item?.source_name}</AppText>
          </View>
        </View>
        <View className="mt-4 gap-4">
          <AppText>{item?.description}</AppText>
          <TouchableOpacity
            onPress={() => handlePress(item.link)}
            className="w-fit"
          >
            <AppText color={appColors.placeholder}>
              {` Complete article >`}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
