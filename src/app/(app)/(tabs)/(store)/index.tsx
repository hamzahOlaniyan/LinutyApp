import { MenuIcon } from "@/assets/icons/MenuIcon";
import { Plus } from "@/assets/icons/plus";
import { Search2 } from "@/assets/icons/search2";
import StoreCard from "@/src/components/store/StoreCard";
import AppText from "@/src/components/ui/AppText";
import Button from "@/src/components/ui/Button";
import { CustomBottomSheet } from "@/src/components/ui/CustomBottomSheet";
import Searchbar from "@/src/components/ui/Searchbar";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { getStoreProduct } from "@/src/Services/store";
import BottomSheet from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCategory } from "./new-product";

export default function StorePage() {
   const [searchCategory, setSearchCategory] = useState("");
   const [showSearchBar, setShowSearchBar] = useState(false);
   const [searchText, setSearchText] = useState("");

   const router = useRouter();
   const bottomSheetRef = useRef<BottomSheet>(null);

   const { data: PRODUCT } = useQuery({
      queryKey: ["store"],
      queryFn: async () => getStoreProduct(),
   });

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

   // const handleCloseSheet = () => bottomSheetRef.current?.close();
   const handleOpenSheet = () => bottomSheetRef.current?.expand();
   // const snapToIndex = (idx: number) => bottomSheetRef.current?.snapToIndex(idx);

   return (
      <View style={{ backgroundColor: appColors.white }}>
         <SafeAreaView>
            <View style={{ paddingHorizontal: wp(3) }} className="my-2">
               <View className="flex-row justify-between items-center">
                  <AppText weight="extraBold" size="xxl">
                     Comunity Store
                  </AppText>
                  <View className="flex-row gap-1 items-center">
                     <TouchableOpacity onPress={() => setShowSearchBar(!showSearchBar)}>
                        <Search2 size={28} />
                     </TouchableOpacity>
                     <Button
                        onPress={() => handleOpenSheet()}
                        variant="secondary"
                        size="sm"
                        text="Category"
                        icon={<MenuIcon />}
                     />
                     <Button size="sm" onPress={() => router.push("/new-product")} icon={<Plus size={24} />} />
                  </View>
               </View>
               {showSearchBar && (
                  <Animated.View style={animatedStyle} className="mt-3">
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
                           data={PRODUCT || []}
                           renderItem={({ item }) => (
                              <View
                                 style={{
                                    backgroundColor: appColors.white,
                                    borderRadius: 10,
                                    width: 175,
                                 }}
                              >
                                 <Image
                                    source={item?.images[0]}
                                    style={{
                                       aspectRatio: 1,
                                       borderRadius: 10,
                                       backgroundColor: "white",
                                    }}
                                    contentPosition="center"
                                 />
                                 <View
                                    style={{
                                       padding: 10,
                                    }}
                                 >
                                    <AppText weight="med" cap="capitalize">
                                       {item?.name.trim()}
                                    </AppText>
                                    <AppText size="sm" cap="capitalize">
                                       {Intl.NumberFormat("en-UK", { style: "currency", currency: "GBP" }).format(
                                          item?.price
                                       )}
                                    </AppText>
                                 </View>
                              </View>
                           )}
                           contentContainerStyle={{ gap: 10, padding: 10 }}
                        />
                     </View>
                     <View className="p-4">
                        <AppText size="lg" weight="bold">
                           Latest
                        </AppText>
                     </View>
                  </>
               }
               data={PRODUCT || []}
               renderItem={({ item }) => <StoreCard item={item} />}
               numColumns={2}
               decelerationRate={0.8}
               scrollEnabled
               showsVerticalScrollIndicator={false}
               columnWrapperStyle={{ gap: 10, marginVertical: 8, paddingHorizontal: wp(3) }}
               contentContainerStyle={{ paddingBottom: 200 }}
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
                           contentContainerStyle={{ rowGap: 10, marginTop: 15 }}
                        />
                     </View>
                  }
               />
            </Portal>
         </SafeAreaView>
      </View>
   );
}
