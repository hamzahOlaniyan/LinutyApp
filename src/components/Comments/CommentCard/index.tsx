import { PostComment, ReplyingTo } from "@/components/Post/type";
import { appColors } from "@/constant/colors";
import { toPng } from "@/constant/common";

import { CommentApi } from "@/hooks/useCommentApi";
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
  setReplyTo,
  postId
}: {
  comment: PostComment;
  setReplyTo?: (value: ReplyingTo) => void | null;
  postId?: string | null;
}) {
  const { data: commentReplies } = CommentApi.getReplies(comment?.id);
  const reactToComment = CommentApi.reactToComment(postId ?? "", comment?.id);
  const { data: myReaction } = CommentApi.getMyReaction(comment?.id);

  const [likes, setLikes] = useState<{ count: number; liked: boolean }>({
    count: Number(comment?.likeCount ?? 0),
    liked: false
  });

  useEffect(() => {
    setLikes(prev => ({ ...prev, count: Number(comment?.likeCount ?? 0) }));
  }, [comment.likeCount]);

  useEffect(() => {
    if (!myReaction) return;
    setLikes(prev => ({ ...prev, liked: myReaction.liked }));
  }, [myReaction?.liked]);

  const [replies, setReplies] = useState(commentReplies?.data);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (commentReplies) {
      setReplies(commentReplies?.data);
    }
  }, [commentReplies]);

  const handleLike = () => {
    // optimistic
    setLikes(prev => ({
      count: prev.liked ? Math.max(0, prev.count - 1) : prev.count + 1,
      liked: !prev.liked
    }));

    reactToComment.mutate(
      { type: "LIKE" },
      {
        onError: () => {
          // rollback
          setLikes(prev => ({
            count: prev.liked ? Math.max(0, prev.count - 1) : prev.count + 1,
            liked: !prev.liked
          }));
        }
      }
    );
  };

  const replyCount = replies?.length ?? 0;

  const name = useMemo(
    () => (
      <AppText
        variant={"small"}
        className="flex-1 font-SemiBold capitalize"
      >{`${comment.author.firstName} ${comment.author.lastName}`}</AppText>
    ),
    [comment?.author.firstName, comment.author.lastName]
  );

  return (
    <View className="flex-row gap-2">
      <Avatar path={toPng(comment.author.avatarUrl)} size={40} />
      <View className="gap- flex-1">
        <View className="">
          <View className="gap-2">
            <View>
              <View className="flex-row items-center justify-between gap-1 font-Medium">
                {name}
                <Pressable>
                  <Icon name="threeDots" color={appColors.icon} size={20} />
                </Pressable>
              </View>
              <AppText
                variant="xs"
                className="capitalize"
                color={appColors.placeholder}
              >
                @{comment?.author?.username}
              </AppText>
            </View>
            <AppText>{comment?.content}</AppText>
          </View>
          {/* actions */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <AppText variant={"xs"} color={appColors.placeholder}>
                {dayjs(comment?.created_at).fromNow(true)} |
              </AppText>

              <TouchableOpacity
                className="my-2 flex-row items-center gap-1"
                onPress={() =>
                  setReplyTo?.({
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
              <TouchableOpacity
                onPress={handleLike}
                disabled={reactToComment.isPending}
                className="flex-row items-center justify-center gap-2"
              >
                <Icon
                  name={likes?.liked ? "thumbsupSolid" : "thumbsup"}
                  size={18}
                  color={appColors.icon}
                />
                <AppText variant={"small"} color={appColors.secondary}>
                  {likes.count > 0 ? `${likes.count}` : ""}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {replies && replies?.length === 0 ? null : (
          <View className="flex-row items-center gap-6">
            <AppText variant={"small"} className="font-SemiBold">
              {replyCount === 1 ? "1 reply" : `${replyCount} replies`}
            </AppText>
            <TouchableOpacity
              onPress={() => setExpanded(!expanded)}
              className="flex-row items-center"
            >
              <AppText color={appColors.placeholder} className="font-SemiBold">
                view
              </AppText>
              {
                <Icon
                  name={expanded ? "chevrondown" : "chevronforward"}
                  size={24}
                  color={appColors.placeholder}
                />
              }
            </TouchableOpacity>
          </View>
        )}
        {expanded &&
          replies?.map(reply => (
            <ReplyRow key={reply.id} reply={reply} postId={postId ?? ""} />
          ))}
      </View>
    </View>
  );
});
