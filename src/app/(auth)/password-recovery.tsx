import ScreenWrapper from "@/src/components/ScreenWrapper";
import { hp } from "@/src/constant/common";
import React from "react";
import { Text, View } from "react-native";

export default function PasswordRecovery() {
   return (
      <ScreenWrapper>
         <View style={{ position: "relative", marginTop: hp(18) }}>
            <Text>PasswordRecovery</Text>
         </View>
      </ScreenWrapper>
   );
}
