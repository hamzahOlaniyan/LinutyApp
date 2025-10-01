import { ArrowLeftTopIcon } from "@/assets/icons/arrowLeftTopIcon";
import { FavoriteIcon } from "@/assets/icons/FavoriteIcon";
import { ShareIcon } from "@/assets/icons/shareIcon";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";
import Button from "../ui/Button";

export default function ProductDetail({ item }: { item: any }) {
   const router = useRouter();

   console.log(item?.profile_id);

   return (
      <View style={{ paddingHorizontal: wp(4) }}>
         <View className="my-4">
            <AppText weight="semi" size="xl" cap="capitalize">
               {item?.name.trim()}
            </AppText>
            <AppText size="xxl" weight="semi">
               {Intl.NumberFormat("en-UK", { style: "currency", currency: "GBP" }).format(item?.price)}
            </AppText>
         </View>
         <View className="flex-row justify-between w-full my-4">
            <Button text="Send seller a message" icon={<ArrowLeftTopIcon />} />
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

         <View className="gap-2">
            <View style={{ borderTopColor: appColors.border, borderTopWidth: 1, paddingTop: 15 }} className="gap-6">
               <View className="gap-1">
                  <AppText weight="semi">Description</AppText>
                  <AppText size="lg">{item?.description.trim()}</AppText>
               </View>
               <View className="">
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
               <View
                  style={{ borderTopColor: appColors.border, borderTopWidth: 1, paddingTop: 15 }}
                  className="flex-row items-start justify-between"
               >
                  <View className="gap-2">
                     <TouchableOpacity onPress={() => router.push(`/(app)/(user)/${item?.profile_id}`)}>
                        <AppText weight="semi">Seller Information</AppText>
                     </TouchableOpacity>
                     <View className="flex-row gap-3 items-start">
                        <Avatar path={item?.profiles?.avatarUrl} size={40} />
                        <View>
                           <AppText weight="med" cap="capitalize">
                              {item?.profiles?.firstName} {item?.profiles?.lastName}
                           </AppText>
                           <AppText size="sm" color={appColors.grey}>
                              @{item?.profiles?.username}
                           </AppText>
                        </View>
                     </View>
                  </View>
                  <Link href={`/(app)/(tabs)/(store)/seller/${item?.profile_id}`} asChild>
                     <TouchableOpacity
                        style={{ borderWidth: 1, borderColor: appColors.black, padding: 10, borderRadius: 50 }}
                     >
                        <AppText size="sm" weight="med">
                           Sellers store
                        </AppText>
                     </TouchableOpacity>
                  </Link>
               </View>
            </View>
         </View>
      </View>
   );
}
