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
      header: "font-SemiBold",
      title: "font-SemiBold",
      body: "font-Regular",
      link: " underline font-Regular text-blue-500",
      error: "text-red-600 font-Medium"
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

type VariantName = "header" | "title" | "body" | "link" | "error";

const variantFontSizes: Record<VariantName, number> = {
  header: hp(3),
  title: hp(2.2),
  body: hp(1.8),
  link: hp(1.8),
  error: hp(1.6)
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
