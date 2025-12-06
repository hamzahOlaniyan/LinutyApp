import React from "react";
import { FlatList, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "../ui/AppText";
import { ModalProps } from "./types";

/**
 * `InputModal` is a reusable bottom-sheet-style modal for selecting an option
 * from a list.
 *
 * Features:
 * - Title header with a close button
 * - Scrollable list of options using `FlatList`
 * - Optional icon and subLabel for each option
 * - Automatically closes after an option is selected or when the user taps ✕
 *
 * This component is typically used by `AppInput` to implement:
 * - Country selector for phone numbers
 * - Metric suffix selector (e.g., kg, cm)
 * - Generic "select" inputs
 *
 * @component
 *
 * @param {ModalProps} props
 * The configuration of the modal: visibility, options, selection callback, and title.
 *
 * @returns {JSX.Element} The rendered modal component.
 */
export default function InputModal({ visible, setVisible, options, onSelect, title }: ModalProps) {
   return (
      <Modal transparent visible={visible} animationType="fade" onRequestClose={() => setVisible(false)}>
         <View style={styles.backdrop}>
            <View style={styles.sheet}>
               <View style={styles.sheetHeader}>
                  <AppText className="font-Semibold text-lg">{title}</AppText>
                  <TouchableOpacity onPress={() => setVisible(false)}>
                     <AppText className="text-xl">✕</AppText>
                  </TouchableOpacity>
               </View>

               <FlatList
                  data={options}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                     <TouchableOpacity
                        onPress={() => {
                           onSelect(item);
                           setVisible(false);
                        }}
                        className="flex-row gap-2 py-3"
                     >
                        {item.icon && <AppText className="text-xl">{item.icon}</AppText>}
                        <View className="flex-1 flex-row justify-between">
                           <AppText className="capitalize">{item.label}</AppText>
                           {item.subLabel && <AppText className="text-gray-500">{item.subLabel}</AppText>}
                        </View>
                     </TouchableOpacity>
                  )}
               />
            </View>
         </View>
      </Modal>
   );
}

const styles = StyleSheet.create({
   backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.8)",
      justifyContent: "center",
      paddingHorizontal: 24,
   },
   sheet: {
      maxHeight: "70%",
      borderRadius: 16,
      padding: 16,
      backgroundColor: "white",
   },
   sheetHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
   },
});
