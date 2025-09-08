import { Octicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
// import { TiktokFont } from "../assets/fonts/FontFamily";
// import { hp } from "../common";
// import { colors } from "../constant/colors";
// import { useAuthStore } from "../context/authStore";
// import { useThemeStore } from "../context/themeStore";
// import { createNotification } from "../Services/Notification";
// import { deleteFriendRequest, sendFriendRequest } from "../Services/relationships";
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
   // const { currentUser } = useAuthStore();
   // const { currentTheme } = useThemeStore();
   const queryClient = useQueryClient();

   // const addFriendMutation = useMutation({
   //    mutationFn: async (id: string | null): Promise<any> => {
   //       return sendFriendRequest({ follower_id: currentUser?.id, following_id: id!, status: "pending" });
   //    },
   //    onSuccess: async (data: any) => {
   //       Alert.alert("friend request has been sent");

   //       let notify = {
   //          senderId: currentUser?.id,
   //          receiverId: data?.following_id,
   //          type: "friend request",
   //       };
   //       await createNotification(notify);
   //       setRemove(true);
   //       console.log("success", { data });
   //       queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
   //    },
   //    onError: (error: any) => Alert.alert("Error", error.message),
   // });

   // const removeFriendMutation = useMutation({
   //    mutationFn: async (id: string | null): Promise<any> => {
   //       return deleteFriendRequest({ follower_id: currentUser, following_id: id, status: null });
   //    },
   //    onSuccess: async (data: any) => {
   //       console.log({ data });
   //       setRemove(false);
   //       queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
   //    },
   //    onError: (error: any) => Alert.alert("Error", error.message),
   // });

   return (
      <View className="flex-row flex-1 justify-between items-start">
         <View className="flex-row flex-1 gap-3 items-start">
            <Avatar path={avatar} size={50} />
            <View>
               <View className="flex-row gap-1 items-center w-full">
                  <AppText size="lg" weight="semi" cap="capitalize">
                     {name}
                  </AppText>
                  <Octicons name="dot-fill" size={6} className="relative top-[2px]" />
               </View>
               <AppText size="sm" weight="med" cap="capitalize">
                  @{username}
               </AppText>
            </View>
         </View>
         {remove ? (
            <Pressable onPress={() => setRemove(false)}>
               <AppText>Remove</AppText>
            </Pressable>
         ) : (
            <Button text="Add friend" size="xs" onPress={() => ""} />
         )}
      </View>
   );
}
