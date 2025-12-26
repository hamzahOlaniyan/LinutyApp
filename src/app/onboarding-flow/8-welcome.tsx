import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import GradientButton from "@/components/ui/GradientButton";
import ScreenView from "@/components/ui/Layout/ScreenView";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, View } from "react-native";

export default function Step8() {
  const router = useRouter();

  const screenWidth = Dimensions.get("window").width;

  // useEffect(() => {
  //    const timer = setTimeout(() => {
  //       fetchProfile(userId);
  //       router.replace("/(app)/(tabs)");
  //       reset();
  //    }, 6000);
  //    return () => clearTimeout(timer);
  // }, []);

  return (
    <ScreenView>
      <View className="gap-2">
        <Image
          source={require("@/assets/images/linuty.png")}
          style={{ width: 75, height: 75, alignSelf: "center" }}
          contentFit="contain"
        />
        <View className="">
          <View>
            <AppText variant={"headerLarge"} className="text-center font-Black">
              You're all set! 🎉
            </AppText>
            <AppText variant={"titleLarge"} className="text-center font-Medium">
              Welcome to the community!
            </AppText>
          </View>
          <Image
            source={require("@/assets/images/welcome.png")}
            accessibilityLabel="Avatar"
            contentFit="contain"
            contentPosition={"center"}
            style={{
              width: screenWidth / 1.1,
              height: 300
            }}
          />
          <AppText variant={"title"} className="text-center font-Medium">
            Your profile is complete. You can now connect, join clans, ans
            explore new interests
          </AppText>
        </View>

        <View className="mt-8 gap-4">
          <GradientButton
            text="Go to home"
            onPress={() => router.replace("/(protected)/(tabs)/(home)")}
          />
          <Button
            variant="outline"
            text="View my profile"
            onPress={() => router.replace("/me")}
          />
        </View>
      </View>
    </ScreenView>
  );
}
