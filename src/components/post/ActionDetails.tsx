import { appColors } from "@/constant/colors";
import Icon from "@/icons";
import { ShareIcon } from "@/icons/ico/shareIcon";
import { Thumbsup } from "@/icons/ico/thumbsup";
import React from "react";
import { View } from "react-native";
import AppText from "../ui/AppText";

export default function ActionDetails() {
   return (
      <View className="flex-row items-center">
         <View className="flex-row">
            <View
               style={{
                  height: 20,
                  width: 20,
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "red",
                  borderWidth: 2,
                  borderColor: appColors.white,
               }}
            >
               <Thumbsup size={12} />
            </View>
            <View
               style={{
                  height: 20,
                  width: 20,
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "green",
                  borderWidth: 2,
                  borderColor: appColors.white,
               }}
            >
               <Icon name="bookmark" size={12} />
            </View>
            <View
               style={{
                  height: 20,
                  width: 20,
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "skyblue",
                  borderWidth: 2,
                  borderColor: appColors.white,
               }}
            >
               <ShareIcon size={12} />
            </View>
         </View>
         <View className="relative">
            <AppText weight="light" size="sm">
               129
            </AppText>
         </View>
      </View>
   );
}
