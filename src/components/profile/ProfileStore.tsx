import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { getStoreProductByProfileId } from "@/Services/db/store";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import StoreCard from "../store/StoreCard";
import AppText from "../ui/AppText";

export default function ProfileStore() {
   const { profile } = useAuthStore();

   const [refreshing, setRefreshing] = useState<boolean>(false);

   const {
      data: PRODUCTS,
      isFetching,
      refetch,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["store", profile?.id],
      queryFn: () => getStoreProductByProfileId(profile?.id.trim()),
      enabled: !!profile?.id,
   });

   console.log(JSON.stringify(PRODUCTS, null, 2));

   const onRefresh = useCallback(async () => {
      setRefreshing(true);
   }, [refreshing, setRefreshing]);

   return (
      <View style={{ paddingHorizontal: wp(4) }}>
         {PRODUCTS?.length === 0 && <AppText>You have no products in you store</AppText>}

         {/* <ScrollView
            className="bg-red-400"
            refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} colors={["#22c55e"]} />}
         >
            {PRODUCTS?.map((item, i) => (
               <StoreCard key={i} item={item} isLoading={false} />
            ))}
         </ScrollView> */}

         <FlatList
            data={PRODUCTS || []}
            renderItem={({ item }) => <StoreCard item={item} isLoading={false} />}
            numColumns={2}
            columnWrapperStyle={{ gap: 10 }}
            removeClippedSubviews
            refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} colors={["#22c55e"]} />}
            refreshing={refreshing}
            onRefresh={onRefresh}
            overScrollMode="always"
            scrollEnabled
            showsVerticalScrollIndicator={false}
            bounces
            alwaysBounceVertical
            contentContainerStyle={{
               backgroundColor: appColors.whitesmoke,
               paddingBottom: 200,
            }}
         />
      </View>
   );
}
