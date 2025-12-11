import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import React from "react";
import { FlatList, View } from "react-native";

export default function HomeFeed() {
  // async function handleLogout() {
  //   await signOut();
  //   router.replace("/auth"); // or "/"
  // }

  const mockData = Array.from({ length: 10 }, () => ({
    title: "post"
  }));

  return (
    <FlatList
      data={mockData}
      renderItem={({ item }) => (
        <View style={{ height: hp(10), backgroundColor: appColors.white }}>
          <AppText>{item.title}</AppText>
        </View>
      )}
      contentContainerStyle={{
        backgroundColor: appColors.background,
        rowGap: 12
      }}
    />
  );
}
