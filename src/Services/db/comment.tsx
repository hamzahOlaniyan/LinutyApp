import { supabase } from "../../lib/supabase";
// import { CommentInput } from "../types/types";

export const createComment = async (comment: any) => {
   const { data } = await supabase.from("comments").insert(comment).select().single().throwOnError();
   return data;
};

export const fetchComments = async (parentId: string) => {
   const { data, error } = await supabase
      .from("comments")
      .select("*, author:profiles(id, firstName,lastName, username, avatarUrl)")
      .eq("parentId", parentId)
      .order("created_at", { ascending: false });

   if (error) throw error;
   return data;
};
