import HomeHeaderMenu from "@/src/components/HomeHeaderMenu";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import { appColors } from "@/src/constant/colors";
import { GLOBAL_STYLES } from "@/src/constant/globalStyles";
import { useAuthStore } from "@/src/store/authStore";
import React from "react";
import { View } from "react-native";

export default function index() {
   const { signOut } = useAuthStore();
   return (
      <ScreenWrapper paddingHorizontal={0} innerPadding={0}>
         <HomeHeaderMenu />
         <View style={[GLOBAL_STYLES.screenPadding, { flex: 1, backgroundColor: appColors.extralightOlive }]}>
            {/* <Button text="sign out" onPress={signOut} size="lg" /> */}
         </View>
      </ScreenWrapper>
   );
}
