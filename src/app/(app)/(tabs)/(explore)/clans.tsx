import LineageTree from "@/src/components/LineageNode";
import AppText from "@/src/components/ui/AppText";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { ETHNICITIES } from "@/src/data/ClanTree";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ClanTree() {
   const somali = ETHNICITIES.find((e) => e.id === "SO");
   const { bottom } = useSafeAreaInsets();

   const COLORS = ["#FF9914", "#F21B3F", "#08BDBD", "#B084CC", "#2D7DD2"];

   return (
      <View style={{ backgroundColor: appColors.white, flex: 1, paddingBottom: bottom }}>
         <StatusBar style="dark" />
         <ScrollView
            scrollEnabled
            showsVerticalScrollIndicator={false}
            style={{
               paddingHorizontal: wp(4),
               paddingBottom: 600,
            }}
         >
            <View
               style={{
                  backgroundColor: appColors.whitesmoke,
                  borderRadius: 8,
                  marginBottom: 8,
                  padding: 8,
                  gap: 8,
               }}
            >
               <AppText weight="semi">Clan index (level)</AppText>
               <View
                  style={{
                     flexWrap: "wrap",
                     flexDirection: "row",
                     gap: 12,
                  }}
               >
                  {COLORS.map((c, i) => (
                     <View key={c} className="flex-row items-center gap-1">
                        <View style={{ backgroundColor: c, width: 30, height: 12, borderRadius: 20 }}></View>
                        <AppText>{i + 1}</AppText>
                     </View>
                  ))}
               </View>
            </View>
            <LineageTree data={somali?.clans ?? []} />
         </ScrollView>
      </View>
   );
}
