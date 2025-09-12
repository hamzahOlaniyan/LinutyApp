import { wp } from "@/src/constant/common";
import { getProfiles } from "@/src/Services/profiles";
import { useAuthStore } from "@/src/store/authStore";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import Searchbar from "../ui/Searchbar";
import FriendsCard from "./FriendsCard";

export default function FriendSearch() {
   const { profile } = useAuthStore();
   const [searchText, setSearchText] = useState("");

   const {
      data: PROFILES,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["profile"],
      queryFn: () => getProfiles(profile?.id),
   });

   return (
      <View style={{ paddingHorizontal: wp(3) }} className="flex-1">
         <View className="mt-4">
            <Searchbar value={searchText} onChangeText={setSearchText} onPress={() => setSearchText("")} />
         </View>
         <FlatList
            data={PROFILES?.data?.filter((f: any) => f.firstName?.toLowerCase().includes(searchText.toLowerCase()))}
            renderItem={({ item }) => (
               <FriendsCard
                  id={item?.id}
                  avatar={item?.avatarUrl}
                  name={item?.firstName + item?.lastName}
                  username={item?.username}
               />
            )}
            contentContainerStyle={{ rowGap: 20, marginVertical: 15 }}
         />
      </View>
   );
}
