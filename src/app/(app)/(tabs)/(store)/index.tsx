import { CategoryIcon } from "@/assets/icons/categoryIcon";
import { Plus } from "@/assets/icons/plus";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import StoreCard from "@/src/components/store/StoreCard";
import AppText from "@/src/components/ui/AppText";
import BottomSheet from "@/src/components/ui/BottomSheet";
import Button from "@/src/components/ui/Button";
import Searchbar from "@/src/components/ui/Searchbar";
import { wp } from "@/src/constant/common";
import { getStoreProduct } from "@/src/Services/store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { ProductCategory } from "./new-product";

export default function StorePage() {
   const [showCategory, setShowCategory] = useState(false);
   const [searchCategory, setSearchCategory] = useState("");

   const router = useRouter();

   console.log(searchCategory);

   const { data: PRODUCT } = useQuery({
      queryKey: ["store"],
      queryFn: async () => getStoreProduct(),
   });

   return (
      <ScreenWrapper paddingHorizontal={3}>
         <View className="gap-4 my-2">
            <View className="flex-row justify-between">
               <AppText weight="bold" size="xxxl">
                  Store
               </AppText>
               <View className="flex-row gap-6">
                  <Button
                     onPress={() => setShowCategory(true)}
                     variant="secondary"
                     size="sm"
                     text="Category"
                     icon={<CategoryIcon size={20} />}
                  />
                  <Button size="sm" onPress={() => router.push("/new-product")} icon={<Plus size={24} />} />
               </View>
            </View>
            <Searchbar onPress={() => ""} />
         </View>
         <FlatList
            data={PRODUCT || []}
            renderItem={({ item }) => <StoreCard item={item} />}
            numColumns={2}
            scrollToOverflowEnabled
            columnWrapperStyle={{ gap: 10, marginVertical: 8 }}
            contentContainerStyle={{ marginTop: 10, flex: 1 }}
            ListHeaderComponent={
               <AppText size="lg" weight="semi">
                  Latest Items
               </AppText>
            }
         />
         <BottomSheet
            isOpen={showCategory}
            onClose={() => setShowCategory(false)}
            heading="category"
            children={
               <View style={{ paddingHorizontal: wp(3) }}>
                  <Searchbar placeholder="search category" onChangeText={(value: string) => setSearchCategory(value)} />
                  <FlatList
                     data={ProductCategory.filter((item) => item.toLowerCase().includes(searchCategory.toLowerCase()))}
                     renderItem={({ item }) => (
                        <AppText size="lg" weight="semi" cap="capitalize">
                           {item}
                        </AppText>
                     )}
                     contentContainerStyle={{ rowGap: 10, marginTop: 10 }}
                  />
               </View>
            }
         />
      </ScreenWrapper>
   );
}
