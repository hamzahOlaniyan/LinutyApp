import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { View } from "react-native";
// import { TiktokFont } from "../assets/fonts/FontFamily";
// import { hp } from "../common";
// import { colors } from "../constant/colors";
// import { useAuthStore } from "../context/authStore";
// import { useThemeStore } from "../context/themeStore";
// import { createNotification } from "../Services/Notification";
// import { deleteFriendRequest, sendFriendRequest } from "../Services/relationships";
import { appColors } from "@/src/constant/colors";
import { getFriendship } from "@/src/Services/relationships";
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

   console.log(profile?.id);

   const { data: friendshipData } = useQuery({
      queryKey: ["friendships", profile?.id, id],
      queryFn: async () => getFriendship({profile?.id, id}),
      // const { data, error } = await supabase
      //    .from("friendships")
      //    .select("*")
      //    .or(`and(requester.eq.${profile?.id},receiver.eq.${id}),and(requester.eq.${id},receiver.eq.${profile?.id})`)
      //    .maybeSingle();

      // if (error && error.code !== "PGRST116") throw error; // ignore "no rows found"
      // return data;
      // },
   });

   // useEffect(() => {
   //    setFriendship(friendshipData);
   // }, [friendshipData]);

   // console.log(friendshipData);

   return (
      <View className="flex-row flex-1 justify-between items-start">
         <View className="flex-row flex-1 gap-3 items-start">
            <Avatar path={avatar} size={45} />
            <View>
               <View className="flex-row gap-1 items-center w-full">
                  <AppText weight="semi" cap="capitalize">
                     {name}
                  </AppText>
                  {/* <Octicons name="dot-fill" size={6} className="relative top-[2px]" /> */}
               </View>
               <AppText size="sm" weight="light" color={appColors.grey}>
                  @{username}
               </AppText>
            </View>
         </View>
         <Button text="Add friend" size="xs" />
      </View>
   );
}
