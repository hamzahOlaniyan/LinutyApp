import { EditIcon } from "@/assets/icons/edit";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";
import Button from "../ui/Button";
// import { useThemeStore } from "../context/themeStore";
// import { UserProfile } from "../types/types";

export default function ProfileHeader({ userProfile }: { userProfile: any }) {
   const [readmore, setReadMore] = useState();

   // const { currentTheme } = useThemeStore();

   const router = useRouter();

   return (
      <View style={{ paddingHorizontal: wp(3) }} className="gap-6">
         <View className="flex-row items-center gap-3">
            <Avatar path={userProfile?.avatarUrl} size={80} />
            <View className="">
               <AppText size="xxl" weight="semi" cap="capitalize">
                  {userProfile?.firstName}
                  {userProfile?.lastName}
               </AppText>
               <AppText size="lg" weight="med" color={appColors.grey}>
                  @{userProfile?.username}
               </AppText>
            </View>
         </View>
         <View className="flex-row justify-between gap-2">
            <Button text="Manage your profile" className="flex-1" />
            <Pressable
               style={{ backgroundColor: appColors.extralightOlive }}
               // onPress={() => router.push("/(protected)/(profile)/edit")}
               className="justify-center rounded-full p-3"
            >
               <EditIcon />
            </Pressable>
         </View>
      </View>
   );
}
