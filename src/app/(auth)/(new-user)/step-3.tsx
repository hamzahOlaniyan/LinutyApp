import AppText from "@/src/components/AppText";
import { GLOBAL_STYLES } from "@/src/constant/globalStyles";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Step3() {
   return (
      <View style={GLOBAL_STYLES.flex}>
         <AppText>step 3</AppText>
         <Link href={"/(auth)/(new-user)/step-4"}> -- STEP 4</Link>
      </View>
   );
}
