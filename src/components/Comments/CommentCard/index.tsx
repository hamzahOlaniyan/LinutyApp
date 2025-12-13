import { appColors } from "@/constant/colors";
// import { ThreeDots } from "@/icons/ico/threedots";
// import { Thumbsup } from "@/icons/ico/thumbsup";
import { UiComment } from "@/components/Post/type";
import Icon from "@/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import AppText from "../../ui/AppText";
import Avatar from "../../ui/Avatar";
// import ReplyCard from "./ReplyCard";

dayjs.extend(relativeTime);

export default function CommentCard({
  item
  // setShowKeyboard,
  // setReplyToName,
  // setReplyToId,
}: {
  item: UiComment;
  // setShowKeyboard?: any;
  // setReplyToName?: any;
  // setReplyToId?: any;
}) {
  // const [modalVisible, setModalVisible] = useState(false);
  // const [showReplies, setShowReplies] = useState(false);

  // const { data: REPLIES, isLoading } = useQuery({
  //    queryKey: ["comment-replies", item.id],
  //    queryFn: () => fetchComments(item?.id),
  // });

  return (
    <View className="w-full flex-row items-start justify-between gap-5">
      <View className="flex-row gap-2">
        <Avatar path={item?.author?.avatarUrl} size={40} />
        <View className="flex-1">
          <View className="gap-3">
            <View>
              <View className="flex-row  items-center justify-between gap-1">
                <AppText>
                  {item?.author?.firstName}
                  {item?.author?.lastName}
                </AppText>
                <Pressable>
                  <Icon name="threeDots" color={appColors.icon} size={20} />
                </Pressable>
              </View>
              <AppText className="capitalize" color={appColors.placeholder}>
                @{item?.author?.username}
              </AppText>
            </View>
            <AppText>{item.content!}</AppText>
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <AppText color={appColors.placeholder}>
                {dayjs(item?.created_at).fromNow(true)} |
              </AppText>

              <TouchableOpacity
                className="my-2 flex-row items-center gap-1"
                //  onPress={() => {
                //    setShowKeyboard(true);
                //    setReplyToName(item?.author?.username);
                //    setReplyToId(item?.id);
                //  }}
              >
                <AppText color={appColors.placeholder}>Reply</AppText>
              </TouchableOpacity>
            </View>
            <View>
              <Pressable className="flex-row items-center justify-center gap-2">
                <Icon name="thumbsup" size={16} color={appColors.icon} />
                <AppText color={appColors.icon}>0</AppText>
              </Pressable>
            </View>
          </View>
          {/* {REPLIES && REPLIES?.length === 0 ? null : (
            <TouchableOpacity
              onPress={() => setShowReplies(!showReplies)}
              className="flex-row items-center"
            >
              <AppText color={appColors.lightGrey}>
                {REPLIES?.length! >= 2
                  ? `view ${REPLIES?.length!} replies`
                  : `view ${REPLIES?.length!} reply`}
              </AppText>
              <MaterialIcons
                name="navigate-next"
                size={18}
                color={appColors.icons}
                className="relative top-[2px]"
              />
            </TouchableOpacity>
          )}
          {showReplies &&
            REPLIES?.reverse().map((reply, idx) => (
              <ReplyCard key={idx} reply={reply} />
            ))} */}
        </View>
      </View>
    </View>
  );
}
