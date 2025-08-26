import GradientButton from "@/src/components/GradientButton";
import { Input } from "@/src/components/Input";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import StepContainer from "@/src/components/StepContainer";
import { hp } from "@/src/constant/common";
import { supabase } from "@/src/lib/supabase";
import React, { useState } from "react";
import { View } from "react-native";

export default function PasswordRecovery() {
   const [email, setsEmail] = useState("");

   const handleReset = async () => {
      if (!email) return;
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
         redirectTo: "exp://192.168.1.7:8081/--/auth/callback",
      });
      if (error) {
         console.log("password reset error", error);
      }
   };

   console.log(email);

   return (
      <ScreenWrapper>
         <View style={{ position: "relative", marginTop: hp(9) }}>
            <StepContainer heading="Password recovery" paragraph="Recovery your Linuty account">
               <View className="gap-6">
                  <Input onChangeText={setsEmail} placeholder="Email adress" />
                  <GradientButton text="next" onPress={handleReset} />
               </View>
            </StepContainer>
         </View>
      </ScreenWrapper>
   );
}
