import { EthnicityIcon } from "@/icons/ico/ethnicity";
import { LocationIcon } from "@/icons/ico/locationIcon";
import { NameIcon } from "@/icons/ico/name";
import { WorkIcon } from "@/icons/ico/work";
import React from "react";
import { View } from "react-native";
import AppText from "../ui/AppText";
import Button from "../ui/Button";

const InfoDetails = ({ label, value, icon }: { label?: string; icon?: React.ReactNode; value: React.ReactNode }) => {
   return (
      <View className="flex-row gap-2 flex-1">
         <View className="flex-row gap-3">
            <View>{icon}</View>
            <AppText size="lg">{label}</AppText>
         </View>
         <AppText size="lg" weight="semi" cap="capitalize">
            {value}
         </AppText>
      </View>
   );
};

export default function ProfileInfo({ item }: any) {
   return (
      <View className="flex-1 px-4 gap-6 py-4">
         <AppText size="xl" weight="semi">
            Details
         </AppText>
         <View className="gap-8">
            <View className="gap-8">
               <InfoDetails label="Location" value={item?.location} icon={<LocationIcon />} />
               <InfoDetails label="Ethnicity" value={item?.ethnicity} icon={<EthnicityIcon />} />
               <InfoDetails label="Full lineage name" value={item?.fullLineageName} icon={<NameIcon />} />
               <InfoDetails label="Profession" value={item?.profession} icon={<WorkIcon />} />
            </View>
            <View className="gap-6">
               <AppText size="xl" weight="semi">
                  Interests
               </AppText>
               <View className="flex-row flex-wrap gap-3">
                  {[...(item?.app_interest ?? []), ...(item?.interest ?? [])].map((interest: string, i: number) => (
                     <Button key={i} variant="outline" text={interest} size="sm" />
                  ))}
               </View>
            </View>
         </View>
      </View>
   );
}
