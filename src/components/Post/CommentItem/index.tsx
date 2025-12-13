// import AppText from "@/components/ui/AppText";
// import { useCommentRepliesQuery } from "@/hooks/usePostCommentQuery";
// import moment from "moment";
// import React, { memo, useCallback, useMemo, useState } from "react";
// import { Image, Pressable, View } from "react-native";
// import { PostComment } from "../type";

// function displayName(author: PostComment["author"]) {
//   const full = `${author.firstName ?? ""} ${author.lastName ?? ""}`.trim();
//   return full || (author.username ? `@${author.username}` : "Unknown");
// }

// function toPng(url?: string | null) {
//   if (!url) return null;
//   return url.includes("/svg?") ? url.replace("/svg?", "/png?") : url;
// }

// const ReplyRow = memo(function ReplyRow({ reply }: { reply: PostComment }) {
//   const name = displayName(reply.author);
//   const avatarUri = toPng(reply.author.avatarUrl);

//   return (
//     <View className="flex-row py-2">
//       <View className="bg-muted h-8 w-8 overflow-hidden rounded-full">
//         {avatarUri ? (
//           <Image source={{ uri: avatarUri }} className="h-8 w-8" />
//         ) : null}
//       </View>

//       <View className="ml-3 flex-1">
//         <View className="flex-row items-center justify-between">
//           <AppText className="font-Semibold">{name}</AppText>
//           <AppText className="text-muted-foreground">
//             {moment(reply.createdAt).fromNow()}
//           </AppText>
//         </View>

//         <AppText className="mt-1 leading-6">{reply.content}</AppText>
//       </View>
//     </View>
//   );
// });

// type Props = {
//   comment: PostComment; // top-level comment
//   onReply: (parent: { id: string; name: string }) => void;
// };

// export default memo(function CommentItem({ comment, onReply }: Props) {
//   const [expanded, setExpanded] = useState(false);

//   const replyCount = comment._count?.replies ?? 0;

//   // only fetch replies when expanded
//   const {
//     data: repliesRes,
//     isLoading,
//     refetch
//   } = useCommentRepliesQuery(comment.id, expanded);

//   const replies = repliesRes?.data ?? [];

//   const name = useMemo(() => displayName(comment.author), [comment.author]);
//   const avatarUri = toPng(comment.author.avatarUrl);

//   const toggleReplies = useCallback(() => {
//     setExpanded(prev => !prev);
//   }, []);

//   return (
//     <View className="py-3">
//       {/* parent comment row */}
//       <View className="flex-row">
//         <View className="bg-muted h-9 w-9 overflow-hidden rounded-full">
//           {avatarUri ? (
//             <Image source={{ uri: avatarUri }} className="h-9 w-9" />
//           ) : null}
//         </View>

//         <View className="ml-3 flex-1">
//           <View className="flex-row items-center justify-between">
//             <AppText className="font-Semibold">{name}</AppText>
//             <AppText className="text-muted-foreground">
//               {moment(comment.createdAt).fromNow()}
//             </AppText>
//           </View>

//           <AppText className="mt-1 leading-6">{comment.content}</AppText>

//           {/* actions */}
//           <View className="mt-2 flex-row items-center gap-4">
//             <Pressable
//               onPress={() => onReply({ id: comment.id, name })}
//               hitSlop={10}
//             >
//               <AppText className="text-muted-foreground">Reply</AppText>
//             </Pressable>

//             {/* show/hide replies toggle + count */}
//             {replyCount > 0 ? (
//               <Pressable onPress={toggleReplies} hitSlop={10}>
//                 <AppText className="text-muted-foreground">
//                   {expanded ? "Hide replies" : `View replies (${replyCount})`}
//                 </AppText>
//               </Pressable>
//             ) : null}

//             {/* optional: refresh replies while expanded */}
//             {expanded ? (
//               <Pressable onPress={() => refetch()} hitSlop={10}>
//                 <AppText className="text-muted-foreground">
//                   {isLoading ? "Loading…" : "Refresh"}
//                 </AppText>
//               </Pressable>
//             ) : null}
//           </View>

//           {/* replies shown UNDER the comment (indented) */}
//           {expanded ? (
//             <View className="border-border mt-2 border-l pl-6">
//               {isLoading && replies.length === 0 ? (
//                 <AppText className="text-muted-foreground py-2">
//                   Loading replies…
//                 </AppText>
//               ) : null}

//               {replies.map((r: any) => (
//                 <ReplyRow key={r.id} reply={r} />
//               ))}

//               {/* if replyCount > replies.length, later we can add "View more replies" with cursor */}
//               {replyCount > replies.length ? (
//                 <AppText className="text-muted-foreground py-2">
//                   Showing {replies.length} of {replyCount} replies
//                 </AppText>
//               ) : null}
//             </View>
//           ) : null}
//         </View>
//       </View>
//     </View>
//   );
// });
