import { supabase } from "../lib/supabase";
import { CommentInput } from "../types/types";

export const createComment = async (comment: CommentInput) => {
   const { data } = await supabase.from("comments").insert(comment).select().single().throwOnError();
   return data;
};

export const fetchComments = async (parentId: string) => {
   const { data, error } = await supabase
      .from("comments")
      .select("*, user:profiles(id, full_name, username, avatar_url)")
      .eq("parentId", parentId)
      .order("created_at", { ascending: false });

   if (error) throw error;
   return data;
};
