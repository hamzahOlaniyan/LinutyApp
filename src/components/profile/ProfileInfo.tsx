import { EthnicityIcon } from "@/assets/icons/ethnicity";
import { LocationIcon } from "@/assets/icons/locationIcon";
import { NameIcon } from "@/assets/icons/name";
import { WorkIcon } from "@/assets/icons/work";
import { appColors } from "@/src/constant/colors";
import React from "react";
import { View } from "react-native";
import AppText from "../ui/AppText";

const InfoDetails = ({ label, value, icon }: { label?: string; icon?: React.ReactNode; value: React.ReactNode }) => {
   return (
      <View className="flex-row gap-2">
         <View className="flex-row gap-3">
            <View>{icon}</View>
            <AppText>{label}</AppText>
         </View>
         <AppText weight="semi">{value}</AppText>
      </View>
   );
};

export default function ProfileInfo({ item }: any) {
   // console.log("ProfileInfo", JSON.stringify(item, null, 2));

   return (
      <View className="flex-1 px-4 gap-6">
         <AppText size="lg" weight="semi">
            Details
         </AppText>
         <View className="gap-8">
            <View className="gap-8">
               <InfoDetails label="Location" value={item?.location} icon={<LocationIcon />} />
               <InfoDetails label="Ethnicity" value={item?.ethnicity} icon={<EthnicityIcon />} />
               <InfoDetails label="Full lineage name" value={item?.fullLineageName} icon={<NameIcon />} />
               <InfoDetails label="Profession" value={item?.profession} icon={<WorkIcon />} />
            </View>
            <View className="gap-8">
               <AppText size="lg" weight="semi">
                  Interests
               </AppText>
               <View className="flex-row flex-wrap gap-3">
                  {[...(item?.app_interest ?? []), ...(item?.interest ?? [])].map((interest: string, i: number) => (
                     <View
                        key={i}
                        style={{ borderWidth: 1, borderColor: appColors.black, borderRadius: 100 }}
                        className="p-2 px-4"
                     >
                        <AppText key={i} style={{ marginBottom: 4 }}>
                           {interest}
                        </AppText>
                     </View>
                  ))}
               </View>
            </View>
         </View>
      </View>
   );
}
