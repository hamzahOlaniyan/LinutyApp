import GradientButton from "@/src/components/GradientButton";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import Select from "@/src/components/Select";
import StepContainer from "@/src/components/StepContainer";
import { COUNTRIES } from "@/src/data/ProfileData";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Step5() {
   const { form, errors, updateField, setError, nextStep } = useRegistrationStore();
   const router = useRouter();

   const handleNext = async () => {
      let valid = true;

      if (!form.location) {
         setError("location", "country of birth is required");
         valid = false;
      }

      if (!valid) return;

      if (valid) {
         nextStep();
         router.push("/PartTwo/step-6.1");
      }
   };

   return (
      <ScreenWrapper>
         <StepContainer
            heading="Background Information"
            paragraph="Share your nationality and country of birth to help us build meaningful connections through lineage and community."
         >
            <View className="relative gap-24">
               <Select
                  height={90}
                  options={COUNTRIES}
                  searchable
                  placeholder="Location"
                  onSelect={(cob) => updateField("location", cob)}
                  error={!!errors.location}
                  errorMessage={errors.location}
               />
               <View className="gap-2 my-6">
                  <GradientButton onPress={handleNext} text="Next" size="lg" />
               </View>
            </View>
         </StepContainer>
      </ScreenWrapper>
   );
}
