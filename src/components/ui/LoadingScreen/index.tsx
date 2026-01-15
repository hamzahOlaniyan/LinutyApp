import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function LoadingScreen() {
  return (
    <View className="transition-discrete flex-1  items-center justify-center bg-white">
      <ActivityIndicator testID="loading" size={"large"} />

      {/* <View className="animate-spin duration-100 ease-in-out motion-reduce:duration-0"> */}
      {/* <Image
          source={require("@/assets/images/logo.png")}
          contentFit="contain"
          style={{
            height: 100,
            width: 100,
            opacity: 0.3
          }}
        /> */}
      {/* </View> */}
    </View>
  );
}
