import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import { acceptFriendRequest, rejectFriendRequest } from "@/Services/db/relationships";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";

export default function FriendRequestCard({ item }: { item: any }) {
   const { profile } = useAuthStore();
   const queryClient = useQueryClient();

   const router = useRouter();

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

   return (
      <View key={item?.id} className="flex-row flex-1 gap-3 p-4 w-full">
         {/* <TouchableOpacity onPress={() => router.push(`/(user)/${item?.requester?.id}`)}> */}
         <Avatar path={item?.requester?.avatarUrl} size={100} />
         {/* </TouchableOpacity> */}
         <View className="flex-1 gap-2">
            <View className="flex-row items-start justify-between">
               <View>
                  <AppText size="xl" weight="semi" cap="capitalize">
                     {item?.requester?.firstName}
                     {item?.requester?.lastName}{" "}
                  </AppText>
                  <AppText>@{item?.requester?.username}</AppText>
               </View>
               <AppText color={appColors.lightGrey} size="xxs" className="">
                  {dayjs(item?.created_at).fromNow(true)}
               </AppText>
            </View>
            <View
               style={{ borderTopColor: appColors.bordersLight, borderTopWidth: 0.5, paddingTop: 12 }}
               className="flex-row gap-4 flex-1"
            >
               <TouchableOpacity
                  onPress={() => acceptRequest.mutate({ id: item?.id })}
                  style={{
                     backgroundColor: appColors.searchBar,
                     minWidth: 130,
                     height: hp(4.5),
                     paddingHorizontal: 8,
                     borderRadius: 50,
                     alignItems: "center",
                     justifyContent: "center",
                     flex: 1,
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
                     height: hp(4.5),
                     paddingHorizontal: 8,
                     borderRadius: 50,
                     alignItems: "center",
                     justifyContent: "center",
                     flex: 1,
                  }}
               >
                  <AppText size="sm" weight="med">
                     Reject
                  </AppText>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
}
