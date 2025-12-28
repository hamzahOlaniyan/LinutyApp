import { appColors } from "@/constant/colors";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { View } from "react-native";
import AppText from "../AppText";

interface Props {
  title?: React.ReactNode;
  children: React.ReactNode;
  snapPoints?: string[];
  // data?: string[] | [] | null;
}
export type ModalBottomSheetRef = BottomSheet;

export const ModalBottomSheet = forwardRef<ModalBottomSheetRef, Props>(
  (props, ref) => {
    const snapPoints = useMemo(
      () => props.snapPoints ?? ["30%", "50%", "91%"],
      [props.snapPoints]
    );

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
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          width: 64,
          height: 4,
          borderRadius: 999,
          top: 10
        }}
      >
        <View
          style={[
            {
              borderBottomColor: appColors.border,
              borderBottomWidth: 0.5
            }
          ]}
          className="mb-4 py-3"
        >
          <AppText variant={"title"} className="text-center capitalize">
            {props.title}
          </AppText>
        </View>

        {props.children}
      </BottomSheet>
    );
  }
);
