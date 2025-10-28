import SurgestionCard from "@/src/components/Friends/SurgestionCard";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { getProfiles } from "@/src/Services/profiles";
import { useAuthStore } from "@/src/store/authStore";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Dimensions, FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function suggested() {
   const { profile } = useAuthStore();
   const { width: screenWidth } = Dimensions.get("screen");

   const { bottom } = useSafeAreaInsets();

   const {
      data: PROFILES,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["profile"],
      queryFn: () => getProfiles(profile?.id),
   });
   return (
      <View style={{ backgroundColor: appColors.white, flex: 1, marginBottom: bottom }}>
         <FlatList
            data={PROFILES?.data}
            keyExtractor={(item, index) => item.id ?? `feed-${index}`}
            renderItem={({ item }) => (
               <SurgestionCard
                  key={item?.id}
                  id={item?.id}
                  avatar={item?.avatarUrl}
                  firstName={item?.firstName.trim()}
                  lastName={item?.lastName.trim()}
                  username={item?.username}
               />
            )}
            contentContainerStyle={{
               rowGap: 16,
               paddingHorizontal: wp(2),
            }}
            showsVerticalScrollIndicator={false}
            maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
            contentInsetAdjustmentBehavior="automatic"
            removeClippedSubviews
            numColumns={2}
            columnWrapperStyle={{ gap: 12 }}
            bounces
            alwaysBounceVertical
            overScrollMode="always"
         />
      </View>
   );
}
