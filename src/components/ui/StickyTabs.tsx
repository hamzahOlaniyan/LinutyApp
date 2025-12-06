import { Font } from "@/assets/fonts/FontFamily";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FilterButton from "./FilterButton";

type TabRoute = { key: string; title: string };

type Props = {
   header?: React.ReactNode;
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
   activeColor = appColors.primary,
}: // inactiveColor = "#999",
// indicatorColor = "#000",
Props) {
   const [activeKey, setActiveKey] = useState(initialKey ?? routes[0].key);
   const scrollRef = useRef<ScrollView>(null);

   const { bottom } = useSafeAreaInsets();

   return (
      <ScrollView
         style={{ flex: 1, backgroundColor: appColors.white, marginBottom: bottom, paddingBottom: 200 }}
         stickyHeaderIndices={[1]}
         showsVerticalScrollIndicator={false}
         ref={scrollRef}
      >
         <View>{header}</View>
         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: appColors.white }}>
            <View style={styles.tabBar}>
               {routes.map((route) => {
                  const isActive = route.key === activeKey;
                  return (
                     <FilterButton
                        key={route.key}
                        onPress={() => setActiveKey(route.key)}
                        isActive={isActive}
                        activeColor={activeColor}
                        title={route.title}
                     />
                  );
               })}
            </View>
         </ScrollView>
         <View className="flex-1">{scenes[activeKey]}</View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   tabBar: {
      flexDirection: "row",
      gap: 10,
      paddingHorizontal: wp(4),
      paddingVertical: 10,
   },
   tabButton: {
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 40,
   },
   tabText: {
      fontSize: 16,
      fontFamily: Font.Medium,
      color: appColors.secondary,
   },
});
