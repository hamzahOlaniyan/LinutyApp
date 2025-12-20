import { appColors } from "@/constant/colors";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import AppText from "../ui/AppText";
import { NewResponse } from "./type";

export default function NewsCard({ item }: { item: NewResponse }) {
  const router = useRouter();

  console.log(JSON.stringify(item, null, 2));

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: `/(protected)/(tabs)/news/${item?.article_id}`,
          params: {
            item: JSON.stringify(item)
          }
        })
      }
      style={{
        paddingVertical: 10,
        borderBottomColor: appColors.bordersLight,
        borderBottomWidth: 1
      }}
      className="flex-1 flex-row items-center gap-3"
    >
      <Image
        source={{ uri: item?.image_url }}
        style={{ width: 100, height: 100, borderRadius: 6 }}
        contentFit="cover"
      />
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          {item?.category.map((cat: string) => (
            <AppText key={cat} color={appColors.placeholder}>
              {cat}
            </AppText>
          ))}
          <AppText color={appColors.placeholder}>
            {dayjs(item?.pubDate).format("ddd DD MMM YYYY")}
          </AppText>
        </View>
        <AppText>{item?.title.substring(0, 100)}...</AppText>
        <View className="flex-row justify-between">
          <AppText color={appColors.placeholder}>{item?.source_name}</AppText>
        </View>
        <AppText color={appColors.placeholder}>
          {item?.source_url.replace(/^https?:\/\//, "")}
        </AppText>
      </View>
    </Pressable>
  );
}
