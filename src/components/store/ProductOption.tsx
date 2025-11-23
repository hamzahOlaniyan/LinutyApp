import { appColors } from "@/constant/colors";
import Icon from "@/icons";
import { AccountIcon } from "@/icons/ico/AccountIcon";
import { DeleteIcon } from "@/icons/ico/DeleteIcon";
import { EditIcon } from "@/icons/ico/edit";
import { ReportIcon } from "@/icons/ico/ReportIcon";
import { ShareIcon } from "@/icons/ico/shareIcon";
import { deleteProduct } from "@/Services/db/store";
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

export default function ProductOption({
   isUserOwner,
   postId,
   bottomSheetRef,
   type,
}: {
   isUserOwner?: boolean;
   postId?: string;
   bottomSheetRef: any;
   type: string;
}) {
   const router = useRouter();

   const queryClient = useQueryClient();

   //    console.log(type);

   const productOptions: PostOptionsType[] = [
      { title: "save", icon: <Icon name="bookmark" size={30} /> },
      { title: "share", icon: <ShareIcon size={30} /> },
      { title: "about this account", icon: <AccountIcon size={30} /> },
      { title: "block", icon: <Icon name="bookmark" size={30} /> },
      { title: "report", icon: <ReportIcon size={30} /> },
   ];
   const ownerProductOptions = [
      { title: "save", icon: <Icon name="bookmark" size={30} /> },
      {
         title: "edit",
         icon: <EditIcon size={30} />,
         action: () => router.push({ pathname: `/store/product/edit/${postId}` as any, params: { type } as any }),
      },
      {
         title: "delete",
         icon: <DeleteIcon size={30} color={appColors.error} />,
         action: () => handleDelete(),
      },
   ];

   const deletePostMutation = useMutation({
      mutationFn: async () => deleteProduct(postId as string),
      onMutate: async () => Alert.alert("product Deleted"),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["store"] });
         router.back();
      },
      onError: () => {
         Alert.alert("Error", "Failed to delete product");
      },
   });

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

   const handleCloseSheet = (action: any) => {
      bottomSheetRef.current.close();
      action();
   };

   return (
      <View className="flex-1 gap-6">
         {!isUserOwner ? (
            <>
               {productOptions.map((n, i) => (
                  <TouchableOpacity key={i} className="flex-row items-center gap-4">
                     {n.icon}
                     <AppText cap="capitalize">{n.title}</AppText>
                  </TouchableOpacity>
               ))}
            </>
         ) : (
            <>
               {ownerProductOptions.map((n, i) => (
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
