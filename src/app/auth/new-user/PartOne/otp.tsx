import ScreenWrapper from "@/components/ScreenWrapper";
import StepContainer from "@/components/StepContainer";
import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import GradientButton from "@/components/ui/GradientButton";
import { Input } from "@/components/ui/Input";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { useRegistrationStore } from "@/store/useRegistrationState";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

export default function Otp() {
   const { form, errors, updateField, nextStep, resetErrors } = useRegistrationStore();

   const setSession = useAuthStore((s) => s.setSession);
   const fetchProfile = useAuthStore((s) => s.fetchProfile);

   const [otp, setOtp] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [timer, setTimer] = useState(60); // countdown in seconds
   const [canResend, setCanResend] = useState(false);

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

   useEffect(() => {
      let interval: any;

      if (timer > 0) {
         interval = setInterval(() => {
            setTimer((prev) => prev - 1);
         }, 1000);
      } else {
         setCanResend(true);
         clearInterval(interval);
      }

      return () => clearInterval(interval); // cleanup on unmount
   }, [timer]);

   const resendOtp = async () => {
      const { error } = await supabase.auth.resend({
         type: "signup",
         email: form.email,
      });
      if (error) {
         console.log(error);
      }
      setTimer(60);
      setCanResend(false);
   };

   return (
      <ScreenWrapper>
         <StepContainer
            heading="Enter the 6 digit confirmation code"
            paragraph={`We have sent a verification code to your email address ${form.email}. To confirm enter the 6-digit code.`}
         >
            <Input placeholder="code" value={otp} onChangeText={setOtp} keyboardType="email-address" inputMode="text" />
            <View className="gap-4 my-6 justify-center">
               {canResend ? (
                  <Button text="Resend OTP" onPress={resendOtp} />
               ) : (
                  <AppText align="center"> Resend OTP in: {timer} sec</AppText>
               )}
               <GradientButton onPress={handleNext} text="Next" size="lg" isLoading={loading} />
            </View>
         </StepContainer>
      </ScreenWrapper>
   );
}
