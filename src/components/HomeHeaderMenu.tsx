// import AppName from "@/src/assets/Logo/AppName";
// import { hp, wp } from "@/src/common";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { Animated, Pressable, View } from "react-native";
// import { useAuthStore } from "../context/authStore";
// import { useThemeStore } from "../context/themeStore";
// import { getNotfication } from "../Services/Notification";
// import SupabaseImage from "./SupabaseImage";
import { AddCircleIcon } from "@/assets/icons/addCircle";
import { Notification } from "@/assets/icons/notification";
import { Image } from "expo-image";
import { appColors } from "../constant/colors";
import { GLOBAL_STYLES } from "../constant/globalStyles";
import { useAuthStore } from "../store/authStore";
import Avatar from "./Avatar";
import Menu from "./ui/Menu";

export default function HomeHeaderMenu() {
   const { profile } = useAuthStore();
   // const { currentTheme } = useThemeStore();

   const router = useRouter();

   // const { data: notifications } = useQuery({
   //    queryKey: ["notification", currentUser?.id],
   //    queryFn: () => getNotfication(currentUser?.id ?? ""),
   //    enabled: !!currentUser?.id,
   // });

   // const unreadCount = notifications?.filter((n: any) => !n.read)?.length || 0;

   // useEffect(() => {
   //    if (!currentUser?.id) return;

   //    const notificationChannel = supabase
   //       .channel("public:notifications")
   //       .on(
   //          "postgres_changes",
   //          {
   //             event: "INSERT",
   //             schema: "public",
   //             table: "notification",
   //             filter: `receiver_id=eq.${currentUser?.id}`,
   //          },
   //          (payload) => {
   //             console.log("New Notification:", payload.new);
   //             queryClient.invalidateQueries({ queryKey: ["notification", currentUser?.id] });
   //          }
   //       )
   //       .subscribe();

   //    const postChannel = supabase
   //       .channel("public:posts")
   //       .on(
   //          "postgres_changes",
   //          {
   //             event: "INSERT",
   //             schema: "public",
   //             table: "posts",
   //          },
   //          (payload) => {
   //             console.log("New post:", payload.new);
   //             queryClient.invalidateQueries({ queryKey: ["posts", currentUser?.id] });
   //          }
   //       )
   //       .subscribe();

   //    return () => {
   //       supabase.removeChannel(notificationChannel);
   //       supabase.removeChannel(postChannel);
   //    };
   // }, [currentUser?.id]);

   return (
      <Animated.View
         style={[
            GLOBAL_STYLES.screenPadding,
            {
               zIndex: 10,
               borderBottomColor: appColors.bordersLight,
               borderBottomWidth: 1,
            },
         ]}
         className="flex-row items-center justify-between py-1 gap-10 bg-white"
      >
         <Image
            source={require("@/assets/images/linuty.png")}
            style={{
               width: 80,
               height: 30,
            }}
            contentFit="contain"
         />
         <View className="flex-row items-center justify-between w-full flex-1">
            <View className="relative">
               <Menu />
            </View>
            <Pressable onPress={() => router.push("/(app)/new-post")}>
               <AddCircleIcon />
            </Pressable>
            <Pressable onPress={() => router.push("/(app)/notification")} className="rounded-full p-2">
               <Notification />
            </Pressable>
            <Pressable onPress={() => router.push("/(app)/(profile)")}>
               <Avatar path={profile?.avatarUrl} size={40} />
            </Pressable>
         </View>
      </Animated.View>
   );
}
