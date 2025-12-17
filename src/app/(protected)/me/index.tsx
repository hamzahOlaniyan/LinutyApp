import Info from "@/components/Me/Info";
import AppText from "@/components/ui/AppText";
import StickyTab from "@/components/ui/StickyTab";
import { hp } from "@/constant/common";
import { useAuthStore } from "@/store/useAuthStore";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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
      <View style={s.coverContainer}></View>
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
                  sed voluptate blanditiis quis provident saepe consequuntur
                  magni sed voluptate blanditiis quis provident saepe
                  consequuntur magni sed voluptate blanditiis quis provident
                  saepe consequuntur magni sed voluptate blanditiis quis
                  provident saepe consequuntur magni sed voluptate blanditiis
                  quis provident saepe consequuntur magni sed voluptate
                  blanditiis quis provident saepe consequuntur magni sed
                  voluptate blanditiis quis provident saepe consequuntur magni
                  sed voluptate blanditiis quis provident saepe consequuntur
                  magni sed voluptate blanditiis quis provident saepe
                  consequuntur magni sed voluptate blanditiis quis provident
                  saepe consequuntur magni sed voluptate blanditiis quis
                  provident saepe consequuntur magni sed voluptate blanditiis
                  quis provident saepe consequuntur magni sed voluptate
                  blanditiis quis provident saepe consequuntur magni sed
                  voluptate blanditiis quis provident saepe consequuntur magni
                  sed voluptate blanditiis quis provident saepe consequuntur
                  magni sed voluptate blanditiis quis provident saepe
                  consequuntur magni sed voluptate blanditiis quis provident
                  saepe consequuntur magni sed voluptate blanditiis quis
                  provident saepe consequuntur magni sed voluptate blanditiis
                  quis provident saepe consequuntur consequuntur magni sed
                  voluptate blanditiis quis provident saepe consequuntur magni
                  sed voluptate blanditiis quis provident saepe consequuntur
                  magni sed voluptate blanditiis quis provident saepe
                  consequuntur consequuntur magni sed voluptate blanditiis quis
                  provident saepe consequuntur magni sed voluptate blanditiis
                  quis provident saepe consequuntur magni sed voluptate
                  blanditiis quis provident saepe consequuntur
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
    height: hp(20),
    backgroundColor: "orange",
    flexDirection: "row"
  }
});
