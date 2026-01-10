import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function SellerStoreScreen() {
  const { sellerId } = useLocalSearchParams<{ sellerId?: string }>();

  return (
    <View>
      <Text>{sellerId}</Text>
    </View>
  );
}
