import { Image } from "expo-image";
import { ImageStyle, StyleProp, View } from "react-native";
import { appColors } from "../constant/colors";
import AppText from "./ui/AppText";

export default function Avatar({
   path,
   size = 35,
   style,
   initails,
}: {
   path: string;
   size?: number;
   style?: StyleProp<ImageStyle>;
   initails?: string;
}) {
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
               overflow: "hidden",
            },
         ]}
      >
         {path ? (
            <Image source={{ uri: path }} style={{ width: "100%", height: "100%", borderRadius: 200 }} />
         ) : (
            <AppText size="lg" weight="med">
               {initails}
            </AppText>
         )}
      </View>
   );
}
