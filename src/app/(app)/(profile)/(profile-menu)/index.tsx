// import LogoutButton from "@/src/components/LogoutButton";
import LogoutButton from "@/src/components/profile/LogoutButton";
import AppText from "@/src/components/ui/AppText";
import { appColors } from "@/src/constant/colors";
import { hp, wp } from "@/src/constant/common";
// import { useThemeStore } from "@/src/context/themeStore";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

const mockArray = Array.from({ length: 10 }, (_, i) => `Time management ${i + 1}`);

export default function ProfileMenu() {
   // const { currentTheme } = useThemeStore();

   return (
      <View
         style={{
            paddingHorizontal: wp(4),
            paddingVertical: hp(2),
            backgroundColor: appColors.white,
         }}
         className="flex-1 "
      >
         <FlatList
            data={mockArray}
            renderItem={(item) => (
               <Link href="/(app)/(profile)/(profile-menu)/appearance">
                  <View className="flex-row w-full justify-between items-center ">
                     <View className="flex-row justify-between gap-3 items-center">
                        <MaterialIcons
                           name="help-outline"
                           size={30}
                           // color={currentTheme === "light" ? colors.light.text : colors.dark.text}
                        />
                        <AppText>{item.item}</AppText>
                     </View>

                     <Ionicons
                        name="chevron-forward-sharp"
                        size={24}
                        // color={currentTheme === "light" ? colors.light.text : colors.dark.text}
                        className="relative"
                     />
                  </View>
               </Link>
            )}
            contentContainerStyle={{ rowGap: 20 }}
            ListFooterComponent={<LogoutButton />}
         />
      </View>
   );
}
