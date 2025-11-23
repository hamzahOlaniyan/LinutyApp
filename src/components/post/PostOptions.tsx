import { appColors } from "@/constant/colors";
import Icon from "@/icons";
import { DeleteIcon } from "@/icons/ico/DeleteIcon";
import { ReportIcon } from "@/icons/ico/ReportIcon";
import { ShareIcon } from "@/icons/ico/shareIcon";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import AppText from "../ui/AppText";

type PostOptionsType = {
   title: string;
   icon: React.ReactNode;
   action?: () => void;
};

export default function PostOptions({
   isUserOwner,
   post_id,
   ref,
}: {
   isUserOwner: boolean;
   post_id: string;
   ref?: any;
}) {
   const router = useRouter();
   const postOptions: PostOptionsType[] = [
      { title: "save", icon: <Icon name="bookmark" size={24} /> },
      { title: "share", icon: <ShareIcon size={24} /> },
      { title: "about this account", icon: <Icon name="bookmark" size={24} /> },
      { title: "report", icon: <ReportIcon size={24} /> },
   ];
   const ownerPostOptions = [
      { title: "save", icon: <Icon name="bookmark" size={24} /> },
      { title: "edit", icon: <ReportIcon size={24} />, action: () => router.push(`/(app)/edit-post/${post_id}`) },
      { title: "delete", icon: <DeleteIcon size={24} color={appColors.error} /> },
   ];

   const closeSheet = (action: any) => {
      ref.current?.close();
      action();
   };

   return (
      <View className="flex-1 gap-6">
         {!isUserOwner ? (
            <>
               {postOptions.map((n, i) => (
                  <TouchableOpacity key={i} className="flex-row items-center gap-2">
                     {n.icon}
                     <AppText size="lg" cap="capitalize">
                        {n.title}
                     </AppText>
                  </TouchableOpacity>
               ))}
            </>
         ) : (
            <>
               {ownerPostOptions.map((n, i) => (
                  <TouchableOpacity
                     key={i}
                     onPress={() => closeSheet(n.action)}
                     className="flex-row items-center gap-2"
                  >
                     {n.icon}
                     <AppText
                        size="lg"
                        cap="capitalize"
                        color={n.title === "delete" ? appColors.error : appColors.black}
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
