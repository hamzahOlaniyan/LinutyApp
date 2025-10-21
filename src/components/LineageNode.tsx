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
const COLORS = ["#000000", "#ec4899", "#a855f7", "#3b82f6", "#c084fc"];
const LineageBranch = ({ node, level = 0 }: Props) => {
   const lineColor = COLORS[level % COLORS.length];
   return (
      <View style={[styles.branch, { marginLeft: level * 12 }]}>
         <TouchableOpacity
            style={[
               styles.name,
               {
                  backgroundColor: lineColor,
               },
            ]}
         >
            <AppText
               size={level === 0 ? "xxl" : level === 1 ? "xl" : level === 2 ? "lg" : level === 3 ? "md" : "md"}
               weight={
                  level === 0 ? "extraBold" : level === 1 ? "bold" : level === 2 ? "semi" : level === 3 ? "med" : "reg"
               }
               //    color={lineColor}
               color={appColors.white}
            >
               {node.name}
            </AppText>
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
      padding: 5,
      paddingHorizontal: 12,
      flex: 1,
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
      //   top: 5,
      borderRadius: 50,
   },
});
