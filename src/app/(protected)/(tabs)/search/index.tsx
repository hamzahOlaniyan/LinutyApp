import ProfileCard from "@/components/Profile/ProfileCard";
import { wp } from "@/constant/common";
import { ProfileRowItem, useProfileQuery } from "@/hooks/useProfileQuery";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, ListRenderItem, View } from "react-native";

export default function Search() {
  const { data } = useProfileQuery();

  const [profiles, setProfiles] = useState(data?.items);

  useEffect(() => {
    if (data?.items) setProfiles(data?.items);
  }, [data]);

  const renderItem: ListRenderItem<ProfileRowItem> = useCallback(
    ({ item }) => <ProfileCard item={item} />,
    []
  );

  return (
    <View className="flex-1 justify-center bg-white">
      <FlatList
        data={profiles}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: wp(3),
          rowGap: 20,
          paddingBottom: 100
        }}
      />
    </View>
  );
}
