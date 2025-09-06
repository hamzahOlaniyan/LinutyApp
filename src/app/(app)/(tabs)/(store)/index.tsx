// import { wp } from "@/src/common";
// import BottomSheet from "@/src/components/BottomSheet";
// import ScreenHeader from "@/src/components/ScreenHeader";
// import ScreenWrapper from "@/src/components/ScreenWrapper";
// import StoreCard from "@/src/components/Store/StoreCard";
import { Plus } from "@/assets/icons/plus";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import AppText from "@/src/components/ui/AppText";
import Button from "@/src/components/ui/Button";
import Searchbar from "@/src/components/ui/Searchbar";
// import { ProductInput } from "@/src/types/types";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
// import { ProductCategory } from "./new-product";

export default function StorePage() {
   const [showCategory, setShowCategory] = useState(false);

   const router = useRouter();

   // const { data } = useQuery<ProductInput>({
   //    queryKey: ["store"],
   //    queryFn: async () => getStoreProduct(),
   // });

   return (
      <ScreenWrapper paddingHorizontal={3}>
         <View className="gap-4">
            <View className="flex-row justify-between">
               <AppText weight="bold" size="xxxl">
                  Store
               </AppText>
               <View className="flex-row gap-6">
                  <Button variant="secondary" size="xs" text="Category" />
                  <Button size="xs" onPress={() => router.push("/new-product")}>
                     <Plus size={24} />
                  </Button>
               </View>
            </View>
            <Searchbar onPress={() => ""} />
         </View>
         {/* <View style={{ paddingHorizontal: wp(3) }} className="gap-2"> */}
         {/* <View className="flex-row justify-between items-center">
               {/* <ScreenHeader headerTitle="Store place" /> */}
         {/* <View className="flex-row gap-4"> */}
         {/* <Button title="Category" onPress={() => setShowCategory(true)} size="sm" /> */}
         {/* <Button
                     title="Sell"
                     size="sm"
                     onPress={() => router.push("/(protected)/(tabs)/(market)/new-product")}
                  /> */}
         {/* </View> */}
         {/* </View>  */}
         {/* <View className="pb-3">
              
            </View> */}
         {/* </View> */}
         {/* <FlatList
            data={data || []}
            renderItem={({ item }) => <StoreCard item={item} />}
            numColumns={2}
            scrollToOverflowEnabled
            columnWrapperStyle={{ gap: 3, marginBottom: 8, marginTop: 8 }}
            ListHeaderComponent={
               <View style={{ paddingHorizontal: wp(3) }} className="gap-6">
                  <AppText weight="bold">Latest Items</AppText>
               </View>
            }
         /> */}
         {/* <BottomSheet
            isOpen={showCategory}
            onClose={() => setShowCategory(false)}
            heading="category"
            children={
               <View style={{ paddingHorizontal: wp(3) }}>
                  <Searchbar />
                  <FlatList
                     data={ProductCategory}
                     renderItem={({ item }) => (
                        <AppText size="lg" weight="semi" cap="capitalize">
                           {item}
                        </AppText>
                     )}
                     contentContainerStyle={{ rowGap: 10, marginTop: 10 }}
                  />
               </View>
            }
         /> */}
      </ScreenWrapper>
   );
}
