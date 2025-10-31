import { appColors } from "@/src/constant/colors";
import { getPostById } from "@/src/Services/posts";
import { useAuthStore } from "@/src/store/authStore";
import { QueryClient, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
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
      enabled: !!item?.postId,
   });

   // const handleRedirect = async () => {
   //    try {
   //       switch (item?.type) {
   //          case "comment":
   //             router.push({
   //                pathname: "/(app)/(tabs)",
   //                params: {
   //                   postId: item?.postId,
   //                   openComments: "true",
   //                },
   //             });
   //             break;

   //          case "request":
   //             router.push({
   //                pathname: "/(app)/(tabs)/(friends)",
   //                params: {
   //                   initialTab: "FriendRequest",
   //                },
   //             });
   //             break;

   //          case "like":
   //             router.push({
   //                pathname: "/(app)/(tabs)",
   //                params: {
   //                   postId: item?.postId,
   //                   scrollToPost: "true",
   //                },
   //             });
   //             break;

   //          default:
   //             console.warn("Unknown notification type:", item?.type);
   //             break;
   //       }
   //    } catch (err) {
   //       console.error("Failed to mark notification as read:", err);
   //    }
   // };

   // const markAsRead = useMutation({
   //    mutationFn: async () => markNotificationsAsRead(item.id, profile?.id),
   //    onMutate: async (id) => {
   //       const prev = queryClient.getQueryData(["notification", profile?.id]);
   //       queryClient.setQueryData(["notification", profile?.id], (old: any) => {
   //          if (!old || !Array.isArray(old)) return old; // ✅ Prevent error
   //          return old.map((n: any) => (n.id === id ? { ...n, read: true } : n));
   //       });
   //       return { prev };
   //    },

   //    onSuccess: async (id) => {
   //       // await queryClient.cancelQueries({ queryKey: ["notification", profile?.id, id] });
   //       setTimeout(() => {
   //          handleRedirect();
   //       }, 1000);
   //       console.log("📖 read");
   //    },
   //    onError: (error) => {
   //       console.log("❌ errorr marking read", error);
   //    },
   // });

   return (
      <TouchableOpacity
         // onPress={() => markAsRead.mutate()}
         style={{ backgroundColor: item?.read ? "yellow" : appColors.selectedTeply }}
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
               {POST?.images && (
                  <Image source={{ uri: POST?.images[0] }} style={{ width: 50, height: 50, borderRadius: 10 }} />
               )}
            </View>
         </View>
      </TouchableOpacity>
   );
}
