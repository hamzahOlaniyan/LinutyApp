import { useAuthStore } from "@/store/useAuthStore";
import { Profile } from "../../types/supabaseTypes";
import { useApiQuery } from "./useApi";

export const useProfileQuery = () => {
  const { session } = useAuthStore();
    
  const accessToken = session?.accessToken; 

  const { data, isLoading, error, isFetching, refetch, } = useApiQuery<Profile[]>(
    '/profile',
  undefined,
  {enabled: !!accessToken,}
);
  return { isLoading, data, error, isFetching, refetch, };
};