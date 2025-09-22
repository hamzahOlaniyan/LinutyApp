import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, View } from "react-native";

type FriendButtonProps = {
   currentUserId: string;
   targetUserId: string;
   status: string;
   friendshipId: string;
};

export default function FriendshipButton({ currentUserId, targetUserId, status, friendshipId }: FriendButtonProps) {
   const queryClient = useQueryClient();

   const sendRequest = useMutation({
      mutationFn: async () => {
         return supabase.from("friendships").insert({
            requester: currentUserId,
            receiver: targetUserId,
            status: "pending",
         });
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["friendRequests"] }),
   });

   const cancelRequest = useMutation({
      mutationFn: async () => {
         return supabase.from("friendships").delete().eq("id", friendshipId);
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["friendRequests"] }),
   });

   const acceptRequest = useMutation({
      mutationFn: async () => {
         return supabase
            .from("friendships")
            .update({ status: "accepted" })
            .eq("id", friendshipId)
            .eq("receiver", currentUserId);
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["friendRequests"] }),
   });

   const rejectRequest = useMutation({
      mutationFn: async () => {
         return supabase
            .from("friendships")
            .update({ status: "rejected" })
            .eq("id", friendshipId)
            .eq("receiver", currentUserId);
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["friendRequests"] }),
   });

   const unfriend = useMutation({
      mutationFn: async () => {
         return supabase.from("friendships").delete().eq("id", friendshipId);
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["friendRequests"] }),
   });

   if (!status) {
      return <Button title="Add Friend" onPress={() => sendRequest.mutate()} />;
   }

   if (status === "pending" && currentUserId === targetUserId) {
      return <Button title="Cancel Request" onPress={() => cancelRequest.mutate()} />;
   }

   if (status === "pending") {
      return (
         <View style={{ flexDirection: "row", gap: 8 }}>
            <Button title="Accept" onPress={() => acceptRequest.mutate()} />
            <Button title="Reject" onPress={() => rejectRequest.mutate()} />
         </View>
      );
   }

   if (status === "accepted") {
      return <Button title="Unfriend" onPress={() => unfriend.mutate()} />;
   }

   return null;
}
