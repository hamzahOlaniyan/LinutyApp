import LineageTree from "@/src/components/LineageNode";
import AppText from "@/src/components/ui/AppText";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { ETHNICITIES } from "@/src/data/ClanTree";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ImageBackground, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ClanTree() {
   const somali = ETHNICITIES.find((e) => e.id === "SO");
   const { bottom } = useSafeAreaInsets();

   return (
      <View style={{ backgroundColor: appColors.backgroundTheme, flex: 1, marginBottom: bottom, overflow: "hidden" }}>
         <StatusBar style="light" />
         <ImageBackground
            source={require("@/assets/images/clan.png")}
            resizeMode="cover"
            imageStyle={{ tintColor: appColors.white, opacity: 0.2 }}
            style={{
               width: "100%",
               height: "100%",
               position: "absolute",
               left: 0,
               right: -10,
            }}
         >
            <ScrollView
               scrollEnabled
               style={{
                  paddingHorizontal: wp(4),
                  paddingBottom: 600,
               }}
            >
               <View className="mb-7">
                  <AppText color={appColors.white}>
                     Info Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam neque eveniet recusandae
                     nemo quia, ab repudiandae perspiciatis incidunt odio fugiat tempore asperiores dolorum voluptatibus
                     exercitationem. Velit architecto earum tempore atque.
                  </AppText>
               </View>
               <LineageTree data={somali?.clans ?? []} />
            </ScrollView>
         </ImageBackground>
      </View>
   );
}
