import { Profile } from "@/lib/supabase/supabaseTypes";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useApiQuery } from "./useApi";

export const USER_PROFILE_KEY = "/profile/me";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const useMeQuery = () => {
  const { accessToken, me, setMe } = useAuthStore();

  const { data, isError, isLoading } = useApiQuery<ApiResponse<Profile>>(
    USER_PROFILE_KEY, // "/profile/me"
    undefined,
    {
      enabled: !!accessToken,
      staleTime: 0,                  // never stale → always re-fetch
      refetchOnMount: "always",
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,

      // staleTime: 1000 * 60 * 5,
      retry: (count, error) => error?.response?.status !== 401 && count < 2
    }
  );

  useEffect(() => {
    // data?.data is the actual profile object
    if (data?.data && JSON.stringify(data.data) !== JSON.stringify(me)) {
      // console.log("🔄 Updating Me (profile):", data.data);
      setMe(data.data);
    }

    if (isError && me) {
      // console.log("Profile/me error → clearing me");
      setMe(null);
    }
  }, [data, isError, me, setMe]);

  return { isLoading };
};


