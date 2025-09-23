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
   sheetHeight?: number; // percentage of screen height
   heading?: string;
};

export default function BottomSheetTwo({ visible, onClose, children, heading, sheetHeight = 50 }: BottomSheetProps) {
   const insets = useSafeAreaInsets();
   const translateY = useSharedValue(screenHeight);

   const sheetHeightPx = (screenHeight * sheetHeight) / 100;

   useEffect(() => {
      if (visible) {
         translateY.value = withSpring(screenHeight - sheetHeightPx, {
            damping: 100,
            stiffness: 400,
         });
      } else {
         translateY.value = withSpring(screenHeight);
      }
   }, [visible, sheetHeightPx]);

   const panGesture = Gesture.Pan()
      .onUpdate((event) => {
         // Follow the finger, but prevent dragging above the open position
         const newY = screenHeight - sheetHeightPx + event.translationY;
         if (newY >= screenHeight - sheetHeightPx) {
            translateY.value = newY;
         }
      })
      .onEnd((event) => {
         if (event.translationY > 100 || event.velocityY > 1000) {
            // Animate off screen first, then call onClose
            translateY.value = withSpring(screenHeight, {}, (finished) => {
               if (finished) {
                  runOnJS(onClose)();
               }
            });
         } else {
            // Snap back to open position
            translateY.value = withSpring(screenHeight - sheetHeightPx, {
               damping: 50,
               stiffness: 250,
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
         <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]} pointerEvents="box-none">
            <TouchableWithoutFeedback onPress={onClose}>
               <View style={styles.overlay} />
            </TouchableWithoutFeedback>

            <GestureDetector gesture={panGesture}>
               <Animated.View style={[styles.sheet, animatedStyle, { height: sheetHeightPx + insets.bottom }]}>
                  <View style={styles.handle} />
                  {heading ? (
                     <View style={{ marginVertical: 24 }}>
                        <AppText weight="semi" cap="capitalize">
                           {heading}
                        </AppText>
                     </View>
                  ) : null}
                  <View style={{ flex: 1, width: "100%" }}>{children}</View>
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
      padding: 16,
   },
   handle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: "#ccc",
      alignSelf: "center",
      marginVertical: 8,
   },
});
