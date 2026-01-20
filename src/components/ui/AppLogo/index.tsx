import { Image } from "expo-image";
import React from "react";

export default function AppLogo() {
  return (
    <Image
      source={require("@/assets/images/linuty.png")}
      style={{
        height: "100%",
        width: 90,
        alignSelf: "flex-end"
      }}
      contentFit="contain"
    />
  );
}
