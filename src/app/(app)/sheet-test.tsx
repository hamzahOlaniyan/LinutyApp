import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
   // ref
   const bottomSheetRef = useRef<BottomSheet>(null);

   // callbacks
   const handleSheetChanges = useCallback((index: number) => {
      console.log("handleSheetChanges", index);
   }, []);

   const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

   const handleCloseSheet = () => bottomSheetRef.current?.close();
   const handleOpenSheet = () => bottomSheetRef.current?.expand();
   const snapToIndex = (idx: number) => bottomSheetRef.current?.snapToIndex(idx);

   // renders
   return (
      <GestureHandlerRootView style={styles.container}>
         {/* <Button title="open" onPress={handleOpenSheet} />
         <Button title="close" onPress={handleCloseSheet} />
         <Button title="snap 0" onPress={() => snapToIndex(0)} />
         <Button title="snap 1" onPress={() => snapToIndex(1)} />
         <Button title="snap 2" onPress={() => snapToIndex(2)} /> */}

         <BottomSheet
            ref={bottomSheetRef}
            // onChange={handleSheetChanges}
            snapPoints={snapPoints}
            enablePanDownToClose
            handleIndicatorStyle={{ height: 10, width: 75, backgroundColor: "black", borderRadius: 200 }}
         >
            <BottomSheetView style={styles.contentContainer}>
               <Text>Awesome 🎉</Text>
            </BottomSheetView>
         </BottomSheet>
      </GestureHandlerRootView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "grey",
   },
   contentContainer: {
      flex: 1,
      padding: 36,
      alignItems: "center",
   },
});

export default App;
