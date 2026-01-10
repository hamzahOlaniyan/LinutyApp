import { PostComment } from "@/components/Post/type";
import { useAuthStore } from "@/store/useAuthStore";
import { useApiQuery } from "./useApi";

export const USER_PROFILE_KEY = "/feed";

export type CommentEnvelope = {
  data: PostComment[];
  nextCursor: string | null;
};


export const usePostComments = (postId: string) => {
  const { session } = useAuthStore();
  const accessToken = session?.access_token;

  return useApiQuery<CommentEnvelope>(
    `/post/${postId}/comment`,
   undefined,
    {
      // retry: (failureCount, error) => {
      //   if (error?.response?.status === 401) return false;
      //   return failureCount < 2;
      // },
      // staleTime: 0,
      enabled: !!accessToken && !!postId, // ✅ IMPORTANT
      // refetchOnMount: "always",
      // refetchOnReconnect: true,
      // refetchOnWindowFocus: true
    }
  );
};
