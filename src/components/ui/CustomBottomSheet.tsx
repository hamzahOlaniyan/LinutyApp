import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
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
   const snapPoints = useMemo(() => props.snapPoints ?? ["30%", "50%", "91%"], [props.snapPoints]);

   const { bottom } = useSafeAreaInsets();

   const renderBackdrop = useCallback(
      (props: any) => (
         <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" {...props} />
      ),
      []
   );

   return (
      <BottomSheet
         ref={ref}
         index={-1}
         snapPoints={snapPoints}
         enablePanDownToClose
         backdropComponent={renderBackdrop}
         backgroundStyle={{ flex: 1 }}
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
               <AppText align="center" weight="semi" cap="capitalize">
                  {props.title}
               </AppText>
            </View>
            <View style={{ paddingHorizontal: wp(4), flex: 1, height: "100%" }}>{props.children}</View>
         </BottomSheetView>
      </BottomSheet>
   );
});

const styles = StyleSheet.create({
   contentContainer: {
      flex: 1,
      height: "100%",
   },
});
