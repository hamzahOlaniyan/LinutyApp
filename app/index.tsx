import { Text, View } from "react-native";

export default function Index() {
   return (
      <View
         style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "blue",
         }}
      >
         <Text style={{ fontSize: 25, color: "white" }}>Edit app/index.tsx to edit this screen.</Text>
      </View>
   );
}
