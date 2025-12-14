// import { ReplyingTo } from "@/app/(protected)/post/[postId]/comment";
import { ReplyingTo } from "@/components/Post/PostAction";
import AppText from "@/components/ui/AppText";
import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

export default function CommentInput({
  onSend,
  // onCancelReply,
  isSending,
  replyingTo
}: {
  replyingTo: ReplyingTo;
  // onCancelReply: () => void;
  onSend: (content: string) => void;
  isSending?: boolean;
}) {
  const [text, setText] = useState("");
  // const inputRef = useRef<TextInput>(null);

  // useEffect(() => {
  //   if (replyingTo) {
  //     // focus when user taps Reply
  //     requestAnimationFrame(() => inputRef.current?.focus());
  //   }
  // }, [replyingTo]);

  const submit = () => {
    const content = text.trim();
    if (!content) return;
    onSend(content);
    setText("");
  };

  return (
    <View className="w-full  items-end gap-2 p-2">
      {replyingTo ? (
        <View className="bg-muted mb-2 flex-row items-center justify-between rounded-xl px-3 py-2">
          <AppText className="text-muted-foreground">
            Replying to {replyingTo.name}
          </AppText>

          {/* <Pressable onPress={onCancelReply} hitSlop={10}>
            <AppText className="text-lg">✕</AppText>
          </Pressable> */}
        </View>
      ) : null}
      <View className="flex-row">
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Write a comment…"
          multiline
          className="h-10 flex-1 rounded-2xl bg-neutral-100 py-3"
        />

        <Pressable
          onPress={submit}
          disabled={isSending || !text.trim()}
          className="rounded-2xl bg-blue-500 px-4 py-3"
        >
          <AppText className="font-Semibold text-white">
            {isSending ? "..." : "Send"}
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}
