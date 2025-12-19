import { CursorResponse, PostComment } from "@/components/Post/type";
import { Comment } from "../../types/supabaseTypes";
import { useApiMutation, useApiQuery } from "./useApi";
import { MyReactionResponse, ReactionType } from "./usePostApi";

type RepliesQueryOpts = { enabled?: boolean };

export const usePostCommentsQuery = (postId: string) =>
{
  useApiQuery<CursorResponse<Comment>>(
    `/post/${postId}/comment`,
    { limit: 30 },
    { enabled: !!postId }
  );

}

export const useCommentRepliesQuery = (
  commentId: string,
  opts: RepliesQueryOpts = {}
) => {
  const { enabled = true } = opts;

  const { data, isLoading, error, isFetching, refetch } =
    useApiQuery<CursorResponse<PostComment>>(
      `/comments/${commentId}/replies`,
      undefined, // or { limit: 20 }
      { enabled: !!commentId && enabled }
    );

  return { isLoading, data, error, isFetching, refetch };
};


export const useAddCommentMutation = (postId: string) => {
  useApiMutation<{ comment: Comment }, { content: string; parentCommentId?: string }>(
    "post",
    `/post/${postId}/comment`,
    {
      invalidateKeys: [`/post/${postId}/comment`] // plus post details if you show counts there
    }
  );
}
  
export const useAddComment = (postId: string) => {
  return useApiMutation<{ content: string; parentCommentId?: string }>(
    "post",
    `/post/${postId}/comment`,
    {
      invalidateKeys: [`/post/${postId}/comment`, `/post/${postId}`] // adjust to your invalidation logic
    }
  );
};

export const useMyCommentReactionQuery = (commentId
  : string) => {
  return useApiQuery<MyReactionResponse>(`/comments/${commentId}/reactions/me`);
};


export const useReactToComment = (postId: string, commentId: string) => {
  return useApiMutation<ReactionType,{ type?: "LIKE" }>(
    "post",
    `/comments/${commentId}/react`,
    {
      invalidateKeys: [
        `/post/${postId}/comment`, `/post/${postId}`,
        `/comments/${commentId}`,          // if you have comment endpoint
        `/post/${postId}`,                 // if comment counts live on post
        `/post/${postId}/comment`,          // if you fetch comments list here
        `/post/${postId}/comment`,
      ]
    }
  );
};
