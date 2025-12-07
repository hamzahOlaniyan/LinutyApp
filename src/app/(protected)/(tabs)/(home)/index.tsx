import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import React from "react";
import { View } from "react-native";

export default function index() {
   return (
      <View style={{ backgroundColor: appColors.white, flex: 1 }}>
         <AppText size="xxxl">HOME FEED</AppText>
      </View>
   );
}
