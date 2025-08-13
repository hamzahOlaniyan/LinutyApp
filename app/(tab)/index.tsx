import { Text, View } from "react-native";

export default function Index() {
   return (
      <View
         style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "orange",
         }}
      >
         <Text style={{ fontSize: 50, color: "white", textAlign: "center", fontWeight: "800" }}>Development</Text>
      </View>
   );
}
