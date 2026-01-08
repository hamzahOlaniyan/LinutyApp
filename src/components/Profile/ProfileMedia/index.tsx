import ScreenView from "@/components/ui/Layout/ScreenView";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, ListRenderItem, TouchableOpacity } from "react-native";
import { MediaFile } from "../../../../types/supabaseTypes";

export default function ProfileMedia({ data }: { data: MediaFile[] }) {
  const router = useRouter();

  const renderPostItem: ListRenderItem<MediaFile> = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/(protected)/me/media",
            params: { image: item.url }
          })
        }
      >
        <Image
          source={{ uri: item.url }}
          style={{
            width: 125,
            height: 120,
            backgroundColor: "white",
            borderRadius: 6
          }}
          // contentFit="contain"
        />
      </TouchableOpacity>
    ),
    []
  );

  return (
    <ScreenView>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderPostItem}
        bounces
        scrollEnabled
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={7}
        numColumns={3}
        contentContainerStyle={{
          rowGap: 6
        }}
        columnWrapperStyle={{ gap: 6 }}
      />
    </ScreenView>
  );
}
