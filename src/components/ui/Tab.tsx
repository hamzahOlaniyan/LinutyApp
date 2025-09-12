import { TiktokFont } from "@/assets/fonts/FontFamily";
import { appColors } from "@/src/constant/colors";
import React, { useCallback, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TabView } from "react-native-tab-view";

type TabRoute = {
   key: string;
   title?: string;
   icon?: React.ReactNode; // can be <Icon /> or JSX
};

type Props = {
   routes: TabRoute[] | any;
   scenes: Record<string, React.ComponentType<any>>;
   initialIndex?: number;
   activeColor?: string;
   inactiveColor?: string;
   indicatorColor?: string;
};

export default function CustomTabView({
   routes,
   scenes,
   initialIndex = 0,
   activeColor = appColors.primary,
   inactiveColor = appColors.grey,
   indicatorColor = appColors.primary,
}: Props) {
   const [index, setIndex] = useState(initialIndex);
   // const [index, setIndex] = useState(initialIndex);

   const renderScene = useCallback(
      ({ route }: { route: TabRoute }) => {
         const Scene = scenes[route.key];
         return Scene ? <Scene /> : null;
      },
      [scenes]
   );

   const renderTabBar = useCallback(
      (props: any) => {
         const inputRange = props.navigationState.routes.map((_: any, i: number) => i);

         return (
            <View style={styles.tabBar}>
               {props.navigationState.routes.map((route: TabRoute, i: number) => {
                  const opacity = props.position.interpolate({
                     inputRange,
                     outputRange: inputRange.map((inputIndex: number) => (inputIndex === i ? 1 : 0.6)),
                  });

                  const isActive = index === i;
                  const color = isActive ? activeColor : inactiveColor;

                  return (
                     <TouchableOpacity key={route.key} style={[styles.tabItem]} onPress={() => setIndex(i)}>
                        <Animated.View style={[styles.tabContent]}>
                           {route.icon && <View style={[styles.icon]}>{route.icon}</View>}
                           {route.title && <Text style={[styles.tabText, { color: color }]}>{route.title}</Text>}
                        </Animated.View>

                        {isActive && <View style={[styles.indicator, { backgroundColor: indicatorColor }]} />}
                     </TouchableOpacity>
                  );
               })}
            </View>
         );
      },
      [index, activeColor, inactiveColor, indicatorColor]
   );

   return (
      <TabView
         navigationState={{ index, routes }}
         renderScene={renderScene}
         renderTabBar={renderTabBar}
         onIndexChange={setIndex}
      />
   );
}

const styles = StyleSheet.create({
   tabBar: {
      flexDirection: "row",
      backgroundColor: "#fff",
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
   },
   tabItem: {
      flex: 1,
      alignItems: "center",
      position: "relative",
      paddingVertical: 12,
   },
   tabContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
   },
   tabText: {
      fontSize: 14,
      fontFamily: TiktokFont.TiktokMedium,
      color: "black",
   },
   icon: {
      // marginRight: 4,
   },
   indicator: {
      height: 3,
      width: "100%",
      borderRadius: 2,
      marginTop: 6,
      position: "absolute",
      bottom: 0,
   },
});
