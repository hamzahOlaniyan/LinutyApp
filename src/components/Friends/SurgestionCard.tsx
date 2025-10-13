import { appColors } from "@/src/constant/colors";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import AppText from "../ui/AppText";

type SurgestionCardProps = {
   id: string;
   avatar: string;
   firstName: string;
   lastName: string;
   username: string;
};

const { width: screenWidth } = Dimensions.get("screen");

export default function SurgestionCard({ id, avatar, firstName, lastName, username }: SurgestionCardProps) {
   return (
      <TouchableOpacity
         onPress={() => router.push(`/(app)/(user)/${id}`)}
         className="mr-3 flex-1 rounded-lg overflow-hidden gap-2"
      >
         {avatar ? (
            <Image source={{ uri: avatar }} style={{ width: screenWidth / 3, height: 175 }} contentFit="cover" />
         ) : (
            <View
               style={{
                  width: screenWidth / 3,
                  height: 175,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "red",
                  flex: 1,
               }}
            >
               <AppText size="xxxxl" weight="med">
                  {firstName.slice(0, 1).trim() + lastName.slice(0, 1).trim()}
               </AppText>
            </View>
         )}
         <View>
            <AppText weight="med" size="lg" cap="capitalize">
               {firstName} {lastName}
            </AppText>
            <AppText color={appColors.secondary}>@{username}</AppText>
         </View>
      </TouchableOpacity>
   );
}
