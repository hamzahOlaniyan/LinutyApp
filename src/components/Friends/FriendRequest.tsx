import { getRequests } from "@/Services/db/relationships";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import AppText from "../ui/AppText";
import FriendRequestCard from "./FriendRequestCard";
import FriendsRequestSkeletion from "./FriendsRequestSkeletion";

export default function FriendRequest() {
   const { profile } = useAuthStore();

   const { data: REQUESTS, isLoading } = useQuery({
      queryKey: ["friendRequests", profile?.id],
      queryFn: async () => getRequests({ receiver: profile?.id }),
      enabled: !!profile?.id,
   });

   if (isLoading) return <FriendsRequestSkeletion />;
   if (!REQUESTS?.length)
      return (
         <View className="px-4">
            <AppText weight="med">No friend request</AppText>
         </View>
      );

   return (
      <View>
         <View className="px-4">
            <AppText size="xxl" weight="semi">
               {REQUESTS?.length} friend request
            </AppText>
         </View>
         <View>
            {REQUESTS?.map((item) => (
               <FriendRequestCard key={item?.id} item={item} />
            ))}
         </View>
      </View>
   );
}
