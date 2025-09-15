import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "../ui/AppText";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
import CommentSkeletion from "./CommentSkeletion";

export default function Comments({ data, loading }: { data: any; loading: boolean }) {
   const [showKeyboard, setShowKeyboard] = useState(false);
   const [replyToName, setReplyToName] = useState<string | null>(null);
   const [replyToId, setReplyToId] = useState<string | null>(null);

   const { bottom } = useSafeAreaInsets();

   const skeleton = Array.from({ length: 5 }, (_, i) => <CommentSkeletion key={i} />);
   if (loading) return <View className="gap-8">{skeleton}</View>;

   return (
      <View
         style={{
            paddingBottom: bottom,
         }}
         className="flex-1 justify-between"
      >
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
               flex: 1,
            }}
         />
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
      </View>
   );
}
