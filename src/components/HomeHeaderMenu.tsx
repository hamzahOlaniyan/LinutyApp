// import AppName from "@/src/assets/Logo/AppName";
// import { hp, wp } from "@/src/common";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Animated, Pressable, View } from "react-native";
// import { useAuthStore } from "../context/authStore";
// import { useThemeStore } from "../context/themeStore";
// import { getNotfication } from "../Services/Notification";
// import SupabaseImage from "./SupabaseImage";
import { Notification } from "@/assets/icons/notification";
import { Plus } from "@/assets/icons/plus";
import { Image } from "expo-image";
import { GLOBAL_STYLES } from "../constant/globalStyles";
import { useAuthStore } from "../store/authStore";
import Button from "./ui/Button";

export default function HomeHeaderMenu({ headerTranslateY }: { headerTranslateY?: any }) {
   const { profile } = useAuthStore();
   // const { currentTheme } = useThemeStore();

   const router = useRouter();

   // console.log(JSON.stringify(profile, null, 2));

   const scrollY = useRef(new Animated.Value(0)).current;
   const lastOffset = useRef(0);
   const [showHeader, setShowHeader] = useState(true);

   // const headerTranslateY = useRef(new Animated.Value(0)).current;

   // const toggleHeader = (show: boolean) => {
   //    Animated.timing(headerTranslateY, {
   //       toValue: show ? 0 : -100, // slide up or down
   //       duration: 200,
   //       useNativeDriver: true,
   //    }).start();
   // };

   // const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
   //    const currentOffset = e.nativeEvent.contentOffset.y;

   //    if (currentOffset > lastOffset.current && showHeader) {
   //       // scrolling down → hide
   //       setShowHeader(false);
   //       toggleHeader(false);
   //    } else if (currentOffset < lastOffset.current && !showHeader) {
   //       // scrolling up → show
   //       setShowHeader(true);
   //       toggleHeader(true);
   //    }

   //    lastOffset.current = currentOffset;
   // };

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
      <Animated.View
         style={[
            GLOBAL_STYLES.screenPadding,
            {
               transform: [{ translateY: headerTranslateY }],
               position: "absolute",
               top: 0,
               left: 0,
               right: 0,
               zIndex: 10,
               backgroundColor: "white",
            },
         ]}
         className="flex-row items-end  justify-between py-2 bg-white"
      >
         <Image
            source={require("@/assets/images/linuty.png")}
            style={{
               width: 90,
               height: 35,
               alignSelf: "center",
               justifyContent: "center",
               position: "relative",
               top: 5,
            }}
            contentFit="contain"
         />
         <View className="flex-row items-center justify-center gap-2">
            <Button size="xs" onPress={() => router.push("/(app)/new-post")}>
               <Plus size={24} />
            </Button>
            <Pressable onPress={() => router.push("/(app)/notification")} className="rounded-full p-2">
               <Notification size={24} />
            </Pressable>
            <Pressable onPress={() => router.push("/")}>
               <Image source={{ uri: profile?.avatarUrl }} style={{ width: 40, height: 40, borderRadius: 100 }} />
            </Pressable>
         </View>
      </Animated.View>
   );
}
