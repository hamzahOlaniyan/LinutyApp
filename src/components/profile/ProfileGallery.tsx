import { Image } from "expo-image";
import React from "react";
import { Dimensions, View } from "react-native";

const { width: screewidth } = Dimensions.get("screen");
export default function ProfileGallery({ imageMedia }: { imageMedia?: any }) {
   return (
      <View className="flex-1 flex-row flex-wrap">
         {imageMedia?.map((item: any, i: number) => (
            <Image
               key={i}
               source={{ uri: item.url }}
               style={{ width: "33.33%", height: screewidth / 2, aspectRatio: 1 }}
            />
         ))}
      </View>
   );
}
