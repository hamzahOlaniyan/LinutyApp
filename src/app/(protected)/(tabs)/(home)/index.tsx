import Post from "@/components/Post";
import { appColors } from "@/constant/colors";
import React from "react";
import { FlatList } from "react-native";

export default function HomeFeed() {
  const mockData = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    title: "post"
    // image: require("@/assets/images/lin/png")
  }));

  return (
    <FlatList
      data={mockData}
      renderItem={({ item }) => <Post item={item} />}
      contentContainerStyle={{
        backgroundColor: appColors.background,
        rowGap: 12
      }}
    />
  );
}
