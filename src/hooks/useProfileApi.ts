import { FeedPost } from "@/components/Post/type";
import { useAuthStore } from "@/store/useAuthStore";
import { FeedEnvelope, ProfileWithFriendStatus } from "./type";
import { useApiQuery } from "./useApi";



export class ProfileApi {

  static  useProfileQuery = () => {
    const { session } = useAuthStore();
    const accessToken = session?.access_token; 
    const { data, isLoading, error, isFetching, refetch, } = useApiQuery<FeedEnvelope>(
      '/profile',
    undefined,
    {enabled: !!accessToken,}
  );
    return { isLoading, data, error, isFetching, refetch, };
  };
  
  static useGetProfileById = (profileId:string) => {
    const { session } = useAuthStore();
    const accessToken = session?.access_token; 
    const { data, isLoading, error, isFetching, refetch, } = useApiQuery<ProfileWithFriendStatus>(
      `/profile/${profileId}`,
    undefined,
    {enabled: !!accessToken,}
  );
    return { isLoading, data, error, isFetching, refetch, };
  };

  
  static getPostsByProfileId(profileId:string){
    const { session } = useAuthStore();
    const accessToken = session?.access_token; 
    const { data, isLoading, error, isFetching, refetch, }= useApiQuery<FeedPost[]>(`/profile/post/${profileId}`,{enabled: !!accessToken && !!profileId}
    );
  return { isLoading, data, error, isFetching, refetch, };
  }

}

