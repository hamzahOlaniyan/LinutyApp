import StepContainer from "@/src/components/StepContainer";
import GradientButton from "@/src/components/ui/GradientButton";
import { Input } from "@/src/components/ui/Input";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { validatePassword } from "@/src/hooks/validatePassword";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function Step2() {
   const { form, errors, updateField, setError, nextStep } = useRegistrationStore();
   const router = useRouter();
   const [confirmPassword, setConfirmPassword] = useState("");
   const [passwordError, setPasswordError] = useState("");
   const [loading, setLoading] = useState(false);

   const handleNext = async () => {
      let valid = true;

      setLoading(true);

      if (!form.password) {
         setError("password", "password is required");
         setLoading(false);
         valid = false;
      }

      const error = validatePassword(form.password);

      if (error) {
         setError("password", "Password must include at least 1 lowercase, 1 uppercase & 1 number");
         setLoading(false);
         return;
      }

      if (!confirmPassword) {
         setPasswordError("please confirm your password");
         setLoading(false);
         valid = false;
         return;
      } else if (form.password !== confirmPassword) {
         setPasswordError("Password does not match");
         setLoading(false);
         return;
      }

      if (!valid) return;
      if (valid) {
         nextStep();
         router.push("/PartOne/step-3.1");
         setConfirmPassword("");
         setLoading(false);
      }
   };

   return (
      <View style={{ paddingHorizontal: wp(4), backgroundColor: appColors.white, flex: 1 }}>
         <StepContainer
            heading="Create a password"
            paragraph="Your password should be at least 8 characters long. Avoid using easily guessed information. (Password must a contain uppercase,lowercase, digits & symbol)"
         >
            <View className="gap-2">
               <Input
                  placeholder="Password"
                  value={form.password}
                  onChangeText={(password) => updateField("password", password)}
                  secureTextEntry
                  inputMode="text"
                  isPassword={true}
                  error={!!errors.password}
                  errorMessage={errors.password}
               />
               <Input
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  inputMode="text"
                  isPassword={true}
                  error={!!passwordError}
                  errorMessage={passwordError}
               />
            </View>
            <View className="gap-2 my-6">
               <GradientButton onPress={handleNext} text="Next" size="lg" isLoading={loading} />
            </View>
         </StepContainer>
      </View>
   );
}
