import { FriendsEnvelop } from "./type";
import { useApiMutation, useApiQuery } from "./useApi";


export class FriendsApi {
  static useSendRequest = (profileId: string) =>
    useApiMutation<{ id: string }, void>("post", `/friends/requests/${profileId}`);

  static useAcceptRequest = (requestId: string) =>
    useApiMutation<void, void>("post", `/friends/requests/${requestId}/accept`);

  static useDeclineRequest = (requestId: string) =>
    useApiMutation<void, void>("post", `/friends/requests/${requestId}/decline`);

  static useCancelRequest = (profileId: string) =>
    useApiMutation<void, void>("delete", `/friends/requests/${profileId}`);

  static useUnfriend = (profileId: string) =>
    useApiMutation<void, void>("delete", `/friends/${profileId}`);

  static getFriendCount=(profileId:string)=> {
    const {data} = useApiQuery<{count:number}>(`/friends/${profileId}/count`,undefined,{enabled: !!profileId})
    return data
  } 

  static getFriends=(profileId:string)=> {
    const {data} = useApiQuery<FriendsEnvelop>(`/friends/${profileId}`,undefined,{enabled: !!profileId})
    return data
  } 
}