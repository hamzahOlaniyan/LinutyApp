import NotificationCard from "@/components/notification/NotificationCard";
import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { getNotfication } from "@/Services/db/Notification";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { FlatList, View } from "react-native";

export default function Notification() {
   const { profile } = useAuthStore();

   const { data: notifications, error } = useQuery({
      queryKey: ["notification", profile?.id],
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
               {notifications?.length === 0 && (
                  <View className="px-5">
                     <AppText color={appColors.grey}>NEW</AppText>
                  </View>
               )}
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
