import AppText from "@/src/components/AppText";
import { GLOBAL_STYLES } from "@/src/constant/globalStyles";
import React from "react";
import { Pressable, View } from "react-native";

export default function Step3() {
   return (
      <View style={GLOBAL_STYLES.flex}>
         <AppText>step 7</AppText>
         <Pressable> done</Pressable>
      </View>
   );
}
