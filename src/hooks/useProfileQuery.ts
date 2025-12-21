import { ProfileRowItem } from "@/components/ui/FriendActionButton";
import { useAuthStore } from "@/store/useAuthStore";
import { useApiQuery } from "./useApi";

export type FriendStatus =
  | "NONE"
  | "PENDING_OUTGOING"
  | "PENDING_INCOMING"
  | "FRIENDS";

export type ExploreProfileItem = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarUrl: string | null;

  friendStatus: FriendStatus;
  requestId?: string; // needed for accept/decline (incoming)
};
export const useProfileQuery = () => {
  const { session } = useAuthStore();
    
  const accessToken = session?.accessToken; 

  const { data, isLoading, error, isFetching, refetch, } = useApiQuery<ProfileRowItem[]>(
    '/profile',
  undefined,
  {enabled: !!accessToken,}
);
  return { isLoading, data, error, isFetching, refetch, };
};