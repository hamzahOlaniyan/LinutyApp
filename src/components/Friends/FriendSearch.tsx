import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { getProfiles } from "@/Services/db/profiles";
import { useAuthStore } from "@/store/authStore";
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
      <View className="flex-1 pb-[100px]">
         {showSearchBar && (
            <View style={{ paddingHorizontal: wp(4) }}>
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
            <View className="">
               <View
                  style={{ paddingHorizontal: wp(4), gap: 6, backgroundColor: appColors.whitesmoke }}
                  className="py-3"
               >
                  <AppText weight="semi" size="xl" color={appColors.secondary}>
                     Suggested
                  </AppText>
                  <View className="flex-row justify-between">
                     <AppText color={appColors.secondary} weight="semi">
                        People you my know
                     </AppText>
                     <TouchableOpacity onPress={() => router.push("/friends/suggested")}>
                        <AppText color={appColors.secondary}>{`see more >`}</AppText>
                     </TouchableOpacity>
                  </View>
               </View>

               <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{
                     paddingBottom: 18,
                     gap: 12,
                     columnGap: 36,
                     backgroundColor: appColors.whitesmoke,
                     paddingLeft: wp(4),
                  }}
               >
                  {PROFILES?.data.slice(0, 6).map((item) => (
                     <View key={item?.id} style={{ width: 160, marginRight: 12 }}>
                        <SurgestionCard
                           id={item?.id}
                           avatar={item?.avatarUrl}
                           firstName={item?.firstName.trim()}
                           lastName={item?.lastName.trim()}
                           username={item?.username}
                        />
                     </View>
                  ))}
               </ScrollView>
            </View>
            <View style={{ paddingHorizontal: wp(4), gap: 24, marginTop: 24 }}>
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
      </View>
   );
}
