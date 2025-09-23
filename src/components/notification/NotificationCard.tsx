import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { TouchableOpacity, View } from "react-native";
// import { useAuthStore } from "../context/authStore";
// import { acceptFriendRequest } from "../Services/relationships";
import { appColors } from "@/src/constant/colors";
import { markNotificationsAsRead } from "@/src/Services/Notification";
import { getPostById } from "@/src/Services/posts";
import { useAuthStore } from "@/src/store/authStore";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";

export default function NotificationCard({ item }: { item: any }) {
   const queryClient = new QueryClient();
   const { profile } = useAuthStore();

   const router = useRouter();

   const {
      data: POST,
      isLoading: commentsLoading,
      error: postDetailError,
   } = useQuery({
      queryKey: ["posts", item?.postId],
      queryFn: () => getPostById(item?.postId),
   });
   // useEffect(() => {
   //    if (!profile?.id) return;
   //    markNotificationsAsRead(profile?.id)
   //       .then(() => queryClient.invalidateQueries({ queryKey: ["notification", profile?.id] }))
   //       .catch((err) => console.error("Failed to mark as read", err));
   // }, [profile?.id]);

   const markAsRead = useMutation({
      mutationFn: async () => markNotificationsAsRead(profile?.id),
      onMutate: async () => {
         await queryClient.cancelQueries({ queryKey: ["relationships", profile?.id] });
      },
      onSuccess: async (id) => {
         await queryClient.cancelQueries({ queryKey: ["relationships", profile?.id, id] });
      },
      onError: (error) => {
         console.log("❌ errorr marking read", error);
      },
   });

   return (
      <TouchableOpacity
         onPress={() => {
            // markAsRead.mutate();
            if (item?.type === "comment")
               router.push({
                  pathname: "/(app)/(tabs)",
                  params: { postId: POST?.id, openComments: item?.type === "comment" ? "true" : "false" },
               });
            if (item?.type === "request")
               router.push({
                  pathname: "/(app)/(tabs)/Friends",
                  params: { initialTab: item?.type === "request" ? "FriendRequest" : undefined },
               });
            return null;
         }}
         style={{ backgroundColor: item?.read === "false" ? "red" : appColors.selectedTeply }}
         className="px-5 py-3"
      >
         <View className="flex-row justify-between items-center">
            <View className="flex-row gap-3 relative  items-start">
               <Avatar path={item?.sender?.avatarUrl} size={45} />
               <View className="flex-wrap flex-1">
                  <View className="flex-row flex-wrap items-center">
                     <AppText weight="semi" cap="capitalize">
                        {item?.sender?.firstName.trim()} {item?.sender?.lastName.trim()}{" "}
                     </AppText>
                     <AppText weight="light">
                        {item?.type === "comment"
                           ? "commented on your post:"
                           : item?.type === "like"
                           ? "liked your post:"
                           : item?.type === "request"
                           ? "sent you a friend request:"
                           : null}{" "}
                        {item?.type === "comment" && <AppText>{item?.title?.substring(0, 40)}...</AppText>}
                        {item?.type === "like" && <AppText>{POST?.content?.substring(0, 40)}...</AppText>}
                     </AppText>
                  </View>
                  <AppText size="xs">{dayjs(item?.created_at).fromNow(true)} ago</AppText>
                  <View className="flex-row gap-1 items-center"></View>
               </View>
               {POST?.images && <Image source={POST?.images[0]} style={{ width: 50, height: 50, borderRadius: 10 }} />}
            </View>
         </View>
      </TouchableOpacity>
   );
}
