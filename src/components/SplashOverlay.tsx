import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

export function SplashOverlay() {
   return (
      <View style={styles.container}>
         <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: 70, height: 70 }}
            contentFit="contain"
            className="animates-rotate"
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
   },
});
