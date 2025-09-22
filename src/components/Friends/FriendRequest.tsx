import { appColors } from "@/src/constant/colors";
import { hp } from "@/src/constant/common";
import { TimeAgo } from "@/src/hooks/timeAgo";
import { acceptFriendRequest, getRequests, rejectFriendRequest } from "@/src/Services/relationships";
import { useAuthStore } from "@/src/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TouchableOpacity, View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";

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

   const rejectRequest = useMutation({
      mutationFn: async ({ id }: { id: string }) => rejectFriendRequest({ id, currentUserId: profile?.id }),
      onMutate: async ({ id }) => {
         await queryClient.cancelQueries({ queryKey: ["relationships", profile?.id] });
         const previous = queryClient.getQueryData(["relationships", profile?.id]);
         queryClient.setQueryData(["relationships", profile?.id], {
            requester: profile?.id,
            receiver: id,
            status: "pending",
         });

         return { previous };
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["relationships", profile?.id] }),
      onError: async (_err, _variables, context) => {
         if (context?.previous) {
            queryClient.setQueryData(["relationships", profile?.id], context.previous);
         }
         console.error(" ❌ friend rejected", _err);
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ["relationships", profile?.id] });
      },
   });

   if (isLoading) return <AppText>Loading...</AppText>;
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
                        <TouchableOpacity
                           onPress={() => acceptRequest.mutate({ id: item?.id })}
                           style={{
                              backgroundColor: appColors.searchBar,
                              minWidth: 130,
                              height: hp(4),
                              paddingHorizontal: 8,
                              borderRadius: 50,
                              alignItems: "center",
                              justifyContent: "center",
                           }}
                        >
                           <AppText size="sm" weight="med">
                              Accept
                           </AppText>
                        </TouchableOpacity>

                        <TouchableOpacity
                           onPress={() => rejectRequest.mutate({ id: item?.id })}
                           style={{
                              borderWidth: 1.5,
                              minWidth: 130,
                              height: hp(4),
                              paddingHorizontal: 8,
                              borderRadius: 50,
                              alignItems: "center",
                              justifyContent: "center",
                           }}
                        >
                           <AppText size="sm" weight="med">
                              Reject
                           </AppText>
                        </TouchableOpacity>
                     </View>
                  </View>
               </View>
            ))}
         </View>
      </View>
   );
}
