import { Profile } from "@/lib/supabase/supabaseTypes";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { ApiError, useApiQuery } from "./useApi";

export const USER_PROFILE_KEY = "/profile/me";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const useMeQuery = () => {
  const { session, me, setMe } = useAuthStore();

  const { data, isError, isLoading } = useApiQuery<Profile>(
    USER_PROFILE_KEY,         // "/profile/me"
    undefined,
    {
      enabled: !!session?.access_token,
      staleTime: 1000 * 60 * 5,
      retry: (failureCount: number, error: ApiError) => {
        if (error?.response?.status === 401) return false;
        return failureCount < 2;
      },
    },
  );

  useEffect(() => {
    if (data && JSON.stringify(data) !== JSON.stringify(me)) {
      setMe(data);            // 👈 data is Me
    }

    if (isError && me) {
      setMe(null);
    }
  }, [data, isError, me, setMe]);

  return { isLoading };
};

