import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { PostApi } from "@/hooks/usePostApi";
import Icon from "@/icons";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";

type PostOptionsType = {
  title: string;
  icon: React.ReactNode;
  action?: () => void;
};

export default function PostOptions({
  isUserOwner,
  postId,
  bottomSheetRef
}: {
  isUserOwner: boolean;
  postId: string;
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
}) {
  const router = useRouter();

  const deletePost = PostApi.useDeletePost(postId);

  const postOptions: PostOptionsType[] = [
    { title: "save", icon: <Icon name="bookmark" size={30} /> },
    { title: "share", icon: <Icon name="share" size={30} /> },
    { title: "about this account", icon: <Icon name="account" size={30} /> },
    { title: "block", icon: <Icon name="report" size={30} /> },
    { title: "report", icon: <Icon name="report" size={30} /> }
  ];
  const ownerPostOptions = [
    { title: "save", icon: <Icon name="bookmark" size={30} /> },
    {
      title: "edit",
      icon: <Icon name="edit" size={30} />,
      action: () => router.push(`/(protected)/post/${postId}`)
    },
    {
      title: "delete",
      icon: <Icon size={30} name="deleteTrash" />,
      action: () => handleDelete()
    }
  ];

  const deletetion = () => {
    deletePost.mutate(undefined, {
      onSuccess: () => {
        console.log("deleted");
        // optional: navigate back if you're on details screen
        // navigation.goBack();
      },
      onError: err => {
        console.log(err?.message ?? "Delete failed");
      }
    });
  };

  const handleDelete = () => {
    return Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post? This action cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: deletetion,
          style: "destructive"
        }
      ]
    );
  };

  const handleCloseSheet = (action?: () => void) => {
    bottomSheetRef.current?.close();
    action?.();
  };

  return (
    <View className="flex-1 gap-6">
      {!isUserOwner ? (
        <>
          {postOptions.map((n, i) => (
            <TouchableOpacity key={i} className="flex-row items-center gap-4">
              {n.icon}
              <AppText>{n.title}</AppText>
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
              <AppText
                color={n.title === "delete" ? appColors.error : appColors.text}
              >
                {n.title}
              </AppText>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
}
