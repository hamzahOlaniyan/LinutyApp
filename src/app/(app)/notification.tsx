import NotificationCard from "@/src/components/notification/NotificationCard";
import AppText from "@/src/components/ui/AppText";
import { appColors } from "@/src/constant/colors";
import { getNotfication } from "@/src/Services/Notification";
import { useAuthStore } from "@/src/store/authStore";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, View } from "react-native";

export default function Notification() {
   const { profile } = useAuthStore();

   const { data: notifications, error } = useQuery({
      queryKey: ["notification"],
      queryFn: async () => getNotfication(profile?.id),
   });

   return (
      <View
         style={{
            backgroundColor: appColors.white,
            flex: 1,
         }}
      >
         {notifications?.length === 0 && (
            <View className="px-5">
               <AppText weight="med">You have no notifications</AppText>
            </View>
         )}
         <View>
            <View className="gap-4">
               <View className="px-5">
                  <AppText color={appColors.grey}>NEW</AppText>
               </View>
               <FlatList
                  data={notifications}
                  scrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => <NotificationCard item={item} />}
               />
            </View>
         </View>
      </View>
   );
}
