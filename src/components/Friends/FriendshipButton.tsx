import { appColors } from "@/constant/colors";
import { Plus } from "@/icons/ico/plus";
import { deleteFriendRequest, getFriendship, sendFriendRequest } from "@/Services/db/relationships";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Button from "../ui/Button";

type FriendButtonProps = {
   profile?: string;
   friendId?: string;
   color?: boolean;
   size?: "xs" | "sm" | "lg";
   icon?: boolean;
};

export default function FriendshipButton({ profile, friendId, color, size = "xs", icon = false }: FriendButtonProps) {
   const [relationship, setRelationship] = useState<any>(null);
   const queryClient = useQueryClient();

   const { data } = useQuery({
      queryKey: ["relationships", profile, friendId],
      queryFn: async () => getFriendship({ requester: profile as string, receiver: friendId as string }),
   });

   useEffect(() => {
      if (data) {
         setRelationship(data);
      }
   }, [data]);

   const sendRequest = useMutation({
      mutationFn: async () => sendFriendRequest({ requester: profile, receiver: friendId }),
      onMutate: async () => {
         await queryClient.cancelQueries({ queryKey: ["relationships", profile, friendId] });
         const previous = queryClient.getQueryData(["relationships", profile, friendId]);

         const optimistic = {
            requester: profile,
            receiver: friendId,
            status: "pending",
         };
         queryClient.setQueryData(["relationships", profile, friendId], optimistic);
         setRelationship(optimistic);

         return { previous };
      },
      onSuccess: async () => {
         console.log("✅friend request sent");
         queryClient.invalidateQueries({ queryKey: ["relationships", profile, friendId] });
      },

      onError: (_err, _variables, context) => {
         if (context?.previous) {
            queryClient.setQueryData(["relationships", profile, friendId], context.previous);
         }
      },
   });

   const unfriend = useMutation({
      mutationFn: async ({ id }: { id?: string }) => deleteFriendRequest({ id, currentUserId: profile }),
      onMutate: async () => {
         await queryClient.cancelQueries({ queryKey: ["relationships", profile, friendId] });
         const previous = queryClient.getQueryData(["relationships", profile, friendId]);
         queryClient.setQueryData(["relationships", profile, friendId], null);
         setRelationship(null);
         return { previous };
      },
      onSuccess: async () => {
         console.log("💔 unfriended");
         queryClient.invalidateQueries({ queryKey: ["relationships", profile, friendId] });
      },

      onError: (_err, _variables, context) => {
         if (context?.previous) {
            queryClient.setQueryData(["relationships", profile, friendId], context.previous);
         }
      },
   });

   if (relationship) {
      if (relationship?.status === "pending") {
         if (relationship?.requester === profile) {
            return (
               <Button
                  text="Cancel Request"
                  onPress={() => {
                     unfriend.mutate({
                        id: relationship?.receiver === profile ? relationship?.requester : relationship?.receiver,
                     });
                  }}
                  variant="outline"
                  size={size}
               />
            );
         }
      }
   }

   if (relationship?.receiver === profile) {
      return (
         <View style={{ flexDirection: "row", gap: 8 }}>
            <Button variant="secondary" text="Accept" size={size} color={appColors.success} />
            <Button variant="outline" text="Reject" size={size} color={appColors.warning} />
         </View>
      );
   }

   if (relationship?.status === "accepted") {
      return <Button text="Unfriend" size={size} />;
   }

   return (
      <Button
         text="Follow"
         onPress={() => {
            sendRequest.mutate();
         }}
         variant="secondary"
         size={size}
         icon={icon && <Plus color={appColors.blue} />}
         color={color ? appColors.blue : ""}
      />
   );
}
