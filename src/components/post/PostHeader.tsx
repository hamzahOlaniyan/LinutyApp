import { ThreeDots } from "@/assets/icons/threedots";
import { appColors } from "@/src/constant/colors";
import { hp, wp } from "@/src/constant/common";
import { TimeAgo } from "@/src/hooks/timeAgo";
import { Octicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { Pressable, View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";

type PostHeader = {
   avatar: string;
   name: string;
   username: string;
   date: string;
   postInfo: () => void;
};

dayjs.extend(relativeTime);

export default function PostHeader({ avatar, name, username, date, postInfo }: PostHeader) {
   return (
      <View
         style={{
            paddingHorizontal: wp(2),
            paddingVertical: hp(1),
         }}
      >
         <View className="flex-row justify-between items-start">
            <View className="flex-row items-center gap-2">
               <Avatar path={avatar} size={37} />
               <View className="">
                  <View className="flex-row items-center gap-2">
                     <AppText weight="semi" cap="capitalize">
                        {name}
                     </AppText>
                     <Octicons name="dot-fill" size={6} className="relative top-[2px]" />
                     <AppText className="top-[2px]">
                        <TimeAgo time={dayjs(date).fromNow()} />
                     </AppText>
                  </View>
                  <AppText size="sm" color={appColors.grey}>
                     @{username}
                  </AppText>
               </View>
            </View>
            <Pressable onPress={postInfo} className="h-full relative">
               <ThreeDots color={appColors.grey} />
            </Pressable>
         </View>
      </View>
   );
}
