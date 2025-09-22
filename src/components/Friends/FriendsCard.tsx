import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
// import { TiktokFont } from "../assets/fonts/FontFamily";
// import { hp } from "../common";
// import { colors } from "../constant/colors";
// import { useAuthStore } from "../context/authStore";
// import { useThemeStore } from "../context/themeStore";
// import { createNotification } from "../Services/Notification";
// import { deleteFriendRequest, sendFriendRequest } from "../Services/relationships";
import { appColors } from "@/src/constant/colors";
import {
   acceptFriendRequest,
   deleteFriendRequest,
   getFriendship,
   rejectFriendRequest,
   sendFriendRequest,
} from "@/src/Services/relationships";
import { useAuthStore } from "@/src/store/authStore";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";
import Button from "../ui/Button";

type FriendsCardProps = {
   id: string;
   avatar: string;
   name: string;
   username: string;
};

export default function FriendsCard({ id, avatar, name, username }: FriendsCardProps) {
   const { profile } = useAuthStore();
   const queryClient = useQueryClient();

   const [relationship, setRelationship] = useState<any>(null);

   const { data: RELATIONSHIP_DATA } = useQuery({
      queryKey: ["relationships", profile?.id, id],
      queryFn: async () => getFriendship({ requester: profile?.id, receiver: id }),
   });

   useEffect(() => {
      setRelationship(RELATIONSHIP_DATA);
   }, [RELATIONSHIP_DATA]);

   const sendRequest = useMutation({
      mutationFn: async () => sendFriendRequest({ requester: profile?.id, receiver: id }),
      onSuccess: async () => {
         console.log("✅friend request sent");
         queryClient.invalidateQueries({ queryKey: ["relationships", profile?.id, id] });
      },
      onError: (error: any) => console.error(" ❌ friend request fail", error),
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
      mutationFn: async () => rejectFriendRequest({ id: relationship?.id, receiver: profile?.id }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["relationships", profile?.id, id] }),
   });

   const unfriend = useMutation({
      mutationFn: async ({ id }: { id: string }) => deleteFriendRequest({ id, currentUserId: profile?.id }),
      onSuccess: () => {
         console.log("unfriended 💔");
         queryClient.invalidateQueries({ queryKey: ["relationships", profile?.id] });
      },
   });

   let button = <Button text="Add Friend" size="xs" onPress={() => sendRequest.mutate()} />;

   if (relationship) {
      if (relationship.status === "pending") {
         if (relationship.relationship === profile?.id) {
            button = (
               <Button
                  text="Cancel Request"
                  size="xs"
                  onPress={() => unfriend.mutate({ id: relationship.receiver?.id })}
               />
            );
         } else if (relationship.receiver === profile?.id) {
            button = (
               <View style={{ flexDirection: "row", gap: 8 }}>
                  <Button
                     text="Accept"
                     size="xs"
                     onPress={() => acceptRequest.mutate({ id: relationship?.relationship.id })}
                  />
                  <Button text="Reject" size="xs" onPress={() => rejectRequest.mutate()} />
               </View>
            );
         }
      } else if (relationship.status === "accepted") {
         button = (
            <Button text="Unfriend" size="xs" onPress={() => unfriend.mutate({ id: relationship.receiver?.id })} />
         );
      }
   }

   return (
      <View className="flex-row flex-1 justify-between items-start">
         <View className="flex-row flex-1 gap-3 items-start">
            <Avatar path={avatar} size={45} />
            <View>
               <AppText weight="semi" cap="capitalize">
                  {name}
               </AppText>
               <AppText size="sm" weight="light" color={appColors.grey}>
                  @{username}
               </AppText>
            </View>
         </View>
         {button}
      </View>
   );
}
