import { hp, wp } from "@/src/constant/common";
import { Entypo, Octicons } from "@expo/vector-icons";
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
               <Avatar path={avatar} size={40} />
               <View className="">
                  <View className="flex-row items-center gap-2">
                     <AppText weight="semi" size="md" cap="capitalize">
                        {name}
                     </AppText>
                     <Octicons name="dot-fill" size={6} className="relative top-[2px]" />
                     <AppText size="xs" className="top-[2px]">
                        {dayjs(date).fromNow()}
                     </AppText>
                  </View>
                  <AppText size="sm">@{username}</AppText>
               </View>
            </View>
            <Pressable onPress={postInfo} className="h-full relative">
               <Entypo name="dots-three-horizontal" size={16} />
            </Pressable>
         </View>
      </View>
   );
}
