import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createPostLike, getPostLikes, removePostLike } from "../Services/posts";

// Replace with your real Supabase functions:

export const usePostLikes = (post_id: string, profile_id: string) => {
   const queryClient = useQueryClient();
   const [likes, setLikes] = useState([]);

   // ✅ Fetch likes for this specific post only
   const { data } = useQuery({
      queryKey: ["postLikes", post_id],
      queryFn: () => getPostLikes(post_id),
   });

   useEffect(() => {
      if (data) setLikes(data as any);
   }, [data]);

   // ✅ Toggle like for THIS post only
   const handleLike = useMutation({
      mutationFn: async () => {
         const alreadyLiked = likes.some((like: any) => like.userId === profile_id && like.postId === post_id);

         if (alreadyLiked) {
            await removePostLike(post_id, profile_id ?? "");
         } else {
            await createPostLike({ userId: profile_id, postId: post_id });
         }
      },

      onMutate: async () => {
         await queryClient.cancelQueries({ queryKey: ["postLikes", post_id] });

         setLikes((prev: any) => {
            const alreadyLiked = prev.some((like: any) => like.userId === profile_id && like.postId === post_id);

            if (alreadyLiked) {
               // remove like for this post only
               return prev.filter((like: any) => !(like.userId === profile_id && like.postId === post_id));
            } else {
               // add like only for this post
               const newLike = { userId: profile_id, postId: post_id };
               return [...prev, newLike];
            }
         });
      },

      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ["postLikes", post_id] });
      },
   });

   const likeCount = likes.length;
   const isLiked = likes.some((like: any) => like.userId === profile_id && like.postId === post_id);

   return { likeCount, isLiked, handleLike };
};
