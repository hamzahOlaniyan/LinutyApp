import AppText from "@/src/components/AppText";
import GradientButton from "@/src/components/GradientButton";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import StepContainer from "@/src/components/StepContainer";
import { supabase } from "@/src/lib/supabase";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function Agreement() {
   const { form, nextStep } = useRegistrationStore();

   const [loading, setLoading] = useState(false);

   const router = useRouter();

   // console.log(JSON.stringify(form, null, 2));

   const handleNext = async () => {
      let valid = true;
      setLoading(true);

      try {
         const { data, error: auth_error } = await supabase.auth.signUp({
            email: form.email,
            password: form.password,
            options: {
               data: { username: form.username },
            },
         });

         if (auth_error) {
            console.error("Error signing up:", auth_error.message);
            return;
         }

         console.log("Signup response:", data);
         router.push("/PartOne/otp");
      } catch (error) {
         console.error("Error signing in:", error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <ScreenWrapper>
         <StepContainer heading="Agree to Linuty's terms and policies">
            <View className="gap-3">
               <AppText>
                  By creating an account on Linuty, you agree to use the platform responsibly and respectfully. You must
                  provide accurate information, keep your account secure, and be at least 13 years old (or the legal
                  minimum in your country).
               </AppText>
               <AppText>
                  We ask all members to respect others and avoid posting harmful, offensive, or misleading content.
                  Accounts that engage in harassment, abuse, or violations of our community guidelines may be suspended
                  or removed.
               </AppText>
               <AppText>
                  Your personal information (such as name, email, and lineage details) is collected to provide and
                  improve our services. We will never sell your data to third parties, and you remain in control of your
                  privacy settings.
               </AppText>
               <AppText>
                  By continuing, you confirm that you have read and accepted these terms and our privacy practices.
               </AppText>
            </View>

            <View className="gap-2 my-6">
               <GradientButton onPress={handleNext} text="I agree" size="lg" isLoading={loading} />
            </View>
         </StepContainer>
      </ScreenWrapper>
   );
}
