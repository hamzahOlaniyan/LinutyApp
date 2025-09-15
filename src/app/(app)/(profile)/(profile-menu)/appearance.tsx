// import { hp, wp } from "@/src/common";
import AppText from "@/src/components/ui/AppText";
import { hp, wp } from "@/src/constant/common";
// import { colors } from "@/src/constant/colors";
// import { useThemeStore } from "@/src/context/themeStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

export default function Appearance() {
   // const { currentTheme, toggleTheme } = useThemeStore();

   const SettingButton = ({
      icon,
      text,
      onPress,
      isActive,
   }: {
      icon: React.ReactNode;
      text: string;
      onPress: () => void;
      isActive: boolean;
   }) => {
      return (
         <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-2">
               {icon}
               <AppText weight="med">{text}</AppText>
            </View>
            <MaterialCommunityIcons
               onPress={onPress}
               name={isActive ? "check-circle" : "checkbox-blank-circle-outline"}
               size={24}
               // color={currentTheme === "light" ? colors.light.text : colors.dark.text}
            />
         </View>
      );
   };

   return (
      <View
         style={{
            paddingHorizontal: wp(4),
            paddingVertical: hp(2),
            // backgroundColor: currentTheme === "dark" ? colors.dark.background : colors.light.background,
         }}
         className="flex-1 bg-white"
      >
         <View className="flex-row justify-between items-center">
            <AppText>Dark Mode</AppText>
            {/* <Switch
               value={currentTheme == "dark"}
               onChange={() => toggleTheme(currentTheme === "light" ? "dark" : "light")}
            /> */}
         </View>
         <View className="gap-6">
            <AppText weight="med">Theme Settings</AppText>
            {/* <SettingButton
               text="Light"
               icon={<Ionicons name="sunny-outline" size={22} color="black" />}
               onPress={() => toggleTheme("light")}
               isActive={currentTheme === "light"}
            /> */}
            {/* <SettingButton
               text="Dark"
               icon={<Ionicons name="moon-outline" size={22} color="black" />}
               onPress={() => toggleTheme("dark")}
               isActive={currentTheme === "dark"}
            /> */}
            {/* <SettingButton
               text="dark"
               icon={<MaterialIcons name="computer" size={24} color="black" />}
               onPress={() => toggleTheme("dark")}
            /> */}
         </View>
      </View>
   );
}
