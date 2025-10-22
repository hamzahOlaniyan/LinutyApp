import { appColors } from "@/src/constant/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./AppText";

export default function ClanInfo({ name }: { name: string }) {
   return (
      <View style={s.container}>
         <AppText size="xxl" weight="med" color={appColors.white}>
            Clan of {name}
         </AppText>
         <View className="flex-row gap-9">
            <View>
               <AppText color={appColors.white} weight="light">
                  Parent Clan
               </AppText>
               <AppText color={appColors.white} weight="light">
                  Region
               </AppText>
               <AppText color={appColors.white} weight="light">
                  Languages
               </AppText>
               <AppText color={appColors.white} weight="light">
                  Customes
               </AppText>
            </View>
            <View>
               <AppText color={appColors.white} weight="med">
                  Kablalah
               </AppText>
               <AppText color={appColors.white} weight="med">
                  Putland, Somalia
               </AppText>
               <AppText color={appColors.white} weight="med">
                  Somali
               </AppText>
            </View>
         </View>
      </View>
   );
}

const s = StyleSheet.create({
   container: {
      backgroundColor: "#1b8279",
      padding: 20,
      borderRadius: 12,
      gap: 12,
   },
});
