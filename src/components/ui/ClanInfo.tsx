import { appColors } from "@/constant/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./AppText";

export default function ClanInfo({ name }: { name: string }) {
   return (
      <View style={s.container}>
         <AppText size="xxl" weight="med">
            Clan of {name}
         </AppText>
         <View className="flex-row gap-9">
            <View>
               <AppText weight="light">Parent Clan</AppText>
               <AppText weight="light">Region</AppText>
               <AppText weight="light">Languages</AppText>
               <AppText weight="light">Customes</AppText>
            </View>
            <View>
               <AppText weight="med">Kablalah</AppText>
               <AppText weight="med">Putland, Somalia</AppText>
               <AppText weight="med">Somali</AppText>
            </View>
         </View>
      </View>
   );
}

const s = StyleSheet.create({
   container: {
      backgroundColor: appColors.whitesmoke,
      padding: 20,
      borderRadius: 12,
      gap: 12,
   },
});
