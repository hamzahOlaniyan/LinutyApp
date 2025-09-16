import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, TextInput, View } from "react-native";
// import { hp } from "../common";
// import { colors } from "../constant/colors";
// import { useThemeStore } from "../context/themeStore";
import { SendIcon } from "@/assets/icons/sendIcon";
import { appColors } from "@/src/constant/colors";
import { hp } from "@/src/constant/common";
import { createComment } from "@/src/Services/comment";
import { createNotification } from "@/src/Services/Notification";
import { useAuthStore } from "@/src/store/authStore";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";
import Button from "../ui/Button";
// import { createNotification } from "../Services/Notification";

export default function CommentInput({
   postId,
   postAuthor,
   replyToName,
   parentId,
   showKeyboard,
   setShowKeyboard,
   setReplyToName,
   setReplyToId,
}: {
   postId?: string;
   postAuthor?: string;
   showKeyboard?: boolean;
   replyToName?: string | null;
   parentId?: any;
   setShowKeyboard?: any;
   setReplyToName?: any;
   setReplyToId?: any;
}) {
   const [commentText, setCommentText] = useState("");
   const { profile } = useAuthStore();

   const inputRef = useRef<TextInput>(null);

   useEffect(() => {
      if (showKeyboard && inputRef.current) {
         inputRef.current.focus();
      }
   }, [showKeyboard]);

   const queryClient = useQueryClient();

   const { mutate, isPending, error } = useMutation({
      mutationFn: async () => {
         if (!commentText) return null;
         return await createComment({
            content: commentText,
            userId: profile?.id,
            postId: postId,
            parentId: parentId,
         });
      },
      onSuccess: async (data) => {
         console.log("✅ repliy has been sent", data);
         setCommentText("");

         if (profile.id !== postAuthor) {
            try {
               let notify = {
                  senderId: profile?.id,
                  receiverId: postAuthor,
                  title: commentText,
                  content: { postId: postId, commentId: data?.id ?? "" },
                  type: "comment",
                  postId: postId,
               };
               await createNotification(notify);
               console.log("Notification created CREATE=====>", JSON.stringify(notify, null, 2));
            } catch (error) {
               console.log("Notification error", error);
            }
         }
         setCommentText("");
         setReplyToId(null);
         setReplyToName(null);
         setShowKeyboard(false);
         await queryClient.invalidateQueries({ queryKey: ["posts"] });
         await queryClient.invalidateQueries({ queryKey: ["posts", parentId] });
         await queryClient.invalidateQueries({ queryKey: ["posts", postId] });
         await queryClient.invalidateQueries({ queryKey: ["posts", postId, "comments"] });
         await queryClient.invalidateQueries({ queryKey: ["posts", postId, "notification"] });
      },
      onError: (error) => Alert.alert("Error", error.message),
   });

   return (
      <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 135} behavior="padding">
         <View
            style={{
               zIndex: 999,
               width: "100%",
            }}
         >
            {replyToName && (
               <View
                  style={{ backgroundColor: appColors.selectedTeply, borderRadius: 10 }}
                  className="w-full items-center justify-between flex-row py-4 my-1"
               >
                  <AppText color={appColors.primary} weight="semi" className="px-4">
                     relpy to @{replyToName}
                  </AppText>
                  <MaterialCommunityIcons
                     onPress={() => {
                        setReplyToId(null);
                        setReplyToName(null);
                        setShowKeyboard(false);
                     }}
                     name="close"
                     size={18}
                     color="black"
                     className="relative top-[2px] -left-4"
                  />
               </View>
            )}
            <View
               style={{ borderTopColor: appColors.bordersLight, borderTopWidth: 1 }}
               className="w-full items-center flex-row gap-2 py-3"
            >
               <Avatar path={profile?.avatarUrl} size={35} />
               <View className="h-12  flex-1 justify-center w-full rounded-full">
                  <TextInput
                     ref={inputRef}
                     style={{
                        fontSize: hp(1.8),
                        backgroundColor: appColors.searchBar,
                        borderRadius: 100,
                        paddingHorizontal: 10,
                     }}
                     value={commentText}
                     onChangeText={setCommentText}
                     className="flex-1 p-1 px-4"
                     placeholder="Add comment..."
                     placeholderTextColor={appColors.placeholder}
                     autoFocus={false}
                  />
               </View>
               <Button
                  size="sm"
                  onPress={() => mutate()}
                  isLoading={isPending}
                  disabled={isPending || commentText.length === 0}
                  icon={<SendIcon />}
               ></Button>
            </View>
         </View>
      </KeyboardAvoidingView>
   );
}
