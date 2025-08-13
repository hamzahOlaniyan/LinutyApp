import AppText from "@/src/components/AppText";
import { GLOBAL_STYLES } from "@/src/constant/globalStyles";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Step2() {
   return (
      <View style={GLOBAL_STYLES.flex}>
         <AppText>step 2</AppText>
         <Link href={"/(auth)/(new-user)/step-3"}> -- STEP 3</Link>
      </View>
   );
}
