// import LogoutButton from "@/components/LogoutButton";
import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { queryClient } from "@/provider/QueryProvider";
import { useAuthStore } from "@/store/authStore";
// import { useThemeStore } from "@/context/themeStore";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

const mockArray = Array.from({ length: 10 }, (_, i) => `Time management ${i + 1}`);

export default function ProfileMenu() {
   // const { currentTheme } = useThemeStore();
   const { signOut } = useAuthStore();

   const handleClear = async () => {
      try {
         // 1️⃣ Clear async storage
         await AsyncStorage.clear();
         queryClient.clear();

         // 2️⃣ Clear persisted Zustand stores
         await useAuthStore.persist.clearStorage();

         console.log("✅ All local data cleared!");
      } catch (error) {
         console.error("❌ Failed to clear local data:", error);
      }
   };

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
            ListFooterComponent={
               <View className="gap-4">
                  <TouchableOpacity onPress={() => signOut()} className="bg-blue-500 p-4">
                     <AppText size="xl" color={appColors.white}>
                        logout
                     </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleClear} className="bg-red-500 p-4">
                     <AppText size="xl" color={appColors.white}>
                        Dev reset
                     </AppText>
                  </TouchableOpacity>
               </View>
            }
         />
      </View>
   );
}
