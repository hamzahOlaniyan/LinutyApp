import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
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
            <View
               style={{ borderBottomColor: appColors.border, borderBottomWidth: 0.5, width: "100%", flex: 1 }}
               className="py-3 mb-4"
            >
               <AppText align="center" size="lg" weight="semi" cap="capitalize">
                  {props.title}
               </AppText>
            </View>
            <View style={{ paddingHorizontal: wp(4) }} className="flex-1 w-full">
               {props.children}
            </View>
         </BottomSheetView>
      </BottomSheet>
   );
});

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "grey",
      width: "100%",
   },
   contentContainer: {
      flex: 1,
      alignItems: "center",
      height: "100%",
      width: "100%",
   },
});
