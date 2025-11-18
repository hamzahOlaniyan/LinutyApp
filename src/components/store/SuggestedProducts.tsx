import { appColors } from "@/src/constant/colors";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import AppText from "../ui/AppText";

type Props = {
   item: any;
   isLoading: boolean;
};
export default function SuggestedProducts({ item }: Props) {
   const router = useRouter();
   return (
      <TouchableOpacity
         onPress={() => router.push(`/productDetail/${item?.id}`)}
         className="flex-1 px-2 py-1 rounded-md gap-1"
         style={{ backgroundColor: appColors.white }}
      >
         <AppText size="sm" weight="med" cap="capitalize">
            {item?.name.trim()}
         </AppText>
         <AppText size="sm" cap="capitalize" color={appColors.secondary}>
            {Intl.NumberFormat("en-UK", { style: "currency", currency: "GBP" }).format(item?.price)}
         </AppText>
      </TouchableOpacity>
   );
}
