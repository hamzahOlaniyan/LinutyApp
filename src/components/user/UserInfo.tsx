import React from "react";
import { View } from "react-native";
import AppText from "../ui/AppText";

const InfoDetails = ({ label, value, icon }: { label?: string; icon?: React.ReactNode; value: React.ReactNode }) => {};

export default function UserInfo({ profile }: { profile: any }) {
   return (
      <View className="flex-1 bg-yellow-400 w-full">
         <AppText size="lg" weight="semi">
            Details
         </AppText>
      </View>
   );
}
