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

  const accessToken = session?.access_token; 

  const { data, isLoading, error, isFetching, refetch, } = useApiQuery<FeedEnvelope>(
    USER_PROFILE_KEY,
  undefined,

    {
      enabled: !!accessToken,
    }
  );
  return { isLoading, data, error, isFetching, refetch, };
};
