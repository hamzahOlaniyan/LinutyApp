import { hp } from "@/constants/common";
import React, { useEffect } from "react";
import { Modal, StyleSheet, View } from "react-native";
import AppText from "../AppText";

type ToastModalProps = {
  visible: boolean;
  message: string;
  duration?: number; // ms
  onClose: () => void;
};

/**
 * `ToastModal` displays a temporary toast message using a `Modal` overlay.
 *
 * Features:
 * - Appears at the bottom of the screen.
 * - Auto-closes after `duration` milliseconds when `visible` is `true`.
 * - Calls `onClose` when closed (either by timer or via `onRequestClose`).
 *
 * Usage:
 * ```tsx
 * const [toastVisible, setToastVisible] = useState(false);
 *
 * <ToastModal
 *   visible={toastVisible}
 *   message="Saved successfully"
 *   duration={2500}
 *   onClose={() => setToastVisible(false)}
 * />
 * ```
 *
 * @param {ToastModalProps} props Toast configuration and handlers.
 * @returns {JSX.Element} The rendered toast modal component.
 */
export default function ToastModal({
  visible,
  message,
  duration = 2000,
  onClose
}: ToastModalProps) {
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="relative flex-1 items-center justify-end">
        <View style={styles.toast}>
          <AppText className="text-center font-sans text-lg text-white">
            {message}
          </AppText>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  toast: {
    maxWidth: "60%",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "black",
    bottom: hp(10),
    elevation: 2
  }
});
