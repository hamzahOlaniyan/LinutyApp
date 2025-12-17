import Card from "@/components/User/Card";
import { wp } from "@/constant/common";
import { useProfileQuery } from "@/hooks/useProfileQuery";
import { Profile } from "@/lib/supabase/supabaseTypes";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, ListRenderItem, View } from "react-native";

export default function Search() {
  const { data } = useProfileQuery();

  const [profiles, setProfiles] = useState(data);

  useEffect(() => {
    if (data) setProfiles(data);
  }, []);

  const renderItem: ListRenderItem<Profile> = useCallback(
    ({ item }) => <Card item={item} />,
    []
  );

  return (
    <View className="flex-1 justify-center bg-white">
      <FlatList
        data={profiles ?? []}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: wp(3), rowGap: 20 }}
      />
    </View>
  );
}
