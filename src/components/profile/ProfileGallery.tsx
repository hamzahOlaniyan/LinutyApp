import React from "react";
import AppText from "../ui/AppText";

const gallery = Array.from({ length: 20 });

export default function ProfileGallery() {
   return (
      <AppText>ProfileGallery</AppText>
      // <FlatList
      //    data={gallery}
      //    keyExtractor={(_, index) => index.toString()}
      //    numColumns={3}
      //    renderItem={({ index }) => <View className="w-full h-40 flex-1 bg-red-400" key={index} />}
      // />
   );
}
