import { FriendsApi } from "@/hooks/FriendsHook";
import { useQueryClient } from "@tanstack/react-query";
import { TouchableOpacity } from "react-native";
import AppText from "../AppText";

type FriendStatus =
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

export function FriendActionButton({ item }: { item: ProfileRowItem }) {
  const qc = useQueryClient();

  const sendReq = FriendsApi.useSendRequest();
  const acceptReq = FriendsApi.useAcceptRequest();
  const declineReq = FriendsApi.useDeclineRequest();
  const cancelReq = FriendsApi.useCancelRequest();
  const unfriend = FriendsApi.useUnfriend();

  const isBusy =
    sendReq.isPending ||
    acceptReq.isPending ||
    declineReq.isPending ||
    cancelReq.isPending ||
    unfriend.isPending;

  const setRow = (patch: Partial<ProfileRowItem>) => {
    qc.setQueryData<ProfileRowItem[]>(["/profile"], old => {
      if (!old) return old;

      return old.map(p => (p.id === item.id ? { ...p, ...patch } : p));
    });
  };

  const onPress = async () => {
    // Optimistic + rollback pattern
    const prev = { friendStatus: item.friendStatus, requestId: item.requestId };

    try {
      if (item.friendStatus === "NONE") {
        // optimistic -> Requested
        setRow({ friendStatus: "PENDING_OUTGOING" });

        const created = await sendReq.mutateAsync(item.id);
        // if API returns request id, store it
        if (created?.id) setRow({ requestId: created.id });

        return;
      }

      if (item.friendStatus === "PENDING_OUTGOING") {
        // cancel
        setRow({ friendStatus: "NONE", requestId: undefined });
        await cancelReq.mutateAsync(item.id);
        return;
      }

      if (item.friendStatus === "PENDING_INCOMING") {
        // accept (needs requestId)
        if (!item.requestId)
          throw new Error("Missing requestId for incoming request");
        setRow({ friendStatus: "FRIENDS" });
        await acceptReq.mutateAsync(item.requestId);
        return;
      }

      if (item.friendStatus === "FRIENDS") {
        // unfriend
        setRow({ friendStatus: "NONE", requestId: undefined });
        await unfriend.mutateAsync(item.id);
        return;
      }
    } catch (e) {
      // rollback
      setRow(prev);
      console.log(e);
    }
  };

  const label =
    item.friendStatus === "NONE"
      ? "Add"
      : item.friendStatus === "PENDING_OUTGOING"
        ? "Requested"
        : item.friendStatus === "PENDING_INCOMING"
          ? "Accept"
          : "Friends";

  return (
    <TouchableOpacity
      disabled={isBusy}
      onPress={onPress}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        opacity: isBusy ? 0.6 : 1,
        borderWidth: 1
      }}
    >
      <AppText>{isBusy ? "..." : label}</AppText>
    </TouchableOpacity>
  );
}
