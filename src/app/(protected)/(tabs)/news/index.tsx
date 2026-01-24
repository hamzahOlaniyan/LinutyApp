import NewsCard from "@/components/news/Card";
import { NewResponse } from "@/components/news/type";
import TabButton from "@/components/ui/StickyTab/TabButton";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { useNews } from "@/hooks/useNews";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  View
} from "react-native";

type ResultItem = { category?: string | string[] };

export default function NewsScreen() {
  const { data, isLoading } = useNews();

  const [selectedCat, setSelectedCat] = useState("All");

  const category: string[] = data?.results
    .map((i: ResultItem) => i.category)
    .flat();

  const uniqueWords: string[] = ["All", ...new Set(category)];

  const renderItem = useCallback<ListRenderItem<NewResponse>>(
    ({ item }) => {
      return <NewsCard item={item} />;
    },
    [data]
  );

  console.log({ selectedCat });

  return (
    <View style={{ backgroundColor: appColors.white, flex: 1 }}>
      <View className="py-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={uniqueWords}
          keyExtractor={item => item}
          renderItem={({ item }: { item: string }) => (
            <TabButton
              key={item}
              title={item}
              onPress={() => setSelectedCat(item)}
            />
          )}
          contentContainerStyle={{ gap: 10, paddingLeft: wp(3) }}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <FlatList
            data={data?.results}
            keyExtractor={item => item?.link}
            refreshing
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: wp(3),
              paddingBottom: 100
            }}
          />
        </>
      )}
    </View>
  );
}
