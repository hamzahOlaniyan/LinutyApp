import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function media() {
  const { image } = useLocalSearchParams<{ image: string }>();

  return (
    <View className="flex-1 bg-white">
      <Image
        source={{ uri: image }}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          borderRadius: 6
        }}
        contentFit="contain"
      />
    </View>
  );
}
