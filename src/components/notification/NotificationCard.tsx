import { QueryClient, useQuery } from "@tanstack/react-query";
import React from "react";
import { TouchableOpacity, View } from "react-native";
// import { useAuthStore } from "../context/authStore";
// import { acceptFriendRequest } from "../Services/relationships";
import { appColors } from "@/src/constant/colors";
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

   // useEffect(() => {
   //    if (!profile?.id) return;
   //    markNotificationsAsRead(profile?.id)
   //       .then(() => queryClient.invalidateQueries({ queryKey: ["notification", profile?.id] }))
   //       .catch((err) => console.error("Failed to mark as read", err));
   // }, [profile?.id]);

   // const acceptFriendMutation = useMutation({
   //    mutationFn: async (id: string | null): Promise<any> => {
   //       // return console.log({ follower_id: id, following_id: currentUser?.id });

   //       return acceptFriendRequest({ follower_id: id, following_id: currentUser?.id });
   //    },
   //    onSuccess: async (data) => {
   //       Alert.alert("Success", "Friend request accepted!");
   //       console.log({ data });
   //    },
   //    onError: (error: any) => Alert.alert("Error", error.message),
   // });
   // console.log(JSON.stringify(item, null, 2));

   const {
      data: POST,
      isLoading: commentsLoading,
      error: postDetailError,
   } = useQuery({
      queryKey: ["posts", item?.postId],
      queryFn: () => getPostById(item?.postId),
   });

   // console.log("POST", JSON.stringify(POST, null, 2));

   let unclicked = true;

   return (
      <TouchableOpacity
         onPress={() =>
            router.push({
               pathname: "/(app)/(tabs)",
               params: {
                  postId: POST?.id,
                  openComments: item?.type === "comment" ? "true" : "false",
               },
            })
         }
         style={{ backgroundColor: appColors.selectedTeply }}
         className="px-5 py-3"
      >
         <View className="flex-row justify-between items-center">
            <View className="flex-row gap-3 relative  items-start">
               <Avatar path={item?.sender?.avatarUrl} size={45} />
               <View className="flex-wrap flex-1">
                  <View className="flex-row gap-1 items-center">
                     <AppText size="sm" weight="semi" cap="capitalize">
                        {item?.sender?.firstName} {item?.sender?.lastName}
                        <AppText size="sm" color={appColors.grey}>
                           {" "}
                           {item?.type === "comment"
                              ? "commented on your post:"
                              : item?.type === "like"
                              ? "liked your post"
                              : null}{" "}
                        </AppText>
                        {item?.type === "comment" && <AppText size="sm">{item?.title?.substring(0, 40)}...</AppText>}
                        {item?.type === "like" && <AppText size="sm">{POST?.content?.substring(0, 40)}...</AppText>}
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
