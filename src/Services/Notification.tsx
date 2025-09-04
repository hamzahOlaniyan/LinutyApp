import { supabase } from "../lib/supabase";

export const createNotification = async (notification: any) => {
   const { data, error } = await supabase.from("notification").insert(notification).select("*").single();
   if (error) {
      console.error("Failed to insert notification:", error.message);
      throw error;
   }
   return data;
};

export const getNotfication = async (recieverId: string) => {
   const { data, error } = await supabase
      .from("notification")
      .select("*,sender: senderId(id,full_name,username,avatar_url)")
      .eq("receiverId", recieverId)
      .order("created_at", { ascending: false })
      .throwOnError();
   return data;
};

export const markNotificationsAsRead = async (userId: string) => {
   const { error } = await supabase
      .from("notification")
      .update({ read: true })
      .eq("receiverId", userId)
      .eq("read", false);

   if (error) throw new Error(error.message);
};
