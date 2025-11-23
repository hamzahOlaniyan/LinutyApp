import { appColors } from "@/constant/colors";
import { useAuthStore } from "@/store/authStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import AppText from "../ui/AppText";
import FriendshipButton from "./FriendshipButton";

type SurgestionCardProps = {
   id: string;
   avatar: string;
   firstName: string;
   lastName: string;
   username: string;
};

// const { width: screenWidth } = Dimensions.get("screen");

export default function SurgestionCard({ id, avatar, firstName, lastName, username }: SurgestionCardProps) {
   const router = useRouter();
   const { profile } = useAuthStore();
   return (
      <TouchableOpacity style={{ flex: 1, backgroundColor: appColors.white, borderRadius: 6, overflow: "hidden" }}>
         <View style={{ width: "100%", height: 175 }}>
            {avatar ? (
               <Pressable onPress={() => router.push(`/user/${id}`)}>
                  <Image source={{ uri: avatar }} style={{ width: "100%", height: "100%" }} contentPosition="center" />
               </Pressable>
            ) : (
               <View
                  style={{
                     width: "100%",
                     height: "100%",
                     justifyContent: "center",
                     alignItems: "center",
                     backgroundColor: "red",
                  }}
               ></View>
            )}
         </View>

         <View className="py-3 gap-3 px-3">
            <Pressable onPress={() => router.push(`/user/${id}`)}>
               <AppText weight="med" cap="capitalize">
                  {firstName} {lastName}
               </AppText>
               <AppText size="sm" color={appColors.lightGrey}>
                  @{username}
               </AppText>
            </Pressable>
            <FriendshipButton size="xs" profile={profile?.id} friendId={id} color icon />
         </View>
      </TouchableOpacity>
   );
}
