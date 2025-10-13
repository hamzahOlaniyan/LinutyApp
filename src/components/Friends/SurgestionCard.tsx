import { appColors } from "@/src/constant/colors";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import AppText from "../ui/AppText";
import Button from "../ui/Button";

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
         className="mr-3 rounded-lg overflow-hidden h-full flex-1"
         style={{ borderWidth: 1, borderColor: appColors.kkkk }}
      >
         <View style={{ width: screenWidth / 2, height: 200 }}>
            {avatar ? (
               <Image source={{ uri: avatar }} style={{ width: "100%", height: "100%" }} contentPosition="center" />
            ) : (
               <View
                  style={{
                     width: "100%",
                     height: "100%",
                     justifyContent: "center",
                     alignItems: "center",
                     backgroundColor: "red",
                  }}
               >
                  <AppText size="xxxxl" weight="med">
                     {firstName.slice(0, 1).trim() + lastName.slice(0, 1).trim()}
                  </AppText>
               </View>
            )}
         </View>

         <View className="p-2 gap-3">
            <View>
               <AppText weight="med" size="lg" cap="capitalize">
                  {firstName} {lastName}
               </AppText>
               <AppText color={appColors.secondary}>@{username}</AppText>
            </View>
            <Button size="sm" text="add friend" variant="outline" />
         </View>
      </TouchableOpacity>
   );
}
