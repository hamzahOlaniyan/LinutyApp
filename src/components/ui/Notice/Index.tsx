import { appColors } from "@/constant/colors";
import Icon, { IconName } from "@/icons";
import React from "react";
import { View } from "react-native";
import AppText from "../AppText";

export type NoticeType = "info" | "warning" | "error";

export type NoticeState = {
  type: NoticeType;
  message: React.ReactNode;
  icon: IconName;
};

const stylesByType: Record<NoticeType, { container: string; text: string }> = {
  info: {
    container: "border-blue-200 bg-blue-50",
    text: "text-blue-800"
  },
  warning: {
    container: "border-yellow-200 bg-yellow-50",
    text: "text-yellow-700"
  },
  error: {
    container: "border-red-200 bg-red-50",
    text: "text-red-800"
  }
};

const COLORS = {
  info: appColors.info,
  warning: appColors.warinigText,
  error: appColors.error
} as const;

export function Notice({ notice }: { notice: NoticeState }) {
  const s = stylesByType[notice.type];

  return (
    <View
      className={`w-full flex-row items-center justify-center gap-3 rounded-md border p-2 ${s.container}`}
    >
      <Icon name={notice.icon} color={COLORS[notice.type]} size={18} />
      <AppText variant={"small"} className={`text-center ${s.text}`}>
        {notice.message}
      </AppText>
    </View>
  );
}

/**
 * Helpers to build NoticeState (so you can do setNotice(noticeBuilder.error(...)))
 */
export const noticeBuilder = {
  info(message: React.ReactNode): NoticeState {
    return { type: "info", message, icon: "warning" };
  },
  warning(message: React.ReactNode): NoticeState {
    return { type: "warning", message, icon: "warning" };
  },
  error(message: React.ReactNode): NoticeState {
    return { type: "error", message, icon: "warning" };
  }
};
