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
import { LinearGradient } from "expo-linear-gradient";
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
      <View style={{ backgroundColor: appColors.backgroundTheme, flex: 1 }}>
         <StatusBar style="light" />
         <LinearGradient
            dither={false}
            // end={{ x: 0.1, y: 0.2 }}
            start={{ x: 0.1, y: 0.2 }}
            locations={[0.3, 0.8, 1]}
            colors={["#0f4843", "#15655e", "#1e9187"]}
            style={{ flex: 1 }}
         >
            <SafeAreaView style={{ flex: 1 }}>
               <ScrollView
                  scrollEnabled
                  showsHorizontalScrollIndicator={false}
                  style={{ flex: 1, paddingHorizontal: wp(3) }}
               >
                  <ScreenHeader headerTitle="Explore" color={appColors.white} />
                  <View className="gap-4">
                     <View className="gap-3">
                        <AppText cap="capitalize" weight="med" size="xl" color={appColors.white}>
                           Welcome back, {profile?.fullLineageName}
                        </AppText>
                        <AppText cap="capitalize" color={appColors.white}>
                           You belong to the lineage of the {fullName} clan
                        </AppText>
                        <AppText cap="capitalize" color={appColors.white}>
                           Discover your roots. Connect with your people.
                        </AppText>
                     </View>
                     <TouchableOpacity onPress={() => router.push("/clans")} style={s.clan} className="gap-3">
                        <Image
                           source={require("@/assets/images/clan.png")}
                           contentPosition={"right center"}
                           contentFit="fill"
                           tintColor={"#1e9187"}
                           style={{
                              width: "100%",
                              height: hp(20),
                              borderRadius: 8,
                              position: "absolute",
                              top: 0,
                              right: -70,
                              // opacity: 0.4,
                           }}
                        />
                        <AppText size="lg" weight="med">
                           Clans
                        </AppText>
                     </TouchableOpacity>

                     <TouchableOpacity onPress={() => router.push("/lineage-map")} style={s.clan}>
                        <Image
                           source={require("@/assets/images/lineage-map.png")}
                           style={{
                              width: "100%",
                              height: hp(16),
                              borderRadius: 8,
                              position: "absolute",
                              top: 0,
                              right: 0,
                           }}
                        />
                        <View className="absolute top-4 left-4">
                           <AppText size="lg" weight="med">
                              Your Lineage Map
                           </AppText>
                        </View>
                     </TouchableOpacity>

                     <View className="flex-row gap-3 rounded-xl">
                        <TouchableOpacity onPress={() => router.push("/clan-member")} style={s.smallLink} className="">
                           <FriendsIcon size={24} />
                           <AppText size="sm" align="center">
                              Clan member near you
                           </AppText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("/(stories)")} style={s.smallLink}>
                           <StoryIcon size={24} />
                           <AppText size="sm" align="center">
                              Lineage stories
                           </AppText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("/gathering")} style={s.smallLink}>
                           <EventsIcon size={24} />
                           <AppText size="sm" align="center">
                              Upcoming gathering
                           </AppText>
                        </TouchableOpacity>
                     </View>

                     <TouchableOpacity style={s.discover}>
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
                  </View>
               </ScrollView>
            </SafeAreaView>
         </LinearGradient>
      </View>
   );
}

const s = StyleSheet.create({
   clan: {
      backgroundColor: "#bbdedb",
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
      backgroundColor: "#bbdedb",
      elevation: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   discover: {
      backgroundColor: "#bbdedb",
      flexDirection: "row",
      justifyContent: "space-between",
      borderRadius: 8,
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
