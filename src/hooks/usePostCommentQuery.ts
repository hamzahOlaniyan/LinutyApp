import { CursorResponse } from "@/components/Post/type";
import { useApiMutation, useApiQuery } from "./useApi";

export const usePostCommentsQuery = (postId: string) =>
  useApiQuery<CursorResponse<Comment>>(
    `/post/${postId}/comment`,
    { limit: 30 },
    { enabled: !!postId }
  );

export const useCommentRepliesQuery = (commentId: string, enabled: boolean) =>
  useApiQuery<CursorResponse<Comment>>(
    `/comment/${commentId}/replies`,
    { limit: 20 },
    { enabled: !!commentId && enabled }
  );

export const useAddCommentMutation = (postId: string) =>
  useApiMutation<{ comment: Comment }, { content: string; parentId?: string }>(
    "post",
    `/post/${postId}/comment`,
    {
      invalidateKeys: [`/post/${postId}/comment`] // plus post details if you show counts there
    }
  );

  
