import { useApiMutation } from "./useApi";


type FriendStatus = "NONE" | "PENDING_OUTGOING" | "PENDING_INCOMING" | "FRIENDS";

type PublicProfileRow = {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
  friendStatus: FriendStatus;
  requestId?: string; // important for accept/decline if incoming (or cancel if outgoing)
};

export class FriendsApi {

static  FriendsApi (profileId:string) {
   return useApiMutation<PublicProfileRow>('post',`/friends/requests/${profileId}`)
//   useSendRequest: () =>
//     useApiMutation({
//       mutationFn: async (profileId: string) => {
//         const { data } = await api.post(`/friends/requests/${profileId}`);
//         return data; // ideally returns { id: requestId }
//       }
//     }),
}
static useAcceptRequest(requestId: string){
     return useApiMutation<PublicProfileRow>('post',`/friends/requests/${requestId}/accept`)
}

//   useAcceptRequest: () =>
//     useApiMutation({
//       mutationFn: async (requestId: string) => {
//         const { data } = await api.post(`/friends/requests/${requestId}/accept`);
//         return data;
//       }
//     }),

static useDeclineRequest(requestId: string){
     return useApiMutation<PublicProfileRow>('post',`/friends/requests/${requestId}/decline`)
}

//   useDeclineRequest: () =>
//     useApiMutation({
//       mutationFn: async (requestId: string) => {
//         const { data } = await api.post(`/friends/requests/${requestId}/decline`);
//         return data;
//       }
//     }),

static useCancelRequest(profileId: string){
     return useApiMutation<PublicProfileRow>('delete',`/friends/requests/${profileId}`)
}

//   useCancelRequest: () =>
//     useApiMutation({
//       mutationFn: async (profileId: string) => {
//         await api.delete(`/friends/requests/${profileId}`);
//       }
//     }),

    static useUnfriend(profileId: string){
     return useApiMutation<PublicProfileRow>('delete',`/friends/${profileId}`)
}

//   useUnfriend: () =>
//     useApiMutation({
//       mutationFn: async (profileId: string) => {
//         await api.delete(`/friends/${profileId}`);
//       }
//     })
};
