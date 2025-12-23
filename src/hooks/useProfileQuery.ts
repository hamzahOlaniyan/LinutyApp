import { useAuthStore } from "@/store/useAuthStore";
import { useApiQuery } from "./useApi";



export type FriendStatus =
  | "NONE"
  | "PENDING_OUTGOING"
  | "PENDING_INCOMING"
  | "FRIENDS";

export type ProfileRowItem = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarUrl: string | null;
  friendStatus: FriendStatus;
  requestId?: string;
};


type FeedEnvelope = {
  items: ProfileRowItem[];
  nextCursor: string | null;
};

export const useProfileQuery = () => {
  const { session } = useAuthStore();
    
  const accessToken = session?.access_token; 

  const { data, isLoading, error, isFetching, refetch, } = useApiQuery<FeedEnvelope>(
    '/profile',
  undefined,


  {enabled: !!accessToken,}
);

console.log({error});


  return { isLoading, data, error, isFetching, refetch, };
};