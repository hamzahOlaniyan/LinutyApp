import { appColors } from "@/constant/colors";
import { Plus } from "@/icons/ico/plus";
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
      <TouchableOpacity onPress={() => ""} style={{ flex: 1, backgroundColor: appColors.white }}>
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

         <View className="py-3 gap-3 px-3">
            <View>
               <AppText weight="med" cap="capitalize">
                  {firstName} {lastName}
               </AppText>
               <AppText color={appColors.lightGrey}>@{username}</AppText>
            </View>
            <Button
               size="xs"
               icon={<Plus color={appColors.blue} size={20} />}
               text="Add friend"
               color={appColors.blue}
               variant="secondary"
            />
         </View>
      </TouchableOpacity>
   );
}
