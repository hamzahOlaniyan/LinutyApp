import { useApiMutation } from "./useApi";


// type FriendStatus = "NONE" | "PENDING_OUTGOING" | "PENDING_INCOMING" | "FRIENDS";

// type PublicProfileRow = {
//   id: string;
//   name: string;
//   username: string;
//   avatarUrl: string | null;
//   friendStatus: FriendStatus;
//   requestId?: string; // important for accept/decline if incoming (or cancel if outgoing)
// };


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
}