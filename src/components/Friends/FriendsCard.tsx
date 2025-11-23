import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
// import { TiktokFont } from "../assets/fonts/FontFamily";
// import { hp } from "../common";
// import { colors } from "../constant/colors";
// import { useAuthStore } from "../context/authStore";
// import { useThemeStore } from "../context/themeStore";
// import { createNotification } from "../Services/Notification";
// import { deleteFriendRequest, sendFriendRequest } from "../Services/relationships";
import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import { Plus } from "@/icons/ico/plus";
import { createNotification } from "@/Services/Notification";
import { deleteFriendRequest, getFriendship, sendFriendRequest } from "@/Services/relationships";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";
import Button from "../ui/Button";

type FriendsCardProps = {
   id: string;
   avatar: string;
   firstName: string;
   lastName: string;
   username: string;
};

export default function FriendsCard({ id, avatar, firstName, lastName, username }: FriendsCardProps) {
   const { profile } = useAuthStore();
   const queryClient = useQueryClient();

   const router = useRouter();

   const [relationship, setRelationship] = useState<any>(null);
   const [notificationReceiver, setNotificationReceiver] = useState("");

   const { data: RELATIONSHIP_DATA } = useQuery({
      queryKey: ["relationships", profile?.id, id],
      queryFn: async () => getFriendship({ requester: profile?.id, receiver: id }),
   });

   useEffect(() => {
      setRelationship(RELATIONSHIP_DATA);
   }, [RELATIONSHIP_DATA]);

   const sendRequest = useMutation({
      mutationFn: async () => sendFriendRequest({ requester: profile?.id, receiver: id }),
      onMutate: async () => {
         await queryClient.cancelQueries({ queryKey: ["relationships", profile?.id, id] });

         const previous = queryClient.getQueryData(["relationships", profile?.id, id]);

         queryClient.setQueryData(["relationships", profile?.id, id], {
            requester: profile?.id,
            receiver: id,
            status: "pending",
         });

         return { previous };
      },
      onSuccess: async () => {
         console.log("✅friend request sent");
         queryClient.invalidateQueries({ queryKey: ["relationships", profile?.id, id] });
         try {
            let notify = {
               senderId: profile?.id,
               receiverId: notificationReceiver,
               type: "request",
            };
            await createNotification(notify);
            console.log("✅ Notification created CREATE=====>", JSON.stringify(notify, null, 2));
         } catch (error) {
            console.log("❌ friend request Notification failed", error);
         }
      },

      onError: (_err, _variables, context) => {
         if (context?.previous) {
            queryClient.setQueryData(["relationships", profile?.id, id], context.previous);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ["relationships", profile?.id, id] });
      },
   });

   const unfriend = useMutation({
      mutationFn: async ({ id }: { id?: string }) => deleteFriendRequest({ id, currentUserId: profile?.id }),
      onMutate: async () => {
         // cancel outgoing fetches
         await queryClient.cancelQueries({ queryKey: ["relationships", profile?.id, id] });

         // snapshot current state
         const previous = queryClient.getQueryData(["relationships", profile?.id, id]);

         // set optimistic state
         queryClient.setQueryData(["relationships", profile?.id, id], {
            requester: profile?.id,
            receiver: id,
            status: "pending",
         });

         return { previous };
      },
      onSuccess: async () => {
         console.log("💔 unfriended");
         queryClient.invalidateQueries({ queryKey: ["relationships", profile?.id, id] });
      },

      onError: (_err, _variables, context) => {
         // rollback if fail
         if (context?.previous) {
            queryClient.setQueryData(["relationships", profile?.id, id], context.previous);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ["relationships", profile?.id, id] });
      },
   });

   let button = (
      <Button
         text="Add friend"
         onPress={() => {
            sendRequest.mutate();
            setNotificationReceiver(id);
         }}
         icon={<Plus color={appColors.blue} size={20} />}
         color={appColors.blue}
         variant="secondary"
         size="xs"
      />
   );

   if (RELATIONSHIP_DATA) {
      if (RELATIONSHIP_DATA?.status === "pending") {
         if (RELATIONSHIP_DATA?.requester === profile?.id) {
            button = (
               <TouchableOpacity
                  onPress={() => {
                     unfriend.mutate({
                        id:
                           RELATIONSHIP_DATA?.receiver === profile?.id
                              ? RELATIONSHIP_DATA?.requester
                              : RELATIONSHIP_DATA?.receiver,
                     });
                  }}
                  style={{
                     borderWidth: 1.5,
                     height: hp(4),
                     alignItems: "center",
                     justifyContent: "center",
                     paddingHorizontal: 8,
                     borderRadius: 50,
                  }}
               >
                  {unfriend.isPending ? (
                     <ActivityIndicator />
                  ) : (
                     <AppText size="sm" weight="med">
                        Cancel Request
                     </AppText>
                  )}
               </TouchableOpacity>
               // <Button
               //    text="Cancel Request"
               //    size="xs"
               //    onPress={() =>
               //       unfriend.mutate({
               //          id:
               //             RELATIONSHIP_DATA.receiver === profile?.id
               //                ? RELATIONSHIP_DATA.requester
               //                : RELATIONSHIP_DATA.receiver,
               //       })
               //    }
               // />
            );
         }
         // else if (RELATIONSHIP_DATA.receiver === profile?.id) {
         //    button = (
         //       <View style={{ flexDirection: "row", gap: 8 }}>
         //          <Button text="Accept" size="xs" onPress={() => acceptRequest.mutate()} />
         //          <Button text="Reject" size="xs" onPress={() => rejectRequest.mutate()} />
         //       </View>
         //    );
         // }
         // } else if (RELATIONSHIP_DATA.status === "accepted") {
         //    button = <Button text="Unfriend" size="xs" onPress={() => unfriend.mutate()} />;
         // }
      }
   }

   return (
      <>
         <View className="flex-row flex-1 justify-between items-center">
            <View className="flex-row flex-1 gap-3 items-center">
               {/* <TouchableOpacity onPress={() => router.push(`/(user)/${id}`)}> */}
               <Avatar
                  path={avatar || ""}
                  size={50}
                  initails={firstName.slice(0, 1).trim() + lastName.slice(0, 1).trim()}
               />
               {/* </TouchableOpacity> */}
               <View>
                  <AppText weight="med" cap="capitalize">
                     {firstName} {lastName}
                  </AppText>
                  <AppText size="sm" color={appColors.secondary}>
                     @{username}
                  </AppText>
               </View>
            </View>
            <View>{button}</View>
         </View>
      </>
   );
}
