import { Store } from "@/assets/icons/store";
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

   // console.log("PRODUCTS", JSON.stringify(PRODUCTS, null, 2));
   // console.log("SELLER", JSON.stringify(SELLER, null, 2));

   return (
      <View style={{ backgroundColor: appColors.white }} className="flex-1">
         <FlatList
            data={PRODUCTS || []}
            renderItem={({ item }) => <StoreCard item={item} />}
            numColumns={2}
            scrollToOverflowEnabled
            columnWrapperStyle={{ gap: 10 }}
            contentContainerStyle={{ flex: 1, paddingHorizontal: wp(3) }}
            ListHeaderComponent={
               <View style={{}}>
                  <View className="flex-row items-start gap-3 justify-between">
                     <Avatar path={SELLER?.avatarUrl} size={60} />
                     <View className="w-full flex-1">
                        <AppText weight="semi" size="xxl" cap="capitalize">
                           {SELLER?.firstName}
                           {SELLER?.lastName}
                        </AppText>
                        <AppText weight="semi" color={appColors.grey}>
                           @{SELLER?.username}
                        </AppText>
                        <View className="flex-row gap-1 items-center">
                           <AppText color={appColors.grey} weight="med">
                              {(PRODUCTS?.length ?? 0) - 1} + listings
                           </AppText>
                           <Store color={appColors.grey} size={20} />
                        </View>
                     </View>
                  </View>

                  <View className="gap-6 pb-3 my-3">
                     <Searchbar placeholder="search item" />
                     <View className="flex-row justify-between items-end">
                        <View className="flex-row -gap-2">
                           <AppText size="lg" weight="semi" cap="capitalize">
                              {SELLER?.firstName}
                           </AppText>
                           <AppText size="lg" weight="semi">
                              's listing
                           </AppText>
                        </View>
                        <AppText size="lg" weight="semi">
                           Latest Items
                        </AppText>
                     </View>
                  </View>
               </View>
            }
         />
      </View>
   );
}
