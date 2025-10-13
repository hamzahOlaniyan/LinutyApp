import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { getProfiles } from "@/src/Services/profiles";
import { useAuthStore } from "@/src/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Animated, ScrollView, TouchableOpacity, View } from "react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import AppText from "../ui/AppText";
import Searchbar from "../ui/Searchbar";
import FriendsCard from "./FriendsCard";
import FriendsSkeletion from "./FriendsSkeletion";
import SurgestionCard from "./SurgestionCard";

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

   const router = useRouter();

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
         <View className="gap-5 my-4">
            <View className="gap-2">
               <View className="flex-row justify-between">
                  <AppText weight="semi" color={appColors.secondary}>
                     surggested
                  </AppText>

                  <AppText weight="semi">People you my know</AppText>
                  <TouchableOpacity onPress={() => router.push("/(app)/(tabs)/(explore)/suggested")}>
                     <AppText color={appColors.secondary}>{`see more >`}</AppText>
                  </TouchableOpacity>
               </View>

               <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ borderBottomColor: appColors.border, borderBottomWidth: 0.5, paddingBottom: 24 }}
               >
                  {PROFILES?.data.slice(0, 6).map((item) => (
                     <SurgestionCard
                        key={item?.id}
                        id={item?.id}
                        avatar={item?.avatarUrl}
                        firstName={item?.firstName.trim()}
                        lastName={item?.lastName.trim()}
                        username={item?.username}
                     />
                  ))}
               </ScrollView>
            </View>
            {isLoading ? (
               <FriendsSkeletion />
            ) : (
               PROFILES?.data
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
   );
}
