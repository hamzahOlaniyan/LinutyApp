import FriendsCard from "@/components/Friends/FriendsCard";
import FriendsSkeletion from "@/components/Friends/FriendsSkeletion";
import Searchbar from "@/components/ui/Searchbar";
import { wp } from "@/constant/common";
import { getProfiles } from "@/Services/db/profiles";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Animated, View } from "react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export default function ClanMembers({ showSearchBar }: { showSearchBar: boolean }) {
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

   const clan =
      PROFILES?.data?.filter((lin) => {
         const lineage = Array.isArray(lin?.lineage_names)
            ? lin.lineage_names
            : typeof lin?.lineage_names === "string"
            ? JSON.parse(lin.lineage_names)
            : [];

         return lineage[0] === "Darood";
      }) ?? [];

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
      <View className="flex-1">
         {showSearchBar && (
            <View style={{ paddingHorizontal: wp(3) }}>
               <Animated.View style={[animatedStyle, { paddingVertical: 10 }]}>
                  <Searchbar
                     placeholder="search your friends"
                     value={searchText}
                     onChangeText={setSearchText}
                     onPress={() => setSearchText("")}
                  />
               </Animated.View>
            </View>
         )}
         <View>
            <View style={{ paddingHorizontal: wp(3), gap: 18, marginTop: 24 }}>
               {isLoading ? (
                  <FriendsSkeletion />
               ) : (
                  clan
                     ?.filter((f: any) => f.firstName?.toLowerCase().includes(searchText.toLowerCase()))
                     .map((item) => (
                        <FriendsCard
                           key={item?.id}
                           id={item?.id}
                           avatar={item?.avatarUrl}
                           firstName={item?.firstName.trim()}
                           lastName={item?.lastName.trim()}
                           username={item?.username}
                        />
                     ))
               )}
            </View>
         </View>
      </View>
   );
}
