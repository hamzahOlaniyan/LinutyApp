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
        borderBottomColor: appColors.border,
        borderBottomWidth: 1
      }}
      className="flex-1 flex-row items-center gap-3"
    >
      <Image
        source={{ uri: item?.image_url }}
        style={{ width: 80, height: 80, borderRadius: 4 }}
        contentFit="cover"
      />
      <View className="flex-1 gap-1">
        <View className="flex-row gap-3">
          {item?.category.map((cat: string) => (
            <AppText
              key={cat}
              color={appColors.placeholder}
              className="capitalize"
              variant={"small"}
            >
              {cat}
            </AppText>
          ))}
        </View>
        <AppText className="font-Medium">
          {item?.title.substring(0, 100)}...
        </AppText>
        <View className="flex-row justify-between">
          <View>
            <View className="flex-row justify-between">
              <AppText variant={"xs"} color={appColors.placeholder}>
                {item?.source_name}
              </AppText>
            </View>
          </View>
          <AppText variant={"xs"} color={appColors.placeholder}>
            {dayjs(item?.pubDate).format("ddd DD MMM YYYY")}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
}
