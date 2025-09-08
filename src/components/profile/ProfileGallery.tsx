import React from "react";
import { FlatList, View } from "react-native";

const gallery = Array.from({ length: 20 });

export default function ProfileGallery() {
   return (
      <FlatList
         data={gallery}
         keyExtractor={(_, index) => index.toString()}
         numColumns={3}
         renderItem={({ index }) => (
            <View className="aspect-square flex-1 border border-neutral-200" key={index} />
         )}
      />
   );
}
