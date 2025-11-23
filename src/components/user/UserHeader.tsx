import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { ImageIcon } from "@/icons/ico/ImageIcon";
import { ThreeDots } from "@/icons/ico/threedots";
import { useAuthStore } from "@/store/useAuthStore";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import Avatar from "../Avatar";
import FriendshipButton from "../Friends/FriendshipButton";
import AppText from "../ui/AppText";
import Button from "../ui/Button";

export default function UserHeader({ profile }: { profile: any }) {
   const { profile: currentUer } = useAuthStore();

   console.log(currentUer?.id);
   console.log(profile?.id);

   return (
      <View className="">
         {/* COVER IMAGE */}
         <View
            style={{ backgroundColor: appColors.white, height: hp(20), zIndex: 10 }}
            className="rounded-lg justify-center items-center "
         >
            {profile?.cover_photo ? (
               <Image
                  source={{ uri: profile?.cover_photo }}
                  transition={100}
                  style={{ width: "100%", height: "100%" }}
               />
            ) : (
               <ImageIcon size={100} color={appColors.kkkk} />
            )}
         </View>

         {/* INFO */}
         <View style={{ backgroundColor: appColors.extralightOlive, gap: 10 }}>
            <View style={{ paddingHorizontal: wp(4), backgroundColor: appColors.white, marginBottom: 0 }}>
               <View className="flex-row items-center gap-3">
                  <Avatar
                     path={profile?.avatarUrl}
                     size={150}
                     style={{ zIndex: 11, borderWidth: 5, borderColor: appColors.white, top: -15 }}
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
                        <View className="flex-row gap-4">
                           <View className="flex-row gap-1">
                              <AppText color={appColors.secondary}>Friends</AppText>
                              <AppText weight="med">347</AppText>
                           </View>
                           <View className="flex-row gap-1">
                              <AppText color={appColors.secondary}>Mutual friends</AppText>
                              <AppText weight="semi">3</AppText>
                           </View>
                        </View>
                     </View>
                  </View>
               </View>
               <AppText weight="reg">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur officiis eius magnam cupiditate cum,
                  voluptatum quam sed, odio dolorem voluptates at, repellat nostrum recusandae libero ipsa modi amet
                  dolor. Quaerat.
               </AppText>

               <View className="gap-4 py-4">
                  <View className="flex-row justify-between gap-2 ">
                     <View className="flex-row gap-2 flex-1">
                        <FriendshipButton profile={currentUer?.id} friendId={profile?.id} size="sm" icon color />
                        <Button size="sm" text="Message" className="flex-1" variant="outline" />
                     </View>
                     <Button size="sm" icon={<ThreeDots size={24} color={appColors.icons} />} variant="secondary" />
                  </View>
                  <Button size="sm" text={"Visit shop"} variant="secondary" />
               </View>
            </View>
            <View style={{ paddingHorizontal: wp(4), paddingVertical: 16, backgroundColor: appColors.white }}>
               <AppText size="xxl" weight="semi">
                  Activity
               </AppText>
            </View>
         </View>
      </View>
   );
}
