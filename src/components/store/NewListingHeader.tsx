import { appColors } from "@/constant/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";

export default function NewListingHeader({
   firstName,
   lastName,
   image,
}: {
   image: any;
   firstName: string;
   lastName: string;
}) {
   return (
      <View className="flex-row gap-3 my-4 items-center w-full flex-1">
         <Avatar path={image} size={45} />
         <View className="w-full">
            <View className="flex-row gap-1">
               <AppText size="lg" weight="semi" cap="capitalize">
                  {firstName}
               </AppText>
               <AppText size="lg" weight="semi" cap="capitalize">
                  {lastName}
               </AppText>
            </View>
            <View className="flex-row gap-3 items-center">
               <AppText size="sm" color={appColors.secondary}>
                  Listing in Store
               </AppText>
               <Ionicons name={"storefront-sharp"} size={14} color={appColors.secondary} />
            </View>
         </View>
      </View>
   );
}
