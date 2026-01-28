// import BottomSheet, {
//   BottomSheetFlatList,
//   BottomSheetFooter,
//   BottomSheetTextInput
// } from "@gorhom/bottom-sheet";
// import React, { useMemo, useState } from "react";
// import { Pressable, Text, View } from "react-native";

// export function CommentsSheet({ data, onSend }: any) {
//   const snapPoints = useMemo(() => ["70%"], []);
//   const [text, setText] = useState("");

//   const renderFooter = (props: unk) => (
//     <BottomSheetFooter {...props} bottomInset={0}>
//       <View style={{ padding: 12, flexDirection: "row", gap: 10 }}>
//         <View
//           style={{
//             flex: 1,
//             borderWidth: 1,
//             borderRadius: 12,
//             paddingHorizontal: 12
//           }}
//         >
//           <BottomSheetTextInput
//             value={text}
//             onChangeText={setText}
//             placeholder="Write a comment…"
//             style={{ height: 44 }}
//           />
//         </View>

//         <Pressable
//           onPress={() => {
//             const t = text.trim();
//             if (!t) return;
//             onSend(t);
//             setText("");
//           }}
//           style={{
//             paddingHorizontal: 14,
//             justifyContent: "center",
//             borderRadius: 12,
//             borderWidth: 1
//           }}
//         >
//           <Text>Send</Text>
//         </Pressable>
//       </View>
//     </BottomSheetFooter>
//   );

//   return (
//     <BottomSheet
//       snapPoints={snapPoints}
//       keyboardBehavior="interactive"
//       keyboardBlurBehavior="restore"
//       android_keyboardInputMode="adjustResize"
//       footerComponent={renderFooter}
//     >
//       <BottomSheetFlatList
//         data={data}
//         keyExtractor={(item: any) => item.id}
//         renderItem={({ item }: any) => <Text>{item.text}</Text>}
//         contentContainerStyle={{ padding: 12, paddingBottom: 90 }}
//       />
//     </BottomSheet>
//   );
// }
