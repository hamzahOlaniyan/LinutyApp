import AppText from "@/src/components/ui/AppText";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { useNews } from "@/src/hooks/useNews";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CommunityScreen() {
   const { data, isLoading, isError, error } = useNews();
   const [category, setCategory] = useState("all");

   // console.log(JSON.stringify(data, null, 2));

   const router = useRouter();

   if (isLoading) return <ActivityIndicator />;
   if (isError) return <Text>Error: {(error as Error).message}</Text>;

   const newsCategory = ["all", "politics", "sport", "entertainment", "business", "lifestyle", "crime"];

   return (
      <View style={{ backgroundColor: appColors.white }}>
         <SafeAreaView>
            <View className="px-4 pb-2">
               <AppText size="xxxxl" weight="extraBold">
                  Discover
               </AppText>
               <AppText size="lg">News from the comunity</AppText>
               <View>
                  <FlatList
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     data={newsCategory}
                     keyExtractor={(item) => item}
                     renderItem={({ item }) => (
                        <TouchableOpacity
                           onPress={() => setCategory(item)}
                           style={{
                              padding: 4,
                              paddingHorizontal: 18,
                              borderRadius: 100,
                              backgroundColor: category === item ? appColors.primary : "transparent",
                           }}
                        >
                           <AppText cap="capitalize" color={category === item ? appColors.white : appColors.lightGrey}>
                              {item}
                           </AppText>
                        </TouchableOpacity>
                     )}
                     contentContainerStyle={{ marginTop: 20 }}
                  />
               </View>
            </View>

            <FlatList
               data={data?.results || []}
               keyExtractor={(item) => item?.link}
               refreshing
               renderItem={({ item }) => (
                  <TouchableOpacity
                     onPress={() =>
                        router.push({
                           pathname: `/(app)/(tabs)/(news)/${item?.article_id}`,
                           params: {
                              item: JSON.stringify(item),
                           },
                        })
                     }
                     className="flex-row flex-1 items-center gap-3"
                  >
                     <Image
                        source={item?.image_url}
                        style={{ width: 80, height: 80, backgroundColor: "yellow", borderRadius: 10 }}
                     />
                     <View className="flex-1 gap-1">
                        {/* <AppText size="sm" color={appColors.lightGrey} cap="capitalize"> */}
                        <View className="flex-row gap-1">
                           {item?.category.map((cat: string) => (
                              <AppText size="sm" color={appColors.lightGrey} cap="capitalize">
                                 {cat}
                              </AppText>
                           ))}
                        </View>
                        {/* </AppText> */}
                        <AppText weight="semi">{item?.title}</AppText>
                        <View className="flex-row justify-between">
                           <AppText size="sm" color={appColors.lightGrey}>
                              {item?.source_name}
                           </AppText>
                           <AppText size="sm" color={appColors.lightGrey} align="right">
                              {dayjs(item?.pubDate).format("ddd DD MMM YYYY")}
                           </AppText>
                        </View>
                        <AppText size="sm" color={appColors.lightGrey}>
                           {item?.source_url.replace(/^https?:\/\//, "")}
                        </AppText>
                     </View>
                  </TouchableOpacity>
               )}
               contentContainerStyle={{ rowGap: 20, paddingHorizontal: wp(3), paddingBottom: 400 }}
            />
         </SafeAreaView>
      </View>
   );
}
