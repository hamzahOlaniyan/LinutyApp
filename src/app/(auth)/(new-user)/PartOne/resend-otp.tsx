import Button from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import StepContainer from "@/src/components/StepContainer";
import { supabase } from "@/src/lib/supabase";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function Otp() {
   const { form, errors, updateField, nextStep, resetErrors } = useRegistrationStore();

   const [otp, setOtp] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const router = useRouter();

   const handleNext = async () => {
      if (!otp) {
         setError("enter the 6-digit code");
         return;
      }

      try {
         const { error, data } = await supabase.auth.verifyOtp({
            email: form.email,
            token: otp,
            type: "email",
         });
         console.log("otps session", JSON.stringify(data, null, 2));

         if (!data.session) return;

         if (data.session) {
            nextStep();
            router.push("/(auth)/(new-user)/step-4");
            setLoading(false);
         }
      } catch (error) {
         console.error("Error signing in:", error);
         return;
      }
   };

   return (
      <ScreenWrapper>
         <StepContainer
            heading="Enter the 6 digit confirmation code"
            paragraph={`We have sent a verification code to your email address ${form.email}. To confirm enter the 6-digit code.`}
         >
            <Input
               placeholder="Email address"
               value={otp}
               onChangeText={setOtp}
               keyboardType="email-address"
               inputMode="text"
            />

            <View className="gap-2 my-6">
               <Button onPress={handleNext} title="Next" size="lg" isLoading={loading} />
               <Link href={"/resend-otp"} asChild>
                  <Button title="Resend code" size="lg" isLoading={loading} variant="outline" />
               </Link>
            </View>
         </StepContainer>
      </ScreenWrapper>
   );
}
