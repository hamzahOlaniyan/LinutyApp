import { ThreeDots } from "@/assets/icons/threedots";
import { appColors } from "@/src/constant/colors";
import { hp, wp } from "@/src/constant/common";
import { TimeAgo } from "@/src/hooks/timeAgo";
import { Octicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";

type PostHeader = {
   id: string;
   avatar: string;
   name: string;
   username: string;
   date: string;
   postInfo: () => void;
};

dayjs.extend(relativeTime);

export default function PostHeader({ id, avatar, name, username, date, postInfo }: PostHeader) {
   const router = useRouter();
   return (
      <View
         style={{
            paddingHorizontal: wp(2),
            paddingVertical: hp(1),
         }}
      >
         <View className="flex-row justify-between items-start">
            <View className="flex-row items-center gap-2">
               <Pressable onPress={() => router.push(`/(app)/(user)/${id}`)}>
                  <Avatar path={avatar} size={37} />
               </Pressable>
               <View className="">
                  <View className="flex-row items-center gap-2">
                     <Pressable onPress={() => router.push(`/(app)/(user)/${id}`)}>
                        <AppText weight="semi" cap="capitalize">
                           {name.trim()}
                        </AppText>
                     </Pressable>
                     <Octicons name="dot-fill" size={6} className="relative top-[2px]" />
                     <AppText className="top-[2px]">
                        <TimeAgo time={dayjs(date).fromNow()} />
                     </AppText>
                  </View>
                  <Pressable onPress={() => router.push(`/(app)/(user)/${id}`)}>
                     <AppText size="sm" color={appColors.grey}>
                        @{username}
                     </AppText>
                  </Pressable>
               </View>
            </View>
            <Pressable onPress={postInfo} className="h-full relative">
               <ThreeDots color={appColors.grey} />
            </Pressable>
         </View>
      </View>
   );
}
