import { getFriends } from "@/src/Services/relationships";
import { useAuthStore } from "@/src/store/authStore";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { View } from "react-native";
import AppText from "../ui/AppText";
// import { useAuthStore } from "../context/authStore";
// import { getFriends } from "../Services/relationships";
// import SupabaseImage from "./SupabaseImage";
// import AppText from "./ui/AppText";

export default function FriendList() {
   const { profile } = useAuthStore();

   const { data: friends, error } = useQuery({
      queryKey: ["friendRequests", profile?.id],
      queryFn: async () => getFriends(profile?.id),
      enabled: !!profile?.id,
   });

   // console.log(JSON.stringify(friends, null, 2));

   return (
      <View className="gap-5 py-4">
         {friends?.map((item: any, idx: number) => (
            <View className="flex-row gap-3 items-start">
               {/* <SupabaseImage
                  bucket="avatars"
                  path={item?.profile?.avatar_url}
                  width={50}
                  height={50}
                  borderRadius={100}
               /> */}
               <View>
                  <AppText size="md" weight="bold" cap="capitalize">
                     {item?.profile?.full_name}
                  </AppText>
                  <AppText>{item?.profile?.username}</AppText>
               </View>
            </View>

            // <FriendsCard key={idx} id={item?.id} avatar={item?.profile?.avatar_url} name={item?.profile?.full_name}} username={item?.profile?.username}/>
         ))}
         {/* <Text>{JSON.stringify(friends, null, 1)}</Text> */}
      </View>
   );
}
