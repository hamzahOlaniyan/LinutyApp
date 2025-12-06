import { settingOptions } from "@/components/profile/SettingsOptions";
import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

export default function ProfileSettings() {
   const router = useRouter();

   return (
      <View style={{ backgroundColor: appColors.white, flex: 1 }}>
         <FlatList
            contentContainerStyle={{ rowGap: 6, backgroundColor: appColors.extralightOlive }}
            data={settingOptions}
            renderItem={({ item }) => (
               <View
                  style={{ backgroundColor: appColors.white, paddingHorizontal: wp(4), paddingVertical: hp(2) }}
                  className="gap-3"
               >
                  <AppText cap="capitalize" weight="semi" size="lg">
                     {item.type}
                  </AppText>
                  <View className="gap-5">
                     {item.options.map((opt) => (
                        <TouchableOpacity
                           onPress={() => {
                              console.log("pressed");

                              if (opt.action) {
                                 opt.action();
                              } else router.push(`/user-profile/settings/${opt.url}` as any);
                           }}
                           key={opt.title}
                           className="flex-row w-full flex-1 justify-between items-center"
                        >
                           <View className="flex-row items-center gap-3">
                              {opt.icon}
                              <AppText cap="capitalize">{opt.title}</AppText>
                           </View>
                           <Ionicons name="chevron-forward-sharp" size={20} color={appColors.lightGrey} />
                        </TouchableOpacity>
                     ))}
                  </View>
               </View>
            )}
            // ListFooterComponent={
            //    <View className="gap-4">
            //       <TouchableOpacity onPress={() => signOut()} className="bg-blue-500 p-4">
            //          <AppText size="xl" color={appColors.white}>
            //             logout
            //          </AppText>
            //       </TouchableOpacity>
            //       <TouchableOpacity onPress={handleClear} className="bg-red-500 p-4">
            //          <AppText size="xl" color={appColors.white}>
            //             Dev reset
            //          </AppText>
            //       </TouchableOpacity>
            //    </View>
            // }
         />
      </View>
   );
}
