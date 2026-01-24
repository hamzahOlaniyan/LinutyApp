import AppText from "@/components/ui/AppText";
import { Stack } from "expo-router";

export default function StoreLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "left"
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerLeft: () => (
            <AppText variant={"header"} className="font-Bold">
              Friends
            </AppText>
          )
        }}
      />
    </Stack>
  );
}
