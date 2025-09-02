import { TiktokFont } from "@/assets/fonts/FontFamily";
import AppText from "@/src/components/AppText";
import GradientButton from "@/src/components/GradientButton";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import StepContainer from "@/src/components/StepContainer";
import { appColors } from "@/src/constant/colors";
import { APP_INTEREST, INTERESTS } from "@/src/data/ProfileData";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Step6_3() {
   const { form, updateField, nextStep } = useRegistrationStore();

   const [showButton, setShowButton] = useState(false);

   const router = useRouter();

   const handleAppInterest = (interest: string) => {
      const current = form.app_interest ?? [];
      const set = new Set(current);

      if (set.has(interest)) {
         set.delete(interest);
      } else {
         if (set.size >= 3) return;
         set.add(interest);
      }
      updateField("app_interest", Array.from(set) as any);
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
      updateField("interests", Array.from(set) as any);
   };

   const handleNext = () => {
      nextStep();
      router.push("/PartTwo/step-7");
   };

   useEffect(() => {
      const hasRequiredAppInterests = form.app_interest.length === 3;
      const hasRequiredInterests = form.interests.length === 6;
      setShowButton(hasRequiredAppInterests && hasRequiredInterests);
   }, [form.app_interest, form.interests]);

   return (
      <ScreenWrapper>
         <ScrollView showsVerticalScrollIndicator={false}>
            <StepContainer heading="What is your interest?">
               <View className="gap-10 relative">
                  <View className="gap-6">
                     <View className="flex-row items-center gap-2">
                        <AppText size="lg" weight="semi">
                           What kind of content would you like to see on Linuty? (min 3)
                        </AppText>
                     </View>
                     <View className="flex-row flex-wrap gap-4">
                        {APP_INTEREST.map((int) => {
                           const selected = form.app_interest.includes(int);
                           return (
                              <Pressable
                                 key={int}
                                 onPress={() => handleAppInterest(int)}
                                 className="p-3 px-4 rounded-md relative overflow-hidden"
                                 style={{
                                    borderRadius: 8,
                                 }}
                              >
                                 <LinearGradient
                                    colors={
                                       selected ? appColors.gradients.primaryLight : ["transparent", "transparent"]
                                    }
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1.2, y: 0 }}
                                    style={{
                                       ...StyleSheet.absoluteFillObject,
                                       backgroundColor: selected ? "" : appColors.whitesmoke,
                                    }}
                                 />
                                 <Text
                                    style={{
                                       fontFamily: selected ? TiktokFont.TiktokSemiBold : TiktokFont.TiktokMedium,
                                       color: selected ? "black" : appColors.inputActive,
                                       textTransform: "capitalize",
                                       textAlign: "center",
                                       fontSize: 15,
                                    }}
                                 >
                                    {int}
                                 </Text>
                              </Pressable>
                           );
                        })}
                     </View>
                  </View>
                  <View className="gap-6 pb-16">
                     <View className="flex-row items-center gap-2">
                        <AppText size="lg" weight="semi">
                           What are your interests? (max 6)
                        </AppText>
                     </View>

                     <View className="flex-row flex-wrap gap-4">
                        {INTERESTS.map((int) => {
                           const selected = form.interests.includes(int);
                           return (
                              <Pressable
                                 key={int}
                                 onPress={() => handleInterest(int)}
                                 className="p-3 px-4 rounded-md relative overflow-hidden"
                                 style={{
                                    borderRadius: 8,
                                 }}
                              >
                                 <LinearGradient
                                    colors={
                                       selected ? appColors.gradients.primaryLight : ["transparent", "transparent"]
                                    }
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1.2, y: 0 }}
                                    style={{
                                       ...StyleSheet.absoluteFillObject,
                                       backgroundColor: selected ? "" : appColors.whitesmoke,
                                    }}
                                 />
                                 <Text
                                    style={{
                                       fontFamily: TiktokFont.TiktokMedium,
                                       color: selected ? "black" : appColors.inputActive,
                                       textTransform: "capitalize",
                                       textAlign: "center",
                                       fontSize: 15,
                                    }}
                                 >
                                    {int}
                                 </Text>
                              </Pressable>
                           );
                        })}
                     </View>
                  </View>
               </View>
            </StepContainer>
         </ScrollView>
         {showButton && (
            <View className="bg-white absolute bottom-0 w-full self-center">
               <GradientButton text="Next" onPress={handleNext} />
            </View>
         )}
      </ScreenWrapper>
   );
}
