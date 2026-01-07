import { FriendsApi } from "@/hooks/useFriendsHook";
import { FriendStatus, ProfileRowItem } from "@/hooks/useProfileApi";
import type { InfiniteData } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { cva } from "class-variance-authority";
import {
  ActivityIndicator,
  TouchableOpacity as RNTouchableOpacity
} from "react-native";
import AppText from "../AppText";
import { FriendActionButtonProps } from "./type";

export type ExploreProfilesPage = {
  items: ProfileRowItem[];
  nextCursor?: string | null;
  friendStatus?: FriendStatus;
};
// type FriendStatus =
//   | "NONE"
//   | "PENDING_OUTGOING"
//   | "PENDING_INCOMING"
//   | "FRIENDS";

export const buttonVariants = cva(
  "p-2 rounded-full justify-center items-center",
  {
    variants: {
      variant: {
        profile: "bg-primary text-white font-Medium text-xl",
        search: "bg-yellow-300 border "
      }
    },
    defaultVariants: {
      variant: "search"
    }
  }
);

const buttonTextVariants = cva("font-Medium text-lg", {
  variants: {
    variant: {
      profile: "text-white",
      search: "text-blue-500" // or different
    }
  },
  defaultVariants: { variant: "search" }
});

// export type CustomButtonProps = TouchableOpacityProps &
//   VariantProps<typeof buttonVariants> & {
//     children?: React.ReactNode;
//     color?: string;
//     onPress?: () => void;
//   };

export function FriendActionButton({
  item,
  style,
  variant,
  // className,
  // children,
  // color,
  ...props
}: FriendActionButtonProps) {
  const qc = useQueryClient();

  const sendReq = FriendsApi.useSendRequest(item.id);
  const acceptReq = FriendsApi.useAcceptRequest(item.id);
  const declineReq = FriendsApi.useDeclineRequest(item.id);
  const cancelReq = FriendsApi.useCancelRequest(item.id);
  const unfriend = FriendsApi.useUnfriend(item.id);

  const isBusy =
    sendReq.isPending ||
    acceptReq.isPending ||
    declineReq.isPending ||
    cancelReq.isPending ||
    unfriend.isPending;

  const setRow = (patch: Partial<ProfileRowItem>) => {
    qc.setQueryData<InfiniteData<ExploreProfilesPage>>(["/profile"], old => {
      if (!old) return old;
      return {
        ...old,
        pages: old.pages.map(page => ({
          ...page,
          items: page.items.map((p: ProfileRowItem) =>
            p.id === item.id ? { ...p, ...patch } : p
          )
        }))
      };
    });
  };

  const onPress = async () => {
    // Optimistic + rollback pattern
    const prev = { friendStatus: item.friendStatus, requestId: item.requestId };

    try {
      if (item.friendStatus === "NONE") {
        // optimistic -> Requested
        setRow({ friendStatus: "PENDING_OUTGOING" });

        const created = await sendReq.mutateAsync();
        // if API returns request id, store it
        if (created?.id) {
          console.log("request has been sent", created);
          setRow({ requestId: created.id });
        }

        return;
      }

      if (item.friendStatus === "PENDING_OUTGOING") {
        // cancel
        setRow({ friendStatus: "NONE", requestId: undefined });
        await cancelReq.mutateAsync();
        return;
      }

      if (item.friendStatus === "PENDING_INCOMING") {
        // accept (needs requestId)
        if (!item.requestId)
          throw new Error("Missing requestId for incoming request");
        setRow({ friendStatus: "FRIENDS" });
        await acceptReq.mutateAsync();
        return;
      }

      if (item.friendStatus === "FRIENDS") {
        // unfriend
        setRow({ friendStatus: "NONE", requestId: undefined });
        await unfriend.mutateAsync();
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
      ? "+ Add friend"
      : item.friendStatus === "PENDING_OUTGOING"
        ? "Cancel Requested"
        : item.friendStatus === "PENDING_INCOMING"
          ? "Accept"
          : "Friends";

  // const finalClasses = twMerge(ButtonVariants({ buttonVariant }), className);

  return (
    <RNTouchableOpacity
      {...props}
      style={[style]}
      disabled={isBusy}
      onPress={onPress}
      className={buttonVariants({ variant })}
    >
      <AppText className={buttonTextVariants({ variant })}>
        {isBusy ? <ActivityIndicator size={"small"} /> : label}
      </AppText>
    </RNTouchableOpacity>
  );
}
