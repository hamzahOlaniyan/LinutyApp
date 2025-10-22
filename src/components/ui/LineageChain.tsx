import { appColors } from "@/src/constant/colors";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "./AppText";

export default function LineageChain({ profile }: { profile: any }) {
   return (
      <View className="item-center py-5">
         {profile.lineage_names.map((name: string, index: number) => (
            <View key={index} className="items-center">
               <TouchableOpacity style={s.btn}>
                  <AppText size="lg" weight="med" cap="capitalize">
                     {name}
                  </AppText>
               </TouchableOpacity>
               {index !== profile.lineage_names.length - 1 && <View style={s.connection} />}
            </View>
         ))}
      </View>
   );
}

const s = StyleSheet.create({
   btn: {
      borderWidth: 0.5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 100,
      justifyContent: "center",
      alignContent: "center",
      backgroundColor: appColors.white,
      borderColor: "#00e8f7",
      shadowColor: "#00f7ef",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 12,
   },
   connection: { width: 3, height: 40, backgroundColor: "#00e8f7", marginVertical: 0 },
});
