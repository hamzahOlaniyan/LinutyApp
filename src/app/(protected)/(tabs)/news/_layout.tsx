import AppText from "@/components/ui/AppText";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function CommunityLayout() {
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <View>
              <AppText variant={"header"} className="font-Bold">
                Discover
              </AppText>
              <AppText className="font-Medium">
                Latest news from the community
              </AppText>
            </View>
          )
        }}
      />

      <Stack.Screen name="[article_id]" options={{ headerTitle: "" }} />
    </Stack>
  );
}
