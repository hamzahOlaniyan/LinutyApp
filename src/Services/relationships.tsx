import { supabase } from "../lib/supabase";

export const sendFriendRequest = async ({ requester, receiver }: RelationshipInput) => {
   const { data } = await supabase
      .from("relationships")
      .insert({
         requester,
         receiver,
         status: "pending",
      })
      .select()
      .single()
      .throwOnError();
   return data;
};

export const acceptFriendRequest = async ({ id, currentUserId }: RelationshipInput) => {
   const { data } = await supabase
      .from("relationships")
      .update({ status: "accepted" })
      .eq("id", id)
      .eq("receiver", currentUserId)
      .select()
      .single();

   return data;
};

export const rejectFriendRequest = async ({ id, currentUserId }: RelationshipInput) => {
   await supabase
      .from("relationships")
      .update({ status: "rejected" })
      .eq("id", id)
      .eq("receiver", currentUserId)
      .single();
};

export const deleteFriendRequest = async ({ id, currentUserId }: RelationshipInput) => {
   await supabase
      .from("relationships")
      .delete()
      .or(`and(requester.eq.${currentUserId},receiver.eq.${id}),and(requester.eq.${id},receiver.eq.${currentUserId})`)
      .single();
};

export const getFriends = async ({ currentUserId }: RelationshipInput) => {
   const { data } = await await supabase
      .from("relationships")
      .select(
         "id, status, requester( id, username, firstName, lastName, avatarUrl ), receiver( id, username, firstName, lastName, avatarUrl )"
      )
      .or(`requester.eq.${currentUserId},receiver.eq.${currentUserId}`)
      .eq("status", "accepted");

   return data;
};

export const getFriendship = async ({ requester, receiver }: { requester: string; receiver: string }) => {
   const { data, error } = await supabase
      .from("relationships")
      .select("*")
      .in("requester", [requester, receiver])
      .in("receiver", [requester, receiver])
      .limit(1)
      .single();

   return data;
};

export const getRequests = async ({ receiver }: { receiver: string }) => {
   const { data, error } = await supabase
      .from("relationships")
      .select("*,requester( id, username, firstName, lastName, avatarUrl )")
      .eq("receiver", receiver)
      .eq("status", "pending");
   return data;
};
