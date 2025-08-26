import GradientButton from "@/src/components/GradientButton";
import { Input } from "@/src/components/Input";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import StepContainer from "@/src/components/StepContainer";
import { hp } from "@/src/constant/common";
import { supabase } from "@/src/lib/supabase";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function ResetPassword() {
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const router = useRouter();

   async function updatePassword() {
      let valid = true;

      setLoading(true);

      if (!password) {
         setError("password is required");
         setLoading(false);
         return;
      }

      if (!confirmPassword) {
         setError("please confirm your password");
         setLoading(false);
      }

      const { data, error } = await supabase.auth.updateUser({ password });

      if (error) {
         console.error("Password update failed:", error.message);
         return;
      }

      console.log("Password updated successfully!");
      router.replace("/(app)");
   }

   return (
      <ScreenWrapper>
         <View style={{ position: "relative", marginTop: hp(9) }}>
            <StepContainer heading="Password recovery" paragraph="Recovery your Linuty account">
               <View className="gap-6">
                  <Input
                     value={password}
                     onChangeText={setPassword}
                     placeholder="new password"
                     secureTextEntry
                     inputMode="text"
                     isPassword={true}
                     error={!!error}
                     errorMessage={error}
                  />
                  <Input
                     placeholder="Confirm Password"
                     value={confirmPassword}
                     onChangeText={setConfirmPassword}
                     secureTextEntry
                     inputMode="text"
                     isPassword={true}
                     error={!!error}
                     errorMessage={error}
                  />
                  <GradientButton text="next" onPress={updatePassword} isLoading={loading} />
               </View>
            </StepContainer>
         </View>
      </ScreenWrapper>
   );
}
