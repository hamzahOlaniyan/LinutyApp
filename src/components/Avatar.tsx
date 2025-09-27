import { Image } from "expo-image";
import { ImageStyle, StyleProp } from "react-native";

export default function Avatar({
   path,
   size = 35,
   style,
}: {
   path: string;
   size?: number;
   style?: StyleProp<ImageStyle>;
}) {
   return <Image source={path} style={{ width: size, height: size, borderRadius: 200 }} />;
}
