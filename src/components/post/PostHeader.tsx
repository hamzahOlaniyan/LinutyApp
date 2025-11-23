import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { ThreeDots } from "@/icons/ico/threedots";
import { useAuthStore } from "@/store/authStore";
import { Octicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";
import { CustomBottomSheet } from "../ui/CustomBottomSheet";
import PostOptions from "./PostOptions";

type PostHeader = {
   authorId: string;
   postId: string;
   avatar: string;
   name: string;
   username: string;
   date: string;
   content: string;
};

export default function PostHeader({ authorId, postId, avatar, name, username, date, content }: PostHeader) {
   const { profile } = useAuthStore();
   const router = useRouter();

   const bottomSheetRef = useRef<BottomSheet>(null);
   const handleOpenSheet = () => bottomSheetRef.current?.expand();

   const isUserOwner = profile?.id === authorId;

   console.log({ authorId });

   return (
      <>
         <View
            style={{
               paddingHorizontal: wp(4),
               paddingVertical: hp(1.5),
               gap: 10,
            }}
         >
            <View className="flex-row justify-between items-start">
               <View className="flex-row items-start gap-2">
                  <TouchableOpacity onPress={() => router.push(`/(user)/${authorId}`)}>
                     <Avatar path={avatar} size={50} />
                  </TouchableOpacity>
                  <View>
                     <View className="flex-row items-center gap-1">
                        <TouchableOpacity onPress={() => router.push(`/(user)/${authorId}`)}>
                           <AppText size="lg" weight="bold" cap="capitalize" style={{ letterSpacing: -0.4 }}>
                              {name.trim()}
                           </AppText>
                        </TouchableOpacity>
                        <View className="flex-row items-center gap-1 relative top-[1.5px]">
                           <Octicons name="dot-fill" size={5} color={appColors.lightGrey} className="relative " />
                           <AppText color={appColors.lightGrey} size="xs" className="">
                              {dayjs(date).fromNow(true)}
                           </AppText>
                        </View>
                     </View>
                     <TouchableOpacity onPress={() => router.push(`/(user)/${authorId}`)}>
                        <AppText size="sm" color={appColors.lightGrey}>
                           @{username}
                        </AppText>
                     </TouchableOpacity>
                  </View>
               </View>
               <Pressable onPress={handleOpenSheet} className="h-full relative">
                  <ThreeDots color={appColors.lightGrey} size={24} />
               </Pressable>
            </View>
            <View className="">
               <AppText>{content}</AppText>
            </View>
         </View>
         <Portal hostName="root">
            <CustomBottomSheet
               ref={bottomSheetRef}
               snapPoints={["35%"]}
               children={<PostOptions isUserOwner={isUserOwner} post_id={postId} ref={bottomSheetRef} />}
            />
         </Portal>
      </>
   );
}
