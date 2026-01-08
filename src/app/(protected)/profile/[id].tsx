import { FeedPost } from "@/components/Post/type";
import ActionButtons from "@/components/Profile/ActionButtons";
import CoverImage from "@/components/Profile/CoverImage";
import ProfilePosts from "@/components/Profile/Posts";
import ProfileName from "@/components/Profile/ProfileName";
import Stats from "@/components/Profile/Stats";
import AppText from "@/components/ui/AppText";
import Avatar from "@/components/ui/Avatar";
import ScreenView from "@/components/ui/Layout/ScreenView";
import StickyTab from "@/components/ui/StickyTab";
import { appColors } from "@/constant/colors";
import { FriendStatus, ProfileRowItem } from "@/hooks/type";
import { ProfileApi } from "@/hooks/useProfileApi";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function UserProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: POSTS } = ProfileApi.getPostsByProfileId(id ?? "");
  const { data } = ProfileApi.useGetProfileById(id);

  const [profile, setProfile] = useState(data);
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [readmore, setReadMore] = useState(false);

  useEffect(() => {
    if (POSTS) setPosts(POSTS ?? []);
  }, [POSTS]);

  useEffect(() => {
    if (data) setProfile(data);
  }, [data]);

  const { bottom } = useSafeAreaInsets();

  const name = `${profile?.firstName.trim()} ${profile?.lastName.trim()}`;

  const friendshipItem: ProfileRowItem = {
    id: profile?.id as string,
    firstName: profile?.firstName as string,
    lastName: profile?.lastName as string,
    username: profile?.username as string,
    avatarUrl: profile?.avatarUrl as string,
    friendStatus: profile?.friendStatus as FriendStatus,
    requestId: profile?.requestId
  };

  // const Label = ({
  //   label,
  //   value,
  //   icon = "account"
  // }: {
  //   label: string;
  //   value: React.ReactNode;
  //   icon: IconName;
  // }) => {
  //   return (
  //     <View className="flex-row gap-2">
  //       <Icon name={icon} size={18} />
  //       <AppText className="font-Medium capitalize">{label} :</AppText>
  //       <AppText className="capitalize">{value}</AppText>
  //     </View>
  //   );
  // };

  return (
    <>
      <Stack.Screen
        options={{
          title: `${name}`
        }}
      />
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[2]}
        style={{ marginBottom: bottom }}
      >
        <CoverImage coverImage={profile?.coverUrl} />
        <ScreenView>
          <View className="relative -top-[60px]">
            <View className="items-center justify-center gap-3">
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/(protected)/profile/profile-pic",
                    params: { avatarUrl: profile?.avatarUrl, name: name }
                  })
                }
              >
                <Avatar
                  path={profile?.avatarUrl}
                  size={120}
                  style={{ borderWidth: 6, borderColor: appColors.white }}
                />
              </TouchableOpacity>
              <ProfileName name={name} username={profile?.username} />
              <Stats friendCount={profile?.friendsCount} profileId={id} />
            </View>

            <AppText className="relative">
              {!readmore
                ? `${profile?.bio.substring(0, 120)}...`
                : profile?.bio}
              <AppText
                className="font-Medium"
                onPress={() => setReadMore(!readmore)}
              >
                {readmore ? "  show less" : "  show more"}
              </AppText>
            </AppText>
            <ActionButtons friendshipItem={friendshipItem} />
          </View>
        </ScreenView>
        <View className="h-[1px] w-full bg-gray-200" />
        <StickyTab
          routes={[
            { key: "Posts", title: "Posts" },
            { key: "Images", title: "Pictures" },
            { key: "Video", title: "Pictures" },
            { key: "Info", title: "Details" }
          ]}
          scenes={{
            Posts: <ProfilePosts item={posts} />,
            Pictures: <AppText>Pictures</AppText>,
            Info: <AppText>Info</AppText>,
            Store: <AppText>posStorets</AppText>
          }}
        />
      </ScrollView>
    </>
  );
}
