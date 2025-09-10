import React from "react";
// import { useThemeStore } from "../context/themeStore";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
   Actionsheet,
   ActionsheetBackdrop,
   ActionsheetContent,
   ActionsheetDragIndicator,
   ActionsheetDragIndicatorWrapper,
} from "./actionsheet";
import AppText from "./AppText";

type BottomSheetProps = {
   children: React.ReactNode;
   height?: number;
   preventScroll?: boolean;
   isOpen: boolean;
   onClose?: () => void;
   heading?: string;
};

export default function BottomSheet({
   height = 95,
   preventScroll,
   children,
   isOpen,
   onClose,
   heading,
}: BottomSheetProps) {
   // const { currentTheme } = useThemeStore();

   const { bottom } = useSafeAreaInsets();

   const handleClose = () => {
      onClose?.();
   };

   return (
      <Actionsheet isOpen={isOpen} onClose={handleClose} preventScroll={preventScroll} snapPoints={[height]}>
         <ActionsheetBackdrop
            style={
               {
                  // backgroundColor: currentTheme === "light" ? appColors.gray : appColors.dark.backdrop,
               }
            }
         />
         <ActionsheetContent
            style={{
               marginBottom: bottom,
               // backgroundColor: currentTheme === "light" ? appColors.light.background : appColors.dark.background,
               // borderColor: currentTheme === "light" ? appColors.light.background : appColors.dark.background,
            }}
            className="flex-1 w-full p-0 m-0"
         >
            <ActionsheetDragIndicatorWrapper className="my-4">
               <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <AppText weight="semi" cap="capitalize">
               {heading}
            </AppText>
            {children}
         </ActionsheetContent>
      </Actionsheet>
   );
}
