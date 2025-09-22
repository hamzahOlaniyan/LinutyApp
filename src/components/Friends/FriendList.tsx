import { deleteFriendRequest, getFriends } from "@/src/Services/relationships";
import { useAuthStore } from "@/src/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";
import Button from "../ui/Button";

export default function FriendList() {
   const { profile } = useAuthStore();
   const queryClient = useQueryClient();

   const {
      data: FRIENDS,
      error,
      isLoading,
   } = useQuery({
      queryKey: ["friendRequests", profile?.id],
      queryFn: async () => getFriends({ currentUserId: profile?.id }),
      enabled: !!profile?.id,
   });

   const unfriend = useMutation({
      mutationFn: async ({ id }: { id: string }) => deleteFriendRequest({ id, currentUserId: profile?.id }),
      onSuccess: () => {
         console.log("unfriended 💔");
         queryClient.invalidateQueries({ queryKey: ["relationships", profile?.id] });
      },
   });

   if (isLoading) return <AppText>Loading...</AppText>;
   if (!FRIENDS?.length)
      return (
         <View className="px-4">
            <AppText>You have no friends</AppText>
         </View>
      );

   const filteredList = (FRIENDS || []).map((f: any) => (f.requester?.id === profile?.id ? f.receiver : f.requester));

   // console.log(JSON.stringify(FRIENDS, null, 2));

   return (
      <View className="gap-5 p-4">
         {filteredList?.map((item: any, idx: number) => (
            <View key={item?.id} className="flex-row gap-3 items-start">
               <Avatar path={item?.avatarUrl} size={60} />
               <View className="flex-1">
                  <AppText size="xl" weight="semi" cap="capitalize">
                     {item?.firstName}
                     {item?.lastName}
                  </AppText>
                  <AppText size="lg">@{item?.username}</AppText>
               </View>
               <Button text="Unfriend" onPress={() => unfriend.mutate({ id: item?.id })} />
            </View>
         ))}
      </View>
   );
}
