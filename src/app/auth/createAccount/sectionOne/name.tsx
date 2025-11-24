import StepContainer from "@/components/StepContainer";
import AppText from "@/components/ui/AppText";
import GradientButton from "@/components/ui/GradientButton";
import { Input } from "@/components/ui/Input";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { useRegistrationStore } from "@/store/useRegistrationState";
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
      <View style={{ paddingHorizontal: wp(4), backgroundColor: appColors.white, flex: 1 }}>
         <View className="gap-6">
            <StepContainer
               heading="Whats your name?"
               paragraph="This helps your friends, family, and community to easily recognize and connect."
            >
               <View className="gap-2">
                  <AppText color={appColors.secondary}>
                     * Use the names you are known by among family and friends back home.
                  </AppText>
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
      </View>
   );
}
