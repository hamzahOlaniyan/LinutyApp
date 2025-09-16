import { QueryClient, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";
import { View } from "react-native";
// import { useAuthStore } from "../context/authStore";
// import { acceptFriendRequest } from "../Services/relationships";
import { appColors } from "@/src/constant/colors";
import { getPostById } from "@/src/Services/posts";
import { useAuthStore } from "@/src/store/authStore";
import { Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";

export default function NotificationCard({ item, router }: { item: any; router?: any }) {
   const queryClient = new QueryClient();
   const { profile } = useAuthStore();

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

   console.log("POST", JSON.stringify(POST, null, 2));

   return (
      <>
         {/* {item?.type === "comment" ? ( */}
         <View className="">
            <View className="w-full flex-row gap-3 items-start justify-start">
               <Avatar path={item?.sender?.avatarUrl} size={45} />
               <View>
                  <View className="flex-row gap-1 items-center">
                     <View className="flex-row items-center gap-1">
                        <AppText weight="bold" cap="capitalize">
                           {item?.sender?.firstName}
                        </AppText>
                        <AppText weight="bold" cap="capitalize">
                           {item?.sender?.lastName}
                        </AppText>
                     </View>
                     <Octicons name="dot-fill" color={appColors.grey} className="relative top-[2px]" />
                     <AppText size="xs">{dayjs(item?.created_at).fromNow(true)} ago</AppText>
                  </View>
                  <View className="flex-row gap-1 items-center">
                     <AppText color={appColors.grey}>commented on your post</AppText>
                  </View>
                  <AppText>{item.title}</AppText>
               </View>
            </View>
            <Image source={{ uri: POST?.images[0] }} style={{ width: 50, height: 50 }} />
            {/* <Text>{JSON.stringify(item, null, 2)}</Text> */}

            {/* <Button title="Accept" size="xs" onPress={() => acceptFriendMutation.mutate(item?.senderId)} /> */}
         </View>
         {/* ) : (
            <View>
               <AppText>like</AppText>
            </View>
         )} */}
      </>
   );
}
