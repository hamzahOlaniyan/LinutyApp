import { Font } from "@/assets/fonts/FontFamily";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import React, { useRef, useState } from "react";
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from "react-native";
import TabButton from "./TabButton";
// import FilterButton from "./FilterButton";

type TabRoute = { key: string; title: string };

type Props = {
  header?: React.ReactNode;
  routes: TabRoute[];
  scenes: { [key: string]: React.ReactNode };
  initialKey?: string;
  activeColor?: string;
  inactiveColor?: string;
  indicatorColor?: string;
  style?: StyleProp<ViewStyle>;
  className?: string;
};

export default function StickyTab({
  routes,
  scenes,
  initialKey,
  activeColor = appColors.primary,
  style,
  className
}: Props) {
  const [activeKey, setActiveKey] = useState(initialKey ?? routes[0].key);
  const scrollRef = useRef<ScrollView>(null);

  return (
    <>
      <ScrollView
        style={[style, { flex: 1, backgroundColor: appColors.white }]}
        contentContainerStyle={{ paddingBottom: 200 }}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        className={className}
      >
        {/* <View>{header}</View> */}

        {/* ✅ sticky wrapper */}
        {/* <View style={{ backgroundColor: appColors.white, zIndex: 10 }}> */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBarContainer}
        >
          {routes.map(route => {
            const isActive = route.key === activeKey;
            return (
              <TabButton
                key={route.key}
                onPress={() => setActiveKey(route.key)}
                isActive={isActive}
                activeColor={activeColor}
                title={route.title}
              />
            );
          })}
        </ScrollView>
        {/* </View> */}
        <ScrollView>{scenes[activeKey]}</ScrollView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: wp(3),
    paddingBottom: 24,
    paddingTop: 12,
    flex: 1
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 40
  },
  tabText: {
    fontSize: 16,
    fontFamily: Font.Medium,
    color: appColors.secondary
  }
});
