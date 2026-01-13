import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { Profile } from "../../types/supabaseTypes";
import { ApiError, useApiQuery } from "./useApi";


export const useMeQuery = () => {
  const { me, setMe, session } = useAuthStore();

  const accessToken = session?.access_token;   

  const { data, isLoading, error } = useApiQuery<Profile>(
    "/profile/me",
    undefined,
    {
    //   retry: (failureCount, error) => {
    //     if (error?.response?.status === 401) return false;
    //     return failureCount < 2;
    //   },
      // staleTime: 0,
      enabled: !!accessToken,
      //  refetchOnMount: "always",
      // refetchOnReconnect: true,
      // refetchOnWindowFocus: true,
    }
  );


  useEffect(() => {
    if(data) setMe(data)
    const status = (error as ApiError | undefined)?.response?.status;

    if (status === 401) {
      setMe(null);
    }
  }, [data, error, me, setMe]);

  return { isLoading };
};
