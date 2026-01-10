import React, { memo } from "react";
import AppText from "../AppText";

export const EmptyFeed = memo(() => {
  // const skeleton = Array.from({ length: 10 }, _ => _);
  return (
    <AppText>load</AppText>
    // <Animated.View className="h-full flex-1 gap-4 bg-background">
    //   {skeleton.map((_, idx) => (
    //     <Animated.View
    //       key={idx}
    //       style={{ height: hp(25) }}
    //       className="w-full animate-pulse bg-white ease-in-out"
    //     ></Animated.View>
    //   ))}
    // </Animated.View>
  );
});

export default EmptyFeed;
