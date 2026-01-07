import { FeedPost } from "@/components/Post/type";
import ActionButtons from "@/components/Profile/ActionButtons";
import CoverImage from "@/components/Profile/CoverImage";
import ProfilePosts from "@/components/Profile/Posts";
import ProfileName from "@/components/Profile/ProfileName";
import Stats from "@/components/Profile/Stats";
import AppText from "@/components/ui/AppText";
import Avatar from "@/components/ui/Avatar";
import LASafeAreaView from "@/components/ui/LASafeAreaView";
import ScreenView from "@/components/ui/Layout/ScreenView";
import StickyTab from "@/components/ui/StickyTab";
import { appColors } from "@/constant/colors";
import {
  FriendStatus,
  ProfileApi,
  ProfileRowItem
} from "@/hooks/useProfileApi";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

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
    <LASafeAreaView padding={false}>
      <ScrollView className="flex-1 bg-white">
        {/* <Stack.Screen
          options={{
            title: `${profile?.firstName} ${profile?.lastName}`
          }}
        /> */}
        <CoverImage coverImage={profile?.coverUrl} />
        <ScreenView>
          <View className="relative ">
            <View className="items-center justify-center gap-3">
              <Avatar
                path={profile?.avatarUrl}
                size={120}
                style={{ borderWidth: 6, borderColor: appColors.white }}
              />
              <ProfileName name={name} username={profile?.username} />
              <Stats friendCount={profile?.friendsCount} />
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
    </LASafeAreaView>
  );
}
