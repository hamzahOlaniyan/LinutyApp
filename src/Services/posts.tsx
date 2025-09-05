import { supabase } from "../lib/supabase";
import { PostInput } from "../types/types";

export const fetchPost = async () => {
   const { data, error } = await supabase
      .from("posts")
      .select("*, author:profiles(id, firstName,lastName, username, avatarUrl)")
      .order("created_at", { ascending: false });

   if (error) throw error;
   return data;
};

export const createPost = async (newPost: PostInput) => {
   const { data, error } = await supabase.from("posts").insert(newPost).select("*").throwOnError();
   return data;
};

export const getPostById = async (id: string) => {
   const { data, error } = await supabase
      .from("posts")
      .select(
         `*,user:profiles(id, full_name, username, avatar_url),comments(
            id,
            content,
            parentId,
            created_at,
            user:profiles(id, full_name, username, avatar_url)
         ),
         postLikes(*)
         `
      )
      .eq("id", id)
      .order("created_at", { ascending: false })
      .single()
      .throwOnError();

   return data;
};

export const getPostsUserById = async (user_id: string) => {
   const { data, error } = await supabase
      .from("posts")
      .select("*, user:profiles(*), comments:posts(count), postLikes(*)")
      .not("user_id", "is", null)
      .eq("user_id", user_id)
      .order("created_at", { ascending: false })
      .throwOnError();
   return data;
};

export const getPostComments = async (id: string) => {
   const { data } = await supabase
      .from("posts")
      .select("*, user:profiles(*), comments:posts(count), postLikes(*)")
      .not("user_id", "is", null)
      .eq("parent_id", id)
      .throwOnError();
   return data;
};

export const createPostLike = async (postLike: any) => {
   const { data } = await supabase.from("postLikes").insert(postLike).select("*").single();
   return data;
};

export const removePostLike = async (postId: string, userId: string) => {
   const { error } = await supabase.from("postLikes").delete().eq("userId", userId).eq("postId", postId).single();
   return { success: true };
};

export async function deletePost(postId: string) {
   const res = await supabase.from("posts").delete().eq("id", postId).is("parent_id", null).single().throwOnError();
   return { success: true };
}

export async function deleteComment(commentId: string) {
   const res = await supabase
      .from("posts")
      .delete()
      .eq("id", commentId)
      .not("parent_id", "is", null)
      .single()
      .throwOnError();
   return { success: true };
}
