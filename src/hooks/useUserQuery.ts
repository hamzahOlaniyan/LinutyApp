import { useAuthStore } from "@/store/useAuthStore";
import { User } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useApiQuery } from "./useApi";

export const USER_PROFILE_KEY = "/profile/me";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const useUserQuery = () => {
  const { user, setUser } = useAuthStore();

  const { data, isError, isLoading } = useApiQuery<ApiResponse<User>>(
    USER_PROFILE_KEY,
    undefined,
    {
      retry: (failureCount, error) => {
        if (error?.response?.status === 401) return false;
        return failureCount < 2;
      },
      staleTime: 1000 * 60 * 5,
      enabled: !!user,
    },
  );

  useEffect(() => {
    const freshUser = data?.data;
    if (freshUser && JSON.stringify(freshUser) !== JSON.stringify(user)) {
      console.log("Syncing fresh user data");
      setUser(freshUser);
    }

    if (isError && user) {
      console.log("Token invalid, clearing user session");
      setUser(null);
    }
  }, [data, isError, user, setUser]);

  return { isLoading };
};
