import AppText from "@/components/ui/AppText";
import GradientButton from "@/components/ui/GradientButton";
import StepContainer from "@/components/ui/StepContainer";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { APP_INTEREST, INTERESTS } from "@/data/ProfileData";
import Icon from "@/icons";
import { useOnbardingFlowForm } from "@/store/useOnbardingFlowForm";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Step6_3() {
  const { form, updateField, nextStep } = useOnbardingFlowForm();

  const [showButton, setShowButton] = useState(false);

  const router = useRouter();

  const { bottom } = useSafeAreaInsets();

  const handleAppInterest = (interest: string) => {
    const current = form.appInterests ?? [];
    const set = new Set(current);

    if (set.has(interest)) {
      set.delete(interest);
    } else {
      if (set.size >= 3) return;
      set.add(interest);
    }
    updateField("appInterests", Array.from(set));
  };

  const handleInterest = (interest: string) => {
    const current = form.interests ?? [];
    const set = new Set(current);

    if (set.has(interest)) {
      set.delete(interest);
    } else {
      if (set.size >= 6) return;
      set.add(interest);
    }
    updateField("interests", Array.from(set));
  };

  const handleNext = () => {
    nextStep();
    router.push("/onboarding-flow/7-profile-pic");
  };

  useEffect(() => {
    const hasRequiredAppInterests = form.appInterests.length === 3;
    const hasRequiredInterests = form.interests.length === 6;
    setShowButton(hasRequiredAppInterests && hasRequiredInterests);
  }, [form.appInterests, form.interests]);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: wp(4),
          marginBottom: bottom,
          backgroundColor: appColors.white
        }}
      >
        <StepContainer heading="What is your interest?">
          <View className="relative gap-10">
            <View className="gap-6">
              {/* <View className="flex-row items-center gap-2"> */}
              <AppText>
                What kind of content would you like to see on Linuty? (min 3)
              </AppText>
              {/* </View> */}
              <View className="flex-row flex-wrap gap-3">
                {APP_INTEREST.map(int => {
                  const selected = form.appInterests.includes(int);
                  return (
                    <TouchableOpacity
                      key={int}
                      onPress={() => handleAppInterest(int)}
                      style={[
                        {
                          borderWidth: selected ? 1.5 : 1,
                          borderColor: selected
                            ? appColors.text
                            : appColors.border
                        },
                        style.selectabaleBtn
                      ]}
                    >
                      <AppText>{int}</AppText>
                      <Icon name="plus" />
                    </TouchableOpacity>
                    // <Pressable
                    //    key={int}
                    //    onPress={() => handleAppInterest(int)}
                    //    className="p-3 px-4 rounded-md relative overflow-hidden"
                    //    style={{
                    //       borderRadius: 8,
                    //    }}
                    // >
                    //    <LinearGradient
                    //       colors={
                    //          selected ? appColors.gradients.primaryLight : ["transparent", "transparent"]
                    //       }
                    //       start={{ x: 0, y: 0 }}
                    //       end={{ x: 1.2, y: 0 }}
                    //       style={{
                    //          ...StyleSheet.absoluteFillObject,
                    //          backgroundColor: selected ? "" : appColors.whitesmoke,
                    //       }}
                    //    />
                    //    <Text
                    //       style={{
                    //          fontFamily: selected ? Font.TiktokSemiBold : Font.TiktokMedium,
                    //          color: selected ? "black" : appColors.inputActive,
                    //          textTransform: "capitalize",
                    //          textAlign: "center",
                    //          fontSize: 15,
                    //       }}
                    //    >
                    //       {int}
                    //    </Text>
                    // </Pressable>
                  );
                })}
              </View>
            </View>
            <View className="gap-6 pb-16">
              <View className="flex-row items-center gap-2">
                <AppText>What are your interests? (max 6)</AppText>
              </View>

              <View className="flex-row flex-wrap gap-3">
                {INTERESTS.map(int => {
                  const selected = form.interests.includes(int);
                  return (
                    <TouchableOpacity
                      key={int}
                      onPress={() => handleInterest(int)}
                      style={[
                        {
                          borderWidth: selected ? 1.5 : 1,
                          borderColor: selected
                            ? appColors.text
                            : appColors.border
                        },
                        style.selectabaleBtn
                      ]}
                    >
                      <AppText>{int}</AppText>
                      <Icon name="plus" />
                    </TouchableOpacity>
                    // <Pressable
                    //    key={int}
                    //    onPress={() => handleInterest(int)}
                    //    className="p-3 px-4 rounded-md relative overflow-hidden"
                    //    style={{
                    //       borderRadius: 8,
                    //    }}
                    // >
                    //    <LinearGradient
                    //       colors={
                    //          selected ? appColors.gradients.primaryLight : ["transparent", "transparent"]
                    //       }
                    //       start={{ x: 0, y: 0 }}
                    //       end={{ x: 1.2, y: 0 }}
                    //       style={{
                    //          ...StyleSheet.absoluteFillObject,
                    //          backgroundColor: selected ? "" : appColors.whitesmoke,
                    //       }}
                    //    />
                    //    <Text
                    //       style={{
                    //          fontFamily: Font.TiktokMedium,
                    //          color: selected ? "black" : appColors.inputActive,
                    //          textTransform: "capitalize",
                    //          textAlign: "center",
                    //          fontSize: 15,
                    //       }}
                    //    >
                    //       {int}
                    //    </Text>
                    // </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        </StepContainer>
      </ScrollView>
      {showButton && (
        <View className="absolute bottom-0 w-full self-center bg-white">
          <GradientButton text="Next" onPress={handleNext} />
        </View>
      )}
    </>
  );
}

const style = StyleSheet.create({
  selectabaleBtn: {
    height: hp(5),
    paddingHorizontal: 16,
    borderRadius: 400,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6
  }
});
