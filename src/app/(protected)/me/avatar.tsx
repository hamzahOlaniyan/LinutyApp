import Avatar from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";
import React from "react";
import { View } from "react-native";

export default function AvatarPic() {
  const { me } = useAuthStore();
  return (
    <View className="flex-1 items-center bg-white pt-36">
      <Avatar path={me?.avatarUrl} size={250} />
    </View>
  );
}
