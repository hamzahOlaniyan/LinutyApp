import { TiktokFont } from "@/assets/fonts/FontFamily";
import { appColors } from "@/src/constant/colors";
import { hp, wp } from "@/src/constant/common";
import React, { useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabRoute = { key: string; title: string };

type Props = {
   header: React.ReactNode;
   routes: TabRoute[];
   scenes: { [key: string]: React.ReactNode };
   initialKey?: string;
   activeColor?: string;
   inactiveColor?: string;
   indicatorColor?: string;
};

export default function StickyTabs({
   header,
   routes,
   scenes,
   initialKey,
   activeColor = "#000",
   inactiveColor = "#999",
   indicatorColor = "#000",
}: Props) {
   const [activeKey, setActiveKey] = useState(initialKey ?? routes[0].key);
   const scrollRef = useRef<ScrollView>(null);

   const { bottom } = useSafeAreaInsets();

   return (
      <ScrollView
         style={{ flex: 1, backgroundColor: appColors.white, marginBottom: bottom }}
         stickyHeaderIndices={[1]}
         showsVerticalScrollIndicator={false}
         ref={scrollRef}
      >
         <View>{header}</View>

         <View>
            <View style={styles.tabBar}>
               {routes.map((route) => {
                  const isActive = route.key === activeKey;
                  return (
                     <Pressable key={route.key} onPress={() => setActiveKey(route.key)} style={styles.tabButton}>
                        <Text style={[styles.tabText, { color: isActive ? activeColor : inactiveColor }]}>
                           {route.title}
                        </Text>
                        {isActive && <View style={[styles.indicator, { backgroundColor: indicatorColor }]} />}
                     </Pressable>
                  );
               })}
            </View>
         </View>

         <View style={{ paddingVertical: 16 }}>{scenes[activeKey]}</View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   tabBar: {
      flexDirection: "row",
      backgroundColor: "#fff",
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      paddingHorizontal: wp(4),
      gap: 20,
   },
   tabButton: {
      paddingVertical: 12,
   },
   tabText: {
      fontSize: hp(1.8),
      fontFamily: TiktokFont.TiktokMedium,
   },
   indicator: {
      height: 3,
      width: "100%",
      position: "absolute",
      bottom: -1.5,
      borderRadius: 20,
   },
});
