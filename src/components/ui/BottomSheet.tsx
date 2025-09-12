import React from "react";
// import { useThemeStore } from "../context/themeStore";

import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator } from "./actionsheet";
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
         <ActionsheetBackdrop />
         <ActionsheetContent className="p-0 m-0 px-3">
            <ActionsheetDragIndicator className="mt-6" />
            <View className="my-6">
               <AppText weight="semi" cap="capitalize">
                  {heading}
               </AppText>
            </View>
            <View className="w-full flex-1">{children}</View>
         </ActionsheetContent>
      </Actionsheet>
   );
}
