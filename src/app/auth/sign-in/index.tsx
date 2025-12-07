import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signin() {
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: wp(4),
        flex: 1,
        backgroundColor: appColors.white
      }}
    >
      <View style={{ position: "relative", marginTop: hp(16) }}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ width: 75, height: 75, alignSelf: "center" }}
          contentFit="contain"
        />
      </View>

      <View className="relative flex-1 justify-between gap-2 py-6">
        <View className="relative top-20 gap-8">
          {/* <GradientButton text="Sign in" onPress={handleSubmit(onSubmit)} isLoading={isSubmitting} size="lg" /> */}
        </View>
        {/* <View className="w-full absolute bottom-5 gap-4">
               <Button
                  text="Create new account"
                  onPress={() => router.push("/auth/createAccount")}
                  size="lg"
                  variant="outline"
               />
               <View className="w-2/3 flex-row items-center justify-center flex-wrap self-center">
                  <AppText size="xs" align="center">
                     By signing in, you agree to our{" "}
                  </AppText>
                  <Pressable>
                     <AppText size="xs" align="center" color="blue">
                        Terms & Conditions,
                     </AppText>
                  </Pressable>
                  <AppText size="xs" align="center">
                     and{" "}
                  </AppText>
                  <Pressable>
                     <AppText size="xs" align="center" color="blue">
                        Privacy policy
                     </AppText>
                  </Pressable>
               </View>
            </View> */}
      </View>
    </SafeAreaView>
  );
}
