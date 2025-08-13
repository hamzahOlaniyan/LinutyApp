import AppText from "@/src/components/AppText";
import { GLOBAL_STYLES } from "@/src/constant/globalStyles";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Step4() {
   return (
      <View style={GLOBAL_STYLES.flex}>
         <AppText>step 4</AppText>
         <Link href={"/(auth)/(new-user)/step-5"}> -- STEP 5</Link>
      </View>
   );
}
