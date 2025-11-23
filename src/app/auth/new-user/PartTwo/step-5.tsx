import StepContainer from "@/components/StepContainer";
import GradientButton from "@/components/ui/GradientButton";
import Select from "@/components/ui/Select";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { COUNTRIES } from "@/data/ProfileData";
import { useRegistrationStore } from "@/store/useRegistrationState";
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
      <View style={{ paddingHorizontal: wp(4), flex: 1, backgroundColor: appColors.white }}>
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
      </View>
   );
}
