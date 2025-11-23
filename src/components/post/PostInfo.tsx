// import { colors } from "@/constant/colors";
// import { useThemeStore } from "@/context/themeStore";
import { appColors } from "@/constant/colors";
import { Feather, Fontisto, Octicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, View } from "react-native";
import AppText from "../ui/AppText";

type Props = {
   isVisible: boolean;
   onClose?: () => void;
   isUserOwner: boolean;
   handleDelete: () => void;
};

export default function PostInfo({ isVisible, onClose, isUserOwner, handleDelete }: Props) {
   // const { currentTheme } = useThemeStore();

   return (
      <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
         <View
            style={{ backgroundColor: appColors.white }}
            className="h-1/4 w-full rounded-tr-[2rem] rounded-tl-[2rem] absolute bottom-0 shadow-lg shadow-black/60"
         >
            <View className="h-full p-6 items-end">
               <Fontisto
                  onPress={onClose}
                  name="close-a"
                  size={12}
                  // color={currentTheme === "light" ? colors.light.text : colors.dark.text}
                  className="relative float-right mb-6 right-3"
               />
               <View
                  style={
                     {
                        // backgroundColor: currentTheme === "light" ? colors.light.input : colors.dark.input,
                     }
                  }
                  className="rounded-3xl"
               >
                  <Pressable
                     style={
                        {
                           // borderBottomColor: currentTheme === "light" ? colors.light.hairlLine : colors.dark.hairlLine,
                        }
                     }
                     onPress={handleDelete}
                     className="w-full p-5 flex-row gap-2 justify-between items-center border-b border-neutral-200"
                  >
                     <AppText>Block</AppText>
                     <Octicons
                        name="blocked"
                        size={18}
                        // color={currentTheme === "light" ? colors.light.text : colors.dark.text}
                     />
                  </Pressable>
                  {isUserOwner && (
                     <Pressable
                        onPress={handleDelete}
                        className="w-full p-5 flex-row gap-2 justify-between items-center"
                     >
                        <AppText className="text-red-600">Delete Post</AppText>
                        <Feather name="trash-2" size={18} color="red" />
                     </Pressable>
                  )}
               </View>
            </View>
         </View>
      </Modal>
   );
}
