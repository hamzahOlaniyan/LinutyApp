import { FavoriteIcon } from "@/assets/icons/favoriteIcon";
import { ShareIcon } from "@/assets/icons/shareIcon";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { Link } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";
import Button from "../ui/Button";

export default function ProductDetail({ item }: { item: any }) {
   return (
      <View style={{ paddingHorizontal: wp(4) }}>
         <View className="flex-row items-end justify-between my-4">
            <AppText weight="semi" size="lg" cap="capitalize">
               {item?.name.trim()}
            </AppText>
            <AppText size="xl" weight="semi">
               {Intl.NumberFormat("en-UK", { style: "currency", currency: "GBP" }).format(item?.price)}
            </AppText>
         </View>
         <View className="flex-row justify-between w-full my-4">
            <Button text="Send seller a message" />
            <View className="flex-row items-center gap-3">
               <Pressable className="justify-center items-center p-2 rounded-full">
                  <FavoriteIcon />
                  <AppText size="xs">Favorite</AppText>
               </Pressable>
               <Pressable className="justify-center items-center p-2  rounded-full">
                  <ShareIcon />
                  <AppText size="xs">Share</AppText>
               </Pressable>
            </View>
         </View>

         <View className="gap-10">
            <View className="gap-2">
               <View className="gap-1">
                  <AppText weight="semi">Description</AppText>
                  <AppText>{item?.description}</AppText>
               </View>
               <View className="flex-row justify-between">
                  <AppText weight="semi">Condition</AppText>
                  <AppText size="lg">{item?.condition}</AppText>
               </View>
               <View className="flex-row justify-between">
                  <AppText weight="semi">Availability</AppText>
                  <AppText size="lg">{item?.availability}</AppText>
               </View>
               <View className="flex-row justify-between">
                  <AppText weight="semi">Location</AppText>
                  <AppText size="lg">{item?.location}</AppText>
               </View>
            </View>
            <View className="flex-row items-start justify-between">
               <View className="gap-2">
                  <AppText weight="semi">Seller Information</AppText>
                  <View className="flex-row gap-3 items-start">
                     <Avatar path={item?.profiles?.avatarUrl} />
                     <View>
                        <AppText cap="capitalize">
                           {item?.profiles?.firstName}
                           {item?.profiles?.lastName}
                        </AppText>
                        <AppText size="sm" color={appColors.grey}>
                           @{item?.profiles?.username}
                        </AppText>
                     </View>
                  </View>
               </View>
               <Link href={`/(app)/(tabs)/(store)/seller/${item?.id}`} asChild>
                  <Pressable>
                     <AppText weight="med">Sellers store {">"}</AppText>
                  </Pressable>
               </Link>
            </View>
         </View>
      </View>
   );
}
