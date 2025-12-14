import { appColors } from "@/constant/colors";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "../AppText";

interface Props {
  title?: React.ReactNode;
  children: React.ReactNode;
  snapPoints?: string[];
}
type Ref = BottomSheet;

export const ModalBottomSheet = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = useMemo(
    () => props.snapPoints ?? ["30%", "50%", "91%"],
    [props.snapPoints]
  );

  const { bottom } = useSafeAreaInsets();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        {...props}
      />
    ),
    []
  );

  return (
    <Portal hostName="root">
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
          top: 8
        }}
      >
        <BottomSheetView
          style={[styles.contentContainer, { paddingBottom: bottom }]}
        >
          <View
            style={{
              borderBottomColor: appColors.bordersLight,
              borderBottomWidth: 0.5
            }}
            className="mb-4 py-3"
          >
            <AppText variant="titleLarge" className="text-center font-bold">
              {props.title}
            </AppText>
          </View>
          {/* <View style={{ paddingHorizontal: wp(3), flex: 1 }}> */}
          {props.children}
          {/* </View> */}
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    height: "100%"
  }
});
