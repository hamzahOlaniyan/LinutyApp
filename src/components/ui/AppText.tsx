import { TiktokFont } from "@/assets/fonts/FontFamily";
import { appColors } from "@/src/constant/colors";
import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

type TextWeight = "black" | "extraBold" | "bold" | "semi" | "med" | "reg" | "light";
type TextSize = "xxxl" | "xxl" | "xl" | "lg" | "md" | "sm" | "xs" | "xxs";

type AppTextProps = {
   size?: TextSize;
   children: React.ReactNode;
   weight?: TextWeight;
   cap?: "capitalize" | "uppercase";
   color?: string;
   style?: StyleProp<TextStyle>;
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
      xxxl: 24,
      xxl: 20,
      xl: 18,
      lg: 17,
      md: 16,
      sm: 14,
      xs: 12,
      xxs: 10,
   }[size];

   const fontFamilyMap: Record<TextWeight, TextStyle["fontFamily"]> = {
      black: TiktokFont.TiktokBlack,
      extraBold: TiktokFont.TiktokExtraBold,
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
