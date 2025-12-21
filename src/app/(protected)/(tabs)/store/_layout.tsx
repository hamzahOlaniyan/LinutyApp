import { Font } from "@/assets/fonts/FontFamily";
import AppText from "@/components/ui/AppText";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function StoreLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: { fontSize: 20, fontFamily: Font.Bold },
        headerTitleAlign: "left"
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Store",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                router.push(`/(protected)/(tabs)/store/create-add`)
              }
              className="rounded-lg border p-2"
            >
              <AppText>+ post add</AppText>
            </TouchableOpacity>
          )
        }}
      />

      <Stack.Screen
        name="product"
        options={{
          title: "",
          headerTitleAlign: "center"
        }}
      />
      <Stack.Screen
        name="seller"
        options={{
          title: "",
          headerTitleAlign: "center"
        }}
      />

      <Stack.Screen
        name="create-add"
        options={{
          title: "Create ad",
          headerTitleAlign: "center",
          headerBackTitle: "",
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className="rounded-lg border p-2"
            >
              <AppText>cancel</AppText>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className="rounded-lg border p-2"
            >
              <AppText>+ post ad</AppText>
            </TouchableOpacity>
          )
        }}
      />
    </Stack>
  );
}
