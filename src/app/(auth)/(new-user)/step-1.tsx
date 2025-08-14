import AppText from "@/src/components/AppText";
import Button from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import ScreenWrapper from "@/src/components/ScreenWrapper";
// import { supabase } from "@/src/lib/supabase";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function Step1() {
   const { form, errors, updateField, setError, nextStep } = useRegistrationStore();

   const [loading, setLoading] = useState(false);

   const isValidEmail = (email: string) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
   };

   const handleNext = async () => {
      let valid = true;
      if (!form.email) {
         setError("email", "Email is required");
         valid = false;
      } else if (!isValidEmail(form.email)) {
         setError("email", "Enter a valid email address");
         valid = false;
      }
      if (!valid) return;

      setLoading(true);

      // const { data, error } = await supabase
      //    .from("users") // 👈 your users table
      //    .select("id")
      //    .eq("email", form.email)
      //    .maybeSingle();

      setLoading(false);

      // if (error) {
      //    setError("email", "Error checking email, try again later");
      //    return;
      // }

      // if (data) {
      //    setError("email", "This email is already registered");
      //    return;
      // }

      if (valid) {
         nextStep();
         router.push("/(auth)/(new-user)/step-2");
      }
   };

   return (
      <ScreenWrapper>
         <View className="gap-6">
            <AppText size="xxl" weight="bold">
               What is your email address?
            </AppText>
            <AppText size="lg" weight="semi">
               Enter a valid email address to continue. We’ll use this email to verify your identity and send important
               updates about your Linuty account.
            </AppText>
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
               <Button onPress={handleNext} title="Next" size="lg" />
               <Button onPress={() => router.back()} title="Already have an account" size="lg" variant="plain" />
            </View>
         </View>
      </ScreenWrapper>
   );
}
