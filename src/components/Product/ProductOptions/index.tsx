import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { ProductApi } from "@/hooks/useProductApi";
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

export default function ProductOption({
  isUserOwner,
  productId,
  bottomSheetRef
}: {
  isUserOwner?: boolean;
  productId?: string;
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
}) {
  const router = useRouter();

  const deleteProduct = ProductApi.useDeleteProduct(productId ?? null);

  const productOptions: PostOptionsType[] = [
    { title: "save", icon: <Icon name="bookmark" size={30} /> },
    { title: "share", icon: <Icon name="share" size={30} /> },
    { title: "about this account", icon: <Icon name="bookmark" size={30} /> },
    { title: "block", icon: <Icon name="report" size={30} /> },
    { title: "report", icon: <Icon name="report" size={30} /> }
  ];
  const ownerProductOptions = [
    { title: "save", icon: <Icon name="bookmark" size={30} /> },
    {
      title: "edit",
      icon: <Icon name="edit" size={30} />,
      action: () => router.push(`/store/product/edit/${productId}`)
    },
    {
      title: "delete",
      icon: <Icon name="deleteTrash" size={30} color={appColors.error} />,
      action: () => handleDelete()
    }
  ];

  const deletetion = () => {
    deleteProduct.mutate(undefined, {
      onSuccess: () => {
        console.log("deleted product");
        router.back();
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
          {productOptions.map((n, i) => (
            <TouchableOpacity key={i} className="flex-row items-center gap-4">
              {n.icon}
              <AppText>{n.title}</AppText>
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
