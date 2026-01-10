import { IconName } from "@/icons";
import { TextStyle, ViewStyle } from "react-native";

export type SegmentTab<TValue extends string> = {
  value: TValue;
  label: string;
  icon?: IconName;
  content: React.ReactNode; // ✅ tab content lives here
  testID?: string;
};

export type Props<TValue extends string> = {
  tabs: SegmentTab<TValue>[];
  value: TValue;
  onChange: (value: TValue) => void;
  containerStyle?: ViewStyle;
  tabStyle?: ViewStyle;
  activeTabStyle?: ViewStyle;
  labelStyle?: TextStyle;
  activeLabelStyle?: TextStyle;
  contentContainerStyle?: ViewStyle;
  disabled?: boolean;
};