import { appColors } from "@/constant/colors";
import Icon from "@/icons";
import { AccountIcon } from "@/icons/ico/AccountIcon";
import { DeleteIcon } from "@/icons/ico/DeleteIcon";
import { EditIcon } from "@/icons/ico/edit";
import { ReportIcon } from "@/icons/ico/ReportIcon";
import { ShareIcon } from "@/icons/ico/shareIcon";
import { deletePost } from "@/Services/db/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import AppText from "../ui/AppText";

type PostOptionsType = {
   title: string;
   icon: React.ReactNode;
   action?: () => void;
};

export default function PostOptions({
   isUserOwner,
   postId,
   bottomSheetRef,
}: {
   isUserOwner: boolean;
   postId: string;
   bottomSheetRef: any;
}) {
   const router = useRouter();

   const queryClient = useQueryClient();

   const postOptions: PostOptionsType[] = [
      { title: "save", icon: <Icon name="bookmark" size={30} /> },
      { title: "share", icon: <ShareIcon size={30} /> },
      { title: "about this account", icon: <AccountIcon size={30} /> },
      { title: "block", icon: <Icon name="bookmark" size={30} /> },
      { title: "report", icon: <ReportIcon size={30} /> },
   ];
   const ownerPostOptions = [
      { title: "save", icon: <Icon name="bookmark" size={30} /> },
      { title: "edit", icon: <EditIcon size={30} />, action: () => router.push(`/(app)/(tabs)/(home)/post/${postId}`) },
      {
         title: "delete",
         icon: <DeleteIcon size={30} color={appColors.error} />,
         action: () => handleDelete(),
      },
   ];

   const handleDelete = () => {
      return Alert.alert("Delete Post", "Are you sure you want to delete this post? This action cannot be undone.", [
         {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
         },
         { text: "Delete", onPress: () => deletePostMutation.mutate(), style: "destructive" },
      ]);
   };

   const deletePostMutation = useMutation({
      mutationFn: async () => deletePost(postId),
      onMutate: async () => Alert.alert("Post Deleted"),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: () => {
         Alert.alert("Error", "Failed to delete post");
      },
   });

   const handleCloseSheet = (action: any) => {
      bottomSheetRef.current.close();
      action();
   };

   return (
      <View className="flex-1 gap-6">
         {!isUserOwner ? (
            <>
               {postOptions.map((n, i) => (
                  <TouchableOpacity key={i} className="flex-row items-center gap-4">
                     {n.icon}
                     <AppText cap="capitalize">{n.title}</AppText>
                  </TouchableOpacity>
               ))}
            </>
         ) : (
            <>
               {ownerPostOptions.map((n, i) => (
                  <TouchableOpacity
                     key={i}
                     onPress={() => handleCloseSheet(n.action)}
                     className="flex-row items-center gap-4"
                  >
                     {n.icon}
                     <AppText cap="capitalize" color={n.title === "delete" ? appColors.error : appColors.black}>
                        {n.title}
                     </AppText>
                  </TouchableOpacity>
               ))}
            </>
         )}
      </View>
   );
}
