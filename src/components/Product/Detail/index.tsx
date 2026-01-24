import { FeedProduct } from "@/components/Feed/types";
import AppText from "@/components/ui/AppText";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { appColors } from "@/constant/colors";
import Icon from "@/icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";

export default function ProductDetail({ item }: { item: FeedProduct | null }) {
  const router = useRouter();

  return (
    <View>
      <View className="flex-row items-start justify-between">
        <View className="">
          <AppText variant={"titleLarge"} className="font-Bold">
            {item?.title?.trim()}
          </AppText>
          <AppText variant={"titleLarge"}>
            {Intl.NumberFormat("en-UK", {
              style: "currency",
              currency: "GBP"
            }).format(Number(item?.price))}
          </AppText>
        </View>
        <View className="rounded-full bg-neutral-100 p-2 px-5">
          <AppText variant={"xs"}>{item?.category}</AppText>
        </View>
      </View>

      <View className="my-4 w-full flex-row items-center justify-between">
        <Button size="sm" variant="secondary" text="Send seller a message" />
        <View className="flex-row items-center gap-3">
          <Pressable className="items-center justify-center rounded-full p-2">
            <Icon name={"favorite"} />
            <AppText variant={"xs"}>Favorite</AppText>
          </Pressable>
          <Pressable className="items-center justify-center rounded-full  p-2">
            <Icon name={"share"} />
            <AppText variant={"xs"}>Share</AppText>
          </Pressable>
        </View>
      </View>

      <View className="gap-2">
        <View
          style={{
            borderTopColor: appColors.border,
            borderTopWidth: 1,
            paddingTop: 15
          }}
          className="gap-6"
        >
          <View className="gap-1">
            <AppText variant={"title"}>Description</AppText>
            <AppText>{item?.description.trim()}</AppText>
          </View>
          <View className="">
            <View className="flex-row justify-between">
              <AppText variant={"title"}>Condition</AppText>
              <AppText>{item?.condition}</AppText>
            </View>
            <View className="flex-row justify-between">
              <AppText variant={"title"}>Availability</AppText>
              <AppText>{item?.availability}</AppText>
            </View>
            <View className="flex-row justify-between">
              <AppText variant={"title"}>Location</AppText>
              <AppText>{item?.country}</AppText>
            </View>
            <View className="flex-row justify-between">
              <AppText variant={"title"}>Negotiable</AppText>
              <AppText>{item?.negotiable}</AppText>
            </View>
          </View>
          <View
            style={{
              borderTopColor: appColors.border,
              borderTopWidth: 1,
              paddingTop: 15
            }}
            className="flex-row items-start justify-between"
          >
            <View className="gap-4">
              <AppText variant={"title"}>Seller Information</AppText>
              <View className="w-full flex-row justify-between">
                <View className="flex-row gap-2">
                  <View>
                    <TouchableOpacity
                      onPress={() => router.push(`/profile/${item?.sellerId}`)}
                    >
                      <Avatar path={item?.seller.avatarUrl} size={40} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <AppText variant={"title"}>
                      {item?.seller?.firstName} {item?.seller?.lastName}
                    </AppText>
                    <AppText variant={"xs"} color={appColors.secondary}>
                      @{item?.seller?.username}
                    </AppText>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname:
                        `/(protected)/(tabs)/store/${item?.sellerId}` as string,
                      params: {
                        sellerAvatarUrl: item?.seller.avatarUrl,
                        sellerName: `${item?.seller?.firstName} ${item?.seller?.lastName}`,
                        sellerUsername: item?.seller?.username
                      }
                    })
                  }
                  style={{
                    borderColor: appColors.text
                  }}
                >
                  <AppText className="font-Medium underline">
                    {`Sellers store >`}
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
