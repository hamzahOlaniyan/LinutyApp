import HomeHeaderMenu from "@/src/components/HomeHeaderMenu";
import PostCard from "@/src/components/post/PostCard";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { useAuthStore } from "@/src/store/authStore";
import React, { useRef, useState } from "react";
import { Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView } from "react-native";

export default function index() {
   const { signOut } = useAuthStore();
   const [lastOffset, setLastOffset] = useState(0);
   const headerTranslateY = useRef(new Animated.Value(0)).current;

   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;

      if (offsetY <= 0) {
         // Always show header at very top
         Animated.timing(headerTranslateY, {
            toValue: 0,
            duration: -150,
            useNativeDriver: true,
         }).start();
      } else if (offsetY > lastOffset) {
         // Scrolling down → hide
         Animated.timing(headerTranslateY, {
            toValue: -100,
            duration: -100,
            useNativeDriver: true,
         }).start();
      } else if (offsetY < lastOffset) {
         // Scrolling up → show
         Animated.timing(headerTranslateY, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
         }).start();
      }

      setLastOffset(offsetY);
   };
   const sample = Array(20)
      .fill(0)
      .map((_, i) => i);

   return (
      <ScreenWrapper paddingHorizontal={0}>
         <SafeAreaView style={{ paddingHorizontal: wp(3), backgroundColor: appColors.extralightOlive }}>
            <HomeHeaderMenu headerTranslateY={headerTranslateY} />
            <FlatList
               data={sample}
               renderItem={({ item }) => <PostCard />}
               showsVerticalScrollIndicator={false}
               onScroll={handleScroll}
               scrollEventThrottle={4}
               contentContainerStyle={{ paddingTop: 70 }}
            />
         </SafeAreaView>
      </ScreenWrapper>
   );
}
