import { appColors } from "@/src/constant/colors";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "./AppText";

interface Props {
   title?: React.ReactNode;
   children: React.ReactNode;
   snapPoints?: string[];
}
type Ref = BottomSheet;

export const CustomBottomSheet = forwardRef<Ref, Props>((props, ref) => {
   const snapPoints = useMemo(() => ["30%", "50%", "91%"], []);

   const { bottom } = useSafeAreaInsets();

   const renderBackdrop = useCallback(
      (props: any) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={0} {...props} />,
      []
   );

   return (
      <BottomSheet
         ref={ref}
         index={-1}
         snapPoints={snapPoints}
         enablePanDownToClose
         backdropComponent={renderBackdrop}
         handleIndicatorStyle={{
            height: 6,
            width: 50,
            backgroundColor: "black",
            borderRadius: 200,
            position: "relative",
            top: 8,
         }}
      >
         <BottomSheetView style={[styles.contentContainer, { paddingBottom: bottom }]}>
            <View style={{ borderBottomColor: appColors.border, borderBottomWidth: 0.5 }} className="py-3 mb-4">
               <AppText align="center" size="lg" weight="semi" cap="capitalize">
                  {props.title}
               </AppText>
            </View>
            <View style={{ flex: 1 }}>{props.children}</View>
         </BottomSheetView>
      </BottomSheet>
   );
});

const styles = StyleSheet.create({
   contentContainer: {
      flex: 1,
      // height: "100%",
      backgroundColor: "red",
   },
});
