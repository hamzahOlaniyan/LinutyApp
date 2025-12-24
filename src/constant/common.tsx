import { PostComment } from "@/components/Post/type";
import AppText from "@/components/ui/AppText";
import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHight } = Dimensions.get("screen");

export const hp = (percentage: number) => {
  return (percentage * deviceHight) / 100;
};

export const wp = (percentage: number) => {
  return (percentage * deviceWidth) / 100;
};

export const DEFAULT_TOAST_DURATION = 2000;

export function displayName(author?: PostComment["author"]) {
  const full = `${author?.firstName ?? ""} ${author?.lastName ?? ""}`.trim();
  const text = !author
    ? "Unknown"
    : full || (author?.username ? `@${author?.username}` : "Unknown");

  return (
    <AppText variant={"medium"} className="font-semibold">
      {text}
    </AppText>
  );
}

export function toPng(url?: string | null) {
  if (!url) return null;
  return url.includes("/svg?") ? url.replace("/svg?", "/png?") : url;
}
