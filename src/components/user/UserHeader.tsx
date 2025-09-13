import { PublishIcon } from "@/assets/icons/publishIcon";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import React from "react";
import { View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";
import Button from "../ui/Button";

export default function UserHeader({ profile }: { profile: any }) {
   return (
      <View style={{ paddingHorizontal: wp(3) }} className="gap-4 mb-6">
         <View className="h-32 bg-fuchsia-400 rounded-lg"></View>
         <View className="gap-2">
            <View className="flex-row items-center gap-3">
               <Avatar path={profile?.avatarUrl} size={100} />
               <View className="gap-2">
                  <View className="gap-4">
                     <View>
                        <View className="flex-row gap-1">
                           <AppText size="xxl" weight="semi" cap="capitalize">
                              {profile?.firstName}
                           </AppText>
                           <AppText size="xxl" weight="semi" cap="capitalize">
                              {profile?.lastName}
                           </AppText>
                        </View>
                        <AppText size="lg" weight="med" color={appColors.grey}>
                           @{profile?.username}
                        </AppText>
                     </View>
                     <View className="flex-row gap-2">
                        <View className="flex-row gap-1">
                           <AppText weight="semi" color={appColors.grey}>
                              Friends:
                           </AppText>
                           <AppText weight="semi">347</AppText>
                        </View>
                        <View className="flex-row gap-1">
                           <AppText weight="semi" color={appColors.grey}>
                              mutual Friends:
                           </AppText>
                           <AppText weight="semi">3</AppText>
                        </View>
                     </View>
                  </View>
               </View>
            </View>
            <AppText weight="reg">
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur officiis eius magnam cupiditate cum,
               voluptatum quam sed, odio dolorem voluptates at, repellat nostrum recusandae libero ipsa modi amet dolor.
               Quaerat.
            </AppText>
         </View>
         <View className="flex-row justify-between gap-2">
            <Button text="Add friend" className="flex-1" icon={<PublishIcon />} />
         </View>
      </View>
   );
}
