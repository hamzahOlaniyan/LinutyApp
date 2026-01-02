// import { getPostById } from "@/Services/db/posts";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { NotificationWithRelations } from "@/hooks/useNotificationApi";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import AppText from "../ui/AppText";
import Avatar from "../ui/Avatar";

export default function NotificationCard({
  item
}: {
  item: NotificationWithRelations;
}) {
  const router = useRouter();

  const handleRedirect = async (item: NotificationWithRelations) => {
    try {
      switch (item?.type) {
        case "COMMENT":
          router.push({
            pathname: "/(protected)/(tabs)/(home)",
            params: {
              postId: item?.postId,
              openComments: "true",
              commentId: item?.commentId
            }
          });
          break;
      }
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  // const markAsRead = useMutation({
  //    mutationFn: async () => markNotificationsAsRead(item.id, profile?.id),
  //    onMutate: async (id) => {
  //       const prev = queryClient.getQueryData(["notification", profile?.id]);
  //       queryClient.setQueryData(["notification", profile?.id], (old: any) => {
  //          if (!old || !Array.isArray(old)) return old; // ✅ Prevent error
  //          return old.map((n: any) => (n.id === id ? { ...n, read: true } : n));
  //       });
  //       return { prev };
  //    },

  //    onSuccess: async (id) => {
  //       // await queryClient.cancelQueries({ queryKey: ["notification", profile?.id, id] });
  //       setTimeout(() => {
  //          handleRedirect();
  //       }, 1000);
  //       console.log("📖 read");
  //    },
  //    onError: (error) => {
  //       console.log("❌ errorr marking read", error);
  //    },
  // });

  const name = `${item?.sender?.firstName ?? ""} ${item?.sender?.lastName ?? ""}`;

  return (
    <TouchableOpacity
      onPress={() => handleRedirect(item)}
      style={{
        paddingHorizontal: wp(3),
        backgroundColor: item?.isRead ? "white" : appColors.offWhite,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: appColors.border
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="relative flex-row items-start  gap-3">
          <Avatar path={item?.sender?.avatarUrl} size={45} />
          <View className="flex-1 flex-wrap">
            <View className="gap-2">
              <AppText variant={"small"} className="font-SemiBold capitalize">
                {name}{" "}
                <AppText className="lowercase text-placeholder">
                  commented on your post:{" "}
                  <AppText>{item?.comment?.content.substring(0, 40)}</AppText>
                </AppText>
              </AppText>
              <AppText variant={"xs"} className="text-placeholder">
                {dayjs(item?.created_at).fromNow(true)}
              </AppText>
              {/* <AppText>
                {item?.type === "comment"
                  ? "commented on your post:"
                  : item?.type === "like"
                    ? "liked your post:"
                    : item?.type === "request"
                      ? "sent you a friend request:"
                      : null}{" "}
                {item?.type === "comment" && (
                  <AppText>{item?.title?.substring(0, 40)}...</AppText>
                )}
              </AppText> */}
            </View>
          </View>
          {/* {POST?.images && (
                  // <Image source={[{ uri: POST?.images[0] }]} style={{ width: 50, height: 50, borderRadius: 10 }} />
                  <AppText>Image placeholder</AppText>
               )} */}
        </View>
      </View>
    </TouchableOpacity>
  );
}
