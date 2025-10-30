import { AddCircleIcon } from "@/assets/icons/addCircle";
import { Notification } from "@/assets/icons/notification";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { appColors } from "../constant/colors";
import { GLOBAL_STYLES } from "../constant/globalStyles";
import { supabase } from "../lib/supabase";
import { getNotfication } from "../Services/Notification";
import { useAuthStore } from "../store/authStore";
import Avatar from "./Avatar";
import AppText from "./ui/AppText";

export default function HomeHeaderMenu() {
   const { profile, session } = useAuthStore();

   const router = useRouter();
   const queryClient = useQueryClient();

   const { data: NOTIFICATION } = useQuery({
      queryKey: ["notification", profile?.id],
      queryFn: () => getNotfication(profile?.id),
      enabled: !!profile?.id,
   });

   const unreadCount = NOTIFICATION?.filter((n: any) => !n.read)?.length ?? 0;

   // console.log("HomeHeaderMenu", JSON.stringify(profile, null, 2));
   // console.log("HomeHeaderMenu SESSION", JSON.stringify(session, null, 2));

   useEffect(() => {
      if (!profile?.id) return;

      const notificationChannel = supabase
         .channel("notification")
         .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "notification", filter: `receiver_id=eq.${profile?.id}` },
            (payload) => {
               console.log("New Notification:", payload.new);
               queryClient.invalidateQueries({ queryKey: ["notification", profile?.id] });
            }
         )
         .subscribe();

      const postChannel = supabase
         .channel("posts")
         .on("postgres_changes", { event: "*", schema: "public", table: "posts" }, (payload) => {
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
               backgroundColor: appColors.white,
            },
         ]}
         className="flex-row items-center justify-between py-1"
      >
         <Image
            source={require("@/assets/images/linuty.png")}
            style={{
               height: 25,
               aspectRatio: 3 / 1,
               alignSelf: "flex-end",
            }}
            contentFit="contain"
         />
         <View className="flex-row items-center justify-between gap-2">
            <TouchableOpacity
               onPress={() => router.push("/(app)/new-post")}
               style={{
                  borderRadius: 60,
                  padding: 3,
                  borderWidth: 1,
                  paddingHorizontal: 8,
               }}
               className="flex-row items-center gap-1"
            >
               <AddCircleIcon size={20} />
               <AppText weight="med">Post</AppText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/(app)/notification")} className="rounded-full p-2">
               <Notification size={24} />
               {unreadCount > 0 && (
                  <View
                     style={{ borderWidth: 2, borderColor: appColors.white }}
                     className="bg-sky-500 w-6 h-6 rounded-full absolute -top-[2px] -right-[2px] justify-center items-center"
                  >
                     <AppText size="xs" weight="semi" color="white">
                        {unreadCount}
                     </AppText>
                  </View>
               )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/(app)/(profile)")}>
               <Avatar path={profile?.avatarUrl} size={30} />
            </TouchableOpacity>
         </View>
      </Animated.View>
   );
}
