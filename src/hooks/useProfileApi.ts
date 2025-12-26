import { FeedPost } from "@/components/Post/type";
import { useAuthStore } from "@/store/useAuthStore";
import { Profile, ProfileInput } from "../../types/supabaseTypes";
import { useApiMutation, useApiQuery } from "./useApi";



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

export type ProfileWithFriendStatus = Profile & {
  friendStatus: FriendStatus;
  requestId?: string; // only when pending
  friendsCount?:number
  
};


type FeedEnvelope = {
  items: ProfileRowItem[];
  nextCursor: string | null;
};

export type ProfileEnvelop = {
    avatarUrl: string | null;
    bio: string;
    city: string | null;
    country: string | null;
    countryCode: string | null;
    coverUrl: string | null;
    createdAt: string;
    dateOfBirth: string | null;
    district: string | null;
    email: string;
    ethnicity: string | null;
    firstName: string;
    gender: string | null;
    id: string;
    isProfileComplete: boolean;
    isVerified: boolean;
    lastName: string;
    lineageMainSurname: string | null;
    lineageRootVillage: string | null;
    location: string;
    occupation: string | null;
    updatedAt: string;
    userId: string;
    username: string;
    posts: FeedPost[]

}

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

  static useCompleteRegistration = () =>
      useApiMutation<Profile, ProfileInput>(
        "patch",
        `/profile/complete-registration`
      );

}
