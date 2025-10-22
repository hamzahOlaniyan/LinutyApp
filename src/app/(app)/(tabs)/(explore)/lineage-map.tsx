import ClanInfo from "@/src/components/ui/ClanInfo";
import LineageChain from "@/src/components/ui/LineageChain";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { useAuthStore } from "@/src/store/authStore";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function clans() {
   const { profile } = useAuthStore();
   // const [expanded, setExpanded] = useState(false);

   const { bottom } = useSafeAreaInsets();

   // console.log(profile.lineage_names);

   return (
      <View style={{ backgroundColor: appColors.backgroundTheme, flex: 1 }}>
         <StatusBar style="light" />
         <ScrollView scrollEnabled style={[s.root, { marginBottom: bottom }]}>
            <LineageChain profile={profile} />
            <ClanInfo name={profile.lineage_names[0]} />
         </ScrollView>
      </View>
   );
}

const s = StyleSheet.create({
   root: {
      flex: 1,
      paddingHorizontal: wp(4),
      paddingBottom: 200,
      backgroundColor: "#18746c",
   },
});
