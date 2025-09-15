import { appColors } from "@/src/constant/colors";
import { TimeAgo } from "@/src/hooks/timeAgo";
import { Octicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";

dayjs.extend(relativeTime);

export default function ReplyCard({ reply }: { reply: any }) {
   return (
      <View className="flex-row gap-3 items-center my-2">
         <Avatar path={reply?.author?.avatarUrl} size={35} />
         <View className="flex-1">
            <View className="flex-row">
               <View className="flex-row items-center gap-1">
                  <AppText size="sm" weight="semi" cap="capitalize" color={appColors.grey}>
                     {reply?.author?.firstName}
                     {reply?.author?.lastName}
                  </AppText>
                  <Octicons name="dot-fill" size={5} color={appColors.grey} className="relative top-[2px] " />
                  <TimeAgo time={reply?.created_at} size="sm" color={appColors.grey} />
               </View>
            </View>
            <AppText weight="reg" size="lg">
               {reply?.content}
            </AppText>
         </View>
      </View>
   );
}
