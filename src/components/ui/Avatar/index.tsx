import { hp } from "@/constant/common";
import { Image } from "expo-image";
import { ImageStyle, StyleProp, StyleSheet, View } from "react-native";
import AppText from "../AppText";

export default function Avatar({
  path,
  size = hp(4),
  style,
  initails
}: {
  path: string | undefined | null;
  size?: number;
  style?: StyleProp<ImageStyle>;
  initails?: string;
}) {
  return (
    <View style={[styles.avatar, style, { height: size, width: size }]}>
      {path ? (
        <Image source={path} style={{ width: size, height: size }} />
      ) : (
        <AppText>{initails}</AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "white"
  }
});
