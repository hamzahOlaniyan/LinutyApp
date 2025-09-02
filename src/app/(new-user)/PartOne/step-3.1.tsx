import GradientButton from "@/src/components/GradientButton";
import { Input } from "@/src/components/Input";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import StepContainer from "@/src/components/StepContainer";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function Step3() {
   const { form, errors, updateField, setError, nextStep } = useRegistrationStore();
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const handleNext = async () => {
      let valid = true;

      if (!form.firstName) {
         setError("firstName", "first name is required");
         valid = false;
      }

      if (!form.lastName) {
         setError("lastName", "password is required");
         valid = false;
         3;
      }
      setLoading(true);

      if (!valid) return;
      if (valid) {
         nextStep();
         setLoading(false);
         router.push("/PartOne/step-3.2");
      }
   };

   return (
      <ScreenWrapper>
         <View className="gap-6">
            <StepContainer
               heading="Whats your name?"
               paragraph="This helps your friends, family, and community easily recognize and connect. Use the name you’re most
               commonly known by, so others can find you without confusion."
            >
               <View className="gap-2">
                  <Input
                     placeholder="First name"
                     value={form.firstName}
                     onChangeText={(firstName) => updateField("firstName", firstName)}
                     inputMode="text"
                     error={!!errors.firstName}
                     errorMessage={errors.firstName}
                  />
                  <Input
                     placeholder="Last name"
                     value={form.lastName}
                     onChangeText={(lastName) => updateField("lastName", lastName)}
                     inputMode="text"
                     error={!!errors.lastName}
                     errorMessage={errors.lastName}
                  />
               </View>
            </StepContainer>
            <View className="gap-2">
               <GradientButton onPress={handleNext} text="Next" size="lg" isLoading={loading} />
            </View>
         </View>
      </ScreenWrapper>
   );
}
