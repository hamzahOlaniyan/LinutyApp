import { ImageIcon } from "@/assets/icons/ImageIcon";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";
import Button from "../ui/Button";

export default function UserHeader({ profile }: { profile: any }) {
   return (
      <View style={{ paddingHorizontal: wp(3) }} className="gap-4 mb-6">
         <View style={{ backgroundColor: appColors.offWhite }} className="h-36 rounded-lg justify-center items-center">
            {profile?.cover_photo ? (
               <Image
                  source={{ uri: profile?.cover_photo || profile?.cover_photo }}
                  transition={100}
                  style={{ width: "100%", height: "100%" }}
               />
            ) : (
               <ImageIcon size={100} color={appColors.kkkk} />
            )}
         </View>
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
                        <AppText size="lg" color={appColors.grey}>
                           @{profile?.username}
                        </AppText>
                     </View>
                     <View className="flex-row gap-2">
                        <View className="flex-row gap-1">
                           <AppText color={appColors.grey}>Friends</AppText>
                           <AppText weight="med">347</AppText>
                        </View>
                        <View className="flex-row gap-1">
                           <AppText color={appColors.grey}>Mutual friends</AppText>
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
            <Button size="sm" text="Add friend" className="flex-1" />
         </View>
      </View>
   );
}
