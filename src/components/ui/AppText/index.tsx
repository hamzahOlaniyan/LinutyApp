import { hp } from "@/constant/common";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle
} from "react-native";
import { twMerge } from "tailwind-merge";

/**
 * `AppText` – A typed, Tailwind-styled React Native `Text` component using
 * Class Variance Authority (`cva`) variants and `tailwind-merge` for safe class composition.
 *
 * ## Features
 * - Variant-based typography presets (`title`, `body`, `link`, `error`)
 * - Semantic color options (`primary`, `black`, `white`, `default`)
 * - Responsive text sizing (`sm`, `md`, `lg`, `xl`)
 * - Extends all React Native `Text` props (`onPress`, `style`, etc.)
 * - Accepts additional `className` with conflict resolution via `twMerge`
 *
 * ## Usage
 * ```tsx
 * <AppText variant="title" color="primary" size="xl" onPress={() => console.log("Tapped")}>
 *   Welcome
 * </AppText>
 * ```
 *
 * @component
 * @param {CustomTextProps} props - Component props including RN `Text` props and style variants.
 * @returns {JSX.Element} A styled React Native `Text` element.
 */

const textVariants = cva("font-Regular text-text", {
  variants: {
    variant: {
      headerLarge: "font-Bold",
      header: "font-SemiBold",
      titleLarge: "",
      title: "font-SemiBold",
      body: "font-Regular",
      medium: "",
      small: "",
      xs: "",
      profile_name: "font-Bold",
      post_name: "font-SemiBold",
      post_username: "text-placeholder",
      post_content: "",
      post_info: "text-placeholder",
      post_date: "text-placeholder",
      post_action: "",
      post_visability: "text-placeholder"
    }
  },
  defaultVariants: {
    variant: "body"
  }
});

export type CustomTextProps = RNTextProps &
  VariantProps<typeof textVariants> & {
    children?: React.ReactNode;
    color?: string;
  };

// 👇 per-variant font sizes using hp()

type VariantName =
  | "headerLarge"
  | "header"
  | "titleLarge"
  | "title"
  | "body"
  | "medium"
  | "small"
  | "xs"
  | "profile_name"
  | "post_name"
  | "post_username"
  | "post_content"
  | "post_info"
  | "post_date"
  | "post_action"
  | "post_name"
  | "post_visability";

const variantFontSizes: Record<VariantName, number> = {
  headerLarge: hp(3),
  header: hp(2.6),
  titleLarge: hp(2.3),
  title: hp(1.9),
  body: hp(1.7),
  medium: hp(1.7),
  small: hp(1.6),
  xs: hp(1.4),
  profile_name: hp(2.1),
  post_name: hp(1.9),
  post_date: hp(1.4),
  post_visability: hp(1.4),
  post_username: hp(1.7),
  post_content: hp(1.8),
  post_info: hp(1.6),
  post_action: hp(1.8)
};

const AppText = ({
  className,
  variant = "body",
  children,
  style,
  color,
  ...props
}: CustomTextProps) => {
  const finalClasses = twMerge(textVariants({ variant }), className);

  const resolvedVariant: VariantName = (variant ?? "body") as VariantName;
  const fontSize = variantFontSizes[resolvedVariant];
  const textStyle: TextStyle = { fontSize, ...(color ? { color } : {}) };

  return (
    <RNText {...props} className={finalClasses} style={[textStyle, style]}>
      {children}
    </RNText>
  );
};

export default AppText;
