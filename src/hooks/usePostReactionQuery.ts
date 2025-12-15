import { useApiMutation, useApiQuery } from "@/hooks/useApi";

export type ReactionType = "LIKE" | "LOVE" | "LAUGH" | "ANGRY" | "SAD"|null;

type ReactToPostParams = {
  type?: ReactionType; // default server-side is LIKE
};

export type MyReactionResponse = { 
    liked: boolean;
  type: ReactionType
};

type ReactToPostResponse =
  | { message: string; reacted: true; reaction: { type: ReactionType } }
  | { message: string; reacted: false };


export const useMyPostReactionQuery = (postId: string) => {
  return useApiQuery<MyReactionResponse>(`/post/${postId}/reactions/me`);
};
export const usePostReactionMutation = (postId: string) => {
  return useApiMutation<ReactToPostResponse, ReactToPostParams>(
    "post",
    `/post/${postId}/reactions`,
    {
      invalidateKeys: [
        "/post/feed",                // if your feed shows counts
        `/post/${postId}`,           // post details screen
        `/post/${postId}/reactions`  // if you have a "who reacted" list
      ]
    }
  );
};
