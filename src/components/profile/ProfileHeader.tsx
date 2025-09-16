import { EditIcon } from "@/assets/icons/edit";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";
import Button from "../ui/Button";

export default function ProfileHeader({ userProfile }: { userProfile: any }) {
   const [readmore, setReadMore] = useState(false);

   const router = useRouter();

   const sampleText =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias obcaecati tempora saepe deleniti ipsa eveniet numquam modi reiciendis dolore nemo perspiciatis totam debitis.";

   return (
      <View style={{ paddingHorizontal: wp(3) }} className="gap-2 mb-6">
         <View className="w-full h-36 rounded-lg overflow-hidden">
            {userProfile?.cover_photo ? (
               <Image source={userProfile?.cover_photo} transition={100} style={{ width: "100%", height: "100%" }} />
            ) : (
               <View className="w-full h-full bg-neutral-200"></View>
            )}
         </View>
         <View className="gap-2">
            <View className="flex-row items-center gap-3">
               <Avatar path={userProfile?.avatarUrl} size={80} />
               <View className="gap-2">
                  <View>
                     <View className="flex-row gap-">
                        <AppText size="xl" weight="semi" cap="capitalize">
                           {userProfile?.firstName}
                        </AppText>
                        <AppText size="xl" weight="semi" cap="capitalize">
                           {userProfile?.lastName}
                        </AppText>
                     </View>
                     <AppText color={appColors.grey}>@{userProfile?.username}</AppText>
                  </View>
                  <View className="flex-row gap-1">
                     <AppText weight="reg">Friends</AppText>
                     <AppText weight="med"> 347</AppText>
                  </View>
               </View>
            </View>
            {!readmore ? (
               <AppText weight="reg">
                  {sampleText.substring(0, 90)}...{" "}
                  <AppText weight="semi" onPress={() => setReadMore(!readmore)} color={appColors.grey}>
                     more
                  </AppText>
               </AppText>
            ) : (
               <AppText weight="reg">
                  {sampleText}{" "}
                  <AppText weight="semi" onPress={() => setReadMore(!readmore)} color={appColors.grey}>
                     less
                  </AppText>
               </AppText>
            )}
         </View>
         <View className="flex-row justify-between gap-2 mt-4">
            <Button size="sm" text="Manage your profile" className="flex-1" />
            <Button
               text="Edit profile"
               icon={<EditIcon size={18} />}
               size="sm"
               variant="secondary"
               onPress={() => router.push("/(app)/(profile)/edit")}
            />
         </View>
      </View>
   );
}
