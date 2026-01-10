import ProfileCard from "@/components/Profile/ProfileCard/ProfileCard";
import AppText from "@/components/ui/AppText";
import ScreenView from "@/components/ui/Layout/ScreenView";
import { wp } from "@/constant/common";
import { ProfileRowItem } from "@/hooks/type";
import { FriendsApi } from "@/hooks/useFriendsHook";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, ListRenderItem } from "react-native";

export default function friends() {
  const { profileId } = useLocalSearchParams<{ profileId: string }>();

  const data = FriendsApi.getFriends(profileId ?? "");

  const [profiles, setProfiles] = useState(data);
  const friends = profiles?.friends ?? [];
  const count = profiles?.count ?? 0;

  useEffect(() => {
    if (data) setProfiles(data);
  }, [data]);

  const renderItem: ListRenderItem<ProfileRowItem> = useCallback(
    ({ item }) => <ProfileCard item={item} isFriends />,
    []
  );

  return (
    <ScreenView>
      <Stack.Screen options={{ title: `${count} friend` }} />
      {count <= 0 ? (
        <AppText>You have no friends</AppText>
      ) : (
        <FlatList
          data={friends}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: wp(3),
            rowGap: 20,
            paddingBottom: 100
          }}
        />
      )}
    </ScreenView>
  );
}
