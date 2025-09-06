import Button from "@/src/components/ui/Button";
import { useAuthStore } from "@/src/store/authStore";
import React from "react";
import { Text, View } from "react-native";

export default function Search() {
   const { signOut } = useAuthStore();
   return (
      <View
         style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
         }}
      >
         <Text
            style={{
               fontSize: 50,
               color: "black",
               textAlign: "center",
            }}
         >
            Search Friends
         </Text>
         <Button text="sign out" onPress={() => signOut()} />
      </View>
   );
}
