import NotificationCard from "@/components/Notification";
import {
  NotificationApi,
  NotificationWithRelations
} from "@/hooks/useNotificationApi";
import { useAuthStore } from "@/store/useAuthStore";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function Notification() {
  const { me } = useAuthStore();

  const { data } = NotificationApi.getMyNotifications(me?.id ?? "");
  const [notifications, setNotifications] = useState(data?.data);

  useEffect(() => {
    if (data) setNotifications(data.data);
  }, [data]);

  const renderItem = useCallback(
    ({ item }: { item: NotificationWithRelations }) => (
      <NotificationCard item={item} />
    ),
    []
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={notifications}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
}
