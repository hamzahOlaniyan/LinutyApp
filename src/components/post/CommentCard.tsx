import { ThreeDots } from "@/assets/icons/threedots";
import { Thumbsup } from "@/assets/icons/thumbsup";
import { appColors } from "@/src/constant/colors";
import { fetchComments } from "@/src/Services/comment";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";
import ReplyCard from "./ReplyCard";

// type CommentCardProps = {
//    content: string | null;
//    created_at: string;
//    id: string;
//    postId: string | null;
//    userId: string | null;
//    user: {
//       id: string;
//       full_name: string | null;
//       username: string | null;
//       avatar_url: string | null;
//    } | null;
// };

dayjs.extend(relativeTime);

export default function CommentCard({
   item,
   setShowKeyboard,
   setReplyToName,
   setReplyToId,
}: {
   item: any;
   setShowKeyboard?: any;
   setReplyToName?: any;
   setReplyToId?: any;
}) {
   const [modalVisible, setModalVisible] = useState(false);
   const [showReplies, setShowReplies] = useState(false);

   const { data: REPLIES, isLoading } = useQuery({
      queryKey: ["comment-replies", item.id],
      queryFn: () => fetchComments(item?.id),
   });

   return (
      <View className="flex-row gap-5 justify-between items-start w-full">
         <View className="flex-row gap-2">
            <Avatar path={item?.author?.avatarUrl} size={35} />
            <View className="flex-1">
               <View className="flex-row  gap-1 items-center justify-between">
                  <AppText weight="med" color={appColors.lightGrey} cap="capitalize">
                     {item?.author?.firstName} {item?.author?.lastName}
                  </AppText>
                  <Pressable onPress={() => setModalVisible(true)}>
                     <ThreeDots color={appColors.grey} size={24} />
                  </Pressable>
               </View>
               <AppText weight="reg" size="lg">
                  {item.content!!}
               </AppText>
               <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-4">
                     <AppText color={appColors.lightGrey} size="xxs" className="">
                        {dayjs(item?.created_at).fromNow(true)}
                     </AppText>
                     <TouchableOpacity
                        className="flex-row items-center gap-1 my-2"
                        onPress={() => {
                           setShowKeyboard(true);
                           setReplyToName(item?.author?.username);
                           setReplyToId(item?.id);
                        }}
                     >
                        <AppText size="sm" weight="med" color={appColors.grey}>
                           Reply
                        </AppText>
                     </TouchableOpacity>
                  </View>
                  <View>
                     <Pressable className="flex-row gap-2 justify-center items-center">
                        <Thumbsup size={18} color={appColors.grey} />
                        <AppText color={appColors.grey} size="sm">
                           0
                        </AppText>
                     </Pressable>
                  </View>
               </View>
               {REPLIES && REPLIES?.length === 0 ? null : (
                  <TouchableOpacity onPress={() => setShowReplies(!showReplies)} className="flex-row items-center">
                     <AppText color={appColors.grey}>
                        {REPLIES?.length! >= 2 ? `view ${REPLIES?.length!} replies` : `view ${REPLIES?.length!} reply`}
                     </AppText>
                     <MaterialIcons
                        name="navigate-next"
                        size={18}
                        color={appColors.grey}
                        className="relative top-[2px]"
                     />
                  </TouchableOpacity>
               )}
               {showReplies && REPLIES?.reverse().map((reply, idx) => <ReplyCard key={idx} reply={reply} />)}
            </View>
         </View>
      </View>
   );
}
