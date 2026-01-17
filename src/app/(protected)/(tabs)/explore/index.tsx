import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import Icon from "@/icons";
import { FramePersonIcon } from "@/icons/ico/FramePersonIcon";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function index() {
  const router = useRouter();

  return (
    <ScrollView
      scrollEnabled
      showsHorizontalScrollIndicator={false}
      style={{
        flex: 1,
        paddingHorizontal: wp(3),
        backgroundColor: appColors.white
      }}
    >
      <View className="gap-4">
        <View className="gap-3">
          {/* <AppText>
                     Welcome back, {profile?.fullLineageName}
                  </AppText> */}
          {/* <AppText cap="capitalize">You belong to the lineage of the {fullName} clan</AppText>
                  <AppText cap="capitalize">Discover your roots. Connect with your people.</AppText> */}
        </View>

        <TouchableOpacity
          onPress={() => router.push("/explore/lineage-map")}
          style={s.clan}
        >
          <AppText>Your Lineage Map</AppText>
        </TouchableOpacity>

        <View className="flex-row gap-3 rounded-xl">
          <TouchableOpacity
            onPress={() => router.push("/explore/clan-members")}
            style={s.smallLink}
            className=""
          >
            <Icon name={"friendsIcon"} />
            <AppText>Clan member near you</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/explore/stories/")}
            style={s.smallLink}
          >
            <Icon name="story" />
            <AppText>Lineage stories</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/explore/gathering")}
            style={s.smallLink}
          >
            <Icon name="events" />
            <AppText>Upcoming gathering</AppText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={s.discover}
          onPress={() => router.push("/explore/dicover")}
        >
          <View className="flex-1">
            <AppText>Discover</AppText>
            <AppText>Important figures from your clan</AppText>
          </View>
          <View style={s.discoverImage}>
            <FramePersonIcon size={48} color={appColors.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/explore/clans")}
          style={s.clan}
          className="gap-3"
        >
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
          <AppText>Qaaraan (coming soon)</AppText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  clan: {
    backgroundColor: "#eaf5f4",
    height: hp(16),
    padding: 16,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 1
  },
  smallLink: {
    padding: 10,
    gap: 1,
    flex: 1,
    borderRadius: 8,
    backgroundColor: "#eaf5f4",
    elevation: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  discover: {
    backgroundColor: "#eaf5f4",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    padding: 12,
    elevation: 1,
    paddingVertical: 16
  },
  discoverImage: {
    backgroundColor: "#eaf5f4",
    padding: 10,
    borderWidth: 15,
    borderColor: "#d6ebe9",
    borderRadius: 100,
    overflow: "hidden"
  }
});
