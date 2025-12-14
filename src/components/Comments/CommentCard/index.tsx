import { PostComment, ReplyingTo } from "@/components/Post/type";
import { appColors } from "@/constant/colors";
import { displayName, toPng } from "@/constant/common";
import { useCommentRepliesQuery } from "@/hooks/usePostCommentQuery";
import Icon from "@/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { memo, useEffect, useMemo, useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import AppText from "../../ui/AppText";
import Avatar from "../../ui/Avatar";
import { ReplyRow } from "../CommentRow";

dayjs.extend(relativeTime);

export default memo(function CommentCard({
  comment,
  setReplyTo
}: {
  comment: PostComment;
  setReplyTo: (value: ReplyingTo) => void | null;
}) {
  const { data } = useCommentRepliesQuery(comment.id);

  const [replies, setReplies] = useState(data?.data);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (data) {
      setReplies(data?.data);
    }
  }, [data]);

  const replyCount = replies?.length ?? 0;

  const name = useMemo(() => displayName(comment.author), [comment.author]);

  return (
    <View className="flex-row gap-2">
      <Avatar path={toPng(comment.author.avatarUrl)} size={40} />
      <View className="gap- flex-1">
        <View className="">
          <View className="gap-2">
            <View>
              <View className="flex-row  items-center justify-between gap-1">
                {name}
                <Pressable>
                  <Icon name="threeDots" color={appColors.icon} size={20} />
                </Pressable>
              </View>
              <AppText
                variant="small"
                className="capitalize"
                color={appColors.placeholder}
              >
                @{comment?.author?.username}
              </AppText>
            </View>
            <AppText>{comment.content!}</AppText>
          </View>
          {/* actions */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <AppText variant={"small"} color={appColors.placeholder}>
                {dayjs(comment?.created_at).fromNow(true)} |
              </AppText>

              <TouchableOpacity
                className="my-2 flex-row items-center gap-1"
                onPress={() =>
                  setReplyTo({
                    parentCommentId: comment?.id ?? null,
                    name: `${comment.author.firstName} ${comment.author.lastName}`
                  })
                }
              >
                <AppText variant={"small"} color={appColors.placeholder}>
                  Reply
                </AppText>
              </TouchableOpacity>
            </View>
            <View>
              <Pressable className="flex-row items-center justify-center gap-2">
                <Icon name="thumbsup" size={16} color={appColors.icon} />
                <AppText color={appColors.icon}>0</AppText>
              </Pressable>
            </View>
          </View>
        </View>

        {replies && replies?.length === 0 ? null : (
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => setExpanded(!expanded)}
              className="flex-row items-end"
            >
              <AppText>view</AppText>
              {<Icon name={expanded ? "chevrondown" : "chevronforward"} />}
            </TouchableOpacity>
            <AppText>
              {replyCount > 0 && (
                <AppText>
                  {replyCount === 1 ? "1 reply" : `${replyCount} replies`}
                </AppText>
              )}
            </AppText>
          </View>
        )}
        {expanded &&
          replies?.map(reply => <ReplyRow key={reply.id} reply={reply} />)}
      </View>
    </View>
  );
});
