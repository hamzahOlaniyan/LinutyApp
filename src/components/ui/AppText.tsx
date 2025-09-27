import { TiktokFont } from "@/assets/fonts/FontFamily";
import { appColors } from "@/src/constant/colors";
import { hp } from "@/src/constant/common";
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
   onPress?: () => void;
};

export default function AppText({
   children,
   size = "md",
   weight = "reg",
   cap,
   color = appColors.text,
   style,
   align,
   className,
   onPress,
}: AppTextProps) {
   // const { currentTheme } = useThemeStore();

   const fontSize = {
      xxxxxl: hp(4.4),
      xxxxl: hp(3.4),
      xxxl: hp(2.8),
      xxl: hp(2.6),
      xl: hp(2.3),
      lg: hp(2),
      md: hp(1.8),
      sm: hp(1.6),
      xs: hp(1.4),
      xxs: 12,
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
         onPress={onPress}
         style={[
            style,
            {
               fontSize,
               fontFamily,
               textTransform: cap,
               color: color,
               textAlign: align,
            },
         ]}
         className={`${className} text-nowrap`}
      >
         {children}
      </Text>
   );
}
