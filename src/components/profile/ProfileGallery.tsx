import React from "react";
import { FlatList, View } from "react-native";

const gallery = Array.from({ length: 20 });

export default function ProfileGallery() {
   return (
      <View className="flex-1">
         <FlatList
            data={gallery}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            renderItem={({ index }) => <View className="w-full aspect-square flex-1 bg-red-400 border" key={index} />}
         />
      </View>
   );
}
