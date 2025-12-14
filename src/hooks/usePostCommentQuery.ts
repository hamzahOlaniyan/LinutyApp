import { CursorResponse, PostComment } from "@/components/Post/type";
import { useApiMutation, useApiQuery } from "./useApi";


export const usePostCommentsQuery = (postId: string) =>
{
  useApiQuery<CursorResponse<Comment>>(
    `/post/${postId}/comment`,
    { limit: 30 },
    { enabled: !!postId }
  );

}



export const useCommentRepliesQuery = (commentId:string) => {
    const { data, isLoading, error, isFetching, refetch, } =
    useApiQuery<CursorResponse<PostComment>>(
      `/comments/${commentId}/replies`,
      // { limit: 20 },
      { enabled: !!commentId }
    );
  return { isLoading, data, error, isFetching, refetch, };
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
