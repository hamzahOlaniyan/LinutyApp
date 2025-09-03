import React from "react";
import { View } from "react-native";
// import { useThemeStore } from "../context/themeStore";
import AppText from "./ui/AppText";
import {
   Actionsheet,
   ActionsheetBackdrop,
   ActionsheetContent,
   ActionsheetDragIndicator,
   ActionsheetDragIndicatorWrapper,
} from "./ui/actionsheet";

type BottomSheetProps = {
   children: React.ReactNode;
   height?: number;
   preventScroll?: boolean;
   isOpen: boolean;
   onClose?: () => void;
   heading?: string;
};

export default function Modal({ height = 50, preventScroll, children, isOpen, onClose, heading }: BottomSheetProps) {
   //    const { currentTheme } = useThemeStore();

   const handleClose = () => {
      onClose?.();
   };

   return (
      <Actionsheet
         isOpen={isOpen}
         onClose={handleClose}
         preventScroll={preventScroll}
         closeOnOverlayClick={true}
         snapPoints={[height]}
         trapFocus={true}
      >
         <ActionsheetBackdrop
            style={
               {
                  //    backgroundColor: currentTheme === "light" ? appColors.gray : appColors.dark.backdrop,
               }
            }
         />
         <ActionsheetContent
            style={
               {
                  //    backgroundColor: currentTheme === "light" ? appColors.light.background : appColors.dark.background,
                  //    borderColor: currentTheme === "light" ? appColors.light.background : appColors.dark.background,
               }
            }
            className="flex-1 w-full p-0 m-0"
         >
            <ActionsheetDragIndicatorWrapper className="my-4">
               <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <View className="mb-4">
               <AppText weight="bold" cap="capitalize">
                  {heading}
               </AppText>
            </View>

            {children}
         </ActionsheetContent>
      </Actionsheet>
   );
}
