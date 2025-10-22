import { EventsIcon } from "@/assets/icons/EventsIcon";
import { FramePersonIcon } from "@/assets/icons/FramePersonIcon";
import { FriendsIcon } from "@/assets/icons/friendsIcon";
import { StoryIcon } from "@/assets/icons/StoryIcon";
import AppText from "@/src/components/ui/AppText";
import ScreenHeader from "@/src/components/ui/ScreenHeader";
import { appColors } from "@/src/constant/colors";
import { hp, wp } from "@/src/constant/common";
import { useAuthStore } from "@/src/store/authStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
   const { profile } = useAuthStore();

   const router = useRouter();
   // console.log(JSON.stringify(profile, null, 2));

   const fullName = profile?.firstName + " " + profile?.lastName;
   return (
      <View style={{ backgroundColor: "#18746c", flex: 1 }}>
         <StatusBar style="light" />
         <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
               scrollEnabled
               showsHorizontalScrollIndicator={false}
               style={{ flex: 1, paddingHorizontal: wp(3) }}
            >
               <ScreenHeader headerTitle="Explore" color={appColors.white} />
               <View className="gap-4">
                  <View className="gap-3">
                     <AppText cap="capitalize" weight="med" size="xxl" color={appColors.white}>
                        Welcome back, {profile?.fullLineageName}
                     </AppText>
                     <AppText cap="capitalize" size="xl" color={appColors.white}>
                        You belong to the lineage of the {fullName} clan
                     </AppText>
                     <AppText cap="capitalize" size="lg" color={appColors.white}>
                        Discover your roots. Connect with your people.
                     </AppText>
                  </View>
                  <TouchableOpacity onPress={() => router.push("/clans")} style={s.clan} className="gap-3">
                     <Image
                        source={require("@/assets/images/clan.png")}
                        contentPosition={"right center"}
                        tintColor={"#a5d3cf"}
                        style={{
                           width: "100%",
                           height: hp(16),
                           borderRadius: 12,
                           position: "absolute",
                           top: 0,
                           right: -70,
                           opacity: 0.4,
                        }}
                     />
                     <AppText size="xl" weight="med" color={appColors.white}>
                        Clans
                     </AppText>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => router.push("/lineage-map")} style={s.clan}>
                     <Image
                        source={require("@/assets/images/lineage-map.png")}
                        style={{
                           width: "100%",
                           height: hp(16),
                           borderRadius: 12,
                           position: "absolute",
                           top: 0,
                           right: 0,
                           opacity: 0.4,
                        }}
                     />
                     <View className="absolute top-4 left-4">
                        <AppText size="xl" weight="med" color={appColors.white}>
                           Your Lineage Map
                        </AppText>
                     </View>
                  </TouchableOpacity>

                  <View className="flex-row gap-3 rounded-xl">
                     <TouchableOpacity onPress={() => router.push("/")} style={s.smallLink} className="">
                        <FriendsIcon size={28} color={appColors.white} />
                        <AppText align="center" color={appColors.white}>
                           Clan member near you
                        </AppText>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => router.push("/(stories)")} style={s.smallLink}>
                        <StoryIcon size={28} color={appColors.white} />
                        <AppText align="center" color={appColors.white}>
                           Lineage stories
                        </AppText>
                     </TouchableOpacity>
                     <TouchableOpacity style={s.smallLink}>
                        <EventsIcon size={28} color={appColors.white} />
                        <AppText align="center" color={appColors.white}>
                           Upcoming gathering
                        </AppText>
                     </TouchableOpacity>
                  </View>

                  <TouchableOpacity style={s.discover}>
                     <View className="flex-1">
                        <AppText size="xl" weight="med" color={appColors.white}>
                           Discover
                        </AppText>
                        <AppText size="lg" color={appColors.white}>
                           Important figures from your clan
                        </AppText>
                     </View>
                     <View style={s.discoverImage}>
                        <FramePersonIcon size={48} color={appColors.primary} />
                     </View>
                  </TouchableOpacity>
               </View>
            </ScrollView>
         </SafeAreaView>
      </View>
   );
}

const s = StyleSheet.create({
   clan: {
      backgroundColor: "#1b8279",
      height: hp(16),
      padding: 16,
      borderRadius: 12,
      overflow: "hidden",
      elevation: 1,
   },
   smallLink: {
      padding: 10,
      gap: 1,
      flex: 1,
      borderRadius: 12,
      backgroundColor: "#1b8279",
      elevation: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   discover: {
      backgroundColor: "#1b8279",
      flexDirection: "row",
      justifyContent: "space-between",
      borderRadius: 12,
      padding: 12,
      elevation: 1,
      paddingVertical: 16,
   },
   discoverImage: {
      backgroundColor: "#d2e9e7",
      padding: 10,
      borderWidth: 15,
      borderColor: "#bbdedb",
      borderRadius: 100,
      overflow: "hidden",
   },
});
