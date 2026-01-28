import { ReplyingTo } from "@/components/Post/type";
import AppText from "@/components/ui/AppText";
import Avatar from "@/components/ui/Avatar";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import Icon from "@/icons";
import { useAuthStore } from "@/store/useAuthStore";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

export default function CommentInput({
  onSend,
  onCancelReply,
  replyingTo,
  loading
}: {
  replyingTo: ReplyingTo;
  onCancelReply: () => void;
  onSend: (content: string) => void;
  loading: boolean;
}) {
  const { me } = useAuthStore();
  const [text, setText] = useState("");

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
    <View>
      {replyingTo ? (
        <View style={s.reply}>
          <View className="flex-1 flex-row items-center gap-2">
            <AppText variant={"xs"}>reply to:</AppText>
            <AppText variant={"xs"} className="font-Medium capitalize">
              @{replyingTo.name}
            </AppText>
            <Pressable hitSlop={10} onPress={onCancelReply}>
              <Icon name={"close"} />
            </Pressable>
          </View>
        </View>
      ) : null}
      <View style={s.inputContainer}>
        <Avatar path={me?.avatarUrl} />
        <BottomSheetTextInput
          value={text}
          onChangeText={setText}
          placeholder="Write a comment…"
          style={{ height: 44, backgroundColor: "yellow" }}
        />
        {/* <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Write a comment…"
          multiline
          style={s.input}
        /> */}

        <Pressable
          onPress={submit}
          disabled={loading || !text.trim()}
          style={s.send}
          className="disabled:bg-neutral-200"
        >
          {loading ? (
            <ActivityIndicator size={"small"} />
          ) : (
            <Icon name="chevronforward" color={appColors.white} size={28} />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  reply: {
    paddingHorizontal: wp(3),
    backgroundColor: appColors.background,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12
  },
  inputContainer: {
    paddingHorizontal: wp(3),
    height: hp(5.6),
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: appColors.border,
    paddingTop: 7
  },
  input: {
    backgroundColor: appColors.searchbar,
    height: hp(5.3),
    flex: 1,
    borderRadius: 30,
    paddingHorizontal: 12
  },
  send: {
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appColors.primary,
    borderRadius: 50,
    paddingHorizontal: 8
  }
});
