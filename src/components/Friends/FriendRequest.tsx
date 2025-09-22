import { appColors } from "@/src/constant/colors";
import { TimeAgo } from "@/src/hooks/timeAgo";
import { acceptFriendRequest, getRequests } from "@/src/Services/relationships";
import { useAuthStore } from "@/src/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";
import Button from "../ui/Button";

export default function FriendRequest() {
   const { profile } = useAuthStore();
   const queryClient = useQueryClient();

   const { data: REQUESTS, isLoading } = useQuery({
      queryKey: ["friendRequests", profile?.id],
      queryFn: async () => getRequests({ receiver: profile?.id }),
      enabled: !!profile?.id,
   });

   const acceptRequest = useMutation({
      mutationFn: async ({ id }: { id: string }) => acceptFriendRequest({ id, currentUserId: profile?.id }),
      onSuccess: async (data) => {
         console.log("✅friend request acceptes 👍🏾");
         queryClient.invalidateQueries({ queryKey: ["relationships", profile?.id] });
         queryClient.invalidateQueries({ queryKey: ["friendRequests", profile?.id] });
      },
      onError: (error: any) => console.error(" ❌ friend accepted fail", error),
   });

   if (isLoading) return <AppText>Loading...</AppText>;
   if (!REQUESTS?.length) return <AppText>No friend requests</AppText>;

   return (
      <View>
         <View className="px-4">
            <AppText size="xxl" weight="semi">
               {REQUESTS.length} friend request
            </AppText>
         </View>
         <View>
            {REQUESTS?.map((item) => (
               <View key={item?.id} className="flex-row flex-1 gap-3 p-4 w-full">
                  <Avatar path={item?.requester?.avatarUrl} size={100} />
                  <View className="flex-1 gap-2">
                     <View className="flex-row items-start justify-between">
                        <View>
                           <AppText size="lg" weight="semi" cap="capitalize">
                              {item?.requester?.firstName}
                              {item?.requester?.lastName}{" "}
                           </AppText>
                           <AppText weight="light" color={appColors.grey}>
                              @{item?.requester?.username}
                           </AppText>
                        </View>
                        <View>{TimeAgo(item?.created_at)}</View>
                     </View>
                     <View className="flex-row gap-4">
                        <Button
                           size="sm"
                           text="Accept"
                           className="flex-1"
                           onPress={() => acceptRequest.mutate({ id: item?.id })}
                        />
                     </View>
                  </View>
               </View>
            ))}
         </View>
      </View>
   );
}
