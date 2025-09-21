import NotificationCard from "@/src/components/notification/NotificationCard";
import AppText from "@/src/components/ui/AppText";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { getNotfication } from "@/src/Services/Notification";
import { useAuthStore } from "@/src/store/authStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

export default function Notification() {
   const { profile } = useAuthStore();

   const router = useRouter();
   const queryClient = useQueryClient();

   const { data: notifications, error } = useQuery({
      queryKey: ["notification"],
      queryFn: async () => getNotfication(profile?.id),
   });

   // console.log("notifications", JSON.stringify(notifications, null, 2));

   return (
      <View
         style={{
            paddingHorizontal: wp(4),
            backgroundColor: appColors.white,
            flex: 1,
            paddingTop: 10,
            gap: 10,
         }}
      >
         {notifications?.length === 0 ? (
            <AppText weight="med">You have no notifications</AppText>
         ) : (
            <View className="gap-4">
               <AppText color={appColors.grey}>NEW</AppText>
               <FlatList
                  data={notifications}
                  renderItem={({ item }) => <NotificationCard item={item} />}
                  contentContainerStyle={{ rowGap: 10 }}
               />
            </View>
         )}
      </View>
   );
}
