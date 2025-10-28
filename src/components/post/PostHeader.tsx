import { AccountIcon } from "@/assets/icons/AccountIcon";
import { Bookmark } from "@/assets/icons/bookmark";
import { DeleteIcon } from "@/assets/icons/DeleteIcon";
import { ReportIcon } from "@/assets/icons/ReportIcon";
import { ShareIcon } from "@/assets/icons/shareIcon";
import { ThreeDots } from "@/assets/icons/threedots";
import { appColors } from "@/src/constant/colors";
import { hp, wp } from "@/src/constant/common";
import { useAuthStore } from "@/src/store/authStore";
import { Octicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";
import { CustomBottomSheet } from "../ui/CustomBottomSheet";

type PostHeader = {
   id: string;
   avatar: string;
   name: string;
   username: string;
   date: string;
};

type PostOptionsType = {
   title: string;
   icon: React.ReactNode;
};

dayjs.extend(relativeTime);

export default function PostHeader({ id, avatar, name, username, date }: PostHeader) {
   const { profile } = useAuthStore();
   const router = useRouter();

   const bottomSheetRef = useRef<BottomSheet>(null);
   const handleOpenSheet = () => bottomSheetRef.current?.expand();

   const isUserOwner = profile?.id === id;

   const postOptions: PostOptionsType[] = [
      { title: "save", icon: <Bookmark size={30} /> },
      { title: "share", icon: <ShareIcon size={30} /> },
      { title: "about this account", icon: <AccountIcon size={30} /> },
      { title: "report", icon: <ReportIcon size={30} /> },
   ];
   const ownerPostOptions = [
      { title: "save", icon: <Bookmark size={30} /> },
      { title: "edit", icon: <ReportIcon size={30} /> },
      { title: "delete", icon: <DeleteIcon size={30} /> },
   ];

   return (
      <View
         style={{
            paddingHorizontal: wp(2),
            paddingVertical: hp(1),
         }}
      >
         <View className="flex-row justify-between items-start">
            <View className="flex-row items-center gap-2">
               <TouchableOpacity onPress={() => router.push(`/(app)/(user)/${id}`)}>
                  <Avatar path={avatar} size={47} />
               </TouchableOpacity>
               <View className="">
                  <View className="flex-row items-center gap-1">
                     <Pressable onPress={() => router.push(`/(app)/(user)/${id}`)}>
                        <AppText size="lg" weight="bold" cap="capitalize" style={{ letterSpacing: -0.5 }}>
                           {name.trim()}
                        </AppText>
                     </Pressable>
                     <View className="flex-row items-center gap-1 relative -top-[px]">
                        <Octicons name="dot-fill" size={5} color={appColors.lightGrey} className="relative " />
                        <AppText color={appColors.lightGrey} size="xxs" className="">
                           {dayjs(date).fromNow(true)}
                        </AppText>
                     </View>
                  </View>
                  <Pressable onPress={() => router.push(`/(app)/(user)/${id}`)}>
                     <AppText size="sm" color={appColors.lightGrey}>
                        @{username}
                     </AppText>
                  </Pressable>
               </View>
            </View>
            <Pressable onPress={handleOpenSheet} className="h-full relative">
               <ThreeDots color={appColors.lightGrey} size={24} />
            </Pressable>
         </View>
         <Portal hostName="root">
            <CustomBottomSheet
               ref={bottomSheetRef}
               snapPoints={["40"]}
               children={
                  <View className="gap-6">
                     {!isUserOwner ? (
                        <>
                           {postOptions.map((n, i) => (
                              <TouchableOpacity key={i} className="flex-row items-center gap-2 flex-1">
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
                              <TouchableOpacity key={i} className="flex-row items-center gap-2 flex-1">
                                 {n.icon}
                                 <AppText size="lg" cap="capitalize">
                                    {n.title}
                                 </AppText>
                              </TouchableOpacity>
                           ))}
                        </>
                     )}
                  </View>
               }
            />
         </Portal>
      </View>
   );
}
