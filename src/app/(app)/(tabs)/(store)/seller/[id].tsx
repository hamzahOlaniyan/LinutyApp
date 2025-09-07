import Avatar from "@/src/components/Avatar";
import StoreCard from "@/src/components/store/StoreCard";
import AppText from "@/src/components/ui/AppText";
import Searchbar from "@/src/components/ui/Searchbar";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { getProfileById } from "@/src/Services/profiles";
import { getStoreProductByProfileId } from "@/src/Services/store";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

export default function seller() {
   const { id } = useLocalSearchParams<{ id: string }>();

   const {
      data: PRODUCTS,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["store"],
      queryFn: () => getStoreProductByProfileId(id),
   });

   const {
      data: SELLER,
      isLoading: sellerLoading,
      error: errorLoading,
   } = useQuery({
      queryKey: ["profile"],
      queryFn: () => getProfileById(id),
   });

   console.log("PRODUCTS", JSON.stringify(PRODUCTS, null, 2));
   console.log("SELLER", JSON.stringify(SELLER, null, 2));

   // if (SELLER) {
   //    const user = SELLER[0];

   return (
      <View style={{ backgroundColor: appColors.white }} className="flex-1">
         <FlatList
            data={PRODUCTS || []}
            renderItem={({ item }) => <StoreCard item={item} />}
            numColumns={2}
            scrollToOverflowEnabled
            columnWrapperStyle={{ gap: 10, marginVertical: 8 }}
            contentContainerStyle={{ marginTop: 10, flex: 1, paddingHorizontal: wp(3) }}
            ListHeaderComponent={
               <View>
                  <View style={{}}>
                     <View className="flex-row items-start gap-3 justify-between my-4">
                        <Avatar path={SELLER?.avatarUrl} />
                        <View className="w-full flex-1 gap-2">
                           <AppText weight="semi" cap="capitalize">
                              {SELLER?.firstName}
                           </AppText>
                           <View className="flex-row gap-1">
                              <AppText weight="med">10+</AppText>
                              <AppText weight="med">listings</AppText>
                           </View>
                        </View>
                     </View>
                     <View className="gap-6 pb-3 my-3">
                        <Searchbar placeholder="search item" />
                        <AppText weight="bold" cap="capitalize">
                           {SELLER?.firstName}'s listing
                        </AppText>
                     </View>
                  </View>
                  <AppText size="lg" weight="semi">
                     Latest Items
                  </AppText>
               </View>
            }
         />
      </View>
   );
}
