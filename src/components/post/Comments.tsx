import React, { useState } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "../ui/AppText";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
import CommentSkeletion from "./CommentSkeletion";

export default function Comments({ data, loading, postAuthor }: { data: any; loading: boolean; postAuthor: string }) {
   const [showKeyboard, setShowKeyboard] = useState(false);
   const [replyToName, setReplyToName] = useState<string | null>(null);
   const [replyToId, setReplyToId] = useState<string | null>(null);

   const { bottom } = useSafeAreaInsets();

   const { width: screenHeight } = Dimensions.get("screen");

   if (loading) return <CommentSkeletion />;

   return (
      <View className="justify-between flex-1 h-full">
         {data?.comments?.length < 1 && (
            <View className="flex-1">
               <AppText align="center" size="lg">
                  Be the first to comment
               </AppText>
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

         <CommentInput
            postId={data?.id}
            postAuthor={postAuthor}
            // postUserID={data?.author?.id}
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
