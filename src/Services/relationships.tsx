import { supabase } from "../lib/supabase";

// export const sendFriendRequest = async ({ currentUserId, targetUserId }: RelationshipInput) => {
//    const { data } = await supabase
//       .from("relationships")
//       .insert({
//          requester: currentUserId,
//          receiver: targetUserId,
//          status: "pending",
//       })
//       .select()
//       .single()
//       .throwOnError();
//    return data;
// };

// export const acceptFriendRequest = async ({ friendshipId, currentUserId }: RelationshipInput) => {
//    const { data } = await supabase
//       .from("friendships")
//       .update({ status: "accepted" })
//       .eq("id", friendshipId)
//       .eq("receiver", currentUserId);

//    return data;
// };

// export const rejectFriendRequest = async ({ friendshipId, currentUserId }: RelationshipInput) => {
//    await supabase
//       .from("friendships")
//       .update({ status: "rejected" })
//       .eq("id", friendshipId)
//       .eq("receiver", currentUserId);
// };

// export const deleteFriendRequest = async ({ friendId, currentUserId }: RelationshipInput) => {
//    await supabase
//       .from("friendships")
//       .delete()
//       .or(
//          `and(requester.eq.${currentUserId},receiver.eq.${friendId}),and(requester.eq.${friendId},receiver.eq.${currentUserId})`
//       );
// };

// export const getFriends = async ({ currentUserId }: RelationshipInput) => {
//    const { data } = await supabase
//       .from("relationships")
//       .select(
//          `
//          id,
//          status,
//          follower:profiles!follower_id (
//             id, full_name, username, avatar_url
//          ),
//          following:profiles!following_id (
//             id, full_name, username, avatar_url
//          )
//       `
//       )
//       .or(`follower_id.eq.${currentUserId},following_id.eq.${currentUserId}`)
//       .eq("status", "accepted")
//       .throwOnError();

//    return data;
// };

export const getFriendship = async ({ currentUserId, recieverId }: any) => {
   const { data } = await supabase
      .from("friendships")
      .select("*")
      .or(
         `and(requester.eq.${currentUserId},receiver.eq.${recieverId}),and(requester.eq.${recieverId},receiver.eq.${currentUserId})`
      )
      .maybeSingle();

   return data;
};

// export const getFollower = async ({ currentUserId }: RelationshipInput) => {
//    const { data } = await supabase
//       .from("relationships")
//       .select("following_id")
//       .eq("follower_id", currentUserId)
//       .eq("status", "accepted")
//       .throwOnError();

//    return data;
// };
