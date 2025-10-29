import { Image } from "expo-image";
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
      <View style={{ flex: 1 }} className=" w-full relative">
         {/* <View style={{ paddingBottom: bottom }} className="bg-red-200"> */}
         {data?.comments?.length < 1 && (
            <View className="flex-1">
               <Image
                  priority={"high"}
                  source={require("@/assets/images/comment_pic.png")}
                  style={{ width: screenHeight, height: 200, top: 100, opacity: 0.2 }}
               />
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
               flex: 1,
               backgroundColor: "lime",
            }}
         />
         {/* </View> */}

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
