import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import { Image } from "expo-image";
import { ImageStyle, StyleProp, View } from "react-native";
import AppText from "../AppText";

export default function Avatar({
  path,
  size = hp(4),
  style,
  initails
}: {
  path?: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
  initails?: string;
}) {
  const source = typeof path === "string" && path ? { uri: path } : path;

  return (
    <View
      style={[
        style,
        {
          height: size,
          width: size,
          backgroundColor: appColors.bordersLight,
          borderRadius: 200,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden"
        }
      ]}
    >
      {path ? (
        <Image
          source={source}
          style={{ width: "100%", height: "100%", borderRadius: 200 }}
        />
      ) : (
        <AppText>{initails}</AppText>
      )}
    </View>
  );
}
