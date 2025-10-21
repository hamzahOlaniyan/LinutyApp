import AppText from "@/src/components/ui/AppText";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { useAuthStore } from "@/src/store/authStore";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function clans() {
   const { profile } = useAuthStore();
   const [expanded, setExpanded] = useState(false);

   const { bottom } = useSafeAreaInsets();

   console.log(profile.lineage_names);

   return (
      <ScrollView
         scrollEnabled
         style={{
            backgroundColor: appColors.white,
            flex: 1,
            paddingHorizontal: wp(4),
            marginBottom: bottom,
            paddingBottom: 200,
         }}
      >
         <View className="justify-center items-center">
            <AppText>
               <View style={{ alignItems: "center", paddingVertical: 20 }}>
                  {profile.lineage_names.map((name: string, index: number) => (
                     <View key={index} style={{ alignItems: "center" }}>
                        <TouchableOpacity
                           style={{
                              borderWidth: 1,
                              paddingVertical: 10,
                              paddingHorizontal: 20,
                              borderRadius: 100,
                              // shadowColor: "#ec4899",
                              // shadowOpacity: 0.5,
                              // shadowRadius: 10,
                              justifyContent: "center",
                              alignContent: "center",
                           }}
                        >
                           <AppText size="lg" weight="med" cap="capitalize">
                              {name}
                           </AppText>
                        </TouchableOpacity>

                        {index !== profile.lineage_names.length - 1 && (
                           <View style={{ width: 3, height: 40, backgroundColor: "#a855f7", marginVertical: 0 }} />
                        )}
                     </View>
                  ))}
               </View>
            </AppText>
         </View>
         <View
            style={{
               backgroundColor: appColors.whitesmoke,
               padding: 20,
               borderRadius: 12,
               gap: 12,
            }}
         >
            <AppText size="xxl" weight="med">
               Lineage name
            </AppText>
            <View
               style={{
                  flexDirection: "row",
                  gap: 36,
               }}
            >
               <View>
                  <AppText>Parent Clan</AppText>
                  <AppText>Region</AppText>
                  <AppText>Languages</AppText>
                  <AppText>Customes</AppText>
               </View>
               <View>
                  <AppText weight="med">Kablalah</AppText>
                  <AppText weight="med">Putland, Somalia</AppText>
                  <AppText weight="med">Somali</AppText>
               </View>
            </View>
         </View>
      </ScrollView>
   );
}
