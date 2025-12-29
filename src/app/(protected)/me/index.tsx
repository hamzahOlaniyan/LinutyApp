import Info from "@/components/Me/Info";
import AppText from "@/components/ui/AppText";
import StickyTab from "@/components/ui/StickyTab";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import Icon from "@/icons";
import { useAuthStore } from "@/store/useAuthStore";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Me() {
  const { me } = useAuthStore();
  const { bottom } = useSafeAreaInsets();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[2]}
      className="flex-1 bg-white"
      style={{ marginBottom: bottom }}
    >
      {me?.coverUrl ? (
        <View style={s.coverContainer}>
          <Image
            source={{ uri: me?.coverUrl }}
            contentFit="fill"
            style={{ width: "100%", height: "100%" }}
          />
          <TouchableOpacity
            style={s.coverButton}
            className="absolute bottom-4 right-4"
          >
            <AppText variant={"xs"}>change cover image</AppText>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          className="items-center justify-center bg-neutral-200"
          style={s.coverPlaceholder}
        >
          <Icon name="add_image" size={32} color={appColors.icon} />
          <TouchableOpacity
            style={s.coverButton}
            className="absolute bottom-4 right-4"
          >
            <AppText variant={"xs"}>Add cover image</AppText>
          </TouchableOpacity>
        </View>
      )}
      <Info {...me!} />

      <View>
        <StickyTab
          routes={[
            { key: "Posts", title: "Posts" },
            { key: "Pictures", title: "Pictures" },
            { key: "Info", title: "Details" },
            { key: "Store", title: "Your store" }
          ]}
          scenes={{
            Posts: (
              <ScrollView scrollEnabled>
                <AppText>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Beatae magni sed voluptate blanditiis quis provident saepe
                  consequuntur magni sed voluptate blanditiis quis provident
                  saepe consequuntur magni sed voluptate blanditiis quis
                  provident saepe consequuntur magni sed voluptate blanditiis
                  quis provident saepe consequuntur magni sed voluptate
                  blanditiis quis provident saepe consequuntur magni sed
                  voluptate blanditiis quis provident saepe consequuntur magni
                </AppText>
              </ScrollView>
            ),
            Pictures: <AppText>Pictures</AppText>,
            Info: <AppText>Info</AppText>,
            Store: <AppText>posStorets</AppText>
          }}
        />
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  coverContainer: {
    height: hp(25)
  },
  coverPlaceholder: {
    height: hp(25)
  },
  coverButton: {
    position: "absolute",
    right: wp(3),
    bottom: wp(3),
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 7,
    paddingVertical: 3
  }
});
