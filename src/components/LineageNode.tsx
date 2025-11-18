import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "./ui/AppText";

type Node = {
   id: string;
   name: string;
   children?: Node[];
};

type Props = {
   node: Node;
   level?: number;
};

const LineageBranch = ({ node, level = 0 }: Props) => {
   const router = useRouter();

   const COLORS = ["#FF9914", "#F21B3F", "#08BDBD", "#B084CC", "#2D7DD2"];
   // const glowColors = ["#00f7e1", "#00f7ef", "#00f7c4", "#00f78d", "#00e8f7"];
   // const glowColor = glowColors[level % glowColors.length];
   const lineColor = COLORS[level % COLORS.length];

   return (
      <View style={[styles.branch, { marginLeft: level }]}>
         <TouchableOpacity
            onPress={() => router.push(`/(app)/(tabs)/(explore)/${node.name}`)}
            style={{ padding: 4, marginHorizontal: 4 }}
            className="flex-row gap-2 items-center"
         >
            <View style={[styles.index, { backgroundColor: lineColor }]}></View>
            <AppText size="lg">{node.name}</AppText>
         </TouchableOpacity>
         {/* <View style={[styles.line, { backgroundColor: lineColor }]}></View> */}

         {node.children && node.children.length > 0 && (
            <View style={[styles.children]}>
               {node.children.map((child, i) => (
                  <LineageBranch key={i} node={child} level={level + 1} />
               ))}
            </View>
         )}
      </View>
   );
};

export default function LineageTree({ data }: { data: Node[] }) {
   return (
      <View>
         {data.map((ethnicity, i) => (
            <LineageBranch key={ethnicity.id} node={ethnicity} />
         ))}
      </View>
   );
}

const styles = StyleSheet.create({
   index: {
      width: 14,
      height: 14,
      flexDirection: "row",
      borderRadius: 4,
   },
   branch: {
      marginVertical: 5,
      alignContent: "flex-start",
      justifyContent: "flex-start",
   },
   node: {
      paddingVertical: 3,
      paddingHorizontal: 12,
      marginBottom: 8,
   },
   children: {
      paddingLeft: 24,
   },
   line: {
      height: "100%",
      width: 5,
      backgroundColor: "green",
      position: "absolute",
      left: 0,
   },
});
