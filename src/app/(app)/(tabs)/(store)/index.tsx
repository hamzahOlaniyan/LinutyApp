import { MenuIcon } from "@/assets/icons/MenuIcon";
import { Plus } from "@/assets/icons/plus";
import { Search2 } from "@/assets/icons/search2";
import FeaturedCard from "@/src/components/store/FeaturedCard";
import StoreCard from "@/src/components/store/StoreCard";
import SuggestedProducts from "@/src/components/store/SuggestedProducts";
import AppText from "@/src/components/ui/AppText";
import Button from "@/src/components/ui/Button";
import { CustomBottomSheet } from "@/src/components/ui/CustomBottomSheet";
import ScreenHeader from "@/src/components/ui/ScreenHeader";
import Searchbar from "@/src/components/ui/Searchbar";
import { appColors } from "@/src/constant/colors";
import { getStoreProduct } from "@/src/Services/store";
import BottomSheet from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, FlatList, RefreshControl, View } from "react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ProductCategory } from "./new-product";

export default function StorePage() {
   const [searchCategory, setSearchCategory] = useState("");
   const [showSearchBar, setShowSearchBar] = useState(false);
   const [searchText, setSearchText] = useState("");

   const [refreshing, setRefreshing] = useState<boolean>(false);

   const router = useRouter();
   const bottomSheetRef = useRef<BottomSheet>(null);
   const { bottom } = useSafeAreaInsets();

   const {
      data: PRODUCT,
      isLoading,
      isFetching,
      refetch,
   } = useQuery({
      queryKey: ["store"],
      queryFn: async () => getStoreProduct(),
   });

   // console.log(JSON.stringify(PRODUCT, null, 2));

   const height = useSharedValue(0);
   const opacity = useSharedValue(0);

   useEffect(() => {
      height.value = withTiming(showSearchBar ? 50 : 0, { duration: 300 });
      opacity.value = withTiming(showSearchBar ? 1 : 0, { duration: 300 });
   }, [showSearchBar]);

   const animatedStyle = useAnimatedStyle(() => {
      return {
         height: height.value,
         opacity: opacity.value,
      };
   });

   const handleOpenSheet = () => bottomSheetRef.current?.expand();

   const onRefresh = useCallback(async () => {
      setRefreshing(true);
   }, [, refreshing, setRefreshing]);

   return (
      <View style={{ backgroundColor: appColors.white, flex: 1 }}>
         <SafeAreaView style={{ marginBottom: bottom, flex: 1 }}>
            <View className=" pb-2 px-4 gap-2">
               <ScreenHeader
                  headerTitle="Comunity Store"
                  leftAction={
                     <Search2 size={28} color={appColors.black} onPress={() => setShowSearchBar(!showSearchBar)} />
                  }
               />
               <View className="flex-row justify-between gap-2 items-center">
                  <Button
                     onPress={() => handleOpenSheet()}
                     variant="secondary"
                     size="sm"
                     text="Category"
                     icon={<MenuIcon size={20} />}
                     className="flex-1"
                  />
                  <Button
                     size="sm"
                     onPress={() => router.push("/new-product")}
                     icon={<Plus size={28} />}
                     className="flex-1"
                     style={{ backgroundColor: "red" }}
                     variant="outline"
                  />
               </View>
               {showSearchBar && (
                  <Animated.View style={animatedStyle} className="mt-1 mb-3">
                     <Searchbar
                        placeholder="search..."
                        value={searchText}
                        onChangeText={setSearchText}
                        onPress={() => setSearchText("")}
                     />
                  </Animated.View>
               )}
            </View>

            <FlatList
               ListHeaderComponent={
                  <>
                     <View style={{ backgroundColor: appColors.lightOlive }}>
                        <View className="px-4 mt-4">
                           <AppText size="lg" weight="bold">
                              Featured
                           </AppText>
                        </View>
                        <FlatList
                           horizontal
                           showsHorizontalScrollIndicator={false}
                           data={PRODUCT || []}
                           renderItem={({ item }) => <FeaturedCard item={item} isLoading={isLoading} />}
                           contentContainerStyle={{ gap: 10, padding: 10 }}
                        />
                     </View>
                     <View className="p-4">
                        <AppText size="lg" weight="bold">
                           Latest
                        </AppText>
                     </View>
                     <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={PRODUCT || []}
                        numColumns={2}
                        renderItem={({ item }) => <SuggestedProducts item={item} isLoading={isLoading} />}
                        columnWrapperStyle={{ gap: 10, margin: 8 }}
                        contentContainerStyle={{ gap: 10, padding: 10, backgroundColor: appColors.whitesmoke }}
                     />
                  </>
               }
               data={PRODUCT || []}
               renderItem={({ item }) => <StoreCard item={item} isLoading={isLoading} />}
               numColumns={2}
               scrollEnabled
               showsVerticalScrollIndicator={false}
               removeClippedSubviews
               refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} colors={["#22c55e"]} />}
               refreshing={refreshing}
               onRefresh={onRefresh}
               bounces
               alwaysBounceVertical
               overScrollMode="always"
               columnWrapperStyle={{ gap: 10, marginVertical: 8 }}
               contentContainerStyle={{ paddingBottom: 100, backgroundColor: appColors.whitesmoke }}
            />

            <Portal hostName="root">
               <CustomBottomSheet
                  ref={bottomSheetRef}
                  title="Search category"
                  children={
                     <View>
                        <Searchbar placeholder="search..." onChangeText={(value: string) => setSearchCategory(value)} />
                        <FlatList
                           data={ProductCategory.filter((item) =>
                              item.toLowerCase().includes(searchCategory.toLowerCase())
                           )}
                           showsHorizontalScrollIndicator={false}
                           renderItem={({ item }) => (
                              <AppText size="lg" weight="med" cap="capitalize">
                                 {item}
                              </AppText>
                           )}
                           contentContainerStyle={{
                              rowGap: 10,
                              marginTop: 15,
                              paddingBottom: 100,
                           }}
                        />
                     </View>
                  }
               />
            </Portal>
         </SafeAreaView>
      </View>
   );
}
