import { FeedPost } from "@/components/Post/type";
import { useAuthStore } from "@/store/useAuthStore";
import { useApiQuery } from "./useApi";

export const USER_PROFILE_KEY = "/feed";

type FeedEnvelope = {
  data: FeedPost[];
  nextCursor: string | null;
};


export const useFeedQuery = () => {
  const { session } = useAuthStore();

  const accessToken = session?.accessToken; 

  const { data, isLoading, error, isFetching, refetch, } = useApiQuery<FeedEnvelope>(
    USER_PROFILE_KEY,
  undefined,

    {
      // retry: (failureCount, error) => {
      //   if (error?.response?.status === 401) return false;
      //   return failureCount < 2;
      // },
      // staleTime: 0,
      enabled: !!accessToken,
      // refetchOnMount: "always",
      // refetchOnReconnect: true,
      // refetchOnWindowFocus: true,
    }
  );
  return { isLoading, data, error, isFetching, refetch, };
};
