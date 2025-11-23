import { hp } from "@/constant/common";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Text, View } from "react-native";

export default function LogoutButton({ variant = "icon", label }: { variant?: "ghost" | "icon"; label?: string }) {
   // const resetAuth = useAuthStore((state) => state.resetAuth);

   const onLogout = async () => {
      const { error } = await supabase.auth.signOut();
      // resetAuth(null);
      if (error) {
         console.error("Error signing out:", error.message);
      } else {
         console.log("User signed out successfully");
      }
   };

   const handleSignOut = async () => {
      Alert.alert("confirm", " Are you sure you want to log out?", [
         {
            text: "Cancel",
            onPress: () => console.log("logout cancelled"),
            style: "cancel",
         },
         {
            text: "Logout",
            onPress: () => onLogout(),
            style: "destructive",
         },
      ]);
   };

   if (variant === "ghost") {
      return (
         <Text onPress={handleSignOut} style={{ fontSize: hp(2) }} className="font-SansMed capitalize text-center">
            {label}
         </Text>
      );
   }

   if (variant === "icon") {
      return (
         <View className="bg-neutral-100 rounded-lg p-1 justify-center items-center">
            <Ionicons onPress={handleSignOut} name="power-sharp" size={20} color="black" />
         </View>
      );
   }
}
