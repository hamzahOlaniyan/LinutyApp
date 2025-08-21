import AppText from "@/src/components/AppText";
import Button from "@/src/components/Button";
import { useAuthStore } from "@/src/store/authStore";
import React from "react";
import { View } from "react-native";

export default function index() {
   const { signOut } = useAuthStore();
   return (
      <View>
         <AppText size="xxxl">Protected layout</AppText>
         <Button title="sign out" onPress={signOut} />
      </View>
   );
}
