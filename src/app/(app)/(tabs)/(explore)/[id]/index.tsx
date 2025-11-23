import AppText from "@/src/components/ui/AppText";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import { View } from "react-native";

export default function index() {
   const { id } = useLocalSearchParams();
   return (
      <View style={{ paddingHorizontal: wp(4), backgroundColor: appColors.white, flex: 1 }}>
         <Stack.Screen
            options={{
               title: `${id}`,
            }}
         />
         <AppText color={appColors.white}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, distinctio dolore itaque esse inventore ad
            dolores nisi in neque obcaecati? Perferendis adipisci, dolores voluptatibus deleniti nesciunt eaque ut quis.
            Consectetur.
         </AppText>
      </View>
   );
}
