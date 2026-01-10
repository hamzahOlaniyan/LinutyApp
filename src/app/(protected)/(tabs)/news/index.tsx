// import NewsCard from "@/components/news/NewsCard";
// import NewsSkeleton from "@/components/news/NewsSkeleton";
// import FilterButton from "@/components/ui/FilterButton";
// import ScreenHeader from "@/components/ui/ScreenHeader";
import NewsCard from "@/components/news/Card";
import TabButton from "@/components/ui/StickyTab/TabButton";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { useNews } from "@/hooks/useNews";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function NewsScreen() {
  const { data, isLoading } = useNews();
  // const [category, setCategory] = useState("all");

  // if (isLoading) return <ActivityIndicator />;
  // if (isError) return <Text>Error: {(error as Error).message}</Text>;

  const newsCategory = [
    "all",
    "politics",
    "sport",
    "entertainment",
    "business",
    "lifestyle",
    "crime"
  ];

  return (
    <View style={{ backgroundColor: appColors.white, flex: 1 }}>
      <View className="py-2">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={newsCategory}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TabButton
              key={item}
              title={item}
              // onPress={() => setCategory(item)}
            />
          )}
          contentContainerStyle={{ gap: 10, paddingLeft: wp(3) }}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        // <NewsSkeleton />
        <>
          <FlatList
            data={data?.results || []}
            keyExtractor={item => item?.link}
            refreshing
            renderItem={({ item }) => <NewsCard item={item} />}
            contentContainerStyle={{
              paddingHorizontal: wp(3),
              paddingBottom: 400
            }}
          />
        </>
      )}
    </View>
  );
}
