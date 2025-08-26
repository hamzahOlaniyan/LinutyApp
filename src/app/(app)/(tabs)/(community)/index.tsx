import React from "react";
import { Text, View } from "react-native";

const filterList = ["Concert", "Sport", "Art & Theater", "News", "Events", "Current affair"];

export default function CommunityScreen() {
   return (
      <View
         style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
         }}
      >
         <Text
            style={{
               fontSize: 50,
               color: "black",
               textAlign: "center",
            }}
         >
            CommunityScreen
         </Text>
      </View>
   );
}
