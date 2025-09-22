import { AddCircleIcon } from "@/assets/icons/addCircle";
import { Notification } from "@/assets/icons/notification";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";
import { appColors } from "../constant/colors";
import { GLOBAL_STYLES } from "../constant/globalStyles";
import { supabase } from "../lib/supabase";
import { getNotfication } from "../Services/Notification";
import { useAuthStore } from "../store/authStore";
import Avatar from "./Avatar";
import AppText from "./ui/AppText";
import Menu from "./ui/Menu";

export default function HomeHeaderMenu() {
   const { profile } = useAuthStore();

   const router = useRouter();
   const queryClient = useQueryClient();

   const { data: NOTIFICATION } = useQuery({
      queryKey: ["notification", profile?.id],
      queryFn: () => getNotfication(profile?.id ?? ""),
      enabled: !!profile?.id,
   });

   // console.log("notifications", JSON.stringify(notifications, null, 2));

   const unreadCount = NOTIFICATION?.filter((n: any) => !n.read)?.length || 0;

   useEffect(() => {
      if (!profile.id) return;

      const notificationChannel = supabase
         .channel("notification")
         .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "notification", filter: `receiver_id=eq.${profile?.id}` },
            (payload) => {
               console.log("New Notification:", payload.new);
               queryClient.invalidateQueries({ queryKey: ["notification", profile?.id] });
            }
         )
         .subscribe();

      const postChannel = supabase
         .channel("posts")
         .on("postgres_changes", { event: "INSERT", schema: "public", table: "posts" }, (payload) => {
            console.log("New posts:", payload.new);
            queryClient.invalidateQueries({ queryKey: ["posts", profile?.id] });
         })
         .subscribe();

      return () => {
         supabase.removeChannel(notificationChannel);
         supabase.removeChannel(postChannel);
      };
   }, [profile?.id]);

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
               height: 40,
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
               {unreadCount > 0 && (
                  <View
                     style={{ borderWidth: 3, borderColor: appColors.white }}
                     className="bg-sky-500 w-7 h-7 rounded-full absolute -top-1 -right-1 justify-center items-center"
                  >
                     <AppText size="xs" weight="semi" color="white">
                        {unreadCount}
                     </AppText>
                  </View>
               )}
            </Pressable>
            <Pressable onPress={() => router.push("/(app)/(profile)")}>
               <Avatar path={profile?.avatarUrl} size={40} />
            </Pressable>
         </View>
      </Animated.View>
   );
}
