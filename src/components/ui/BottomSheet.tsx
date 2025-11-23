import { wp } from "@/constant/common";
import React, { useEffect } from "react";
import { Dimensions, Modal, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "./AppText";

const { height: screenHeight } = Dimensions.get("window");

type BottomSheetProps = {
   visible: boolean;
   onClose: () => void;
   children: React.ReactNode;
   height?: number;
   sheetHeight?: number;
   heading?: string;
};

export default function CBottomSheet({ visible, onClose, children, sheetHeight = 95, heading }: BottomSheetProps) {
   const insets = useSafeAreaInsets();
   const translateY = useSharedValue(screenHeight);

   const sheetHeightPx = (screenHeight * sheetHeight) / 100;

   useEffect(() => {
      if (visible) {
         translateY.value = withSpring(screenHeight - sheetHeightPx, {
            damping: 100,
            stiffness: 400,
            mass: 1,
         });
      } else {
         translateY.value = withSpring(screenHeight);
      }
   }, [visible, sheetHeightPx]);

   const panGesture = Gesture.Pan()
      .onUpdate((event) => {
         if (event.translationY > 0) {
            translateY.value = screenHeight - sheetHeightPx + event.translationY;
         }
      })
      .onEnd((event) => {
         if (event.translationY > 100 || event.velocityY > 1000) {
            runOnJS(onClose)();
         } else {
            translateY.value = withSpring(screenHeight - sheetHeightPx, {
               damping: 50,
               stiffness: 250,
               mass: 1,
               velocity: 100,
            });
         }
      });

   const animatedStyle = useAnimatedStyle(() => {
      return {
         transform: [{ translateY: translateY.value }],
      };
   });

   return (
      <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
         <View
            style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999, paddingBottom: insets.bottom }]}
            pointerEvents="box-none"
         >
            <TouchableWithoutFeedback onPress={onClose}>
               <View style={styles.overlay} />
            </TouchableWithoutFeedback>

            <GestureDetector gesture={panGesture}>
               <Animated.View
                  style={[
                     styles.sheet,
                     animatedStyle,
                     {
                        paddingBottom: insets.bottom,
                     },
                  ]}
               >
                  <View style={styles.handle} />
                  <AppText align="center" weight="semi">
                     {heading}
                  </AppText>
                  <View style={{ flex: 1 }}>{children}</View>
               </Animated.View>
            </GestureDetector>
         </View>
      </Modal>
   );
}

const styles = StyleSheet.create({
   overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.5)",
   },
   sheet: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      backgroundColor: "white",
      paddingHorizontal: wp(2),
      height: "100%",
   },
   handle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: "#ccc",
      alignSelf: "center",
      marginVertical: 24,
   },
});
