import Button from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import StepContainer from "@/src/components/StepContainer";
import { supabase } from "@/src/lib/supabase";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function Step1() {
   const { form, errors, updateField, setError, nextStep, resetErrors } = useRegistrationStore();

   const [loading, setLoading] = useState(false);

   const router = useRouter();

   useFocusEffect(
      React.useCallback(() => {
         return () => resetErrors(); // clears ALL errors when leaving screen
      }, [resetErrors])
   );

   const isValidEmail = (email: string) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
   };

   const handleNext = async () => {
      let valid = true;
      if (!form.email) {
         setError("email", "Email is required");
         valid = false;
         return;
      } else if (!isValidEmail(form.email)) {
         setError("email", "Enter a valid email address");
         valid = false;
         return;
      }

      setLoading(true);

      const { data, error } = await supabase
         .from("profiles") // 👈 your users table
         .select("id")
         .eq("email", form.email)
         .maybeSingle();

      if (data) {
         setError("email", "This email is already registered, try another email");
         setLoading(false);
         valid = false;
         return;
      }

      if (error) {
         setError("email", "Error checking email, try again later");
         valid = false;
         return;
      }

      if (valid) {
         nextStep();
         router.push("/(auth)/(new-user)/step-2");
         setLoading(false);
      }
   };

   return (
      <ScreenWrapper>
         <StepContainer
            heading="What is your email address?"
            paragraph="Enter a valid email address to continue. We’ll use this email to verify your identity and send important
               updates about your Linuty account."
         >
            <Input
               placeholder="Email address"
               value={form.email}
               onChangeText={(email) => updateField("email", email)}
               keyboardType="email-address"
               inputMode="text"
               error={!!errors.email}
               errorMessage={errors.email}
            />
            <View className="gap-2 my-6">
               <Button onPress={handleNext} title="Next" size="lg" isLoading={loading} />
            </View>
         </StepContainer>
      </ScreenWrapper>
   );
}
