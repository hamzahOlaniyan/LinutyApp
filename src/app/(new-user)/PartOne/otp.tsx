import Button from "@/src/components/Button";
import GradientButton from "@/src/components/GradientButton";
import { Input } from "@/src/components/Input";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import StepContainer from "@/src/components/StepContainer";
import { supabase } from "@/src/lib/supabase";
import { useAuthStore } from "@/src/store/authStore";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function Otp() {
   const { form, errors, updateField, nextStep, resetErrors } = useRegistrationStore();

   const setSession = useAuthStore((s) => s.setSession);
   const fetchProfile = useAuthStore((s) => s.fetchProfile);

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
         setLoading(true);
         const { data: session, error } = await supabase.auth.verifyOtp({
            email: form.email,
            token: otp,
            type: "email",
         });

         if (error || !session.session) {
            console.log("OTP ERROR", error?.message);
            setLoading(false);
            return;
         }

         setSession(session?.session);

         const { error: ProfileUpdateError } = await supabase
            .from("profiles")
            .update({ firstName: form.firstName, lastName: form.lastName })
            .eq("id", session?.user?.id);

         fetchProfile(session?.user?.id ?? "");
         router.replace("/(new-user)/PartTwo/step-4.0");

         if (ProfileUpdateError) {
            console.log("OTP ERROR", ProfileUpdateError.message);
            setLoading(false);
            return;
         }
      } catch (error) {
         console.error("Error signing in:", error);
         setLoading(false);
         return;
      }
   };

   const resentOtp = async () => {
      const { error } = await supabase.auth.resend({
         type: "signup",
         email: form.email,
      });
      if (error) {
         console.log(error);
      }
   };

   return (
      <ScreenWrapper>
         <StepContainer
            heading="Enter the 6 digit confirmation code"
            paragraph={`We have sent a verification code to your email address ${form.email}. To confirm enter the 6-digit code.`}
         >
            <Input placeholder="code" value={otp} onChangeText={setOtp} keyboardType="email-address" inputMode="text" />
            <View className="gap-4 my-6">
               <Button text="Resend code" onPress={resentOtp} size="lg" variant="outline" />
               <GradientButton onPress={handleNext} text="Next" size="lg" isLoading={loading} />
            </View>
         </StepContainer>
      </ScreenWrapper>
   );
}
