import { TiktokFont } from "@/assets/fonts/FontFamily";
import { appColors } from "@/src/constant/colors";
import { hp } from "@/src/constant/common";
// import { useThemeStore } from "@/src/context/themeStore";
import React from "react";
import { Text, TextStyle } from "react-native";

type TextWeight = "black" | "bold" | "semi" | "med" | "reg" | "light";
type TextSize = "xxxxxl" | "xxxxl" | "xxxl" | "xxl" | "xl" | "lg" | "md" | "sm" | "xs" | "xxs";

type AppTextProps = {
   size?: TextSize;
   children: React.ReactNode;
   weight?: TextWeight;
   cap?: "capitalize" | "uppercase";
   color?: string;
   style?: any;
   align?: "left" | "right" | "center";
   className?: string;
};

export default function AppText({
   children,
   size = "md",
   weight = "med",
   cap,
   color = appColors.text,
   style,
   align,
   className,
}: AppTextProps) {
   // const { currentTheme } = useThemeStore();

   const fontSize = {
      xxxxxl: hp(4.4),
      xxxxl: hp(3.4),
      xxxl: hp(2.8),
      xxl: hp(2.6),
      xl: hp(2.3),
      lg: hp(1.9),
      md: hp(1.7),
      sm: hp(1.5),
      xs: hp(1.3),
      xxs: hp(0.9),
   }[size];

   const fontFamilyMap: Record<TextWeight, TextStyle["fontFamily"]> = {
      black: TiktokFont.TiktokBlack,
      bold: TiktokFont.TiktokBold,
      semi: TiktokFont.TiktokSemiBold,
      med: TiktokFont.TiktokMedium,
      reg: TiktokFont.TiktokRegular,
      light: TiktokFont.TiktokLight,
   };

   const fontFamily = fontFamilyMap[weight];

   return (
      <Text
         style={[
            style,
            {
               fontSize,
               fontFamily,
               textTransform: cap,
               color: color,
               // color: appColors.text,
               textAlign: align,
            },
         ]}
         className={`${className} text-nowrap`}
      >
         {children}
      </Text>
   );
}
