import AppText from "@/src/components/AppText";
import Button from "@/src/components/Button";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import StepContainer from "@/src/components/StepContainer";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Step4() {
   const { form, errors, updateField, setError, nextStep } = useRegistrationStore();
   const router = useRouter();

   const handleNext = async () => {
      let valid = true;

      // if (!form.firstName) {
      //    setError("firstName", "first name is required");
      //    valid = false;
      // }
      // if (!form.surname) {
      //    setError("surname", "surname is required");
      //    valid = false;
      // }

      // if (!form.username) {
      //    setError("username", "password is required");
      //    valid = false;
      // }

      // if (!valid) return;
      if (valid) {
         nextStep();
         router.push("/(auth)/(new-user)/step-5");
      }
   };
   return (
      <ScreenWrapper>
         <StepContainer
            heading="What's your gender?"
            paragraph="Tell us your gender to help personalize your experience on Linuty. This information can make your profile more complete and help others connect with you in a way that feels authentic."
         >
            <View className="gap-4">
               <AppText size="lg" weight="semi">
                  Male
               </AppText>
               <AppText size="lg" weight="semi">
                  Female
               </AppText>
            </View>
         </StepContainer>
         <View className="gap-2 my-6">
            <Button onPress={handleNext} title="Next" size="lg" />
         </View>
      </ScreenWrapper>
   );
}
