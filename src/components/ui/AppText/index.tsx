import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";
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

const textVariants = cva("text-text font-sans", {
  variants: {
    variant: {
      title: "text-3xl font-Semibold text-black",
      body: "text-base",
      link: "text-primary underline",
      error: "text-sm text-red-600 font-medium"
    },
    color: {
      primary: "text-primary",
      black: "text-black",
      white: "text-white",
      default: "text-text"
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    }
  },
  defaultVariants: {
    variant: "body"
  }
});

export type CustomTextProps = RNTextProps &
  VariantProps<typeof textVariants> & {
    children?: React.ReactNode;
  };

const AppText = ({
  className,
  variant = "body",
  color,
  size,
  children,
  ...props
}: CustomTextProps) => {
  const finalClasses = twMerge(
    textVariants({ variant, color, size }),
    className
  );

  return (
    <RNText {...props} className={finalClasses}>
      {children}
    </RNText>
  );
};

export default AppText;
