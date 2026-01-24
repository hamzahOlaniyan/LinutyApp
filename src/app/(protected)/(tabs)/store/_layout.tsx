import AppText from "@/components/ui/AppText";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function StoreLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        // headerTitleStyle: { fontSize: 20, fontFamily: Font.Bold },
        headerTitleAlign: "left"
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerLeft: () => (
            <View>
              <AppText variant={"header"} className="font-Bold">
                Community Store
              </AppText>
              <AppText className="font-Medium">
                Support local creators, small business and community initiatives
              </AppText>
            </View>
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
        name="[sellerId]"
        options={{
          title: "",
          headerTitleAlign: "center"
        }}
      />

      <Stack.Screen
        name="create-product"
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
