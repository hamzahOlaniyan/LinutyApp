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
// import SupabaseImage from "./SupabaseImage";
// import AppText from "./ui/AppText";

type FriendsCardProps = {
   id: string;
   avatar: string;
   name: string;
   username: string;
};

export default function FriendsCard({ id, avatar, name, username }: FriendsCardProps) {
   const [remove, setRemove] = useState(false);
   const { profile } = useAuthStore();
   const queryClient = useQueryClient();

   const [friendship, setFriendship] = useState<any>(null);

   const { data: friendshipData } = useQuery({
      queryKey: ["friendships", profile?.id, id],
      queryFn: async () => getFriendship({ requester: profile?.id, reciever: id }),
   });

   useEffect(() => {
      setFriendship(friendshipData);
   }, [friendshipData]);

   console.log("friendship", { friendship });

   const sendRequest = useMutation({
      mutationFn: async () => sendFriendRequest({ requester: profile?.id, receiver: id }),
      onSuccess: async () => {
         console.log("✅friend request sent");
         queryClient.invalidateQueries({ queryKey: ["friendship", profile?.id, id] });
      },
      onError: (error: any) => console.error(" ❌ friend request fail", error),
   });

   const acceptRequest = useMutation({
      mutationFn: async () => acceptFriendRequest({ id: friendship?.id, receiver: profile?.id }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["friendship", profile?.id, id] }),
   });

   const rejectRequest = useMutation({
      mutationFn: async () => rejectFriendRequest({ id: friendship?.id, receiver: profile?.id }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["friendship", profile?.id, id] }),
   });

   const unfriend = useMutation({
      mutationFn: async () => deleteFriendRequest({ id: friendship?.id }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["friendship", profile?.id, id] }),
   });

   let button = <Button text="Add Friend" size="xs" onPress={() => sendRequest.mutate()} />;

   if (friendship) {
      if (friendship.status === "pending") {
         if (friendship.requester === profile?.id) {
            button = <Button text="Cancel Request" size="xs" onPress={() => unfriend.mutate()} />;
         } else if (friendship.receiver === profile?.id) {
            button = (
               <View style={{ flexDirection: "row", gap: 8 }}>
                  <Button text="Accept" size="xs" onPress={() => acceptRequest.mutate()} />
                  <Button text="Reject" size="xs" onPress={() => rejectRequest.mutate()} />
               </View>
            );
         }
      } else if (friendship.status === "accepted") {
         button = <Button text="Unfriend" size="xs" onPress={() => unfriend.mutate()} />;
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
