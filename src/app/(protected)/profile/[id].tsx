import AppText from "@/components/ui/AppText";
import Avatar from "@/components/ui/Avatar";
import { FriendActionButton } from "@/components/ui/FriendActionButton";
import ScreenView from "@/components/ui/Layout/ScreenView";
import StickyTab from "@/components/ui/StickyTab";
import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import {
  FriendStatus,
  ProfileApi,
  ProfileRowItem
} from "@/hooks/useProfileApi";
import Icon, { IconName } from "@/icons";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function UserProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data } = ProfileApi.useGetProfileById(id);

  const [profile, setProfile] = useState(data);

  useEffect(() => {
    if (data) setProfile(data);
  }, [data]);

  const name = `${profile?.firstName} ${profile?.lastName}`;

  const friendshipItem: ProfileRowItem = {
    id: profile?.id as string,
    firstName: profile?.firstName as string,
    lastName: profile?.lastName as string,
    username: profile?.username as string,
    avatarUrl: profile?.avatarUrl as string,
    friendStatus: profile?.friendStatus as FriendStatus,
    requestId: profile?.requestId
  };

  console.log("profile", JSON.stringify(profile, null, 2));

  const Label = ({
    label,
    value,
    icon = "account"
  }: {
    label: string;
    value: React.ReactNode;
    icon: IconName;
  }) => {
    return (
      <View className="flex-row gap-2">
        <Icon name={icon} size={18} />
        <AppText className="font-Medium capitalize">{label} :</AppText>
        <AppText className="capitalize">{value}</AppText>
      </View>
    );
  };

  return (
    <ScrollView className="flex-1 bg-white pb-20">
      <Stack.Screen
        options={{ title: `${profile?.firstName} ${profile?.lastName}` }}
      />
      <View style={s.coverContainer}>
        {profile?.coverUrl && (
          <Image
            source={{ uri: profile?.coverUrl }}
            contentFit="fill"
            style={{
              width: "100%",
              height: "100%"
            }}
          />
        )}
      </View>
      <ScreenView>
        <View className="relative -top-[60px]">
          <View className="items-center justify-center gap-3">
            <View className="rounded-full border-[6px] border-white">
              <Avatar path={profile?.avatarUrl} size={120} />
            </View>
            <AppText variant={"header"}>{name}</AppText>
            <AppText variant={"small"} color={appColors.placeholder}>
              @{profile?.username}
            </AppText>
            <View className="my-4 w-full flex-row items-center justify-center gap-6">
              <View className="items-center justify-center px-6">
                <AppText variant={"title"}>213</AppText>
                <AppText variant={"small"} color={appColors.placeholder}>
                  Posts
                </AppText>
              </View>
              <View className="h-full w-[1px] bg-neutral-300" />
              <View className="items-center justify-center px-6">
                <AppText variant={"title"}>{profile?.friendsCount}</AppText>
                <AppText variant={"small"} color={appColors.placeholder}>
                  Friends
                </AppText>
              </View>
              <View className="h-full w-[1px] bg-neutral-300 " />
              <View className="items-center justify-center px-6">
                <AppText variant={"title"}>231</AppText>
                <AppText variant={"small"} color={appColors.placeholder}>
                  Friends
                </AppText>
              </View>
            </View>
          </View>

          <View className="gap-6">
            <AppText>{profile?.bio}</AppText>
            <View className="gap-2">
              <Label
                icon="location"
                label="location"
                value={`${(profile?.city, profile?.country, profile?.district)}`}
              />
              <Label
                icon="calendar"
                label="registered since"
                value={profile?.createdAt}
              />
            </View>
          </View>

          <View className="my-4">
            <View className="flex-row gap-2 py-6">
              <FriendActionButton
                item={friendshipItem}
                style={{ flex: 1, height: hp(5) }}
              />
              <TouchableOpacity className="items-center justify-center rounded-lg bg-neutral-200 px-4">
                <Icon name="mail" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="items-center justify-center rounded-lg bg-neutral-200 p-4">
              <AppText>Visit store</AppText>
            </TouchableOpacity>
          </View>

          <StickyTab
            routes={[
              { key: "Posts", title: "Posts" },
              { key: "Pictures", title: "Pictures" }
            ]}
            scenes={{
              Posts: <AppText>Pictures</AppText>,
              Pictures: <AppText>Info</AppText>
            }}
          />
        </View>
      </ScreenView>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  coverContainer: {
    height: hp(25),
    flexDirection: "row"
  }
});
