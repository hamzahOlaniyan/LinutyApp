import { wp } from "@/src/constant/common";
import { getProfiles } from "@/src/Services/profiles";
import { useAuthStore } from "@/src/store/authStore";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Searchbar from "../ui/Searchbar";
import FriendsCard from "./FriendsCard";

export default function FriendSearch({ showSearchBar }: { showSearchBar: boolean }) {
   const { profile } = useAuthStore();
   const [searchText, setSearchText] = useState("");
   const [renderSearch, setRenderSearch] = useState(showSearchBar);

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

   useEffect(() => {
      height.value = withTiming(showSearchBar ? 50 : 0, { duration: 300 });
      opacity.value = withTiming(showSearchBar ? 1 : 0, { duration: 300 });
   }, [showSearchBar]);

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
         <View className="gap-6 my-4">
            {PROFILES?.data

               ?.filter((f: any) => f.firstName?.toLowerCase().includes(searchText.toLowerCase()))
               .map((item, idx) => (
                  <FriendsCard
                     key={idx}
                     id={item?.id}
                     avatar={item?.avatarUrl}
                     name={item?.firstName + item?.lastName}
                     username={item?.username}
                  />
               ))}
         </View>
      </View>
   );
}
