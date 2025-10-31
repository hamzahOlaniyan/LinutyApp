import { ImageIcon } from "@/assets/icons/ImageIcon";
import { Plus } from "@/assets/icons/plus";
import { ThreeDots } from "@/assets/icons/threedots";
import { appColors } from "@/src/constant/colors";
import { hp, wp } from "@/src/constant/common";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";
import Button from "../ui/Button";

export default function UserHeader({ profile }: { profile: any }) {
   return (
      <View className="">
         <View
            style={{ backgroundColor: appColors.white, height: hp(20), zIndex: 10 }}
            className="rounded-lg justify-center items-center"
         >
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
         <View style={{ paddingHorizontal: wp(4), backgroundColor: appColors.white }} className="gap-2 -top-1">
            <View className="flex-row items-center gap-3">
               <Avatar
                  path={profile?.avatarUrl}
                  size={105}
                  style={{ zIndex: 11, borderWidth: 5, borderColor: appColors.white }}
               />
               <View className="gap-4 flex-1">
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
                        <AppText color={appColors.secondary}>@{profile?.username}</AppText>
                     </View>
                     <View className="flex-row justify-between">
                        <View className="flex-row gap-2">
                           <AppText color={appColors.secondary}>Friends</AppText>
                           <AppText weight="med">347</AppText>
                        </View>
                        <View className="flex-row gap-2">
                           <AppText color={appColors.secondary}>Mutual friends</AppText>
                           <AppText weight="semi">3</AppText>
                        </View>
                     </View>
                  </View>
               </View>
            </View>
            <AppText size="lg" weight="reg">
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur officiis eius magnam cupiditate cum,
               voluptatum quam sed, odio dolorem voluptates at, repellat nostrum recusandae libero ipsa modi amet dolor.
               Quaerat.
            </AppText>

            <View className="gap-4 py-4">
               <View className="flex-row justify-between gap-2 ">
                  <View className="flex-row gap-2 flex-1">
                     <Button
                        size="sm"
                        text="Follow"
                        icon={<Plus color={appColors.blue} />}
                        className="flex-1"
                        variant="secondary"
                        color={appColors.blue}
                     />
                     <Button size="sm" text="Message" className="flex-1" variant="outline" />
                  </View>
                  <Button size="sm" icon={<ThreeDots size={24} color={appColors.icons} />} variant="secondary" />
               </View>
               <Button size="sm" text={"Visit shop"} variant="secondary" />
            </View>
         </View>
      </View>
   );
}
