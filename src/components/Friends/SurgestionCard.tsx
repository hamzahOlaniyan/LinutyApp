import { appColors } from "@/src/constant/colors";
import { Image } from "expo-image";
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
      <TouchableOpacity onPress={() => ""} style={{ flex: 1 }}>
         <View style={{ width: "100%", height: 200 }}>
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
               ></View>
            )}
         </View>

         <View className="py-1 gap-3">
            <View>
               <AppText weight="med" cap="capitalize">
                  {firstName} {lastName}
               </AppText>
               <AppText color={appColors.secondary}>@{username}</AppText>
            </View>
            <Button size="xs" text="Add friend" variant="outline" />
         </View>
      </TouchableOpacity>
   );
}
