import { Image } from "expo-image";
import React from "react";

export default function Avatar({ path, size }: { path: string; size: number }) {
   return <Image source={path} style={{ width: size, height: size, borderRadius: 100 }} />;
}
