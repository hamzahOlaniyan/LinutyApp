import { EditIcon } from "@/assets/icons/edit";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";
import Button from "../ui/Button";

export default function ProfileHeader({ userProfile }: { userProfile: any }) {
   const [readmore, setReadMore] = useState(false);

   const router = useRouter();

   const sampleText =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias obcaecati tempora saepe deleniti ipsa eveniet numquam modi reiciendis dolore nemo perspiciatis totam debitis.";

   return (
      <View style={{ paddingHorizontal: wp(3) }} className="gap-6">
         <View className="w-full h-36 rounded-lg overflow-hidden">
            <Image
               source={userProfile?.cover_photo || userProfile?.cover_photo}
               transition={100}
               style={{ width: "100%", height: "100%" }}
            />
         </View>
         <View className="gap-2">
            <View className="flex-row items-center gap-3">
               <Avatar path={userProfile?.avatarUrl} size={100} />
               <View className="gap-2">
                  <View>
                     <View className="flex-row gap-2">
                        <AppText size="xxl" weight="semi" cap="capitalize">
                           {userProfile?.firstName}
                        </AppText>
                        <AppText size="xxl" weight="semi" cap="capitalize">
                           {userProfile?.lastName}
                        </AppText>
                     </View>
                     <AppText size="lg" color={appColors.grey}>
                        @{userProfile?.username}
                     </AppText>
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
         <View className="flex-row justify-between gap-2">
            <Button text="Manage your profile" className="flex-1" />
            <Pressable
               style={{ backgroundColor: appColors.extralightOlive }}
               onPress={() => router.push("/(app)/(profile)/edit")}
               className="justify-center rounded-full p-3 px-6 flex-row gap-2"
            >
               <EditIcon /> <AppText weight="semi">Edit profile</AppText>
            </Pressable>
         </View>
      </View>
   );
}
