import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "../ui/AppText";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";

export default function Comments({ data, loading }: { data: any; loading: boolean }) {
   const [showKeyboard, setShowKeyboard] = useState(false);
   const [replyToName, setReplyToName] = useState<string | null>(null);
   const [replyToId, setReplyToId] = useState<string | null>(null);

   const { bottom } = useSafeAreaInsets();
   //    console.log("data", JSON.stringify(data, null, 2));
   if (loading) return null;

   return (
      <View style={{ paddingBottom: bottom }} className="gap-4 flex-1">
         {data?.comments?.length < 1 && (
            <View className="px-6">
               <AppText weight="med">be the first to comment</AppText>{" "}
            </View>
         )}
         <FlatList
            data={data?.comments?.reverse().filter((c: any) => c.parentId === null)}
            renderItem={({ item }) => (
               <CommentCard
                  item={item}
                  setShowKeyboard={setShowKeyboard}
                  setReplyToName={setReplyToName}
                  setReplyToId={setReplyToId}
               />
            )}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={4}
            contentContainerStyle={{
               rowGap: 20,
            }}
         />
         {/* <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            // keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 120}
            keyboardVerticalOffset={200}
         > */}
         <CommentInput
            postId={data?.id}
            postUserID={data?.author?.id}
            showKeyboard={showKeyboard}
            replyToName={replyToName}
            parentId={replyToId}
            setReplyToName={setReplyToName}
            setReplyToId={setReplyToId}
            setShowKeyboard={setShowKeyboard}
         />
         {/* </KeyboardAvoidingView> */}
      </View>
   );
}
