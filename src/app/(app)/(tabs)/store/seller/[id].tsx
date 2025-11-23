import Avatar from "@/components/Avatar";
import StoreCard from "@/components/store/StoreCard";
import AppText from "@/components/ui/AppText";
import Searchbar from "@/components/ui/Searchbar";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { Store } from "@/icons/ico/store";
import { getProfileById } from "@/Services/db/profiles";
import { getStoreProductByProfileId } from "@/Services/db/store";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SellerDetails() {
   const { id } = useLocalSearchParams<{ id: string }>();

   const { bottom } = useSafeAreaInsets();

   const {
      data: PRODUCTS,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["store", id],
      queryFn: () => getStoreProductByProfileId(id.trim()),
      enabled: !!id,
   });

   const {
      data: SELLER,
      isLoading: sellerLoading,
      error: errorLoading,
   } = useQuery({
      queryKey: ["profile"],
      queryFn: () => getProfileById(id),
   });

   const fullName = `${SELLER?.firstName}  ${SELLER?.lastName}`;

   return (
      <FlatList
         ListHeaderComponent={
            <View style={{ backgroundColor: appColors.white }}>
               <View className="flex-row items-center gap-6 justify-between">
                  <Avatar path={SELLER?.avatarUrl} size={100} />
                  <View className="w-full flex-1 gap-3">
                     <View>
                        <AppText weight="semi" size="xxl" cap="capitalize">
                           {fullName}
                        </AppText>
                        <AppText color={appColors.secondary}>@{SELLER?.username}</AppText>
                     </View>
                     <View className="flex-row gap-1 items-center">
                        <AppText color={appColors.secondary} weight="med">
                           {(PRODUCTS?.length ?? 0) - 1} + listings
                        </AppText>
                        <Store color={appColors.secondary} size={20} />
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
                  </View>
               </View>
            </View>
         }
         data={PRODUCTS || []}
         renderItem={({ item }) => <StoreCard item={item} isLoading={sellerLoading} />}
         numColumns={2}
         columnWrapperStyle={{ gap: 10 }}
         contentContainerStyle={{
            paddingHorizontal: wp(3),
            backgroundColor: appColors.whitesmoke,
            marginBottom: bottom,
            paddingBottom: 200,
         }}
      />
   );
}
