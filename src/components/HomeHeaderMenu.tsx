// import AppName from "@/src/assets/Logo/AppName";
// import { hp, wp } from "@/src/common";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
// import { useAuthStore } from "../context/authStore";
// import { useThemeStore } from "../context/themeStore";
// import { getNotfication } from "../Services/Notification";
// import SupabaseImage from "./SupabaseImage";
import { Image } from "expo-image";
import AppText from "./AppText";

export default function HomeHeaderMenu() {
   // const { userProfile, currentUser } = useAuthStore();
   // const { currentTheme } = useThemeStore();

   const router = useRouter();

   // const queryClient = useQueryClient();

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
      <View className="flex-row justify-between">
         <Image
            source={require("@/assets/images/linuty.png")}
            style={{
               width: 120,
               height: 50,
               alignSelf: "center",
               justifyContent: "center",
            }}
            contentFit="contain"
         />
         <View className="flex-row items-center justify-center gap-4">
            <AppText>home</AppText>
            {/* <Pressable
               onPress={() => router.push("/(protected)/new-post")}
               style={{ backgroundColor: currentTheme === "light" ? colors.light.input : colors.dark.input }}
               className="rounded-full p-2"
            >
               <Ionicons
                  name="add-circle-outline"
                  size={hp(3)}
                  color={currentTheme === "light" ? colors.light.text : colors.dark.text}
               />
            </Pressable> */}
            {/* <Pressable
               onPress={() => router.push("/(protected)/notification")}
               style={{ backgroundColor: currentTheme === "light" ? colors.light.input : colors.dark.input }}
               className="rounded-full p-2"
            >
               <Ionicons
                  name="notifications-outline"
                  size={hp(3)}
                  color={currentTheme === "light" ? colors.light.text : colors.dark.text}
               />
               {unreadCount > 0 && (
                  <View className="absolute -top-1 -right-2 bg-primary border-2 border-white rounded-full w-6 h-6 items-center justify-center">
                     <View className="relative -top-[1px]">
                        <AppText size="xs" weight="semi" color="white">
                           {unreadCount}
                        </AppText>
                     </View>
                  </View>
               )}
            </Pressable> */}
            {/* <Pressable onPress={() => router.push("/(protected)/(profile)")}>
               <SupabaseImage
                  bucket="avatars"
                  path={userProfile?.avatar_url}
                  width={40}
                  height={40}
                  borderRadius={100}
               />
            </Pressable> */}
         </View>
      </View>
   );
}
30;
