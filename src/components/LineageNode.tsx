import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { appColors } from "../constant/colors";
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

   const COLORS = ["#092b28", "#125751", "#1b8279", "#4aa79f", "#8ec8c3"];
   const glowColors = ["#00f7e1", "#00f7ef", "#00f7c4", "#00f78d", "#00e8f7"];
   const glowColor = glowColors[level % glowColors.length];
   const lineColor = COLORS[level % COLORS.length];

   return (
      <View style={[styles.branch, { marginLeft: level }]}>
         <TouchableOpacity
            onPress={() => router.push(`/(app)/(tabs)/(explore)/${node.name}`)}
            style={[
               styles.name,
               {
                  backgroundColor: lineColor,
                  borderColor: glowColor,
                  shadowColor: glowColor,
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: 50,
                  width: 200,
               },
            ]}
         >
            <AppText color={appColors.white}>{node.name}</AppText>
         </TouchableOpacity>
         <View style={[styles.line, { backgroundColor: lineColor }]}></View>

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
   name: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: "transparent",
      // shadowColor: "#ffffff", // purple glow
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 12, // Android shadow
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
