import { PostComment, ReplyingTo } from "@/components/Post/type";
import { appColors } from "@/constant/colors";
import { displayName, toPng } from "@/constant/common";
import {
  useCommentRepliesQuery,
  useMyCommentReactionQuery,
  useReactToComment
} from "@/hooks/usePostCommentQuery";
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
  setReplyTo: (value: ReplyingTo) => void | null;
  postId: string;
}) {
  const { data } = useCommentRepliesQuery(comment.id);
  const reactToComment = useReactToComment(postId, comment.id);
  const { data: myReaction } = useMyCommentReactionQuery(comment.id);

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

  const [replies, setReplies] = useState(data?.data);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (data) {
      setReplies(data?.data);
    }
  }, [data]);

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
  // const likeCount = comment?.likeCount ?? 0;

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
              <TouchableOpacity
                onPress={handleLike}
                disabled={reactToComment.isPending}
                className="flex-row items-center justify-center gap-2"
              >
                <Icon
                  name={likes?.liked ? "thumbsupSolid" : "thumbsup"}
                  size={18}
                />
                <AppText variant={"small"} color={appColors.secondary}>
                  {likes.count > 0 ? `${likes.count}` : ""}
                </AppText>
              </TouchableOpacity>
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
