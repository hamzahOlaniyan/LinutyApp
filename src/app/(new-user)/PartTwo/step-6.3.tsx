import { TiktokFont } from "@/assets/fonts/FontFamily";
import AppText from "@/src/components/AppText";
import GradientButton from "@/src/components/GradientButton";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import StepContainer from "@/src/components/StepContainer";
import { colors } from "@/src/constant/colors";
import { APP_INTEREST, INTERESTS } from "@/src/data/ProfileData";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Step6_3() {
   const { form, errors, updateField, nextStep, setError } = useRegistrationStore();
   // console.log("6.3", JSON.stringify(form, null, 2));

   const [showButton, setShowButton] = useState(false);

   const router = useRouter();

   // useFocusEffect(
   //    React.useCallback(() => {
   //       return () => {
   //          updateField("app_interest", [] as any);
   //          updateField("interests", [] as any);
   //       };
   //    }, [])
   // );

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

      if (form.app_interest.length + form.interests.length >= 9) {
         setShowButton(true);
      } else {
         setShowButton(false);
      }
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

      if (form.app_interest.length + form.interests.length >= 9) {
         setShowButton(true);
      } else {
         setShowButton(false);
      }
   };

   const handleNext = () => {
      nextStep();
      router.push("/PartTwo/step-7");
   };

   return (
      <ScreenWrapper>
         <ScrollView showsVerticalScrollIndicator={false}>
            <StepContainer
               heading="What is your interest?"
               // paragraph="What kind of content would you like to see on Linuty?"
            >
               <View className="gap-10 relative">
                  <View className="gap-4">
                     <View className="flex-row items-center gap-2">
                        <AppText size="lg" weight="semi">
                           What kind of content would you like to see on Linuty? (minimum on 3)
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
                                    colors={selected ? colors.gradients.primaryLight : ["transparent", "transparent"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1.2, y: 0 }}
                                    style={{
                                       ...StyleSheet.absoluteFillObject,
                                       backgroundColor: selected ? "" : colors.whitesmoke,
                                    }}
                                 />
                                 <Text
                                    style={{
                                       fontFamily: selected ? TiktokFont.TiktokSemiBold : TiktokFont.TiktokMedium,
                                       color: selected ? "black" : colors.inputActive,
                                       textTransform: "capitalize",
                                       textAlign: "center",
                                       fontSize: 14,
                                    }}
                                 >
                                    {int}
                                 </Text>
                              </Pressable>
                           );
                        })}
                     </View>
                  </View>
                  <View className="gap-4 pb-16">
                     <View className="flex-row items-center gap-2">
                        <AppText size="lg" weight="semi">
                           What are your interests? (max 5)
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
                                    colors={selected ? colors.gradients.primaryLight : ["transparent", "transparent"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1.2, y: 0 }}
                                    style={{
                                       ...StyleSheet.absoluteFillObject,
                                       backgroundColor: selected ? "" : colors.whitesmoke,
                                    }}
                                 />
                                 <Text
                                    style={{
                                       fontFamily: TiktokFont.TiktokMedium,
                                       color: selected ? "black" : colors.inputActive,
                                       textTransform: "capitalize",
                                       textAlign: "center",
                                       fontSize: 14,
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
