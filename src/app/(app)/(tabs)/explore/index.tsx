import AppText from "@/components/ui/AppText";
import ScreenHeader from "@/components/ui/ScreenHeader";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { EventsIcon } from "@/icons/ico/EventsIcon";
import { FramePersonIcon } from "@/icons/ico/FramePersonIcon";
import { FriendsIcon } from "@/icons/ico/friendsIcon";
import { StoryIcon } from "@/icons/ico/StoryIcon";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
   const { profile } = useAuthStore();

   const router = useRouter();

   const fullName = profile?.firstName + " " + profile?.lastName;
   return (
      <SafeAreaView edges={["bottom", "top"]} style={{ flex: 1, backgroundColor: appColors.white }}>
         <ScreenHeader headerTitle="Explore" />
         <ScrollView scrollEnabled showsHorizontalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: wp(4) }}>
            <View className="gap-4">
               <View className="gap-3">
                  <AppText cap="capitalize" weight="med" size="xl">
                     Welcome back, {profile?.fullLineageName}
                  </AppText>
                  {/* <AppText cap="capitalize">You belong to the lineage of the {fullName} clan</AppText>
                  <AppText cap="capitalize">Discover your roots. Connect with your people.</AppText> */}
               </View>

               <TouchableOpacity onPress={() => router.push("/explore/lineage-map")} style={s.clan}>
                  <AppText size="lg" weight="med">
                     Your Lineage Map
                  </AppText>
               </TouchableOpacity>

               <View className="flex-row gap-3 rounded-xl">
                  <TouchableOpacity
                     onPress={() => router.push("/explore/clan-members")}
                     style={s.smallLink}
                     className=""
                  >
                     <FriendsIcon size={24} />
                     <AppText size="sm" align="center">
                        Clan member near you
                     </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => router.push("/explore/stories/")} style={s.smallLink}>
                     <StoryIcon size={24} />
                     <AppText size="sm" align="center">
                        Lineage stories
                     </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => router.push("/explore/gathering")} style={s.smallLink}>
                     <EventsIcon size={24} />
                     <AppText size="sm" align="center">
                        Upcoming gathering
                     </AppText>
                  </TouchableOpacity>
               </View>

               <TouchableOpacity style={s.discover} onPress={() => router.push("/explore/dicover")}>
                  <View className="flex-1">
                     <AppText size="xl" weight="med">
                        Discover
                     </AppText>
                     <AppText size="lg">Important figures from your clan</AppText>
                  </View>
                  <View style={s.discoverImage}>
                     <FramePersonIcon size={48} color={appColors.primary} />
                  </View>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => router.push("/explore/clans")} style={s.clan} className="gap-3">
                  {/* <Image
                        source={require("@/assets/images/clan.png")}
                        contentPosition={"right center"}
                        contentFit="fill"
                        // tintColor={"#1e9187"}
                        style={{
                           width: "100%",
                           height: hp(20),
                           borderRadius: 8,
                           position: "absolute",
                           top: 0,
                           right: -70,
                           opacity: 0.5,
                           // opacity: 0.4,
                        }}
                     /> */}
                  <AppText size="lg" weight="med">
                     Qaaraan (coming soon)
                  </AppText>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </SafeAreaView>
   );
}

const s = StyleSheet.create({
   clan: {
      backgroundColor: "#eaf5f4",
      height: hp(16),
      padding: 16,
      borderRadius: 8,
      overflow: "hidden",
      elevation: 1,
   },
   smallLink: {
      padding: 10,
      gap: 1,
      flex: 1,
      borderRadius: 8,
      backgroundColor: "#eaf5f4",
      elevation: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   discover: {
      backgroundColor: "#eaf5f4",
      flexDirection: "row",
      justifyContent: "space-between",
      borderRadius: 8,
      padding: 12,
      elevation: 1,
      paddingVertical: 16,
   },
   discoverImage: {
      backgroundColor: "#eaf5f4",
      padding: 10,
      borderWidth: 15,
      borderColor: "#d6ebe9",
      borderRadius: 100,
      overflow: "hidden",
   },
});
