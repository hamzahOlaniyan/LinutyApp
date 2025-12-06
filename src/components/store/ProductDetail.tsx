import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { ShareIcon } from "@/icons/ico/shareIcon";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";
import Button from "../ui/Button";

export default function ProductDetail({ item }: { item: any }) {
   const router = useRouter();

   return (
      <View style={{ paddingHorizontal: wp(4) }}>
         <View className="">
            <AppText weight="semi" size="xxl" cap="capitalize">
               {item?.name.trim()}
            </AppText>
            <AppText size="xxl" color={appColors.secondary}>
               {Intl.NumberFormat("en-UK", { style: "currency", currency: "GBP" }).format(item?.price)}
            </AppText>
         </View>
         <View className="flex-row justify-between w-full my-4 items-center">
            <Button text="Send seller a message" variant="secondary" color={appColors.blue} />
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
                     <AppText weight="semi">Seller Information</AppText>
                     <View className="flex-row gap-3 items-start">
                        <TouchableOpacity onPress={() => router.push(`/user/${item?.profile_id}`)}>
                           <Avatar path={item?.profiles?.avatarUrl} size={40} />
                        </TouchableOpacity>
                        <View>
                           <AppText weight="med" cap="capitalize">
                              {item?.profiles?.firstName} {item?.profiles?.lastName}
                           </AppText>
                           <AppText size="sm" color={appColors.secondary}>
                              @{item?.profiles?.username}
                           </AppText>
                        </View>
                     </View>
                  </View>

                  <TouchableOpacity
                     onPress={() => router.push(`/(app)/(tabs)/store/seller/${item?.profile_id}`)}
                     style={{ borderWidth: 1, borderColor: appColors.black, padding: 10, borderRadius: 50 }}
                  >
                     <AppText size="sm" weight="med">
                        Sellers store
                     </AppText>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </View>
   );
}
