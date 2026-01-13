import { useAuthStore } from "@/store/useAuthStore";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export function SigningOutOverlay() {
  const signingOut = useAuthStore(s => s.signingOut);
  if (!signingOut) return null;

  return (
    <View style={style.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 9999
  }
});
