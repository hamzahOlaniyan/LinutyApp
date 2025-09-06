import { supabase } from "../lib/supabase";
import { RelationshipInput } from "../types/types";

export const sendFriendRequest = async ({ follower_id, following_id, status = "pending" }: RelationshipInput) => {
   const { data } = await supabase
      .from("relationships")
      .insert([
         {
            follower_id,
            following_id,
            status,
         },
      ])
      .select()
      .single()
      .throwOnError();
   return data;
};

export const acceptFriendRequest = async ({ follower_id, following_id }: RelationshipInput) => {
   const { data } = await supabase.from("relationships").update({ status: "accepted" }).match({
      follower_id: follower_id,
      following_id: following_id,
      status: "pending",
   });
   return data;
};

export const deleteFriendRequest = async ({ follower_id, following_id }: RelationshipInput) => {
   await supabase.from("relationships").delete().match({
      follower_id,
      following_id,
   });
};

export const getFriends = async ({ currentUserId }: RelationshipInput) => {
   const { data } = await supabase
      .from("relationships")
      .select(
         `
         id,
         status,
         follower:profiles!follower_id (
            id, full_name, username, avatar_url
         ),
         following:profiles!following_id (
            id, full_name, username, avatar_url
         )
      `
      )
      .or(`follower_id.eq.${currentUserId},following_id.eq.${currentUserId}`)
      .eq("status", "accepted")
      .throwOnError();

   return data;
};

export const getFollower = async ({ currentUserId }: RelationshipInput) => {
   const { data } = await supabase
      .from("relationships")
      .select("following_id")
      .eq("follower_id", currentUserId)
      .eq("status", "accepted")
      .throwOnError();

   return data;
};
