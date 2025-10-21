import LineageTree from "@/src/components/LineageNode";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { ETHNICITIES } from "@/src/data/ClanTree";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ClanTree() {
   const somali = ETHNICITIES.find((e) => e.id === "SO");
   const { bottom } = useSafeAreaInsets();

   return (
      <ScrollView
         scrollEnabled
         style={{
            backgroundColor: appColors.white,
            flex: 1,
            paddingHorizontal: wp(4),
            marginBottom: bottom,
            paddingBottom: 800,
         }}
      >
         <LineageTree data={somali?.clans ?? []} />
      </ScrollView>
   );
}
