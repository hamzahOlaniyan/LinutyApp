import { Comment } from "@/lib/supabase/supabaseTypes";
import { useAuthStore } from "@/store/useAuthStore";
import { useApiQuery } from "./useApi";

export const USER_PROFILE_KEY = "/feed";

export type CommentEnvelope = {
  data: Comment[];
  nextCursor: string | null;
};


export const useCommentQuery = (postId:string) => {
  const { session } = useAuthStore();

  const accessToken = session?.accessToken; 

  const { data, isLoading, error, isFetching, refetch, } = useApiQuery<CommentEnvelope>(
    `/post/${postId}/comment`,
  { limit: 20 },

    {
      retry: (failureCount, error) => {
        if (error?.response?.status === 401) return false;
        return failureCount < 2;
      },
      staleTime: 0,
      enabled: !!accessToken,
      refetchOnMount: "always",
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );
  return { isLoading, data, error, isFetching, refetch, };
};
