import { appColors } from "@/src/constant/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";

export default function NewListingHeader({ user, image }: { image: any; user: string }) {
   return (
      <View className="flex-row gap-2 my-4 items-center">
         <Avatar path={image} size={35} />
         <View className="w-full">
            <AppText weight="med" cap="capitalize">
               {user}
            </AppText>
            <View className="flex-row gap-3 items-center">
               <AppText size="sm" color={appColors.grey}>
                  Listing in Store
               </AppText>
               <Ionicons name={"storefront-sharp"} size={14} color={appColors.grey} />
            </View>
         </View>
      </View>
   );
}
