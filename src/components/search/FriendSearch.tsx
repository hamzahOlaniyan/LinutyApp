import { wp } from "@/src/constant/common";
import { getProfiles } from "@/src/Services/profiles";
import { useAuthStore } from "@/src/store/authStore";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Searchbar from "../ui/Searchbar";
import FriendsCard from "./FriendsCard";

export default function FriendSearch({ showSearchBar }: { showSearchBar: boolean }) {
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

   const height = useSharedValue(0);
   const opacity = useSharedValue(0);

   //   const toggleSearch = () => {
   //  setVisible(!visible);
   height.value = withTiming(showSearchBar ? 0 : 50, { duration: 300 });
   opacity.value = withTiming(showSearchBar ? 0 : 1, { duration: 300 });
   //   };

   const animatedStyle = useAnimatedStyle(() => {
      return {
         height: height.value,
         opacity: opacity.value,
      };
   });

   return (
      <View style={{ paddingHorizontal: wp(3) }} className="flex-1">
         {showSearchBar && (
            <Animated.View style={animatedStyle}>
               <Searchbar
                  placeholder="search your friends"
                  value={searchText}
                  onChangeText={setSearchText}
                  onPress={() => setSearchText("")}
               />
            </Animated.View>
         )}
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
